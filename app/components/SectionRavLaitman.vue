<script setup lang="ts">
const facts = [
  "Studied 12 years with RABASH",
  "40+ books on Kabbalah",
  "Daily lessons · live worldwide",
];

// Verified items from the kabbalahmedia.info archive (titles fetched 2026-06-12).
const archive = [
  {
    title: "Spreading the wisdom of Kabbalah in India",
    meta: "Clip · 2019",
    href: "https://kabbalahmedia.info/en/programs/cu/xL0P4dSD",
  },
  {
    title: "A talk on spreading Kabbalah in India",
    meta: "Talks · 2019",
    href: "https://kabbalahmedia.info/en/programs/cu/yK4CM3sm",
  },
  {
    title: "Meeting with a guru in India",
    meta: "New Delhi · 2019",
    href: "https://kabbalahmedia.info/en/events/cu/rHjedvLj",
  },
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
          src="/people/michael-laitman-lecture.jpg"
          alt="Rav Dr. Michael Laitman teaching a Kabbalah lesson"
          loading="lazy"
          class="ring-border-maroon relative aspect-[4/5] w-full rounded-[0.75rem] object-cover ring-1"
        />
        <figcaption
          class="font-body-en text-charcoal-500 mt-3 flex flex-col gap-[0.125rem] text-[0.625rem] tracking-[0.16em] uppercase md:text-[0.6875rem]"
        >
          Rav Dr. Michael Laitman · Bnei Baruch
          <span
            class="text-charcoal-500/60 text-[0.5625rem] tracking-normal normal-case"
          >
            Photo: Arielzur, Wikimedia Commons · CC BY 2.5
          </span>
        </figcaption>
      </figure>

      <div class="flex flex-col gap-[1.125rem]">
        <Eyebrow
          text="THE TEACHER OF OUR GENERATION · इस पीढ़ी के शिक्षक"
          tone="maroon"
        />
        <BilingualHeading
          :en-lines="[
            'Rav Dr. Michael Laitman.',
            'The living link in the chain.',
          ]"
          hi="रव डॉ. माइकल लाइटमैन — इस परंपरा की जीवित कड़ी।"
          :accent-index="1"
          size="md"
        />
        <p
          class="font-body-en text-charcoal-700 text-[0.8125rem] leading-relaxed md:text-base"
        >
          For twelve years, Rav Laitman was the closest student and personal
          assistant of RABASH — the eldest son of Baal HaSulam. In 1991 he
          founded Bnei Baruch to pass that wisdom on, exactly as he received it.
        </p>
        <p
          class="font-body-en text-charcoal-700 text-[0.8125rem] leading-relaxed md:text-base"
        >
          Today his daily lesson is studied live across the world — and your
          Indian teachers are his direct students.
          <span class="font-body-hi text-charcoal-500">
            आपके भारतीय शिक्षक उनके प्रत्यक्ष छात्र हैं।
          </span>
        </p>
        <ul class="flex flex-wrap gap-[0.375rem]">
          <li v-for="fact in facts" :key="fact">
            <UBadge :label="fact" color="primary" variant="soft" size="sm" />
          </li>
        </ul>
        <div class="flex flex-col gap-2 pt-2">
          <h3
            class="font-body-en text-charcoal-500 text-[0.625rem] font-medium tracking-[0.16em] uppercase md:text-[0.6875rem]"
          >
            From the archive · Rav Laitman &amp; India
          </h3>
          <ul class="flex flex-col gap-[0.375rem]">
            <li v-for="item in archive" :key="item.href">
              <ExternalLink :href="item.href" tone="maroon">
                {{ item.title }}
                <span class="text-charcoal-500 text-[0.6875rem]">
                  · {{ item.meta }}
                </span>
              </ExternalLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
