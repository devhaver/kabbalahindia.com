<script setup lang="ts">
import type { ParticleCanvas } from "#components";

// @weburz/particle-canvas doesn't re-export ParticleConfig from its root,
// so derive it from the component's prop until the package exposes it.
type ParticleConfig = InstanceType<typeof ParticleCanvas>["$props"]["config"];

defineProps<{ config?: ParticleConfig }>();

const prefersReducedMotion = usePreferredReducedMotion();
</script>

<template>
  <ClientOnly>
    <ParticleCanvas
      v-if="prefersReducedMotion !== 'reduce'"
      aria-hidden="true"
      class="absolute inset-0"
      :config="config"
    />
  </ClientOnly>
</template>
