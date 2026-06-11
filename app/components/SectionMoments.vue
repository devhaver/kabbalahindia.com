<script setup lang="ts">
// Real videos from youtube.com/@kabbalah_india, embedded so the carousel can
// pause them when the section scrolls out of view.
const moments = [
  {
    id: "oxRbrLUkxNI",
    title: "World Kabbalah Convention 2026",
    description: "Thousands together · Israel",
  },
  {
    id: "wC3QgL8oJQA",
    title: "Does nature sing?",
    description: "Rav Laitman · Kabbalah TV",
  },
  {
    id: "RAhpT2wJrWU",
    title: "Why am I here?",
    description: "Life's deepest questions",
  },
  {
    id: "HEeb2Bm8NGo",
    title: "Purpose of Life",
    description: "From the academy",
  },
  {
    id: "pzcMQF1xAqQ",
    title: "The Secret to Real Freedom",
    description: "Exit the ego, connect",
  },
  {
    id: "LG164amKS0E",
    title: "Why do relationships feel so hard?",
    description: "Kabbalah explains",
  },
  {
    id: "hpyVS8I935k",
    title: "What's the point in the heart?",
    description: "The first awakening",
  },
  {
    id: "rE8ourMDVdY",
    title: "Why are there still wars?",
    description: "A 21st-century question",
  },
];
</script>

<template>
  <section class="bg-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-5 px-8 py-10 md:px-12 md:py-20"
    >
      <Eyebrow text="MOMENTS · हमारे समुदाय से" tone="maroon" />
      <h2
        class="font-display-en text-indigo-500 text-[1.5rem] leading-tight md:text-[2.5rem]"
      >
        Real life inside the community
      </h2>
      <YouTubeCarousel
        class="kai-carousel moments-carousel"
        :videos="moments"
        :options="{ align: 'start' }"
        :slides-per-view="{ base: 1, '48rem': 3 }"
        on-scroll-away="pause"
        aria-label="Moments from the community"
      />
    </div>
  </section>
</template>

<style scoped>
.moments-carousel {
  --weburz-carousel-accent: var(--color-maroon-500);
  --weburz-carousel-slide-gap: 0.75rem;
  --weburz-carousel-arrow-color: var(--color-maroon-500);
  --weburz-carousel-dot-color: var(--color-maroon-500);
  --weburz-yt-radius: 0.75rem;
  --weburz-carousel-caption-align: left;
  --weburz-carousel-caption-gap: 0.5rem;
  --weburz-carousel-caption-title-size: 0.875rem;
  --weburz-carousel-caption-title-weight: 400;
  --weburz-carousel-caption-title-color: var(--color-indigo-500);
  --weburz-carousel-caption-description-size: 0.6875rem;
  --weburz-carousel-caption-description-color: var(--color-maroon-500);
  --weburz-carousel-caption-description-opacity: 0.8;
}

@media (min-width: 48rem) {
  .moments-carousel {
    --weburz-carousel-slide-gap: 1.5rem;
    --weburz-carousel-caption-title-size: 1rem;
  }
}
</style>
