<script setup lang="ts">
// Imagery: real frames from youtube.com/@kabbalah_india videos — the
// gradient stays underneath as the loading backdrop.
const moments = [
  {
    time: "4:30 AM",
    title: "Morning lesson",
    body: "Live with the Rav's lesson from Israel — India joins before sunrise.",
    img: "https://i.ytimg.com/vi/wC3QgL8oJQA/maxres2.jpg",
    alt: "Rav Laitman teaching the morning lesson",
    bg: "from-charcoal-900 via-charcoal-800 to-indigo-700",
    glow: "bg-[radial-gradient(circle_at_30%_30%,rgba(226,122,46,0.25),transparent_55%)]",
  },
  {
    time: "6:00 AM",
    title: "Books on the table",
    body: "A page of Baal HaSulam, read slowly. The day starts with the source.",
    img: "https://i.ytimg.com/vi/RAhpT2wJrWU/maxres2.jpg",
    alt: "Students studying at a table beside the bookshelves",
    bg: "from-maroon-600 via-maroon-500 to-maroon-700",
    glow: "bg-[radial-gradient(circle_at_70%_30%,rgba(200,155,60,0.30),transparent_55%)]",
  },
  {
    time: "10:00 AM",
    title: "A companion answers",
    body: "Last night's doubt, cleared in the group before lunch.",
    img: "https://i.ytimg.com/vi/HEeb2Bm8NGo/maxres1.jpg",
    alt: "Shamir answering a question mid-lesson",
    bg: "from-gold-300 via-gold-400 to-gold-600",
    glow: "bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.30),transparent_55%)]",
  },
  {
    time: "1:00 PM",
    title: "Shared meal",
    body: "Same-city students eat together when they can. Connection is the method.",
    img: "https://i.ytimg.com/vi/oxRbrLUkxNI/sd2.jpg",
    alt: "Friends embracing at a gathering",
    bg: "from-forest-500 via-forest-600 to-forest-700",
    glow: "bg-[radial-gradient(circle_at_60%_30%,rgba(200,155,60,0.25),transparent_55%)]",
  },
  {
    time: "5:30 PM",
    title: "WhatsApp circle",
    body: "One thought from the morning lesson makes its rounds.",
    img: "https://i.ytimg.com/vi/oxRbrLUkxNI/sd3.jpg",
    alt: "Two students sharing a smiling selfie",
    bg: "from-indigo-500 via-indigo-600 to-indigo-800",
    glow: "bg-[radial-gradient(circle_at_40%_40%,rgba(245,235,215,0.18),transparent_55%)]",
  },
  {
    time: "8:00 PM",
    title: "Evening chai",
    body: "The day closes the way it opened — together.",
    img: "https://i.ytimg.com/vi/rE8ourMDVdY/maxres3.jpg",
    alt: "A warm evening reunion between friends",
    bg: "from-vermillion-400 via-vermillion-500 to-maroon-600",
    glow: "bg-[radial-gradient(circle_at_70%_20%,rgba(255,228,200,0.25),transparent_55%)]",
  },
];
</script>

<template>
  <section class="bg-indigo-500 text-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-6 px-8 py-12 md:px-12 md:py-20"
    >
      <div class="flex flex-col gap-3 md:items-center md:text-center">
        <Eyebrow text="A DAY INSIDE · अकादमी का एक दिन" tone="gold" />
        <h2
          class="font-display-en mt-2 text-[1.75rem] leading-[1.05] md:text-[2.75rem]"
        >
          <span class="text-cream-300 md:inline block"
            >From the morning lesson</span
          >
          <span class="text-gold-500 md:ml-2 md:inline block"
            >to the evening chai.</span
          >
        </h2>
        <p
          class="font-display-hi text-cream-300/75 text-[1.25rem] md:text-[1.75rem]"
        >
          सुबह की क्लास से शाम की चाय तक।
        </p>
        <DualClock class="mt-2" />
      </div>
      <BaseCarousel
        class="kai-carousel day-carousel"
        :options="{ align: 'start' }"
        :slides-per-view="{ base: 1, '48rem': 3 }"
        aria-label="A day inside the academy"
      >
        <BaseSlide v-for="item in moments" :key="item.time">
          <figure
            class="relative flex h-[21.25rem] flex-col justify-end overflow-hidden rounded-[0.875rem] bg-gradient-to-br md:h-[26.25rem]"
            :class="item.bg"
          >
            <img
              :src="item.img"
              :alt="item.alt"
              loading="lazy"
              class="absolute inset-0 h-full w-full object-cover"
            />
            <span
              aria-hidden="true"
              class="absolute inset-0"
              :class="item.glow"
            />
            <figcaption
              class="bg-cream-300/95 text-charcoal-800 relative flex flex-col gap-1 p-[0.875rem] backdrop-blur"
            >
              <span
                class="bg-maroon-500/10 text-maroon-500 font-body-en self-start rounded-full px-2 py-[0.1875rem] text-[0.625rem] font-medium tracking-[0.14em]"
              >
                {{ item.time }}
              </span>
              <span
                class="font-display-en text-indigo-500 text-[1rem] md:text-lg"
              >
                {{ item.title }}
              </span>
              <span
                class="font-body-en text-charcoal-700 text-[0.6875rem] leading-snug md:text-[0.75rem]"
              >
                {{ item.body }}
              </span>
            </figcaption>
          </figure>
        </BaseSlide>
      </BaseCarousel>
      <ExternalLink
        href="https://kabbalahmedia.info/en/lessons/daily"
        class="self-start"
      >
        The 4:30 lesson is real — watch today's in the archive
      </ExternalLink>
    </div>
  </section>
</template>

<style scoped>
.day-carousel {
  --weburz-carousel-accent: var(--color-gold-500);
  --weburz-carousel-slide-gap: 0.75rem;
  --weburz-carousel-arrow-color: var(--color-gold-500);
  --weburz-carousel-dot-color: var(--color-gold-500);
}

@media (min-width: 48rem) {
  .day-carousel {
    --weburz-carousel-slide-gap: 1.5rem;
  }
}
</style>
