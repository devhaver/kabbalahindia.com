<script setup lang="ts">
const values = [
  {
    icon: "i-lucide-book-open",
    en: "Free e-books",
    body: "Baal HaSulam, Rav, the foundational texts.",
  },
  {
    icon: "i-lucide-graduation-cap",
    en: "Intro course",
    body: "Self-paced. Begin in week one.",
  },
  {
    icon: "i-lucide-message-circle",
    en: "24/7 instructors",
    body: "Real people. Real answers. Anytime.",
  },
  {
    icon: "i-lucide-library",
    en: "Largest library",
    body: "Thousands of lessons, translations.",
  },
  {
    icon: "i-lucide-users",
    en: "Congresses",
    body: "India, Israel, US, Japan and beyond.",
  },
  {
    icon: "i-lucide-globe",
    en: "100+ country community",
    body: "One study, one path, worldwide.",
  },
  {
    icon: "i-lucide-sun",
    en: "Daily live class",
    body: "Live every morning, 6:30 AM IST.",
  },
  {
    icon: "i-lucide-calendar",
    en: "Weekly meetups",
    body: "Online plus in-person across India.",
  },
];

const expanded = ref(false);
const visible = computed(() => (expanded.value ? values : values.slice(0, 6)));
const hiddenCount = computed(() => values.length - 6);
</script>

<template>
  <section class="bg-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-5 px-8 py-[1.25rem] md:px-12 md:py-20"
    >
      <UBadge
        label="EVERYTHING FREE"
        size="md"
        class="bg-forest-500 text-cream-300 self-start tracking-[0.18em]"
      />
      <BilingualHeading
        :en-lines="['Everything you need', 'to begin.']"
        :accent-index="1"
        size="md"
      />
      <p class="font-body-en text-charcoal-500 text-[1rem] md:text-base">
        Eight things, all free, the moment you join.
      </p>
      <div class="grid grid-cols-2 gap-[0.625rem] md:grid-cols-3 md:gap-4">
        <div
          v-for="(v, i) in visible"
          :key="i"
          class="ring-border-maroon flex flex-col gap-2 rounded-[0.75rem] bg-white p-[0.875rem] ring-1 md:p-5"
        >
          <UIcon
            :name="v.icon"
            class="text-saffron-500 h-[1.375rem] w-[1.375rem]"
          />
          <h3
            class="font-body-en text-indigo-500 text-[1.0625rem] font-medium md:text-base"
          >
            {{ v.en }}
          </h3>
          <p
            class="font-body-en text-charcoal-500 text-[0.9375rem] leading-snug md:text-sm"
          >
            {{ v.body }}
          </p>
        </div>
      </div>
      <UButton
        v-if="hiddenCount > 0"
        :label="expanded ? 'Show less' : `+ ${hiddenCount} more`"
        :trailing-icon="
          expanded ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'
        "
        color="neutral"
        variant="link"
        size="sm"
        class="text-maroon-500 hover:text-maroon-600 self-start !px-0"
        @click="expanded = !expanded"
      />
    </div>
  </section>
</template>
