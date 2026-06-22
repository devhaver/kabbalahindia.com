<script setup lang="ts">
type Card = {
  en: string;
  body: string;
  photo: string;
  img: string;
  imgAlt: string;
  credit?: string;
  href: string;
  linkLabel: string;
};

const cards: Card[] = [
  {
    en: "Ongoing live lessons",
    body: "Continue with companions and peers, weekly, in English — and the Rav's daily lesson is archived every morning, with subtitles.",
    photo: "bg-maroon-500",
    img: "https://i.ytimg.com/vi/HEeb2Bm8NGo/hq2.jpg",
    imgAlt: "Shamir teaching a live lesson, with subtitles",
    href: "https://kabbalahmedia.info/en/lessons/daily",
    linkLabel: "Daily lesson archive",
  },
  {
    en: "Volunteer and deepen",
    body: `Translate, organize, mentor newer students. Service deepens what you've learned — the whole source library is open.`,
    photo: "bg-gold-500",
    img: "/people/baal-hasulam-writing.jpg",
    imgAlt: "Baal HaSulam writing — the pages students now translate",
    credit: "Photo: Wikimedia Commons · CC BY-SA 4.0",
    href: "https://www.kabbalah.info/en/library/",
    linkLabel: "Kabbalah Library",
  },
  {
    en: "Local + global Congresses",
    body: "Multi-day gatherings. Study, music, shared meals. India, Israel, and beyond — or join the World Kabbalah Convention virtually.",
    photo: "bg-indigo-500",
    img: "https://i.ytimg.com/vi/oxRbrLUkxNI/hqdefault.jpg",
    imgAlt: "World Kabbalah Convention — thousands together",
    href: "https://convention.kli.one/",
    linkLabel: "World Kabbalah Convention",
  },
];

const cardsRef = ref<HTMLElement | null>(null);
useStaggerReveal(cardsRef);
</script>

<template>
  <section class="bg-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-[1.375rem] px-8 py-[1.25rem] md:px-12 md:py-20"
    >
      <Eyebrow text="AFTER THE COURSE" tone="maroon" />
      <BilingualHeading
        :en-lines="[`The journey doesn't end.`, `It begins.`]"
        :accent-index="1"
        size="md"
      />
      <div
        ref="cardsRef"
        class="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6"
      >
        <article
          v-for="c in cards"
          :key="c.en"
          class="ring-border-maroon flex flex-col gap-[0.625rem] rounded-[0.75rem] bg-white p-[0.875rem] ring-1 md:p-5"
        >
          <div
            class="relative flex h-[8.75rem] items-end overflow-hidden rounded-[0.5rem] p-3 md:h-[11.25rem]"
            :class="c.photo"
          >
            <img
              :src="c.img"
              :alt="c.imgAlt"
              loading="lazy"
              class="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <h3 class="font-display-en text-indigo-500 text-lg md:text-xl">
            {{ c.en }}
          </h3>
          <p class="font-body-en text-charcoal-700 text-[1.0625rem] md:text-sm">
            {{ c.body }}
          </p>
          <ExternalLink :href="c.href" tone="maroon" class="self-start">
            {{ c.linkLabel }}
          </ExternalLink>
          <span
            v-if="c.credit"
            class="font-body-en text-charcoal-500/60 text-[0.8125rem]"
          >
            {{ c.credit }}
          </span>
        </article>
      </div>
    </div>
  </section>
</template>
