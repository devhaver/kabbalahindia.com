// One instance per format, reused for every row. Lesson dates are plain
// YYYY-MM-DD, so they are built in UTC and formatted in UTC — no timezone drift.
const dayFormat = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const shortDayFormat = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

const monthFormat = new Intl.DateTimeFormat("en-IN", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const toUtcDate = (value: string): Date | null => {
  const [year, month, day = "1"] = value.split("-");
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatLessonDate = (value: string): string => {
  const date = toUtcDate(value);
  return date ? dayFormat.format(date) : value;
};

/** Short form for rows already grouped under a month heading: "16 Nov". */
const formatLessonShortDate = (value: string): string => {
  const date = toUtcDate(value);
  return date ? shortDayFormat.format(date) : value;
};

/** Accepts `YYYY-MM-DD` or a `YYYY-MM` group key. */
const formatLessonMonth = (value: string): string => {
  const date = toUtcDate(value);
  return date ? monthFormat.format(date) : value;
};

export const useFormattedLessonDate = () => ({
  formatLessonDate,
  formatLessonShortDate,
  formatLessonMonth,
});
