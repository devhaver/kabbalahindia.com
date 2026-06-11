<script setup lang="ts">
const benefits = [
  {
    title: "Clarity from authentic spiritual sources",
    body: "A direct connection to the writings and teachings of Kabbalists, offering timeless wisdom on life and creation.",
  },
  {
    title: "Understanding of human nature",
    body: "Insight into desires, emotions, and inner struggles, and how to rise above them for a more balanced life.",
  },
  {
    title: "Practical tools for inner growth",
    body: "Simple, applicable guidance to work with thoughts, intentions, and daily challenges.",
  },
  {
    title: "A path of deeper connection",
    body: "Understanding how unity, compassion, and connection with others open higher awareness and inner peace.",
  },
];
</script>

<template>
  <section class="bg-cream-400">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-10 px-8 py-[1.25rem] md:gap-16 md:px-12 md:py-24"
    >
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
        <div class="flex flex-col gap-[1.125rem]">
          <Eyebrow text="WHAT YOU'LL GAIN · आप क्या पाएँगे" tone="maroon" />
          <BilingualHeading
            :en-lines="[`Upon completing the`, `free course, you'll gain.`]"
            :accent-index="1"
            size="md"
          />
          <p class="font-body-en text-charcoal-500 text-[0.75rem] md:text-base">
            Four outcomes students consistently describe — the shift from
            reading about Kabbalah to living it.
          </p>
        </div>
        <ol class="flex flex-col">
          <li
            v-for="(b, i) in benefits"
            :key="i"
            class="border-charcoal-200/60 flex items-start gap-4 py-5 first:pt-0 last:border-b-0 md:gap-6"
            :class="i < benefits.length - 1 ? 'border-b' : ''"
          >
            <span
              class="font-display-en text-gold-500 w-9 shrink-0 text-[1.375rem] md:text-[1.75rem]"
            >
              {{ String(i + 1).padStart(2, "0") }}
            </span>
            <div class="flex flex-col gap-[0.25rem]">
              <span
                class="font-display-en text-indigo-500 text-[1rem] md:text-xl"
              >
                {{ b.title }}
              </span>
              <span
                class="font-body-en text-charcoal-500 text-[0.8125rem] leading-snug md:text-base"
              >
                {{ b.body }}
              </span>
            </div>
          </li>
        </ol>
      </div>
      <div
        class="border-charcoal-200/60 ring-border-maroon rounded-[0.75rem] bg-white p-5 ring-1 md:p-8"
      >
        <p
          class="font-body-en text-charcoal-700 text-[0.8125rem] leading-relaxed md:text-base"
        >
          This course offers direct and free access to authentic Kabbalistic
          wisdom — not just knowledge, but practical inner tools for
          transformation, clarity of purpose, and a more meaningful and
          spiritually aligned life.
        </p>
      </div>
    </div>
  </section>
</template>
