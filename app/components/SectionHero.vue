<script setup lang="ts">
const introVideo = {
  id: "Fo70eIc4O6s",
  kind: "shorts" as const,
  title: "Kabbalah & Indian Spirituality — are they similar?",
  description: "Short · 60s · EN",
};

const introRef = ref<HTMLElement | null>(null);
useStaggerReveal(introRef, { y: 20, stagger: 0.1 });
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
        <Eyebrow text="FINALLY" tone="gold" />
        <h1
          class="font-display-en text-cream-300 text-[2.25rem] leading-[1.1] md:text-[3.75rem] md:leading-[1.05]"
        >
          Start your inner journey with the authentic wisdom of Kabbalah — now
          in India.
        </h1>
        <p
          class="font-body-en text-cream-300/80 text-[1.0625rem] md:text-[1rem] max-w-prose"
        >
          Discover a practical path to deeper understanding, meaningful
          connection, and reveal the purpose of your life through the authentic
          wisdom passed down through generations of sages — free, online, in
          English.
        </p>
        <div>
          <UButton
            to="#signup"
            size="xl"
            trailing-icon="i-lucide-arrow-right"
            class="text-charcoal-800 font-body-en font-medium"
          >
            Start Free Course
          </UButton>
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
