<script setup lang="ts">
type LessonLink = { title: string; date: string; path: string };
type LessonDocument = {
  data: {
    id: string;
    attributes: { title: string; subtitle: string; date: string; body: string };
  };
  meta: { previous: LessonLink | null; next: LessonLink | null };
};

const route = useRoute();
const { lessonsBaseUrl } = useRuntimeConfig().public;
const { formatLessonDate } = useFormattedLessonDate();

const slug = computed(() =>
  [route.params.path ?? []]
    .flat()
    .filter(Boolean)
    .map(encodeURIComponent)
    .join("/"),
);

const { data: lesson, error } = await useFetch(
  () => `/api/lessons/${slug.value}`,
  {
    key: () => `lesson-${slug.value}`,
    transform: (doc: LessonDocument) => ({
      path: doc.data.id,
      ...doc.data.attributes,
      ...doc.meta,
    }),
  },
);

if (error.value?.statusCode === 404) {
  throw createError({
    statusCode: 404,
    statusMessage: "Lesson not found",
    fatal: true,
  });
}

if (error.value || !lesson.value) {
  const event = useRequestEvent();
  if (event) setResponseStatus(event, 503);
} else if (import.meta.server) {
  const cacheControl = useResponseHeader("Cache-Control");
  cacheControl.value = "public, max-age=300";
}

const title = computed(() => lesson.value?.title ?? "Daily lessons");
// The original lives on the lessons site; it stays the canonical copy.
const original = computed(() =>
  lesson.value ? `${lessonsBaseUrl}${lesson.value.path}` : undefined,
);
const description = computed(() => {
  const text = lesson.value?.subtitle ?? "";
  return text.length > 160 ? `${text.slice(0, 157).trimEnd()}…` : text;
});

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogType: "article",
  // og:url must agree with the canonical, which is the original.
  ogUrl: original,
});
useHead({
  link: computed(() =>
    original.value ? [{ rel: "canonical", href: original.value }] : [],
  ),
});
</script>

<template>
  <div class="bg-mist-50 min-h-screen pb-16 md:pb-0">
    <main class="px-5 pt-[5.5rem] pb-20 md:px-6 md:pt-32 md:pb-28">
      <article class="mx-auto max-w-[42rem]">
        <NuxtLink
          to="/lessons"
          class="font-body-en text-indigo-500 -ml-1 inline-flex min-h-11 items-center rounded-sm px-1 text-[0.9375rem] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          ← All lessons
        </NuxtLink>

        <LessonsUnavailable
          v-if="error || !lesson"
          class="mt-6"
          :source-url="lessonsBaseUrl"
        />

        <template v-else>
          <header class="mt-4 mb-10 md:mb-12">
            <time
              :datetime="lesson.date"
              class="font-body-en text-ink-400 text-[0.8125rem] font-medium tracking-[0.16em] uppercase"
            >
              {{ formatLessonDate(lesson.date) }}
            </time>
            <h1
              class="font-display-en text-indigo-500 mt-3 text-[2rem] leading-[1.15] text-balance md:text-[2.625rem]"
            >
              {{ lesson.title }}
            </h1>
            <p
              v-if="lesson.subtitle"
              class="font-body-en text-ink-400 mt-4 text-[1rem] leading-relaxed text-pretty md:text-[1.0625rem]"
            >
              {{ lesson.subtitle }}
            </p>
          </header>

          <!-- Sanitized server-side by sanitizeLessonHtml (strict allow-list). -->
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="lesson-body" v-html="lesson.body" />

          <nav
            aria-label="More lessons"
            class="border-mist-200 mt-16 grid gap-px border-t pt-8 sm:grid-cols-2 sm:gap-8"
          >
            <NuxtLink
              v-if="lesson.previous"
              :to="lesson.previous.path"
              :prefetch="false"
              class="group block rounded-sm py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <span
                class="font-body-en text-ink-400 block text-[0.8125rem] font-medium tracking-[0.16em] uppercase"
              >
                ← Previous lesson
              </span>
              <span
                class="font-display-en text-indigo-500 mt-1.5 line-clamp-2 block text-[1.1875rem] leading-snug group-hover:underline group-hover:underline-offset-4"
              >
                {{ lesson.previous.title }}
              </span>
            </NuxtLink>
            <NuxtLink
              v-if="lesson.next"
              :to="lesson.next.path"
              :prefetch="false"
              class="group block rounded-sm py-3 sm:col-start-2 sm:text-right focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <span
                class="font-body-en text-ink-400 block text-[0.8125rem] font-medium tracking-[0.16em] uppercase"
              >
                Next lesson →
              </span>
              <span
                class="font-display-en text-indigo-500 mt-1.5 line-clamp-2 block text-[1.1875rem] leading-snug group-hover:underline group-hover:underline-offset-4"
              >
                {{ lesson.next.title }}
              </span>
            </NuxtLink>
          </nav>

          <aside
            class="border-mist-200 mt-14 border-t pt-10 text-center md:mt-16"
          >
            <p
              class="font-body-en text-ink-500 mx-auto max-w-[26rem] text-[1.0625rem] leading-relaxed text-pretty"
            >
              Want to study these lessons with guidance? Join the free
              introductory course, taught live in English.
            </p>
            <NuxtLink
              to="/#signup"
              class="bg-saffron-500 hover:bg-saffron-600 text-charcoal-800 font-body-en mt-6 inline-flex min-h-12 items-center rounded-full px-7 text-[0.9375rem] font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Join free
            </NuxtLink>
          </aside>
        </template>
      </article>
    </main>
    <SectionFooter />
  </div>
</template>

<style scoped>
/* Reading typography for the sanitized lesson HTML (arrives as a string, so
   every selector goes through :deep()). Mobile 18px, desktop 19px. */
.lesson-body {
  font-family: var(--font-body-en);
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-ink-500);
  overflow-wrap: break-word;
}

@media (min-width: 48rem) {
  .lesson-body {
    font-size: 1.1875rem;
  }
}

.lesson-body :deep(h2),
.lesson-body :deep(h3) {
  font-family: var(--font-display-en);
  font-weight: 400;
  color: var(--color-indigo-500);
  letter-spacing: -0.01em;
  text-wrap: balance;
}

.lesson-body :deep(h2) {
  margin: 3.5rem 0 1rem;
  font-size: 1.625rem;
  line-height: 1.2;
}

.lesson-body :deep(h3) {
  margin: 2.75rem 0 0.875rem;
  font-size: 1.4375rem;
  line-height: 1.25;
}

.lesson-body :deep(h4),
.lesson-body :deep(h5) {
  margin: 2.25rem 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-indigo-500);
}

@media (min-width: 48rem) {
  .lesson-body :deep(h2) {
    margin-top: 4rem;
    font-size: 1.875rem;
  }

  .lesson-body :deep(h3) {
    font-size: 1.5625rem;
  }
}

.lesson-body > :deep(:first-child) {
  margin-top: 0;
}

.lesson-body :deep(p) {
  margin: 0 0 1.15em;
}

.lesson-body :deep(strong),
.lesson-body :deep(b) {
  font-weight: 600;
  color: var(--color-indigo-500);
}

.lesson-body :deep(ul),
.lesson-body :deep(ol) {
  margin: 0 0 1.4em;
  padding-left: 1.25rem;
}

.lesson-body :deep(ul) {
  list-style: disc;
}

.lesson-body :deep(ol) {
  list-style: decimal;
}

.lesson-body :deep(li) {
  margin: 0.75em 0;
  padding-left: 0.25rem;
}

.lesson-body :deep(li)::marker {
  color: var(--color-mist-500);
}

.lesson-body :deep(li > ul),
.lesson-body :deep(li > ol) {
  margin: 0.5em 0 0;
}

.lesson-body :deep(blockquote) {
  margin: 1.75rem 0;
  padding: 0.125rem 0 0.125rem 1.125rem;
  border-left: 2px solid var(--color-mist-300);
  color: var(--color-ink-400);
}

/* Callouts (key questions, quotes, tips) all read the same: a quiet panel. */
.lesson-body :deep(blockquote.callout) {
  padding: 0.875rem 1rem 0.875rem 1.125rem;
  background-color: var(--color-mist-100);
  border-left: 2px solid var(--color-mist-400);
  border-radius: 0.375rem;
  color: var(--color-ink-500);
}

.lesson-body :deep(blockquote > :last-child) {
  margin-bottom: 0;
}

.lesson-body :deep(hr) {
  margin: 3rem 0;
  border: 0;
  border-top: 1px solid var(--color-mist-200);
}

/* Lessons end with a rule; the "more lessons" block draws its own. */
.lesson-body > :deep(hr:last-child) {
  display: none;
}

.lesson-body :deep(a) {
  color: var(--color-indigo-500);
  text-decoration: underline;
  text-decoration-color: var(--color-mist-500);
  text-underline-offset: 0.2em;
}

.lesson-body :deep(code),
.lesson-body :deep(pre) {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.875em;
}

.lesson-body :deep(pre) {
  margin: 0 0 1.4em;
  padding: 1rem;
  overflow-x: auto;
  background-color: var(--color-mist-100);
  border-radius: 0.5rem;
}

/* Key-terms tables: scroll sideways rather than squeeze on a phone. */
.lesson-body :deep(table) {
  display: block;
  width: 100%;
  margin: 1.75rem 0;
  overflow-x: auto;
  border-collapse: collapse;
  font-size: 0.9375rem;
  line-height: 1.55;
}

.lesson-body :deep(th),
.lesson-body :deep(td) {
  padding: 0.75rem 1rem 0.75rem 0;
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid var(--color-mist-200);
}

.lesson-body :deep(th) {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-mist-700);
}

.lesson-body :deep(td:first-child) {
  min-width: 7rem;
}

.lesson-body :deep(td:last-child),
.lesson-body :deep(th:last-child) {
  min-width: 12rem;
}

.lesson-body :deep(sup),
.lesson-body :deep(sub) {
  font-size: 0.75em;
  line-height: 0;
}
</style>
