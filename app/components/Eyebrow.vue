<script setup lang="ts">
type Tone = "mist" | "hero" | "band";

const props = withDefaults(
  defineProps<{
    text: string;
    tone?: Tone;
  }>(),
  { tone: "mist" },
);

const toneClass: Record<Tone, string> = {
  mist: "text-mist-700",
  hero: "text-mist-800",
  band: "text-mist-400",
};
</script>

<template>
  <p
    class="font-body-en text-[0.8125rem] font-medium uppercase tracking-[0.16em]"
    :class="toneClass[props.tone]"
  >
    {{ props.text }}
  </p>
</template>
