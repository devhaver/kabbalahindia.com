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
  <section id="program" class="bg-mist-100 px-5 py-20 md:px-6 md:py-28">
    <div class="mx-auto max-w-[71.875rem]">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.3fr] md:gap-16">
        <div>
          <Eyebrow text="The program" class="mb-4" />
          <h2
            class="font-display-en text-indigo-500 text-[2rem] leading-[1.15] md:text-[2.625rem]"
          >
            A clear path, four steps deep.
          </h2>
          <p
            class="font-body-en text-ink-500 mt-[1.125rem] max-w-[35rem] text-[1.0625rem] leading-relaxed md:text-lg"
          >
            Every student begins with the foundations. You move at your own pace
            — no exams, no grading, no hurry.
          </p>
          <p
            class="font-body-en text-ink-500 border-mist-200 mt-9 max-w-[27.5rem] border-t pt-[1.375rem] text-base leading-relaxed"
          >
            Everything here is free — the course, the lessons, the books, the
            gatherings. There is no paid tier, now or later.
          </p>
        </div>
        <ol class="border-mist-200 border-b">
          <li
            v-for="s in steps"
            :key="s.n"
            class="border-mist-200 grid grid-cols-[3.5rem_1fr] gap-2 border-t py-[1.625rem]"
          >
            <span
              class="font-display-en text-mist-700 text-[1.625rem] italic"
              >{{ s.n }}</span
            >
            <div>
              <h3 class="font-display-en text-indigo-500 mb-1.5 text-2xl">
                {{ s.title }}
              </h3>
              <p class="font-body-en text-ink-500 text-base leading-relaxed">
                {{ s.body }}
              </p>
            </div>
          </li>
        </ol>
      </div>

      <div class="mt-16 md:mt-24">
        <h3
          class="font-display-en text-indigo-500 max-w-[35rem] text-[1.625rem] leading-[1.2] md:text-[1.875rem]"
        >
          Upon completing the free course, you'll gain
        </h3>
        <ul
          class="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-x-[4.5rem] md:gap-y-10"
        >
          <li v-for="b in benefits" :key="b.title">
            <h4
              class="font-body-en text-indigo-500 mb-1.5 text-base font-semibold"
            >
              {{ b.title }}
            </h4>
            <p
              class="font-body-en text-ink-500 text-[0.96875rem] leading-relaxed"
            >
              {{ b.body }}
            </p>
          </li>
        </ul>
        <p
          class="font-body-en text-ink-400 mt-14 text-sm leading-[1.9] tracking-[0.02em]"
        >
          Free e-books · 24/7 instructors · Largest library · Congresses ·
          Weekly meetups · Live every morning, 6:30 AM IST
        </p>
      </div>
    </div>
  </section>
</template>
