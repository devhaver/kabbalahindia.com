<script setup lang="ts">
withDefaults(
  defineProps<{
    avatars?: { initials: string; bg: string; fg: string }[];
    count?: string;
  }>(),
  {
    avatars: () => [
      { initials: "RP", bg: "bg-gold-500", fg: "text-charcoal-800" },
      { initials: "AS", bg: "bg-saffron-500", fg: "text-charcoal-800" },
      { initials: "NK", bg: "bg-forest-500", fg: "text-cream-300" },
    ],
    count: "12,400+ students learning",
  },
);
</script>

<template>
  <div
    class="inline-flex items-center gap-2 rounded-full bg-white/95 px-[0.875rem] py-[0.375rem]"
  >
    <div class="flex h-[1.375rem] items-center">
      <span
        v-for="(a, i) in avatars"
        :key="i"
        class="-mr-[0.375rem] flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-full text-[0.5625rem] font-medium last:mr-0"
        :class="[a.bg, a.fg]"
      >
        {{ a.initials }}
      </span>
    </div>
    <span class="font-body-en text-charcoal-800 text-[0.75rem] font-medium">
      {{ count }}
    </span>
  </div>
</template>
