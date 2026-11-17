// GET /api/lessons/2026/11/16/<slug> — one lesson with its sanitized body.
// `meta.previous` is the next-older lesson, `meta.next` the next-newer one.
export default defineEventHandler(async (event) => {
  try {
    const path = `/lessons/${getRouterParam(event, "path") ?? ""}`;
    const { entry, index, html } = await getLesson(
      useRuntimeConfig(event).public.lessonsBaseUrl,
      path,
    );
    const at = index.indexOf(entry);
    const link = (e?: (typeof index)[number]) =>
      e ? { title: e.title, date: e.date, path: e.path } : null;
    jsonApiHeaders(event);
    return {
      data: {
        type: "lessons",
        id: entry.path,
        attributes: {
          title: entry.title,
          subtitle: entry.subtitle,
          date: entry.date,
          body: html,
        },
      },
      meta: { previous: link(index[at + 1]), next: link(index[at - 1]) },
    };
  } catch (error) {
    return jsonApiError(event, error);
  }
});
