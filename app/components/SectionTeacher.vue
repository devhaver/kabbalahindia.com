<script setup lang="ts">
// The 60-second intro (a Short on youtube.com/@kabbalah_india). A calm
// portrait still of Shamir stands in until the visitor taps play.
const introVideoId = "Fo70eIc4O6s";
const introTitle = "Shamir Galsurkar — 60-second intro to Kabbalah";
const introPoster = {
  src: "/people/shamir-intro-480.webp",
  srcset:
    "/people/shamir-intro-480.webp 480w, /people/shamir-intro-960.webp 960w",
  sizes: "(min-width: 48rem) 19rem, 80vw",
  width: 480,
  height: 573,
  alt: "Shamir Shimshon Galsurkar",
  ratio: "4 / 5",
};
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

      <div
        class="mt-10 grid grid-cols-1 items-center gap-10 md:mt-14 md:grid-cols-2 md:gap-[4.5rem]"
      >
        <figure class="mx-auto w-full">
          <VideoFacade
            :id="introVideoId"
            :title="introTitle"
            shape="tall"
            :poster="introPoster"
            class="mx-auto max-w-[19rem]"
          />
          <figcaption
            class="font-body-en text-ink-400 mx-auto mt-3 max-w-[19rem] text-sm"
          >
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
      </div>
    </div>
  </section>
</template>
