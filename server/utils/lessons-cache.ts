import {
  fetchLessonBody,
  fetchLessonIndex,
  findLessonEntry,
  LessonsError,
  sanitizeLessonHtml,
  type LessonEntry,
} from "./lessons";

// The lessons site sends `cache-control: max-age=600`; we match it. Entries
// are served stale for up to an hour while a refresh runs in the background.
//
// Caveat: this uses Nitro's default (in-memory) storage. On Cloudflare Workers
// that means the cache is per-isolate and best-effort — isolates come and go
// and don't share it, so it only trims repeat fetches, it is not a guarantee.
// No KV/R2 binding is used on purpose (nothing to provision or pay for).
const CACHE = { maxAge: 600, staleMaxAge: 3600, swr: true } as const;

const cachedIndex = defineCachedFunction(
  (baseUrl: string) => fetchLessonIndex(baseUrl),
  { ...CACHE, name: "lessons-index", getKey: (baseUrl: string) => baseUrl },
);

const cachedBody = defineCachedFunction(
  async (baseUrl: string, path: string) => {
    const raw = await fetchLessonBody(
      baseUrl,
      path,
      await cachedIndex(baseUrl),
    );
    return sanitizeLessonHtml(raw, baseUrl);
  },
  {
    ...CACHE,
    name: "lessons-body",
    getKey: (baseUrl: string, path: string) => `${baseUrl}${path}`,
  },
);

export const getLessonIndex = (baseUrl: string): Promise<LessonEntry[]> =>
  cachedIndex(baseUrl);

/**
 * Sanitized body of one lesson, plus its index entry. The path is checked
 * against the index first, so only real lesson paths ever become cache keys
 * or upstream URLs.
 */
export const getLesson = async (
  baseUrl: string,
  path: string,
): Promise<{ entry: LessonEntry; index: LessonEntry[]; html: string }> => {
  const index = await cachedIndex(baseUrl);
  const entry = findLessonEntry(index, path);
  if (!entry) throw new LessonsError("not-found", "Unknown lesson");
  return { entry, index, html: await cachedBody(baseUrl, entry.path) };
};
