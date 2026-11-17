<script setup lang="ts">
const links = [
  { label: "Course", href: "#program" },
  { label: "Teachers", href: "#teachers" },
  { label: "Watch", href: "#watch" },
  { label: "FAQ", href: "#faq" },
];

// Transparent over the hero sky; a translucent mist bar once the page moves.
const { y } = useWindowScroll();
const scrolled = computed(() => y.value > 8);
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 w-full border-b transition-colors"
    :class="
      scrolled
        ? 'bg-mist-50/85 border-mist-200 backdrop-blur-md'
        : 'border-transparent'
    "
  >
    <div
      class="mx-auto flex h-14 max-w-[71.875rem] items-center justify-between gap-4 px-5 md:px-6"
    >
      <a
        href="#top"
        class="font-display-en text-indigo-500 inline-flex min-h-11 items-center rounded-sm text-[1.1875rem] leading-none whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 md:text-[1.375rem]"
      >
        Kabbalah Academy India
      </a>
      <nav aria-label="Primary" class="flex items-center gap-[1.875rem]">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="font-body-en text-indigo-500 hidden rounded-sm text-[0.9375rem] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 md:inline"
        >
          {{ l.label }}
        </a>
        <a
          href="#signup"
          class="bg-saffron-500 hover:bg-saffron-600 text-charcoal-800 font-body-en inline-flex min-h-11 items-center rounded-full px-[1.125rem] text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Join free
        </a>
      </nav>
    </div>
  </header>
</template>
