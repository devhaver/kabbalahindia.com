export type ErrorVariant = "not-found" | "lesson-not-found" | "failure";

export const errorVariant = (
  statusCode: number,
  path: string,
): ErrorVariant => {
  if (statusCode !== 404) return "failure";
  return path.startsWith("/lessons/") ? "lesson-not-found" : "not-found";
};
