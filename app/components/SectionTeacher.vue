<script setup lang="ts">
// The 60-second intro (a Short on youtube.com/@kabbalah_india). A calm
// portrait still of Shamir stands in until the visitor taps play.
const introVideoId = "Fo70eIc4O6s";
const introTitle = "Shamir Galsurkar — 60-second intro to Kabbalah";
const introPoster = {
  src: "/people/shamir-intro-480.webp",
  srcset:
    "/people/shamir-intro-480.webp 480w, /people/shamir-intro-960.webp 960w",
  sizes:
    "(min-width: 80rem) 32rem, (min-width: 64rem) 30rem, (min-width: 48rem) 17rem, 80vw",
  width: 480,
  height: 573,
  alt: "Shamir Shimshon Galsurkar",
  ratio: "4 / 5",
};

// Shorts from youtube.com/@IndianInIsrael — an Indian student of the academy
// answering the doubts every Indian seeker asks first.
const answers = [
  { id: "feveocY2b4Y", title: "Is Kabbalah a religion? The truth revealed." },
  { id: "PWtJARXnj4c", title: "The biggest myths about Kabbalah." },
  { id: "jW92NKtTgks", title: "A spiritual shift is coming." },
].map((v) => ({
  ...v,
  kind: "shorts" as const,
  thumbnail: lightStill(v.id),
}));
</script>

<template>
  <section id="teachers" class="bg-mist-50 px-5 py-20 md:px-6 md:py-28">
    <div class="mx-auto max-w-[71.875rem]">
      <Eyebrow text="Companions on your journey" class="mb-4" />
      <h2
        class="font-display-en text-indigo-500 max-w-[51.25rem] text-[2rem] leading-[1.15] md:text-[2.625rem]"
      >
        Not a guru. A companion on your journey.
      </h2>
      <p
        class="font-body-en text-ink-500 mt-[1.125rem] max-w-[35rem] text-[1.0625rem] leading-relaxed md:text-lg"
      >
        Someone a few steps ahead, walking the same path.
      </p>

      <!-- One grid: the intro still on the left, the bio and the sceptic
           shorts stacked on the right (beneath both on tablets). -->
      <div
        class="mt-10 grid grid-cols-1 items-start md:mt-12 md:grid-cols-[17rem_minmax(0,1fr)] md:gap-x-8 lg:grid-cols-[30rem_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-12 xl:grid-cols-[32rem_minmax(0,1fr)]"
      >
        <figure
          class="mx-auto mb-8 w-full max-w-[19rem] md:mx-0 md:mb-0 md:max-w-none lg:row-span-2"
        >
          <VideoFacade
            :id="introVideoId"
            :title="introTitle"
            shape="tall"
            :poster="introPoster"
            class="w-full"
          />
          <figcaption class="font-body-en text-ink-400 mt-3 text-sm">
            Watch the 60-second intro
          </figcaption>
        </figure>
        <div>
          <h3 class="font-display-en text-indigo-500 text-[1.625rem]">
            Shamir Shimshon Galsurkar
          </h3>
          <p class="font-body-en text-ink-400 mt-1 mb-[1.125rem] text-sm">
            Your companion · Mumbai
          </p>
          <p class="font-body-en text-ink-500 text-[1.0625rem] leading-[1.7]">
            An engineering consultant with many years of experience in community
            building, education, and personal development. He has been teaching
            and disseminating the wisdom of Kabbalah for many years and serves
            as a coordinator for India, supporting learning, connection, and
            community initiatives.
          </p>
          <p class="font-body-en text-ink-400 mt-3.5 text-sm">
            English · Marathi
          </p>
        </div>
        <div class="mt-10 min-w-0 md:col-span-2 lg:col-span-1 lg:mt-8">
          <h3 class="font-display-en text-indigo-500 mb-4 text-[1.375rem]">
            Skeptical? An Indian in Israel answers.
          </h3>
          <YouTubeCarousel
            class="kai-carousel"
            :videos="answers"
            :options="{ align: 'start' }"
            :slides-per-view="{ base: 1.8, '48rem': 3 }"
            aria-label="Straight answers — an Indian in Israel on Kabbalah"
          />
        </div>
      </div>
    </div>
  </section>
</template>
