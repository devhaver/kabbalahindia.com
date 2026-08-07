<script setup lang="ts">
const waUrl = useWhatsApp();

const { y } = useWindowScroll();
const showDesktopCta = computed(() => y.value > 400);
</script>

<template>
  <a
    :href="waUrl"
    target="_blank"
    rel="noopener"
    class="bg-saffron-500 hover:bg-saffron-600 fixed inset-x-0 bottom-0 z-30 flex h-14 items-center justify-center gap-[0.625rem] text-white shadow-lg transition-colors md:hidden"
  >
    <UIcon name="i-lucide-message-circle" class="h-[1.375rem] w-[1.375rem]" />
    <span class="font-body-en text-[1.0625rem] font-medium">
      Join the WhatsApp community
    </span>
  </a>

  <Transition name="float">
    <a
      v-show="showDesktopCta"
      href="#signup"
      class="bg-saffron-500 hover:bg-saffron-600 text-charcoal-800 fixed bottom-8 right-8 z-30 hidden items-center gap-2 rounded-full px-5 py-3 shadow-2xl ring-1 ring-black/5 transition-colors md:inline-flex"
    >
      <span class="font-body-en text-[1.0625rem] font-medium"> Join free </span>
      <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
    </a>
  </Transition>
</template>

<style scoped>
.float-enter-active,
.float-leave-active {
  transition:
    opacity 200ms ease,
    transform 200ms ease;
}
.float-enter-from,
.float-leave-to {
  opacity: 0;
  transform: translateY(0.75rem);
}
</style>
