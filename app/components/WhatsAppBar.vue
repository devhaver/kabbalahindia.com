<script setup lang="ts">
const waUrl = useWhatsApp();
</script>

<template>
  <a
    :href="waUrl"
    target="_blank"
    rel="noopener"
    class="bg-mist-50/95 border-mist-200 text-indigo-500 font-body-en fixed inset-x-0 bottom-0 z-30 flex items-center justify-center border-t px-4 py-3 text-[0.9375rem] font-medium md:hidden"
  >
    <span
      class="inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-indigo-500 px-5 py-[0.5625rem]"
    >
      <svg
        class="size-5 flex-none"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5z"
        />
      </svg>
      Join the WhatsApp community
    </span>
  </a>
</template>
