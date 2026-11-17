<script setup lang="ts">
import type { ParticleCanvas } from "#components";

// @weburz/particle-canvas doesn't re-export ParticleConfig from its root,
// so derive it from the component's prop until the package exposes it.
type ParticleConfig = InstanceType<typeof ParticleCanvas>["$props"]["config"];

// A quiet night sky: a few small, pale, slowly drifting motes in the mist
// tones. No links between them and no reaction to the pointer.
const calmConfig: ParticleConfig = {
  count: 28,
  color: ["#d3dce9", "#c3cfe0", "#b4c4dc"],
  size: { min: 0.6, max: 1.8 },
  opacity: { min: 0.15, max: 0.5 },
  speed: { min: 0.04, max: 0.16 },
  linked: { enable: false },
  interaction: {
    hover: { enable: false },
    click: { enable: false },
  },
};

const props = defineProps<{ config?: ParticleConfig }>();

// The canvas (and its chunk) is only fetched once this block nears the
// viewport, and it is torn down again when it leaves, the tab is hidden, or
// the visitor prefers reduced motion.
const root = useTemplateRef<HTMLElement>("root");
const near = ref(false);
useIntersectionObserver(
  root,
  ([entry]) => {
    near.value = entry?.isIntersecting ?? false;
  },
  { rootMargin: "200px" },
);

const prefersReducedMotion = usePreferredReducedMotion();
const visibility = useDocumentVisibility();

const active = computed(
  () =>
    near.value &&
    visibility.value === "visible" &&
    prefersReducedMotion.value !== "reduce",
);
</script>

<template>
  <div
    ref="root"
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <ClientOnly>
      <LazyParticleCanvas v-if="active" :config="props.config ?? calmConfig" />
    </ClientOnly>
  </div>
</template>
