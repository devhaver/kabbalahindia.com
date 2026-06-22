<script setup lang="ts">
withDefaults(
  defineProps<{
    href: string;
    tone?: "gold" | "maroon";
  }>(),
  { tone: "gold" },
);

const toneClass = {
  gold: "text-gold-500 hover:text-cream-300",
  maroon: "text-maroon-500 hover:text-indigo-500",
};
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener"
    class="font-body-en inline-flex items-center gap-[0.375rem] text-[1rem] font-medium transition-colors md:text-sm"
    :class="toneClass[tone]"
  >
    <slot />
    <UIcon name="i-lucide-arrow-up-right" class="h-3 w-3" />
  </a>
</template>
