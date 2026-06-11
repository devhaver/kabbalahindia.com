<script setup lang="ts">
// No reliable portrait exists for The Ari — his node shows the engraved
// title page of Sefer HaKavanot (his teachings) instead.
type LineageNode = {
  name: string;
  dates: string;
  role: string;
  photo?: string;
  alt?: string;
  pos?: string;
};

const lineage: LineageNode[] = [
  {
    name: "The Ari",
    dates: "1534–1572",
    role: "Father of modern Kabbalah",
    photo: "/people/ari-sefer-hakavanot.png",
    alt: "Title page of Sefer HaKavanot — the teachings of the Ari",
  },
  {
    name: "Baal HaSulam",
    dates: "1885–1954",
    role: "Translated the Ari for the modern age",
    photo: "/people/baal-hasulam.png",
  },
  {
    name: "RABASH",
    dates: "1907–1991",
    role: "His son and successor",
    photo: "/people/rabash.png",
    pos: "object-top",
  },
  {
    name: "Dr. Michael Laitman",
    dates: "1946–",
    role: "Founder, Bnei Baruch · Israel",
    photo: "/people/michael-laitman.png",
  },
  {
    name: `Today's Indian teachers`,
    dates: "2018–",
    role: "Direct students of Dr. Laitman",
    photo: "/people/shamir-galsurkar.jpg",
    alt: "Shamir Galsurkar — one of today's Indian teachers",
  },
];

const root = ref<HTMLElement | null>(null);
const { gsap } = useGsap();

useMotionSafe(root, () => {
  const el = root.value!;
  const tl = gsap.timeline({
    scrollTrigger: { trigger: el, start: "top 70%", once: true },
  });
  // The gold line draws itself teacher-to-student, then each node pops in
  // with a halo pulse as the wisdom "reaches" it.
  tl.from(".lineage-line", {
    scaleX: 0,
    duration: 1.2,
    ease: "power2.inOut",
  })
    .from(
      ".lineage-node",
      {
        opacity: 0,
        y: 18,
        scale: 0.85,
        duration: 0.6,
        ease: "back.out(1.6)",
        stagger: 0.18,
      },
      "-=0.9",
    )
    .fromTo(
      ".lineage-halo",
      { boxShadow: "0 0 0 0 rgba(200, 155, 60, 0)" },
      {
        boxShadow: "0 0 1.5rem 0.25rem rgba(200, 155, 60, 0.45)",
        duration: 0.45,
        stagger: 0.18,
        yoyo: true,
        repeat: 1,
      },
      "<+0.15",
    );

  // A shimmer travels the chain on loop — The Ari to today's teachers.
  // Paused while the section is off-screen so it doesn't tick forever.
  const comet = el.querySelector(".lineage-comet");
  if (comet) {
    const loop = gsap.timeline({
      repeat: -1,
      repeatDelay: 1.6,
      delay: 2.4,
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play pause resume pause",
      },
    });
    loop
      .fromTo(
        comet,
        { left: "10%" },
        { left: "85%", duration: 3, ease: "sine.inOut" },
      )
      .fromTo(comet, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0)
      .to(comet, { opacity: 0, duration: 0.6 }, 2.4);
  }
});
</script>

<template>
  <section class="bg-indigo-500 text-cream-300">
    <div
      ref="root"
      class="mx-auto flex max-w-6xl flex-col gap-8 px-8 py-[1.25rem] md:items-center md:gap-14 md:px-12 md:py-24"
    >
      <Eyebrow text="AN UNBROKEN LINEAGE · अटूट परंपरा" tone="gold" />
      <div class="flex max-w-3xl flex-col gap-3 md:items-center md:text-center">
        <h2
          class="font-display-en text-[1.625rem] leading-[1.1] md:text-[2.75rem]"
        >
          <span class="md:inline block">Teacher to student.</span>
          <span class="md:inline md:ml-3 block">Five hundred years.</span>
          <span class="text-gold-500 md:inline md:ml-3 block">Unbroken.</span>
        </h2>
        <p
          class="font-display-hi text-cream-300/75 text-[1.125rem] md:text-[1.5rem]"
        >
          गुरु से शिष्य तक। पाँच सौ साल। अटूट।
        </p>
      </div>

      <!-- Mobile: vertical chain. Desktop: horizontal row with gold connector. -->
      <ul class="flex w-full flex-col items-center gap-0 md:hidden">
        <template v-for="(node, i) in lineage" :key="node.name">
          <li class="lineage-node flex flex-col items-center gap-2 text-center">
            <img
              v-if="node.photo"
              :src="node.photo"
              :alt="node.alt ?? `Portrait of ${node.name}`"
              loading="lazy"
              class="lineage-halo ring-cream-300/10 h-[5rem] w-[5rem] rounded-full object-cover ring-2"
              :class="node.pos"
            />
            <div
              v-else
              aria-hidden="true"
              class="lineage-halo bg-gold-500 ring-cream-300/10 h-[5rem] w-[5rem] rounded-full ring-2"
            />
            <span class="font-display-en text-cream-300 text-[1rem]">
              {{ node.name }}
            </span>
            <span class="font-body-en text-cream-300/55 text-[0.6875rem]">
              {{ node.dates }}
            </span>
            <span
              class="font-body-en text-cream-300/70 px-4 text-center text-[0.6875rem]"
            >
              {{ node.role }}
            </span>
          </li>
          <li
            v-if="i < lineage.length - 1"
            aria-hidden="true"
            class="bg-gold-500/70 my-3 h-7 w-px"
          />
        </template>
      </ul>

      <div class="relative hidden w-full md:block">
        <span
          aria-hidden="true"
          class="lineage-line bg-gold-500/40 absolute left-[10%] right-[10%] top-[5rem] h-px origin-left"
        />
        <!-- Motion-only shimmer — pre-hidden on purpose so reduced-motion
             and no-JS visitors never see a stray dash. -->
        <span
          aria-hidden="true"
          class="lineage-comet via-gold-500 pointer-events-none absolute top-[5rem] left-[10%] h-px w-16 -translate-y-px bg-gradient-to-r from-transparent to-transparent opacity-0"
        />
        <ul class="relative grid grid-cols-5 gap-4">
          <li
            v-for="node in lineage"
            :key="node.name"
            class="lineage-node flex flex-col items-center gap-2 px-2 text-center"
          >
            <img
              v-if="node.photo"
              :src="node.photo"
              :alt="node.alt ?? `Portrait of ${node.name}`"
              loading="lazy"
              class="lineage-halo ring-indigo-500 relative z-10 h-[8.75rem] w-[8.75rem] rounded-full object-cover ring-4"
              :class="node.pos"
            />
            <div
              v-else
              aria-hidden="true"
              class="lineage-halo bg-gold-500 ring-indigo-500 relative z-10 h-[8.75rem] w-[8.75rem] rounded-full ring-4"
            />
            <span class="font-display-en text-cream-300 mt-1 text-lg">
              {{ node.name }}
            </span>
            <span
              class="font-body-en text-gold-500 text-[0.6875rem] tracking-[0.1em]"
            >
              {{ node.dates }}
            </span>
            <span
              class="font-body-en text-cream-300/70 text-[0.75rem] leading-snug"
            >
              {{ node.role }}
            </span>
          </li>
        </ul>
      </div>

      <p
        class="font-body-en text-gold-500 text-[0.625rem] tracking-[0.18em] md:text-xs"
      >
        BNEI BARUCH · ISRAEL · SINCE 1991
      </p>
    </div>
  </section>
</template>
