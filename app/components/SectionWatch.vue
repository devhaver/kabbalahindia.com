<script setup lang="ts">
// Videos from youtube.com/@kabbalah_india. "Does nature sing?" is shown in
// SectionSource, so it is left out of the moments here.
const moments = [
  { id: "oxRbrLUkxNI", title: "World Kabbalah Convention 2026" },
  { id: "RAhpT2wJrWU", title: "Why am I here?" },
  { id: "HEeb2Bm8NGo", title: "Purpose of Life" },
  { id: "pzcMQF1xAqQ", title: "The Secret to Real Freedom" },
  { id: "LG164amKS0E", title: "Why do relationships feel so hard?" },
  { id: "hpyVS8I935k", title: "What's the point in the heart?" },
  { id: "rE8ourMDVdY", title: "Why are there still wars?" },
];

const wisdom = [
  { id: "5OIra9AAvds", title: "The only thing we need." },
  { id: "Y29rbpIb7zE", title: "Why is God not found outside us?" },
  { id: "I-xDnyeK6Sk", title: "When growth gets harder." },
  { id: "W_0DGVxIVyQ", title: "Why self-centeredness limits us." },
  { id: "_FRZcn6M0No", title: "The right environment." },
  { id: "EQV1NQ0zn8Q", title: "Hardships." },
];
</script>

<template>
  <section id="watch" class="bg-mist-100 px-5 py-20 md:px-6 md:py-28">
    <div class="mx-auto max-w-[71.875rem]">
      <Eyebrow text="Watch" class="mb-4" />
      <h2
        class="font-display-en text-indigo-500 max-w-[51.25rem] text-[2rem] leading-[1.15] md:text-[2.625rem]"
      >
        Watch, at your own pace.
      </h2>

      <h3
        class="font-display-en text-indigo-500 mt-10 mb-5 text-[1.375rem] md:mt-14"
      >
        Real life inside the community
      </h3>
      <VideoRail :videos="moments" label="Moments from the community" />

      <h3
        class="font-display-en text-indigo-500 mt-12 mb-5 text-[1.375rem] md:mt-16"
      >
        One minute. Then it stays with you all week.
      </h3>
      <VideoRail :videos="wisdom" shape="square" label="Wisdom in a minute" />

      <a
        href="https://www.youtube.com/@kabbalah_india"
        target="_blank"
        rel="noopener"
        class="font-body-en text-indigo-500 mt-8 inline-block rounded-sm py-2.5 text-[0.9375rem] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        More on @kabbalah_india
      </a>
    </div>
  </section>
</template>
