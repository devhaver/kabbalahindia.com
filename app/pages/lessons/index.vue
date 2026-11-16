<script setup lang="ts">
type LessonRow = {
  path: string;
  title: string;
  subtitle: string;
  date: string;
};
type LessonsDocument = {
  data: {
    id: string;
    attributes: { title: string; subtitle: string; date: string };
  }[];
};

const { lessonsBaseUrl } = useRuntimeConfig().public;
const { formatLessonShortDate, formatLessonMonth } = useFormattedLessonDate();

// Group the (already newest-first) index by month, keyed "YYYY-MM".
const { data: months, error } = await useFetch("/api/lessons", {
  key: "lessons-index",
  transform: (doc: LessonsDocument) => {
    const groups = new Map<string, LessonRow[]>();
    for (const { id, attributes } of doc.data) {
      const key = attributes.date.slice(0, 7);
      const rows = groups.get(key) ?? [];
      rows.push({ path: id, ...attributes });
      groups.set(key, rows);
    }
    return [...groups].map(([key, rows]) => ({ key, rows }));
  },
});

if (error.value) {
  const event = useRequestEvent();
  if (event) setResponseStatus(event, 503);
} else if (import.meta.server) {
  const cacheControl = useResponseHeader("Cache-Control");
  cacheControl.value = "public, max-age=300";
}

useSeoMeta({
  title: "Daily lessons",
  ogTitle: "Daily lessons — Kabbalah Academy India",
  description:
    "A new Kabbalah lesson text every day, from the Bnei Baruch archive. Read the full archive, newest first.",
  ogDescription: "A new Kabbalah lesson text every day. Read the full archive.",
});
</script>

<template>
  <div class="bg-mist-50 min-h-screen pb-16 md:pb-0">
    <main class="px-5 pt-[6.5rem] pb-20 md:px-6 md:pt-36 md:pb-28">
      <div class="mx-auto max-w-[46rem]">
        <h1
          class="font-display-en text-indigo-500 text-[2.25rem] leading-[1.1] md:text-[3rem]"
        >
          Daily lessons
        </h1>
        <p
          class="font-body-en text-ink-400 mt-3 max-w-[32rem] text-[1.0625rem] leading-relaxed text-pretty"
        >
          One lesson text each day, newest first.
        </p>

        <LessonsUnavailable
          v-if="error || !months"
          class="mt-12"
          :source-url="lessonsBaseUrl"
        />

        <template v-else>
          <section
            v-for="month in months"
            :key="month.key"
            class="mt-12 md:mt-16"
          >
            <h2
              class="font-body-en text-mist-700 mb-2 text-[0.8125rem] font-medium tracking-[0.16em] uppercase"
            >
              {{ formatLessonMonth(month.key) }}
            </h2>
            <ol>
              <li v-for="lesson in month.rows" :key="lesson.path">
                <NuxtLink
                  :to="lesson.path"
                  :prefetch="false"
                  class="group border-mist-200 grid gap-1 border-t py-5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-indigo-500 md:grid-cols-[5.5rem_1fr] md:gap-6"
                >
                  <time
                    :datetime="lesson.date"
                    class="font-body-en text-ink-400 text-[0.8125rem] md:pt-1.5"
                  >
                    {{ formatLessonShortDate(lesson.date) }}
                  </time>
                  <span class="block">
                    <span
                      class="font-display-en text-indigo-500 block text-[1.3125rem] leading-snug group-hover:underline group-hover:underline-offset-4 md:text-[1.4375rem]"
                    >
                      {{ lesson.title }}
                    </span>
                    <span
                      class="font-body-en text-ink-400 mt-1.5 line-clamp-2 block text-[0.9375rem] leading-relaxed"
                    >
                      {{ lesson.subtitle }}
                    </span>
                  </span>
                </NuxtLink>
              </li>
            </ol>
          </section>
        </template>
      </div>
    </main>
    <SectionFooter />
  </div>
</template>
