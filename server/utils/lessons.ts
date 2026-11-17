import * as v from "valibot";

/**
 * Reading side of the Daily Lessons site (https://bb-docs.github.io). The
 * lessons site publishes `lessons.json` and renders every lesson page with its
 * body between two HTML comment markers; this module validates the index,
 * cuts the body out and sanitizes it. No caching or Nitro APIs here — see
 * lessons-cache.ts — so everything is unit-testable.
 */

const FETCH_TIMEOUT_MS = 8000;
const BODY_START = "<!-- lesson-body:start -->";
const BODY_END = "<!-- lesson-body:end -->";

const lessonEntrySchema = v.object({
  title: v.pipe(v.string(), v.minLength(1)),
  subtitle: v.string(),
  date: v.pipe(v.string(), v.regex(/^\d{4}-\d{2}-\d{2}$/)),
  path: v.pipe(v.string(), v.regex(/^\/lessons\/[^\s?#]+$/)),
});

const lessonIndexSchema = v.array(lessonEntrySchema);

export type LessonEntry = v.InferOutput<typeof lessonEntrySchema>;

/**
 * `unavailable` — the lessons site is unreachable or sent something we can't
 * use. `not-found` — the requested path is not a published lesson.
 */
export class LessonsError extends Error {
  readonly kind: "unavailable" | "not-found";

  constructor(kind: "unavailable" | "not-found", message: string) {
    super(message);
    this.name = "LessonsError";
    this.kind = kind;
  }
}

const trimBase = (baseUrl: string): string => baseUrl.replace(/\/+$/, "");

const fetchText = async (url: string): Promise<string> => {
  let res: Response;
  try {
    res = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  } catch {
    throw new LessonsError("unavailable", `Could not reach ${url}`);
  }
  if (!res.ok) {
    throw new LessonsError("unavailable", `${url} answered ${res.status}`);
  }
  return res.text();
};

export const parseLessonIndex = (payload: unknown): LessonEntry[] => {
  const parsed = v.safeParse(lessonIndexSchema, payload);
  if (!parsed.success) {
    throw new LessonsError(
      "unavailable",
      "lessons.json has an unexpected shape",
    );
  }
  return parsed.output;
};

export const fetchLessonIndex = async (
  baseUrl: string,
): Promise<LessonEntry[]> => {
  const text = await fetchText(`${trimBase(baseUrl)}/lessons.json`);
  let payload: unknown;
  try {
    payload = JSON.parse(text);
  } catch {
    throw new LessonsError("unavailable", "lessons.json is not valid JSON");
  }
  return parseLessonIndex(payload);
};

/** `/lessons/a/b` → `/lessons/a/b/` (one leading and one trailing slash). */
export const normalizeLessonPath = (path: string): string =>
  `/${path.replace(/^\/+/, "").replace(/\/+$/, "")}/`;

/**
 * The path guard: a lesson is only ever looked up by exact (slash-normalised)
 * match against the index, so unvalidated input never reaches an upstream URL.
 */
export const findLessonEntry = (
  index: LessonEntry[],
  path: string,
): LessonEntry | undefined => {
  const wanted = normalizeLessonPath(path);
  return index.find((e) => normalizeLessonPath(e.path) === wanted);
};

const countOccurrences = (haystack: string, needle: string): number =>
  haystack.split(needle).length - 1;

export const extractLessonBody = (page: string): string => {
  if (
    countOccurrences(page, BODY_START) !== 1 ||
    countOccurrences(page, BODY_END) !== 1
  ) {
    throw new LessonsError("unavailable", "Lesson body markers not found");
  }
  const start = page.indexOf(BODY_START) + BODY_START.length;
  const end = page.indexOf(BODY_END);
  const body = end > start ? page.slice(start, end).trim() : "";
  if (!body) throw new LessonsError("unavailable", "Lesson body is empty");
  return body;
};

/** Returns the raw (unsanitized) HTML between the body markers. */
export const fetchLessonBody = async (
  baseUrl: string,
  path: string,
  index: LessonEntry[],
): Promise<string> => {
  const entry = findLessonEntry(index, path);
  if (!entry) throw new LessonsError("not-found", "Unknown lesson");
  // The upstream URL is built from the index entry, never from `path`.
  return extractLessonBody(
    await fetchText(`${trimBase(baseUrl)}${entry.path}`),
  );
};

// ---------------------------------------------------------------------------
// Sanitizer — a small allow-list tokenizer. Anything not listed is dropped.
// ---------------------------------------------------------------------------

const ALLOWED_TAGS = new Set([
  "h2",
  "h3",
  "h4",
  "h5",
  "p",
  "ul",
  "ol",
  "li",
  "blockquote",
  "strong",
  "em",
  "b",
  "i",
  "a",
  "hr",
  "br",
  "code",
  "pre",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "sup",
  "sub",
]);
const VOID_TAGS = new Set(["hr", "br"]);
const HEADING_TAGS = new Set(["h2", "h3", "h4", "h5"]);
// Removed together with their content (not just the tags).
const DROP_WITH_CONTENT = new Set(["script", "style"]);
const SAFE_LINK_PROTOCOLS = new Set(["http:", "https:", "mailto:"]);

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  colon: ":",
  tab: "\t",
  newline: "\n",
};

const decodeEntities = (value: string): string =>
  value.replace(
    /&(#x[0-9a-f]+|#[0-9]+|[a-z][a-z0-9]*);?/gi,
    (match, entity: string) => {
      if (entity.startsWith("#")) {
        const code =
          entity[1] === "x" || entity[1] === "X"
            ? parseInt(entity.slice(2), 16)
            : parseInt(entity.slice(1), 10);
        return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : "";
      }
      return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
    },
  );

const escapeAttribute = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const TAG_RE = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/y;
const ATTR_RE =
  /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
// The lessons site marks callouts as `callout callout-note` etc.
const CALLOUT_CLASS_RE = /^callout(-[a-z0-9]+)*$/;
const HEADING_ID_RE = /^[\p{L}\p{N}_:.-]{1,200}$/u;

const parseAttributes = (source: string): Map<string, string> => {
  const attributes = new Map<string, string>();
  for (const m of source.matchAll(ATTR_RE)) {
    const name = m[1]!.toLowerCase();
    // As in browsers, the first occurrence of an attribute wins.
    if (!attributes.has(name)) {
      attributes.set(name, decodeEntities(m[2] ?? m[3] ?? m[4] ?? ""));
    }
  }
  return attributes;
};

/** Returns the attribute string (with leading space) for an allowed tag. */
const buildAttributes = (
  tag: string,
  attributes: Map<string, string>,
  baseUrl: string,
): string => {
  if (HEADING_TAGS.has(tag)) {
    const id = attributes.get("id");
    return id !== undefined && HEADING_ID_RE.test(id)
      ? ` id="${escapeAttribute(id)}"`
      : "";
  }
  if (tag === "blockquote") {
    const tokens = (attributes.get("class") ?? "")
      .split(/\s+/)
      .filter((token) => CALLOUT_CLASS_RE.test(token));
    return tokens.length ? ` class="${tokens.join(" ")}"` : "";
  }
  if (tag !== "a") return "";

  const href = attributes.get("href")?.trim();
  if (!href) return "";
  if (href.startsWith("#")) return ` href="${escapeAttribute(href)}"`;

  let url: URL;
  try {
    url = new URL(href, `${baseUrl}/`);
  } catch {
    return "";
  }
  if (!SAFE_LINK_PROTOCOLS.has(url.protocol)) return "";
  // The emitted href is the parsed URL, not the author's string.
  const out = ` href="${escapeAttribute(url.href)}"`;
  return url.protocol === "mailto:"
    ? out
    : `${out} target="_blank" rel="noopener"`;
};

/**
 * Reduces lesson HTML to the structure kramdown emits. Allowed tags keep no
 * attributes except `class` tokens `callout*` on blockquotes, `id` on headings and a validated `href` on links (made
 * absolute against `baseUrl`; links that leave this site open in a new tab).
 * Comments, script/style (with content) and every other tag (text kept) are
 * removed. Open tags are balanced so the result can't leak into the page.
 */
export const sanitizeLessonHtml = (html: string, baseUrl: string): string => {
  const base = trimBase(baseUrl);
  const open: string[] = [];
  let out = "";
  let i = 0;

  while (i < html.length) {
    const lt = html.indexOf("<", i);
    if (lt === -1) {
      out += html.slice(i);
      break;
    }
    out += html.slice(i, lt);
    i = lt;

    if (html.startsWith("<!--", i)) {
      const end = html.indexOf("-->", i + 4);
      i = end === -1 ? html.length : end + 3;
      continue;
    }

    TAG_RE.lastIndex = i;
    const m = TAG_RE.exec(html);
    if (!m) {
      if (html[i + 1] === "!" || html[i + 1] === "?") {
        // Doctype, CDATA, processing instruction: drop through the next ">".
        const end = html.indexOf(">", i);
        i = end === -1 ? html.length : end + 1;
      } else {
        out += "&lt;";
        i += 1;
      }
      continue;
    }

    const closing = m[1] === "/";
    const tag = m[2]!.toLowerCase();
    i = TAG_RE.lastIndex;

    if (!closing && DROP_WITH_CONTENT.has(tag)) {
      const end = new RegExp(`</${tag}[\\s/>]`, "gi");
      end.lastIndex = i;
      const found = end.exec(html);
      const close = found ? html.indexOf(">", found.index) : -1;
      i = close === -1 ? html.length : close + 1;
      continue;
    }
    if (!ALLOWED_TAGS.has(tag)) continue;

    if (closing) {
      const at = open.lastIndexOf(tag);
      if (at === -1) continue;
      while (open.length > at) out += `</${open.pop()}>`;
      continue;
    }

    out += `<${tag}${buildAttributes(tag, parseAttributes(m[3]!), base)}>`;
    if (!VOID_TAGS.has(tag)) open.push(tag);
  }

  while (open.length) out += `</${open.pop()}>`;
  return out;
};
