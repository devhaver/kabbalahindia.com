<script setup lang="ts">
withDefaults(
  defineProps<{
    items?: { text: string; lang?: "en" | "hi" }[];
    tone?: "cream-on-dark" | "charcoal-on-light";
  }>(),
  {
    items: () => [
      { text: "Free forever" },
      { text: "No login" },
    ],
    tone: "charcoal-on-light",
  },
);
</script>

<template>
  <div class="flex flex-wrap items-center gap-x-[0.875rem] gap-y-2">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="flex items-center gap-[0.3125rem]"
    >
      <UIcon
        name="i-lucide-check"
        class="text-gold-500 h-[0.6875rem] w-[0.6875rem]"
      />
      <span
        class="text-[0.9375rem]"
        :class="[
          tone === 'cream-on-dark' ? 'text-cream-300/70' : 'text-charcoal-500',
          item.lang === 'hi' ? 'font-body-hi' : 'font-body-en',
        ]"
      >
        {{ item.text }}
      </span>
    </div>
  </div>
</template>
