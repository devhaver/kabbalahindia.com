<script setup lang="ts">
defineProps<{
  /** The lessons site, offered as a place to read in the meantime. */
  sourceUrl: string;
}>();
</script>

<template>
  <div class="border-mist-200 border-t pt-8">
    <h2 class="font-display-en text-indigo-500 text-[1.5rem] md:text-[1.75rem]">
      Lessons are unavailable right now
    </h2>
    <p
      class="font-body-en text-ink-500 mt-3 text-[1.0625rem] leading-relaxed text-pretty"
    >
      We couldn't load the lessons just now. Please try again in a few minutes,
      or read them directly on the lessons site.
    </p>
    <a
      :href="sourceUrl"
      target="_blank"
      rel="noopener"
      class="font-body-en text-indigo-500 mt-4 inline-flex min-h-11 items-center rounded-sm text-[0.9375rem] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    >
      Open the lessons site
    </a>
  </div>
</template>
