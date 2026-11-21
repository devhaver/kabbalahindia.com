<script setup lang="ts">
const props = defineProps<{
  statusCode: number;
  path: string;
  whatsappUrl: string;
}>();

defineEmits<{
  home: [];
  lessons: [];
  retry: [];
}>();

const variant = computed(() => errorVariant(props.statusCode, props.path));

const copy = {
  "not-found": {
    title: "This page isn't here.",
    body: "The link may be old, or the address may have a typo. Everything else is where you left it.",
  },
  "lesson-not-found": {
    title: "That lesson isn't here.",
    body: "It may have been moved or renamed. The full list of daily lessons is one step away.",
  },
  failure: {
    title: "Something went wrong on our side.",
    body: "The page couldn't load just now. Try again in a moment — if it keeps happening, message us on WhatsApp.",
  },
};

const primary =
  "bg-saffron-500 hover:bg-saffron-600 text-charcoal-800 font-body-en inline-flex min-h-12 items-center rounded-full px-8 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 md:min-h-14";
const secondary =
  "font-body-en hover:bg-mist-100 inline-flex min-h-12 items-center rounded-full border border-indigo-500 px-8 text-base font-medium text-indigo-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 md:min-h-14";
</script>

<template>
  <main
    class="text-indigo-500 relative flex min-h-svh flex-col overflow-hidden bg-[linear-gradient(180deg,#eef3f9,#dde7f3_60%,#c9d8ec)]"
  >
    <DawnLandscape />
    <div
      class="relative z-10 mx-auto flex w-full max-w-[71.875rem] flex-1 items-start px-5 pt-[7rem] pb-[17rem] md:items-center md:px-6 md:pt-36 md:pb-32"
    >
      <div class="max-w-[40rem]">
        <p
          v-if="variant !== 'failure'"
          class="font-display-en text-[clamp(5rem,28vw,7.5rem)] leading-none md:text-[9rem]"
        >
          <span class="sr-only">404</span>
          <span aria-hidden="true">
            4<span
              class="mx-[0.06em] inline-block size-[0.7em] rounded-full bg-[#e27a2e]"
            />4
          </span>
        </p>
        <p v-else class="font-body-en text-mist-800 text-sm">
          Error {{ statusCode }}
        </p>
        <h1
          class="font-display-en mt-3 text-[clamp(1.75rem,8.2vw,2.375rem)] leading-[1.1] md:mt-5 md:text-[3.75rem] md:leading-[1.08]"
        >
          {{ copy[variant].title }}
        </h1>
        <p
          class="font-body-en mt-3 max-w-[32.5rem] text-[0.9375rem] leading-normal md:mt-5 md:text-lg md:leading-relaxed"
        >
          {{ copy[variant].body }}
        </p>
        <div class="mt-6 flex flex-wrap gap-3 md:mt-9">
          <template v-if="variant === 'not-found'">
            <button type="button" :class="primary" @click="$emit('home')">
              Go to the home page
            </button>
            <button type="button" :class="secondary" @click="$emit('lessons')">
              Read the daily lessons
            </button>
          </template>
          <template v-else-if="variant === 'lesson-not-found'">
            <button type="button" :class="primary" @click="$emit('lessons')">
              See all lessons
            </button>
            <button type="button" :class="secondary" @click="$emit('home')">
              Go to the home page
            </button>
          </template>
          <template v-else>
            <button type="button" :class="primary" @click="$emit('retry')">
              Try again
            </button>
            <button type="button" :class="secondary" @click="$emit('home')">
              Go to the home page
            </button>
          </template>
        </div>
        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener"
          class="font-body-en text-mist-900 mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-sm text-[0.9375rem] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Message us on WhatsApp
          <UIcon name="i-lucide-arrow-up-right" class="h-4 w-4" />
        </a>
      </div>
    </div>
  </main>
</template>
