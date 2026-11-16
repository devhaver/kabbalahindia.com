import { describe, expect, it } from "vitest";
import { useFormattedLessonDate } from "~/composables/useFormattedLessonDate";

describe("composables/useFormattedLessonDate", () => {
  const { formatLessonDate, formatLessonShortDate, formatLessonMonth } =
    useFormattedLessonDate();

  it("formats a plain date as day, month name and year", () => {
    expect(formatLessonDate("2026-11-16")).toBe("16 November 2026");
  });

  it("does not drift across the month and year boundary", () => {
    expect(formatLessonDate("2026-01-01")).toBe("1 January 2026");
    expect(formatLessonDate("2025-12-31")).toBe("31 December 2025");
  });

  it("formats a short day and month for grouped rows", () => {
    expect(formatLessonShortDate("2026-11-16")).toBe("16 Nov");
  });

  it("formats a month heading from a date or a YYYY-MM key", () => {
    expect(formatLessonMonth("2026-11-16")).toBe("November 2026");
    expect(formatLessonMonth("2026-11")).toBe("November 2026");
  });

  it("returns the input untouched when it is not a valid date", () => {
    expect(formatLessonDate("not-a-date")).toBe("not-a-date");
  });
});
