<script setup lang="ts">
const steps = [
  {
    n: "01",
    title: "Foundations",
    body: "A 12-lesson introduction. No prerequisites. Most students finish in 4–6 weeks.",
  },
  {
    n: "02",
    title: "Daily study",
    body: "Live morning lesson with a teacher, recorded for evening replay. 60 minutes, every day.",
  },
  {
    n: "03",
    title: "Friends, not followers",
    body: "Small WhatsApp study groups (8–12 people). You study together, you talk, you support. This is where it becomes real.",
  },
  {
    n: "04",
    title: "Depth",
    body: "Original texts — Zohar, Talmud Eser Sefirot, the writings of Baal HaSulam — studied slowly, with translation and commentary.",
  },
];
</script>

<template>
  <section id="program" class="bg-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-8 px-8 py-[1.25rem] md:items-center md:gap-12 md:py-24"
    >
      <Eyebrow text="THE PROGRAM" tone="gold" />
      <div class="flex max-w-3xl flex-col gap-3 md:items-center md:text-center">
        <h2
          class="font-display-en text-indigo-500 text-[1.875rem] leading-[1.05] md:text-[2.75rem]"
        >
          A clear path, four steps deep.
        </h2>
        <p class="font-body-en text-charcoal-700 text-[1.0625rem] md:text-base">
          Every student begins with the foundations. You move at your own pace —
          no exams, no grading, no hurry.
        </p>
      </div>

      <!-- Mobile: vertical ladder -->
      <ol class="flex w-full flex-col items-stretch md:hidden">
        <template v-for="(s, i) in steps" :key="s.n">
          <li
            class="bg-cream-300 ring-border-maroon flex flex-col gap-[0.375rem] rounded-[0.75rem] bg-white p-[0.875rem] ring-1"
          >
            <span class="font-display-en text-gold-500 text-[2rem]">{{
              s.n
            }}</span>
            <h3 class="font-display-en text-indigo-500 text-lg">
              {{ s.title }}
            </h3>
            <p
              class="font-body-en text-charcoal-700 text-[1.0625rem] leading-relaxed"
            >
              {{ s.body }}
            </p>
          </li>
          <span
            v-if="i < steps.length - 1"
            aria-hidden="true"
            class="bg-gold-500/50 mx-auto h-6 w-px"
          />
        </template>
      </ol>

      <!-- Desktop: horizontal ladder with gold connector line -->
      <div class="relative hidden w-full md:block">
        <span
          aria-hidden="true"
          class="bg-gold-500/40 absolute left-[10%] right-[10%] top-[3rem] h-px"
        />
        <ol class="relative grid grid-cols-4 gap-6">
          <li
            v-for="s in steps"
            :key="s.n"
            class="flex flex-col items-center gap-3 text-center"
          >
            <span
              class="bg-cream-300 ring-gold-500/60 font-display-en text-gold-500 relative z-10 flex h-[6rem] w-[6rem] items-center justify-center rounded-full text-[2.5rem] ring-1"
            >
              {{ s.n }}
            </span>
            <h3 class="font-display-en text-indigo-500 text-xl">
              {{ s.title }}
            </h3>
            <p class="font-body-en text-charcoal-700 text-base leading-relaxed">
              {{ s.body }}
            </p>
          </li>
        </ol>
      </div>

      <div
        class="bg-gold-500/10 flex w-full max-w-2xl items-start gap-2 rounded-[0.625rem] p-[0.875rem]"
      >
        <UIcon
          name="i-lucide-info"
          class="text-maroon-500 mt-[0.125rem] h-4 w-4 shrink-0"
        />
        <p class="font-body-en text-charcoal-700 text-[1rem] md:text-sm">
          Start with step 1 today. Steps 2–4 open as you're ready — no pressure,
          no deadlines.
        </p>
      </div>
      <UButton
        to="#signup"
        size="xl"
        trailing-icon="i-lucide-arrow-right"
        class="text-charcoal-800"
      >
        Begin with the foundations
      </UButton>
    </div>
  </section>
</template>
