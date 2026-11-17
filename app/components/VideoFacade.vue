<script setup lang="ts">
// A YouTube video behind a tap: a still and a play button stand in, so nothing
// from YouTube's player loads until the visitor asks for it. The privacy-
// enhanced embed then replaces the still. The still defaults to YouTube's own
// thumbnail; a custom `poster` can stand in (e.g. a portrait photo for a Short).
type Poster = {
  src: string;
  srcset?: string;
  sizes?: string;
  width: number;
  height: number;
  alt: string;
  // CSS aspect-ratio of the still slot, when it differs from the player's.
  ratio: string;
};

type Shape = "wide" | "tall" | "square";

const shapeRatio: Record<Shape, string> = {
  wide: "16 / 9",
  tall: "9 / 16",
  square: "1 / 1",
};

const props = defineProps<{
  id: string;
  title: string;
  // The picture's shape: wide 16:9 (default), tall 9:16 (Shorts) or square.
  shape?: Shape;
  poster?: Poster;
}>();

const playing = ref(false);

const src = computed(
  () =>
    `https://www.youtube-nocookie.com/embed/${props.id}?autoplay=1&playsinline=1&rel=0`,
);

// hqdefault exists for every video and is a 4:3 frame with the real picture
// centred between black bars; object-cover in a 16:9, 9:16 or square box
// crops exactly to the picture.
const thumbnail = computed(
  () => `https://i.ytimg.com/vi/${props.id}/hqdefault.jpg`,
);

const playerRatio = computed(() => shapeRatio[props.shape ?? "wide"]);
const ratio = computed(() =>
  playing.value || !props.poster ? playerRatio.value : props.poster.ratio,
);
</script>

<template>
  <div
    class="bg-mist-200 relative overflow-hidden rounded-[1.125rem]"
    :style="{ aspectRatio: ratio }"
  >
    <iframe
      v-if="playing"
      :src="src"
      :title="props.title"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen
      class="absolute inset-0 size-full border-0"
    />
    <button
      v-else
      type="button"
      :aria-label="`Play: ${props.title}`"
      class="group absolute inset-0 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-indigo-500"
      @click="playing = true"
    >
      <img
        v-if="props.poster"
        :src="props.poster.src"
        :srcset="props.poster.srcset"
        :sizes="props.poster.sizes"
        :alt="props.poster.alt"
        :width="props.poster.width"
        :height="props.poster.height"
        loading="lazy"
        decoding="async"
        class="size-full object-cover"
      />
      <img
        v-else
        :src="thumbnail"
        alt=""
        width="480"
        height="360"
        loading="lazy"
        decoding="async"
        class="size-full object-cover"
      />
      <span
        aria-hidden="true"
        class="text-indigo-500 absolute bottom-3 left-3 flex size-11 items-center justify-center rounded-full bg-white/90 pl-0.5 transition-colors group-hover:bg-white"
      >
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
        </svg>
      </span>
    </button>
  </div>
</template>
