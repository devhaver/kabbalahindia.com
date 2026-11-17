// GET /api/lessons — every lesson, newest first, as a JSON:API document.
export default defineEventHandler(async (event) => {
  try {
    const index = await getLessonIndex(
      useRuntimeConfig(event).public.lessonsBaseUrl,
    );
    jsonApiHeaders(event);
    return {
      data: index.map(({ path, ...attributes }) => ({
        type: "lessons",
        id: path,
        attributes,
      })),
      meta: { count: index.length },
    };
  } catch (error) {
    return jsonApiError(event, error);
  }
});
