<script setup lang="ts">
const lang = useState<"en" | "hi">("lang", () => "en");
const toggleLang = () => {
  lang.value = lang.value === "en" ? "hi" : "en";
};
</script>

<template>
  <header class="bg-indigo-500 fixed inset-x-0 top-0 z-40 w-full">
    <div
      class="mx-auto flex h-[3.25rem] max-w-6xl items-center justify-between px-5 md:px-12"
    >
      <a href="#top" class="flex items-baseline gap-2 leading-tight">
        <span
          class="font-display-en text-cream-300 text-[0.9375rem] md:text-base"
        >
          Kabbalah Academy
        </span>
        <span class="font-display-hi text-gold-500 text-[0.75rem] md:text-sm">
          कबाला अकादमी
        </span>
      </a>
      <div class="flex items-center gap-5">
        <button
          type="button"
          class="flex items-center gap-[0.375rem] text-[0.6875rem] font-medium"
          :aria-label="lang === 'en' ? 'Switch to Hindi' : 'Switch to English'"
          @click="toggleLang"
        >
          <span :class="lang === 'en' ? 'text-gold-500' : 'text-cream-300/50'">
            EN
          </span>
          <span class="text-cream-300/50">·</span>
          <span
            class="font-body-hi"
            :class="lang === 'hi' ? 'text-gold-500' : 'text-cream-300/50'"
          >
            हिं
          </span>
        </button>
        <a
          href="#signup"
          class="bg-saffron-500 hover:bg-saffron-600 text-charcoal-800 font-body-en hidden rounded-full px-4 py-[0.4375rem] text-[0.75rem] font-medium transition-colors md:inline-flex md:items-center md:gap-1.5"
        >
          Join free
          <UIcon name="i-lucide-arrow-right" class="h-3 w-3" />
        </a>
      </div>
    </div>
  </header>
</template>
