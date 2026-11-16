<script setup lang="ts">
// From youtube.com/@kabbalah_india, shown as a facade: the iframe only loads
// once the visitor taps play.
const natureVideo = {
  id: "wC3QgL8oJQA",
  title: "Does nature sing?",
  description: "Rav Laitman · Kabbalah TV",
};

const lineage = [
  {
    name: "Baal HaSulam",
    role: "Author of the Sulam",
    photo: "/people/baal-hasulam-160.webp",
  },
  {
    name: "Rabash",
    role: "His son, Rav Baruch Ashlag",
    photo: "/people/rabash-160.webp",
  },
  {
    name: "Rav Laitman",
    role: "First student of Rabash",
    photo: "/people/michael-laitman-portrait-160.webp",
  },
];
</script>

<template>
  <section
    id="source"
    class="bg-indigo-500 text-mist-100 px-5 py-20 md:px-6 md:py-28"
  >
    <div
      class="mx-auto grid max-w-[71.875rem] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20"
    >
      <div>
        <Eyebrow
          text="The teacher of our generation"
          tone="band"
          class="mb-4"
        />
        <h2
          class="font-display-en max-w-[51.25rem] text-[2rem] leading-[1.15] text-white md:text-[2.625rem]"
        >
          Rav Dr. Michael Laitman. The living link in the chain.
        </h2>
        <ol class="mt-10 mb-8 flex items-start gap-1 md:gap-3.5">
          <template v-for="(p, i) in lineage" :key="p.name">
            <li
              v-if="i > 0"
              aria-hidden="true"
              class="text-mist-300 mt-6 flex-none text-lg"
            >
              →
            </li>
            <li class="min-w-0 flex-1 text-center md:w-[7.5rem] md:flex-none">
              <img
                :src="p.photo"
                :alt="`Portrait of ${p.name}`"
                width="76"
                height="76"
                loading="lazy"
                decoding="async"
                class="mx-auto mb-2.5 size-[4.75rem] rounded-full bg-white object-cover object-[50%_30%] grayscale"
              />
              <span
                class="font-body-en block text-[0.8125rem] font-semibold whitespace-nowrap text-white md:text-sm"
              >
                {{ p.name }}
              </span>
              <span
                class="font-body-en text-mist-300 mt-0.5 block text-[0.78125rem] leading-snug"
              >
                {{ p.role }}
              </span>
            </li>
          </template>
        </ol>
        <p
          class="font-body-en text-mist-200 max-w-[32.5rem] text-[1.0625rem] leading-[1.7]"
        >
          Rav Dr. Michael Laitman is an eminent scholar of Kabbalah, born in
          Belarus in 1946 and now living in Israel. His daily lesson is studied
          live across the world — and your Indian teachers are his direct
          students.
        </p>
        <p
          class="font-body-en text-mist-300 mt-5 max-w-[32.5rem] text-sm leading-relaxed"
        >
          PhD in Philosophy and Kabbalah · 40+ books on Kabbalah · Studied 12
          years with RABASH
        </p>
      </div>
      <YouTubeCarousel
        class="source-video w-full"
        :videos="[natureVideo]"
        :show-arrows="false"
        :show-dots="false"
        on-scroll-away="pause"
        aria-label="Watch: Does nature sing?"
      />
    </div>
  </section>
</template>

<style scoped>
.source-video {
  --weburz-yt-radius: 1.125rem;
  --weburz-carousel-caption-gap: 0.75rem;
  --weburz-carousel-caption-align: left;
  --weburz-carousel-caption-title-size: 0.875rem;
  --weburz-carousel-caption-title-weight: 500;
  --weburz-carousel-caption-title-color: #fff;
  --weburz-carousel-caption-description-size: 0.875rem;
  --weburz-carousel-caption-description-color: var(--color-mist-300);
  --weburz-carousel-caption-description-opacity: 1;
}

.source-video :deep(.weburz-caption__title a) {
  display: inline-block;
  padding-block: 0.75rem;
}
</style>
