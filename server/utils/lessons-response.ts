import type { H3Event } from "h3";
import { LessonsError } from "./lessons";

const JSON_API = "application/vnd.api+json";

/** Success documents are short-lived public; the CDN/browser may reuse them. */
export const jsonApiHeaders = (event: H3Event) => {
  setResponseHeader(event, "Content-Type", JSON_API);
  setResponseHeader(event, "Cache-Control", "public, max-age=300");
};

/** A JSON:API `errors` document. Never cached. */
export const jsonApiError = (event: H3Event, error: unknown) => {
  const notFound = error instanceof LessonsError && error.kind === "not-found";
  const status = notFound ? 404 : 503;
  setResponseStatus(event, status);
  setResponseHeader(event, "Content-Type", JSON_API);
  setResponseHeader(event, "Cache-Control", "no-store");
  if (!notFound) console.error("[lessons]", error);
  return {
    errors: [
      {
        status: String(status),
        title: notFound ? "Lesson not found" : "Lessons are unavailable",
      },
    ],
  };
};
