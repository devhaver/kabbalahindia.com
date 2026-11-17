<script setup lang="ts">
type Story = {
  name: string;
  place: string;
  quote: string;
  photo: string;
  position: string;
};

const stories: Story[] = [
  {
    name: "Mithlesh",
    place: "India · Free course participant",
    quote:
      "Thanks Shamir — it's a privilege to be given this opportunity. Kabbalah is not a course, it's a journey. There is none else besides Him. I think everyone should come, at least once in a lifetime.",
    photo: "/testimonials/mithlesh-120.webp",
    position: "50% 25%",
  },
  {
    name: "Pritam",
    place: "India · Free course participant",
    quote:
      "This course is deeply spiritual, timeless, and truly for every generation. Instructor Shamir is great — disciplined, always punctual, and fully present in every Zoom meeting. With genuine care, he works hard to understand each student, patiently clearing every doubt and confusion.",
    photo: "/testimonials/pritam-120.webp",
    position: "48% 42%",
  },
  {
    name: "Sheba D'Souza",
    place: "India · Six months in classes",
    quote:
      "Six months of Shamir's classes have genuinely transformed how I see life and myself. I was extremely sensitive to what others thought; Kabbalah has given me inner freedom and grounding — I now understand I am answerable only to the Creator. Shamir is kind, patient, and truly cares about his students. Very often a fellow student's question answers something I've carried within me for years. Every class feels insightful, healing, and spiritually strong.",
    photo: "/testimonials/sheba-120.webp",
    position: "50% 25%",
  },
];
</script>

<template>
  <section id="students" class="bg-mist-50 px-5 py-20 md:px-6 md:py-28">
    <div class="mx-auto max-w-[71.875rem]">
      <Eyebrow text="Real students" class="mb-4" />
      <h2
        class="font-display-en text-indigo-500 max-w-[51.25rem] text-[2rem] leading-[1.15] md:text-[2.625rem]"
      >
        Real lives, not Instagram posts.
      </h2>
      <p
        class="font-body-en text-ink-500 mt-[1.125rem] max-w-[35rem] text-[1.0625rem] leading-relaxed md:text-lg"
      >
        From across India — students who stopped searching and started studying.
      </p>
      <div
        class="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-3 md:gap-16"
      >
        <figure v-for="s in stories" :key="s.name">
          <blockquote
            class="font-display-en text-indigo-500 text-xl leading-[1.5] tracking-normal italic"
          >
            &ldquo;{{ s.quote }}&rdquo;
          </blockquote>
          <figcaption class="mt-6 flex items-center gap-3.5">
            <img
              :src="s.photo"
              :alt="`Portrait of ${s.name}`"
              width="52"
              height="52"
              loading="lazy"
              decoding="async"
              class="size-[3.25rem] rounded-full object-cover"
              :style="{ objectPosition: s.position }"
            />
            <div>
              <span
                class="font-body-en text-indigo-500 block text-[0.9375rem] font-semibold"
              >
                {{ s.name }}
              </span>
              <span class="font-body-en text-ink-400 text-[0.8125rem]">
                {{ s.place }}
              </span>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
