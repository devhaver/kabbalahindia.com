<script setup lang="ts">
const introVideo = {
  id: "Fo70eIc4O6s",
  kind: "shorts" as const,
  title: "Kabbalah & Indian Spirituality — are they similar?",
  description: "Short · 60s · EN",
};

const introVideoUrl = `https://www.youtube.com/shorts/${introVideo.id}`;

const introRef = ref<HTMLElement | null>(null);
useStaggerReveal(introRef, { y: 20, stagger: 0.1 });

// Stills from the World Kabbalah Convention 2026 video on @kabbalah_india —
// the bg color stays underneath as the loading backdrop.
const photos = [
  {
    src: "https://i.ytimg.com/vi/oxRbrLUkxNI/hq1.jpg",
    bg: "bg-maroon-500",
    caption: "song at the convention",
  },
  {
    src: "https://i.ytimg.com/vi/oxRbrLUkxNI/hq2.jpg",
    bg: "bg-indigo-500",
    caption: "friends reunited",
  },
  {
    src: "https://i.ytimg.com/vi/oxRbrLUkxNI/hq3.jpg",
    bg: "bg-forest-500",
    caption: "students together",
  },
];
</script>

<template>
  <section class="bg-indigo-500 text-cream-300 relative">
    <ParticleBackdrop
      :config="{
        count: 60,
        color: ['#c89b3c', '#f5ebd7', '#e27a2e'],
        size: { min: 1, max: 2.5 },
        opacity: { min: 0.1, max: 0.4 },
        speed: { min: 0.1, max: 0.4 },
        linked: { distance: 130, color: '#c89b3c', opacity: 0.15 },
      }"
    />
    <div
      class="relative mx-auto flex max-w-6xl flex-col gap-[1.125rem] px-7 py-[1.375rem] md:gap-8 md:px-12 md:py-16 md:grid md:grid-cols-2 md:items-center"
    >
      <div ref="introRef" class="flex flex-col gap-[1.125rem]">
        <Eyebrow text="FINALLY · आख़िरकार" tone="gold" />
        <p
          class="font-display-hi text-gold-500 text-[1.125rem] md:text-[1.5rem]"
        >
          असली कबाला, अब भारत में।
        </p>
        <h1
          class="font-display-en text-cream-300 text-[2.25rem] leading-[1.1] md:text-[3.75rem] md:leading-[1.05]"
        >
          Start your inner journey with the authentic wisdom of Kabbalah.
        </h1>
        <p
          class="font-body-en text-cream-300/80 text-[0.8125rem] md:text-[1rem] max-w-prose"
        >
          Discover a practical path to deeper understanding, meaningful
          connection, and reveal the purpose of your life through the authentic
          wisdom passed down through generations of sages, available for free in
          Hindi and English.
        </p>
        <div
          class="flex flex-col gap-[0.625rem] md:flex-row md:items-center md:gap-5"
        >
          <UButton
            to="#signup"
            size="xl"
            trailing-icon="i-lucide-arrow-right"
            class="text-charcoal-800 font-body-en font-medium"
          >
            Start Free Course
          </UButton>
          <a
            :href="introVideoUrl"
            target="_blank"
            rel="noopener"
            class="font-body-en text-gold-500 inline-flex items-center gap-[0.375rem] text-[0.75rem] font-medium md:text-[0.875rem]"
          >
            Watch a 60-second intro
            <UIcon name="i-lucide-play" class="h-3 w-3" />
          </a>
        </div>
        <div class="flex flex-wrap items-center gap-3 pt-2">
          <AvatarPill />
          <TrustStrip tone="cream-on-dark" />
        </div>
      </div>

      <div class="flex flex-col gap-2 md:gap-3">
        <YouTubeCarousel
          class="hero-video"
          :videos="[introVideo]"
          :show-arrows="false"
          :show-dots="false"
          on-scroll-away="pause"
          aria-label="Watch the 60-second intro"
        />
        <div class="grid grid-cols-3 gap-2 md:gap-3">
          <div
            v-for="p in photos"
            :key="p.caption"
            class="relative flex h-[5.625rem] items-end overflow-hidden rounded-[0.625rem] p-2 md:h-[8.125rem]"
            :class="p.bg"
          >
            <img
              :src="p.src"
              :alt="`${p.caption} — World Kabbalah Convention 2026`"
              loading="lazy"
              class="absolute inset-0 h-full w-full object-cover"
            />
            <span
              aria-hidden="true"
              class="from-charcoal-900/70 absolute inset-0 bg-gradient-to-t to-transparent"
            />
            <span
              class="font-body-en text-cream-300 relative text-[0.5625rem] opacity-90 md:text-[0.625rem]"
            >
              {{ p.caption }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-video {
  --weburz-yt-radius: 0.875rem;
  --weburz-yt-shorts-max-width: 20rem;
  --weburz-carousel-caption-gap: 0.5rem;
  --weburz-carousel-caption-align: center;
  --weburz-carousel-caption-title-size: 1rem;
  --weburz-carousel-caption-title-weight: 400;
  --weburz-carousel-caption-title-color: var(--color-cream-300);
  --weburz-carousel-caption-description-size: 0.6875rem;
  --weburz-carousel-caption-description-color: var(--color-gold-500);
  --weburz-carousel-caption-description-opacity: 0.9;
}

.hero-video :deep(.weburz-caption__title) {
  font-family: var(--font-display-en);
}

@media (min-width: 48rem) {
  .hero-video {
    --weburz-yt-shorts-max-width: 23.75rem;
    --weburz-carousel-caption-title-size: 1.375rem;
  }
}
</style>
