<script setup lang="ts">
// Shorts from youtube.com/@IndianInIsrael — an Indian student of the academy
// answering the doubts every Indian seeker asks first.
const videos = [
  {
    id: "feveocY2b4Y",
    kind: "shorts" as const,
    title: "Is Kabbalah a religion? The truth revealed.",
    description: "Short · EN",
  },
  {
    id: "PWtJARXnj4c",
    kind: "shorts" as const,
    title: "The biggest myths about Kabbalah.",
    description: "Short · EN",
  },
  {
    id: "jW92NKtTgks",
    kind: "shorts" as const,
    title: "A spiritual shift is coming.",
    description: "Short · EN",
  },
];
</script>

<template>
  <section class="bg-forest-600 text-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-6 px-8 py-12 md:px-12 md:py-20"
    >
      <div class="flex flex-col gap-3 md:items-center md:text-center">
        <Eyebrow text="STRAIGHT ANSWERS" tone="gold" />
        <h2
          class="font-display-en mt-2 text-[1.625rem] leading-[1.1] md:text-[2.5rem]"
        >
          <span class="md:inline block">Skeptical?</span>
          <span class="text-gold-500 md:ml-2 md:inline block"
            >An Indian in Israel answers.</span
          >
        </h2>
      </div>
      <YouTubeCarousel
        class="kai-carousel voice-carousel"
        :videos="videos"
        :options="{ align: 'start' }"
        :slides-per-view="{ base: 1, '48rem': 3 }"
        on-scroll-away="pause"
        aria-label="Straight answers — an Indian in Israel on Kabbalah"
      />
    </div>
  </section>
</template>

<style scoped>
.voice-carousel {
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
