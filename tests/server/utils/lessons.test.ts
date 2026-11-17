import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  extractLessonBody,
  fetchLessonBody,
  fetchLessonIndex,
  findLessonEntry,
  LessonsError,
  normalizeLessonPath,
  parseLessonIndex,
  sanitizeLessonHtml,
  type LessonEntry,
} from "~~/server/utils/lessons";

const BASE = "https://bb-docs.github.io";

const entry = (path: string, date = "2026-11-16"): LessonEntry => ({
  title: "A lesson",
  subtitle: "Subtitle",
  date,
  path,
});

const START = "<!-- lesson-body:start -->";
const END = "<!-- lesson-body:end -->";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("parseLessonIndex", () => {
  it("accepts a well-formed index", () => {
    const index = parseLessonIndex([
      {
        title: "T",
        subtitle: "S",
        date: "2026-11-16",
        path: "/lessons/2026/11/16/t/",
      },
    ]);
    expect(index).toHaveLength(1);
    expect(index[0]?.path).toBe("/lessons/2026/11/16/t/");
  });

  it("accepts an empty index", () => {
    expect(parseLessonIndex([])).toEqual([]);
  });

  it("rejects a payload that is not an array", () => {
    expect(() => parseLessonIndex({ lessons: [] })).toThrow(LessonsError);
  });

  it("rejects entries with a missing field or a malformed date", () => {
    expect(() =>
      parseLessonIndex([{ title: "T", path: "/lessons/x/" }]),
    ).toThrow(LessonsError);
    expect(() =>
      parseLessonIndex([
        { title: "T", subtitle: "S", date: "16/11/2026", path: "/lessons/x/" },
      ]),
    ).toThrow(LessonsError);
  });

  it("rejects paths outside /lessons/", () => {
    expect(() =>
      parseLessonIndex([
        { title: "T", subtitle: "S", date: "2026-11-16", path: "//evil.com/" },
      ]),
    ).toThrow(LessonsError);
  });
});

describe("fetchLessonIndex", () => {
  it("fetches <base>/lessons.json and validates it", async () => {
    const fetchMock = vi.fn(async () =>
      Response.json([
        { title: "T", subtitle: "S", date: "2026-11-16", path: "/lessons/a/" },
      ]),
    );
    vi.stubGlobal("fetch", fetchMock);
    const index = await fetchLessonIndex(BASE);
    expect(index).toHaveLength(1);
    expect(fetchMock.mock.calls[0]?.[0]).toBe(`${BASE}/lessons.json`);
  });

  it("reports unavailable when the upstream is down", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("nope", { status: 500 })),
    );
    await expect(fetchLessonIndex(BASE)).rejects.toMatchObject({
      kind: "unavailable",
    });
  });

  it("reports unavailable when the network fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("fetch failed");
      }),
    );
    await expect(fetchLessonIndex(BASE)).rejects.toMatchObject({
      kind: "unavailable",
    });
  });

  it("reports unavailable when the body is not JSON", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("<html>")),
    );
    await expect(fetchLessonIndex(BASE)).rejects.toMatchObject({
      kind: "unavailable",
    });
  });
});

describe("normalizeLessonPath", () => {
  it("adds the trailing slash and the leading slash", () => {
    expect(normalizeLessonPath("/lessons/2026/11/16/a")).toBe(
      "/lessons/2026/11/16/a/",
    );
    expect(normalizeLessonPath("lessons/2026/11/16/a/")).toBe(
      "/lessons/2026/11/16/a/",
    );
  });

  it("collapses repeated trailing slashes", () => {
    expect(normalizeLessonPath("/lessons/a///")).toBe("/lessons/a/");
  });
});

describe("findLessonEntry (path guard)", () => {
  const index = [
    entry("/lessons/2026/11/16/a/"),
    entry("/lessons/2026/11/15/b/", "2026-11-15"),
  ];

  it("finds an entry by exact path", () => {
    expect(findLessonEntry(index, "/lessons/2026/11/15/b/")?.date).toBe(
      "2026-11-15",
    );
  });

  it("ignores a missing trailing slash", () => {
    expect(findLessonEntry(index, "/lessons/2026/11/15/b")).toBe(index[1]);
  });

  it("rejects a path that is not in the index", () => {
    expect(findLessonEntry(index, "/lessons/2026/11/14/c/")).toBeUndefined();
  });

  it("rejects traversal and absolute-URL tricks", () => {
    expect(
      findLessonEntry(index, "/lessons/2026/11/16/a/../../../x/"),
    ).toBeUndefined();
    expect(
      findLessonEntry(index, "https://evil.com/lessons/a/"),
    ).toBeUndefined();
    expect(
      findLessonEntry(index, "//evil.com/lessons/2026/11/16/a/"),
    ).toBeUndefined();
  });
});

describe("extractLessonBody", () => {
  it("returns the html between the markers", () => {
    const html = `<main>${START}<p>Hello</p>${END}</main>`;
    expect(extractLessonBody(html)).toBe("<p>Hello</p>");
  });

  it("throws when the markers are missing", () => {
    expect(() => extractLessonBody("<main><p>Hello</p></main>")).toThrow(
      LessonsError,
    );
  });

  it("throws when only one marker is present", () => {
    expect(() => extractLessonBody(`${START}<p>x</p>`)).toThrow(LessonsError);
    expect(() => extractLessonBody(`<p>x</p>${END}`)).toThrow(LessonsError);
  });

  it("throws when the markers are in the wrong order", () => {
    expect(() => extractLessonBody(`${END}<p>x</p>${START}`)).toThrow(
      LessonsError,
    );
  });

  it("throws when the markers are duplicated", () => {
    expect(() =>
      extractLessonBody(`${START}<p>a</p>${END}${START}<p>b</p>${END}`),
    ).toThrow(LessonsError);
  });

  it("throws when the body is empty", () => {
    expect(() => extractLessonBody(`${START}  ${END}`)).toThrow(LessonsError);
  });
});

describe("fetchLessonBody", () => {
  const index = [entry("/lessons/2026/11/16/a/")];

  it("fetches the page for an indexed path, using the index path", async () => {
    const fetchMock = vi.fn(
      async () => new Response(`<html>${START}<p>Body</p>${END}</html>`),
    );
    vi.stubGlobal("fetch", fetchMock);
    const body = await fetchLessonBody(BASE, "/lessons/2026/11/16/a", index);
    expect(body).toBe("<p>Body</p>");
    expect(fetchMock.mock.calls[0]?.[0]).toBe(`${BASE}/lessons/2026/11/16/a/`);
  });

  it("rejects a path that is not in the index without fetching", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    await expect(
      fetchLessonBody(BASE, "/lessons/2026/11/16/other/", index),
    ).rejects.toMatchObject({ kind: "not-found" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("reports unavailable when the page has no markers", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("<html><p>old layout</p></html>")),
    );
    await expect(
      fetchLessonBody(BASE, "/lessons/2026/11/16/a/", index),
    ).rejects.toMatchObject({ kind: "unavailable" });
  });

  it("reports unavailable when the upstream page is 404", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("gone", { status: 404 })),
    );
    await expect(
      fetchLessonBody(BASE, "/lessons/2026/11/16/a/", index),
    ).rejects.toMatchObject({ kind: "unavailable" });
  });
});

describe("sanitizeLessonHtml", () => {
  const clean = (html: string) => sanitizeLessonHtml(html, BASE);

  it("removes script and style together with their content", () => {
    expect(clean("<p>a</p><script>alert(1)</script><style>p{}</style>")).toBe(
      "<p>a</p>",
    );
  });

  it("removes an unterminated script through to the end", () => {
    expect(clean("<p>a</p><script>alert(1)")).toBe("<p>a</p>");
  });

  it("removes iframe, img and audio but keeps text of other removed tags", () => {
    const out = clean(
      '<p>x</p><iframe src="https://evil.com"></iframe><img src="a.png" alt="a"><audio src="a.mp3"></audio><div>kept <span>text</span></div>',
    );
    expect(out).not.toMatch(/iframe|img|audio|<div|<span/);
    expect(out).toContain("kept text");
  });

  it("strips event handlers, style and class attributes", () => {
    const out = clean(
      '<p onclick="x()" style="color:red" class="a" data-x="1">hi</p>',
    );
    expect(out).toBe("<p>hi</p>");
  });

  it("keeps callout class tokens on blockquotes and drops other tokens", () => {
    expect(
      clean(
        '<blockquote class="callout callout-note evil x-callout">q</blockquote>',
      ),
    ).toBe('<blockquote class="callout callout-note">q</blockquote>');
    expect(clean('<blockquote class="evil">q</blockquote>')).toBe(
      "<blockquote>q</blockquote>",
    );
  });

  it("still strips class from non-blockquote tags", () => {
    expect(clean('<p class="callout callout-note">a</p>')).toBe("<p>a</p>");
  });

  it("removes comments", () => {
    expect(clean("<p>a</p><!-- secret --><p>b</p>")).toBe("<p>a</p><p>b</p>");
  });

  it("drops javascript:, data: and vbscript: hrefs but keeps the text", () => {
    expect(clean('<a href="javascript:alert(1)">x</a>')).toBe("<a>x</a>");
    expect(clean('<a href="data:text/html,<b>">x</a>')).toBe("<a>x</a>");
    expect(clean('<a href="vbscript:x">x</a>')).toBe("<a>x</a>");
  });

  it("drops obfuscated javascript: hrefs", () => {
    expect(clean('<a href="JaVa\tScRiPt:alert(1)">x</a>')).toBe("<a>x</a>");
    expect(clean('<a href="&#106;avascript:alert(1)">x</a>')).toBe("<a>x</a>");
    expect(clean('<a href=" javascript:alert(1)">x</a>')).toBe("<a>x</a>");
    expect(clean('<a href="java&#x73;cript:alert(1)">x</a>')).toBe("<a>x</a>");
  });

  it("keeps allowed structure", () => {
    const html =
      '<h2 id="a">H</h2><p>t <strong>b</strong> <em>i</em></p><ul><li>one</li></ul><blockquote><p>q</p></blockquote><hr><table><thead><tr><th>T</th></tr></thead><tbody><tr><td>D</td></tr></tbody></table>';
    expect(clean(html)).toBe(html);
  });

  it("normalises self-closing void tags", () => {
    expect(clean("<p>a<br />b</p><hr />")).toBe("<p>a<br>b</p><hr>");
  });

  it("keeps ids on headings only", () => {
    expect(clean('<h3 id="opening">Opening</h3>')).toBe(
      '<h3 id="opening">Opening</h3>',
    );
    expect(clean('<p id="x">a</p>')).toBe("<p>a</p>");
    expect(clean('<h2 id="a b&quot;c">H</h2>')).toBe("<h2>H</h2>");
  });

  it("keeps absolute http(s) and mailto links; external ones open safely", () => {
    expect(clean('<a href="https://example.com/a?b=1&amp;c=2">x</a>')).toBe(
      '<a href="https://example.com/a?b=1&amp;c=2" target="_blank" rel="noopener">x</a>',
    );
    expect(clean('<a href="mailto:a@b.co">x</a>')).toBe(
      '<a href="mailto:a@b.co">x</a>',
    );
  });

  it("rewrites relative links to absolute lessons-site URLs", () => {
    expect(clean('<a href="/lessons/2026/11/15/b/">x</a>')).toBe(
      `<a href="${BASE}/lessons/2026/11/15/b/" target="_blank" rel="noopener">x</a>`,
    );
    expect(clean('<a href="../c/">x</a>')).toContain(`href="${BASE}/`);
  });

  it("leaves in-page fragment links alone", () => {
    expect(clean('<a href="#part-1">x</a>')).toBe('<a href="#part-1">x</a>');
  });

  it("drops other attributes on links", () => {
    expect(clean('<a href="https://e.com" onclick="x()" title="t">x</a>')).toBe(
      '<a href="https://e.com/" target="_blank" rel="noopener">x</a>',
    );
  });

  it("escapes a stray < in text instead of emitting a tag", () => {
    expect(clean("<p>1 < 2 and <3</p>")).toBe("<p>1 &lt; 2 and &lt;3</p>");
  });

  it("balances tags: closes unclosed ones and drops stray closers", () => {
    expect(clean("<p><strong>a</p></em>b")).toBe("<p><strong>a</strong></p>b");
    expect(clean('<a href="https://e.com">open')).toBe(
      '<a href="https://e.com/" target="_blank" rel="noopener">open</a>',
    );
  });

  it("is case-insensitive about tag names", () => {
    expect(clean("<P>a</P><SCRIPT>x</SCRIPT>")).toBe("<p>a</p>");
  });

  it("sanitizes a real lesson body unchanged in text", () => {
    const page = readFileSync(
      new URL("../../fixtures/lesson-page.html", import.meta.url),
      "utf8",
    );
    const body = extractLessonBody(page);
    const out = clean(body);
    const text = (s: string) => s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ");
    expect(text(out)).toBe(text(body));
    expect(out).toContain('<h2 id="part-1--a-name-is-recognition">');
    expect(out).toContain("<table>");
    expect(out).not.toMatch(/<(script|style|audio|img|iframe)/i);
    expect(out).not.toContain("<!--");
  });
});
