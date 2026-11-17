<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";

const faqs: AccordionItem[] = [
  {
    label: "Is this really free?",
    content:
      "Yes — completely. No fees, no premium tier, no card on file. Bnei Baruch is funded by donations from people who have already studied. You receive what you receive.",
  },
  {
    label: "Do I need to know anything in advance?",
    content:
      "Not at all. We start from zero. No Hebrew, no Jewish background, no prior reading is required to learn Kabbalah.",
  },
  {
    label: "Is this connected to Hinduism or my own religion?",
    content:
      "Kabbalah is the science of how we connect — it sits underneath every religion, not over them. Hindus, Muslims, Christians, Sikhs, atheists all study together. You keep your own practice.",
  },
  {
    label: "How much time per week?",
    content:
      "Plan on about 3–4 hours per week for the foundations course. One live morning lesson (60 min, recorded), plus reading and a small group call. You set the pace.",
  },
  {
    label: "Who is Dr. Michael Laitman?",
    content: `A Russian-born scientist who became the personal student and successor of Rabash (Baal HaSulam's son). He has taught the authentic Kabbalah method since 1979 and leads Bnei Baruch from Israel.`,
  },
  {
    label: "Do I have to convert to Judaism?",
    content: `No. Kabbalah doesn't ask you to convert to any religion. You stay who you are. This is purely a study.`,
  },
  {
    label: "How are the live lessons run?",
    content:
      "Live online cohorts on Zoom, in English. You can also watch any lesson with subtitles afterward.",
  },
  {
    label: "Is there a paid version after the free one?",
    content:
      "No. There is no paid tier — not now, not later. Every course, lesson, book, and gathering is free, forever. We rely on donations from past students who want to keep this going.",
  },
];

// FAQ rich data for search engines and AI assistants.
useSchemaOrg(
  faqs.map((f) =>
    defineQuestion({
      name: f.label as string,
      acceptedAnswer: f.content as string,
    }),
  ),
);
</script>

<template>
  <section id="faq" class="bg-mist-50 px-5 py-20 md:px-6 md:py-28">
    <div
      class="mx-auto grid max-w-[71.875rem] grid-cols-1 gap-10 md:grid-cols-[1fr_1.5fr] md:gap-22"
    >
      <div>
        <Eyebrow text="Common questions" class="mb-4" />
        <h2
          class="font-display-en text-indigo-500 text-[2rem] leading-[1.15] md:text-[2.625rem]"
        >
          Everything you'd want to ask before you start.
        </h2>
        <p
          class="font-body-en text-ink-500 mt-7 max-w-[21.25rem] text-[0.9375rem] leading-relaxed"
        >
          Other questions? WhatsApp us — a real teacher replies, usually within
          an hour.
        </p>
      </div>

      <UAccordion
        :items="faqs"
        type="multiple"
        :default-value="['0']"
        :ui="{
          root: 'border-mist-200 border-b',
          item: 'border-mist-200 border-t',
          trigger:
            'font-body-en text-indigo-500 cursor-pointer py-[1.375rem] pr-10 text-left text-[1.125rem] font-medium',
          content: 'font-body-en',
          body: 'text-ink-500 pb-6 pr-10 text-[1.03125rem] leading-[1.7]',
        }"
      >
        <template #trailing="{ open }">
          <UIcon
            :name="open ? 'i-lucide-minus' : 'i-lucide-plus'"
            class="text-mist-700 ms-auto size-5 shrink-0"
          />
        </template>
      </UAccordion>
    </div>
  </section>
</template>
