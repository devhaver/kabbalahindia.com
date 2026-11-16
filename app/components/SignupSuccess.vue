<script setup lang="ts">
defineProps<{
  whatsappUrl: string;
}>();

defineEmits<{
  "book-download": [];
}>();

const book = useFreeBook();
</script>

<template>
  <div
    class="border-mist-200 text-ink-500 flex flex-col items-start gap-4 rounded-[0.875rem] border bg-white p-[1.125rem] md:p-8"
  >
    <div class="flex flex-col items-start gap-2">
      <UIcon name="i-lucide-check" class="text-indigo-500 h-6 w-6" />
      <h3 class="font-display-en text-indigo-500 text-2xl md:text-3xl">
        Welcome, friend.
      </h3>
      <p class="font-body-en text-ink-500 text-base">
        Your details are saved. Your free book is below, and the WhatsApp group
        has course updates.
      </p>
    </div>

    <div class="border-mist-200 flex w-full gap-4 border-t pt-4 md:gap-5">
      <img
        :src="book.coverPath"
        :width="book.coverWidth"
        :height="book.coverHeight"
        :alt="`Cover of ${book.title}, a book by ${book.author}`"
        loading="lazy"
        decoding="async"
        class="border-mist-200 aspect-[2/3] w-24 shrink-0 self-start rounded-[6px] border md:w-28"
      />
      <div class="flex min-w-0 flex-col items-start gap-1">
        <p class="font-display-en text-indigo-500 text-[1.5rem] leading-snug">
          {{ book.title }}
        </p>
        <p class="font-body-en text-ink-400 text-[1rem]">
          by {{ book.author }} · PDF · {{ book.pages }} pages
        </p>
      </div>
    </div>

    <a
      :href="book.pdfPath"
      :download="book.downloadName"
      class="bg-saffron-500 hover:bg-saffron-600 font-body-en focus-visible:outline-indigo-500 w-full justify-center sm:w-auto inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium text-indigo-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
      @click="$emit('book-download')"
    >
      Download your free book
      <UIcon name="i-lucide-download" class="h-4 w-4" />
    </a>

    <a
      :href="whatsappUrl"
      target="_blank"
      rel="noopener"
      class="font-body-en focus-visible:outline-indigo-500 hover:bg-mist-100 inline-flex items-center gap-2 rounded-full border border-indigo-500 px-5 py-3 font-medium text-indigo-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      Join the WhatsApp community
      <UIcon name="i-lucide-arrow-up-right" class="h-4 w-4" />
    </a>
  </div>
</template>
