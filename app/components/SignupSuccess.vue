<script setup lang="ts">
defineProps<{
  whatsappUrl: string;
}>();
</script>

<template>
  <div
    class="bg-cream-300 text-charcoal-800 flex flex-col items-start gap-3 rounded-[0.875rem] p-[1.125rem] md:p-8"
  >
    <div
      class="bg-forest-500 flex h-12 w-12 items-center justify-center rounded-full"
    >
      <UIcon name="i-lucide-check" class="text-cream-300 h-6 w-6" />
    </div>
    <h3 class="font-display-en text-indigo-500 text-2xl md:text-3xl">
      Welcome, friend.
    </h3>
    <p class="font-body-en text-charcoal-700 text-base md:text-base">
      Your details are saved. Join the group now to receive course updates.
    </p>
    <a
      :href="whatsappUrl"
      target="_blank"
      rel="noopener"
      class="bg-saffron-500 hover:bg-saffron-600 text-charcoal-800 font-body-en mt-2 inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium transition-colors"
    >
      Join the WhatsApp community
      <UIcon name="i-lucide-arrow-up-right" class="h-4 w-4" />
    </a>
  </div>
</template>
