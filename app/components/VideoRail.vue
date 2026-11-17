<script setup lang="ts">
type RailVideo = { id: string; title: string };

const props = defineProps<{
  videos: RailVideo[];
  label: string;
  // The videos' shape: wide 16:9 (default), tall 9:16 (Shorts) or square.
  shape?: "wide" | "tall" | "square";
}>();

const cardWidth = {
  wide: "w-[16.5rem]",
  tall: "w-[9.5rem]",
  square: "w-[10.5rem]",
};
</script>

<template>
  <!-- Phones: a native scroll-snap rail that bleeds to the screen edge.
       Desktop: a tidy grid. -->
  <ul
    :aria-label="props.label"
    class="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:gap-5 md:overflow-visible md:px-0 md:pb-0"
    :class="
      props.shape === 'wide' || !props.shape
        ? 'md:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))]'
        : 'md:grid-cols-[repeat(auto-fill,minmax(10.5rem,1fr))]'
    "
  >
    <li
      v-for="v in props.videos"
      :key="v.id"
      class="flex-none snap-start md:w-auto"
      :class="cardWidth[props.shape ?? 'wide']"
    >
      <VideoFacade :id="v.id" :title="v.title" :shape="props.shape" />
      <p class="font-body-en text-ink-500 mt-2.5 text-sm leading-snug">
        {{ v.title }}
      </p>
    </li>
  </ul>
</template>
