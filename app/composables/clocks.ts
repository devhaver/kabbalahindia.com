export type CityTime = {
  time: string;
  isDay: boolean;
};

/**
 * Live wall-clock times for a set of IANA time zones, updated each minute.
 * Empty until mounted, so SSR and hydration both render the placeholder and
 * never mismatch.
 */
export const useFormattedCityTimes = (zones: Record<string, string>) => {
  const entries = Object.entries(zones);
  const timeFormatters = new Map(
    entries.map(([key, timeZone]) => [
      key,
      new Intl.DateTimeFormat("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone,
      }),
    ]),
  );
  const hourFormatters = new Map(
    entries.map(([key, timeZone]) => [
      key,
      new Intl.DateTimeFormat("en-GB", {
        hour: "numeric",
        hourCycle: "h23",
        timeZone,
      }),
    ]),
  );

  const times = ref<Record<string, CityTime>>({});

  const update = () => {
    const now = new Date();
    const next = Object.fromEntries(
      entries.map(([key]) => {
        const hour = Number(hourFormatters.get(key)!.format(now));
        return [
          key,
          {
            time: timeFormatters.get(key)!.format(now),
            isDay: hour >= 6 && hour < 18,
          },
        ];
      }),
    );
    const changed = entries.some(
      ([key]) => times.value[key]?.time !== next[key]!.time,
    );
    if (changed) times.value = next;
  };

  // Display granularity is one minute, so wake just past each minute
  // boundary instead of polling every second.
  let timer: ReturnType<typeof setTimeout> | undefined;
  const schedule = () => {
    timer = setTimeout(
      () => {
        update();
        schedule();
      },
      60_000 - (Date.now() % 60_000) + 50,
    );
  };
  onMounted(() => {
    update();
    schedule();
  });
  onUnmounted(() => clearTimeout(timer));

  return times;
};
