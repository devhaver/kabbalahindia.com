<script setup lang="ts">
const facts = [
  "Studied 12 years with RABASH",
  "40+ books on Kabbalah",
  "Daily lessons · live worldwide",
];
</script>

<template>
  <section class="bg-cream-400">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-8 px-8 py-[1.25rem] md:grid md:grid-cols-[2fr_3fr] md:items-center md:gap-14 md:px-12 md:py-24"
    >
      <figure class="relative mx-auto w-full max-w-[18rem] md:max-w-none">
        <span
          aria-hidden="true"
          class="border-gold-500/60 absolute -top-3 -left-3 h-full w-full rounded-[0.75rem] border md:-top-4 md:-left-4"
        />
        <img
          src="/people/michael-laitman-portrait.jpg"
          alt="Rav Dr. Michael Laitman"
          loading="lazy"
          class="ring-border-maroon relative aspect-[4/5] w-full rounded-[0.75rem] object-cover ring-1"
        />
        <figcaption
          class="font-body-en text-charcoal-500 mt-3 flex flex-col gap-[0.125rem] text-[0.875rem] tracking-[0.16em] uppercase md:text-[0.6875rem]"
        >
          Rav Dr. Michael Laitman · Bnei Baruch
        </figcaption>
      </figure>

      <div class="flex flex-col gap-[1.125rem]">
        <Eyebrow text="THE TEACHER OF OUR GENERATION" tone="maroon" />
        <BilingualHeading
          :en-lines="[
            'Rav Dr. Michael Laitman.',
            'The living link in the chain.',
          ]"
          :accent-index="1"
          size="md"
        />
        <p
          class="font-body-en text-charcoal-700 text-[1.0625rem] leading-relaxed md:text-base"
        >
          Rav Dr. Michael Laitman is an eminent scholar of Kabbalah, born in
          Belarus in 1946 and now living in Israel. He was the first student and
          personal assistant of Rav Baruch Ashlag — son of Rav Yehuda Ashlag
          (Baal HaSulam), author of the Sulam, the commentary on the Book of the
          Zohar.
        </p>
        <p
          class="font-body-en text-charcoal-700 text-[1.0625rem] leading-relaxed md:text-base"
        >
          He holds a PhD in Philosophy and Kabbalah from the Institute of
          Philosophy of the Russian Academy of Sciences in Moscow, and a
          Master's in Medical Cybernetics from the Saint Petersburg State
          Polytechnic University. Today his daily lesson is studied live across
          the world — and your Indian teachers are his direct students.
        </p>
        <ul class="flex flex-wrap gap-[0.375rem]">
          <li v-for="fact in facts" :key="fact">
            <UBadge :label="fact" color="primary" variant="soft" size="sm" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
