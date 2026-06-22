<script setup lang="ts">
const cities = [
  { key: "india", en: "India", timeZone: "Asia/Kolkata" },
  { key: "israel", en: "Israel", timeZone: "Asia/Jerusalem" },
] as const;

const times = useFormattedCityTimes(
  Object.fromEntries(cities.map((c) => [c.key, c.timeZone])),
);

const root = ref<HTMLElement | null>(null);
const { gsap } = useGsap();

useMotionSafe(root, () => {
  // The loops pause while the clock is off-screen instead of ticking the
  // GSAP core for the whole session.
  const whileVisible = {
    trigger: root.value!,
    start: "top bottom",
    end: "bottom top",
    toggleActions: "play pause resume pause",
  };
  gsap.to(".dual-clock__icon", {
    y: -2,
    duration: 1.6,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    stagger: 0.4,
    scrollTrigger: whileVisible,
  });
  gsap.to(".dual-clock__dot", {
    scale: 1.6,
    opacity: 0.35,
    duration: 1,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    scrollTrigger: whileVisible,
  });

  // Roll the digits when a minute ticks over. Registered inside the
  // motion-safe setup so reduced-motion visitors never attach the watcher.
  const stop = watch(times, (next, prev) => {
    for (const c of cities) {
      if (!prev[c.key] || prev[c.key]!.time === next[c.key]?.time) continue;
      const el = root.value?.querySelector(
        `[data-clock="${c.key}"] .dual-clock__time`,
      );
      if (el) {
        gsap.fromTo(
          el,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.8)" },
        );
      }
    }
  });
  return () => stop();
});
</script>

<template>
  <div
    ref="root"
    class="flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
  >
    <span class="flex items-center gap-[0.375rem]">
      <span
        aria-hidden="true"
        class="dual-clock__dot bg-gold-500 h-[0.375rem] w-[0.375rem] rounded-full"
      />
      <span
        class="font-body-en text-cream-300/60 text-[0.875rem] tracking-[0.16em] uppercase"
      >
        Right now
      </span>
    </span>
    <div
      v-for="c in cities"
      :key="c.key"
      :data-clock="c.key"
      class="bg-cream-300/10 ring-cream-300/15 flex items-center gap-2 rounded-full px-3 py-[0.375rem] ring-1"
    >
      <UIcon
        :name="times[c.key]?.isDay ? 'i-lucide-sun' : 'i-lucide-moon'"
        class="dual-clock__icon h-[0.875rem] w-[0.875rem]"
        :class="times[c.key]?.isDay ? 'text-gold-500' : 'text-cream-300/80'"
      />
      <span class="font-body-en text-cream-300/80 text-[0.9375rem]">
        {{ c.en }}
      </span>
      <span
        class="dual-clock__time font-display-en text-cream-300 text-[1.0625rem] uppercase [font-variant-numeric:tabular-nums]"
      >
        {{ times[c.key]?.time ?? "—:—" }}
      </span>
    </div>
  </div>
</template>
