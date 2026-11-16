<script setup lang="ts">
type FooterCol = {
  header: string;
  external?: boolean;
  links: { label: string; href: string }[];
};

const waUrl = useWhatsApp();

const cols = computed<FooterCol[]>(() => [
  {
    header: "SITE",
    links: [
      { label: "Companions", href: "#teachers" },
      { label: "Program", href: "#program" },
      { label: "Testimonials", href: "#students" },
      { label: "FAQ", href: "#faq" },
      { label: "Join free", href: "#signup" },
    ],
  },
  {
    header: "LEARN MORE",
    external: true,
    links: [
      {
        label: "Bnei Baruch — kabbalah.info",
        href: "https://www.kabbalah.info/",
      },
      { label: "Media archive", href: "https://kabbalahmedia.info/" },
      {
        label: "World Kabbalah Convention",
        href: "https://convention.kli.one/",
      },
    ],
  },
  {
    header: "SOCIAL",
    external: true,
    links: [
      {
        label: "YouTube",
        href: "https://www.youtube.com/@kabbalah_india",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/Kabbalah.hindi",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/in.kabbalah.academy",
      },
      { label: "WhatsApp", href: waUrl.value },
    ],
  },
]);
</script>

<template>
  <footer
    class="bg-mist-50 border-mist-200 border-t px-5 pt-[4.5rem] pb-10 md:px-6"
  >
    <div
      class="mx-auto grid max-w-[71.875rem] grid-cols-2 gap-9 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12"
    >
      <div class="col-span-full md:col-span-1">
        <span class="font-display-en text-indigo-500 text-2xl">
          Kabbalah Academy India
        </span>
        <p class="font-body-en text-ink-400 mt-1.5 text-sm">
          A direct path to self-knowledge.
        </p>
        <p class="font-body-en text-ink-400 mt-1.5 text-sm">
          In direct association with Bnei Baruch, Israel.
        </p>
      </div>
      <div v-for="col in cols" :key="col.header">
        <h2
          class="font-body-en text-ink-400 mb-1.5 text-xs font-semibold tracking-[0.14em]"
        >
          {{ col.header }}
        </h2>
        <a
          v-for="l in col.links"
          :key="l.label"
          :href="l.href"
          :target="col.external ? '_blank' : undefined"
          :rel="col.external ? 'noopener' : undefined"
          class="font-body-en text-indigo-500 block w-fit py-2.5 rounded-sm text-[0.9375rem] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          {{ l.label }}
        </a>
      </div>
    </div>
    <p
      class="font-body-en text-ink-400 mx-auto mt-14 max-w-[71.875rem] text-[0.8125rem]"
    >
      © 2026 Kabbalah Academy India · A Bnei Baruch India initiative
    </p>
  </footer>
</template>
