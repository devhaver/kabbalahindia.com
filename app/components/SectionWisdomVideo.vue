<script setup lang="ts">
// Shorts from the site's own channel — youtube.com/@kabbalah_india.
const videos = [
  {
    id: "5OIra9AAvds",
    kind: "shorts" as const,
    title: "The only thing we need.",
    description: "Short · EN",
  },
  {
    id: "Y29rbpIb7zE",
    kind: "shorts" as const,
    title: "Why is God not found outside us?",
    description: "Short · EN",
  },
  {
    id: "I-xDnyeK6Sk",
    kind: "shorts" as const,
    title: "When growth gets harder.",
    description: "Short · EN",
  },
  {
    id: "W_0DGVxIVyQ",
    kind: "shorts" as const,
    title: "Why self-centeredness limits us.",
    description: "Short · EN",
  },
  {
    id: "_FRZcn6M0No",
    kind: "shorts" as const,
    title: "The right environment.",
    description: "Short · EN",
  },
  {
    id: "EQV1NQ0zn8Q",
    kind: "shorts" as const,
    title: "Hardships.",
    description: "Short · EN",
  },
];
</script>

<template>
  <section id="wisdom" class="bg-maroon-500 text-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-6 px-8 py-12 md:px-12 md:py-20"
    >
      <div class="flex flex-col gap-3 md:items-center md:text-center">
        <Eyebrow text="WISDOM IN A MINUTE" tone="gold" />
        <h2
          class="font-display-en mt-2 text-[1.625rem] leading-[1.1] md:text-[2.5rem]"
        >
          <span class="md:inline block">One minute.</span>
          <span class="text-gold-500 md:ml-2 md:inline block"
            >Then it stays with you all week.</span
          >
        </h2>
      </div>
      <YouTubeCarousel
        class="kai-carousel wisdom-carousel"
        :videos="videos"
        :options="{ align: 'start' }"
        :slides-per-view="{ base: 1, '48rem': 3 }"
        aria-label="Wisdom in a minute — YouTube Shorts"
      />
      <ExternalLink
        href="https://www.youtube.com/@kabbalah_india"
        class="self-start"
      >
        More on @kabbalah_india
      </ExternalLink>
    </div>
  </section>
</template>

<style scoped>
.wisdom-carousel {
  --weburz-carousel-accent: var(--color-gold-500);
  --weburz-carousel-arrow-color: var(--color-gold-500);
  --weburz-carousel-dot-color: var(--color-gold-500);
  --weburz-yt-radius: 0.875rem;
  --weburz-carousel-media-shadow: 0 0.5rem 1.875rem rgb(0 0 0 / 0.18);
  --weburz-carousel-caption-align: left;
  --weburz-carousel-caption-title-size: 0.9375rem;
  --weburz-carousel-caption-title-weight: 400;
  --weburz-carousel-caption-title-color: var(--color-cream-300);
  --weburz-carousel-caption-description-size: 0.75rem;
  --weburz-carousel-caption-description-opacity: 0.6;
}
</style>
