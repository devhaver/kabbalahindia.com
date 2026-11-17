<script setup lang="ts">
// Shorts from youtube.com/@IndianInIsrael — an Indian student of the academy
// answering the doubts every Indian seeker asks first.
const videos = [
  { id: "feveocY2b4Y", title: "Is Kabbalah a religion? The truth revealed." },
  { id: "PWtJARXnj4c", title: "The biggest myths about Kabbalah." },
  { id: "jW92NKtTgks", title: "A spiritual shift is coming." },
];
</script>

<template>
  <section class="bg-mist-50 px-5 pb-20 md:px-6 md:pb-28">
    <div class="border-mist-200 mx-auto max-w-[71.875rem] border-t pt-14">
      <Eyebrow text="Straight answers" class="mb-4" />
      <h2
        class="font-display-en text-indigo-500 max-w-[51.25rem] text-[1.75rem] leading-[1.15] md:text-[2.25rem]"
      >
        Skeptical? An Indian in Israel answers.
      </h2>
      <div class="mt-8 md:mt-10">
        <VideoRail
          :videos="videos"
          shape="tall"
          label="Straight answers — an Indian in Israel on Kabbalah"
        />
      </div>
    </div>
  </section>
</template>
