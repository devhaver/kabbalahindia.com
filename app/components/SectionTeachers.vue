<script setup lang="ts">
const companions = [
  {
    name: "Shamir Galsurkar",
    role: "Your companion · Mumbai",
    bio: "Indian Jew, engineer. 12+ years studying with Laitman.",
    pills: ["Hindi · English · Marathi"],
    photo: "/people/shamir-galsurkar.jpg",
  },
];

const cardRef = ref<HTMLElement | null>(null);
useStaggerReveal(cardRef);
</script>

<template>
  <section id="teachers" class="bg-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-[1.375rem] px-8 py-[1.25rem] md:px-12 md:py-20"
    >
      <Eyebrow text="COMPANIONS ON YOUR JOURNEY · सफ़र के साथी" tone="maroon" />
      <BilingualHeading
        :en-lines="['Not a guru.', 'A companion on your journey.']"
        hi="गुरु नहीं — आपके सफ़र के साथी।"
        :accent-index="1"
        size="md"
      />
      <p class="font-body-en text-charcoal-500 text-[0.75rem] md:text-base">
        Someone a few steps ahead, walking the same path.
        <span class="font-body-hi">हम साथ पढ़ते हैं, साथ चलते हैं।</span>
      </p>
      <div ref="cardRef" class="flex md:justify-start">
        <article
          v-for="t in companions"
          :key="t.name"
          class="bg-cream-300 ring-border-maroon flex w-full max-w-[17.5rem] flex-col rounded-[0.75rem] ring-1 md:max-w-[20rem] md:bg-white"
        >
          <img
            :src="t.photo"
            :alt="`${t.name} — your companion on the journey`"
            loading="lazy"
            class="h-[12.5rem] w-full rounded-t-[0.75rem] object-cover md:h-[17.5rem]"
          />
          <div class="flex flex-col gap-1 p-3 md:p-5">
            <h3 class="font-display-en text-indigo-500 text-lg md:text-xl">
              {{ t.name }}
            </h3>
            <p
              class="font-body-en text-charcoal-500 text-[0.6875rem] md:text-sm"
            >
              {{ t.role }}
            </p>
            <p
              class="font-body-en text-charcoal-700 text-[0.75rem] leading-snug md:text-sm"
            >
              {{ t.bio }}
            </p>
            <div class="mt-1 flex flex-wrap gap-[0.375rem]">
              <UBadge
                v-for="p in t.pills"
                :key="p"
                :label="p"
                color="primary"
                variant="soft"
                size="sm"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
