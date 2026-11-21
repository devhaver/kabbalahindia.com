import { describe, expect, it } from "vitest";

import { errorVariant } from "../../app/utils/errorVariant";

describe("utils/errorVariant", () => {
  it("treats an unknown page as not-found", () => {
    expect(errorVariant(404, "/asdas")).toBe("not-found");
    expect(errorVariant(404, "/lessons")).toBe("not-found");
  });

  it("treats an unknown lesson as lesson-not-found", () => {
    expect(errorVariant(404, "/lessons/2024/some-lesson")).toBe(
      "lesson-not-found",
    );
  });

  it("treats every other status as a failure, whatever the path", () => {
    expect(errorVariant(500, "/")).toBe("failure");
    expect(errorVariant(503, "/lessons/x")).toBe("failure");
  });
});
