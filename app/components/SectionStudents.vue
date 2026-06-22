<script setup lang="ts">
type Story = {
  name: string;
  initials: string;
  city: string;
  quote: string;
  photo?: string;
};

const stories: Story[] = [
  {
    name: "Pritam",
    initials: "P",
    city: "India · Free course participant",
    quote:
      "This course is deeply spiritual, timeless, and truly for every generation. Instructor Shamir is great — disciplined, always punctual, and fully present in every Zoom meeting. With genuine care, he works hard to understand each student, patiently clearing every doubt and confusion.",
    photo: "/testimonials/pritam.jpeg",
  },
  {
    name: "Mithlesh",
    initials: "M",
    city: "India · Free course participant",
    quote:
      "Thanks Shamir — it's a privilege to be given this opportunity. Kabbalah is not a course, it's a journey. There is none else besides Him. I think everyone should come, at least once in a lifetime.",
    photo: "/testimonials/mithlesh.jpeg",
  },
  {
    name: "Nisha",
    initials: "N",
    city: "India · Free course participant",
    quote:
      "When I began, I was anxious — I had no idea what to expect. In our first meeting I sat silent, afraid my opinions would be judged. Shamir gently drew me out, and the group met me with warmth. Every lesson since has felt like a doorway — a systematic path to the art of life and our connection with the Divine. I have only just begun, and I want to go deeper.",
    photo: "/testimonials/nisha.jpeg",
  },
  {
    name: "Sheba D'Souza",
    initials: "S",
    city: "India · Six months in classes",
    quote:
      "Six months of Shamir's classes have genuinely transformed how I see life and myself. I was extremely sensitive to what others thought; Kabbalah has given me inner freedom and grounding — I now understand I am answerable only to the Creator. Shamir is kind, patient, and truly cares about his students. Very often a fellow student's question answers something I've carried within me for years. Every class feels insightful, healing, and spiritually strong.",
    photo: "/testimonials/sheba.jpeg",
  },
  {
    name: "Sigalit",
    initials: "S",
    city: "USA · First India cohort",
    quote:
      "I grew up in a spiritual home but wanted to go further. Quietly, I asked God to show me the way — and soon Kabbalah books seemed to find me. Ten years ago I tried to study with Bnei Baruch without success; this year I finally joined Shamir's first group of students in India, all the way from the USA. I'm grateful to God, Shamir, and Rav Laitman — learning the authentic way, and longing to spread more love and humanity around me.",
    photo: "/testimonials/sigalit.jpeg",
  },
];
</script>

<template>
  <section id="students" class="bg-maroon-500 text-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-[1.375rem] px-8 py-[1.25rem] md:px-12 md:py-20"
    >
      <Eyebrow text="REAL STUDENTS" tone="gold" />
      <h2
        class="font-display-en text-cream-300 text-[2rem] leading-[1.05] md:text-[3rem]"
      >
        Real lives, not Instagram posts.
      </h2>
      <p
        class="font-body-en text-cream-300/75 max-w-prose text-[1.0625rem] md:text-base"
      >
        From across India — students who stopped searching and started studying.
      </p>
      <BaseCarousel
        class="kai-carousel students-carousel"
        :options="{ align: 'start' }"
        :slides-per-view="{ base: 1, '48rem': 3 }"
        aria-label="Student testimonials"
      >
        <BaseSlide v-for="s in stories" :key="s.name">
          <figure
            class="bg-cream-300 text-charcoal-800 flex h-full flex-col overflow-hidden rounded-[1rem] shadow-[0_0.5rem_1.875rem_rgba(0,0,0,0.08)]"
          >
            <div
              class="relative h-[16.25rem] w-full overflow-hidden bg-charcoal-900 md:h-[18.75rem]"
            >
              <img
                v-if="s.photo"
                :src="s.photo"
                :alt="s.name"
                loading="lazy"
                class="h-full w-full object-cover"
              />
              <div
                v-else
                class="bg-indigo-500 flex h-full w-full items-center justify-center"
              >
                <span class="font-display-en text-gold-500 text-[5rem]">
                  {{ s.initials }}
                </span>
              </div>
              <span
                aria-hidden="true"
                class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-charcoal-900/30 to-transparent"
              />
            </div>
            <div
              class="flex flex-1 flex-col gap-3 p-5 pb-0 md:gap-4 md:p-6 md:pb-0"
            >
              <span
                aria-hidden="true"
                class="font-display-en text-gold-500 -mb-2 text-[3rem] leading-none md:text-[4rem]"
              >
                &ldquo;
              </span>
              <blockquote
                class="font-display-en text-charcoal-800 text-[1.0625rem] leading-[1.5] md:text-[0.9375rem]"
              >
                {{ s.quote }}
              </blockquote>
            </div>
            <figcaption
              class="border-charcoal-200/60 mx-5 mt-3 flex flex-col gap-[0.125rem] border-t pt-3 pb-5 md:mx-6 md:mt-4 md:pb-6"
            >
              <span
                class="font-body-en text-indigo-500 text-[1.0625rem] font-medium md:text-[0.9375rem]"
              >
                {{ s.name }}
              </span>
              <span
                class="font-body-en text-charcoal-500 text-[0.9375rem] md:text-[0.75rem]"
              >
                {{ s.city }}
              </span>
            </figcaption>
          </figure>
        </BaseSlide>
      </BaseCarousel>
    </div>
  </section>
</template>

<style scoped>
.students-carousel {
  --weburz-carousel-accent: var(--color-gold-500);
  --weburz-carousel-slide-gap: 1rem;
  --weburz-carousel-arrow-color: var(--color-cream-300);
  --weburz-carousel-dot-color: var(--color-cream-300);
  --weburz-carousel-dot-active-color: var(--color-gold-500);
}

@media (min-width: 48rem) {
  .students-carousel {
    --weburz-carousel-slide-gap: 1.5rem;
  }
}
</style>
