<script setup lang="ts">
type FooterCol = {
  header: string;
  external?: boolean;
  links: { label: string; href: string }[];
};

const cols: FooterCol[] = [
  {
    header: "SITE · साइट",
    links: [
      { label: "Companions", href: "#teachers" },
      { label: "Program", href: "#program" },
      { label: "Testimonials", href: "#students" },
      { label: "FAQ", href: "#faq" },
      { label: "Join free", href: "#signup" },
    ],
  },
  {
    header: "LEARN MORE · और जानें",
    external: true,
    links: [
      { label: "Bnei Baruch — kabbalah.info", href: "https://www.kabbalah.info/" },
      { label: "कबाला हिंदी में", href: "https://www.kabbalah.info/hindi/" },
      { label: "Media archive", href: "https://kabbalahmedia.info/" },
      { label: "World Kabbalah Convention", href: "https://convention.kli.one/" },
    ],
  },
];

const waUrl = useWhatsApp();

const social = computed(() => [
  {
    icon: "i-lucide-youtube",
    href: "https://www.youtube.com/@kabbalah_india",
    label: "YouTube",
  },
  {
    icon: "i-lucide-message-circle",
    href: waUrl.value,
    label: "WhatsApp",
  },
]);
</script>

<template>
  <footer class="bg-charcoal-800 text-cream-300">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-6 px-8 py-[1.375rem] md:px-12 md:py-20"
    >
      <div class="flex flex-col gap-1">
        <span class="font-display-en text-cream-300 text-[1.25rem] md:text-3xl">
          Kabbalah Academy India
        </span>
        <span class="font-display-hi text-gold-500 text-[0.9375rem] md:text-xl">
          कबाला अकादमी, भारत
        </span>
        <span
          class="font-body-en text-cream-300/60 text-[0.8125rem] md:text-base"
        >
          A direct path to self-knowledge.
        </span>
        <span class="font-body-hi text-cream-300/50 text-[0.75rem] md:text-sm">
          अपने आप तक का सीधा रास्ता।
        </span>
        <span class="font-body-en text-cream-300/40 mt-2 text-[0.6875rem]">
          In direct association with Bnei Baruch, Israel.
        </span>
      </div>

      <div class="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-10">
        <div
          v-for="col in cols"
          :key="col.header"
          class="flex flex-col gap-[0.625rem]"
        >
          <h3
            class="font-body-en text-gold-500 text-[0.625rem] font-medium tracking-[0.16em]"
          >
            {{ col.header }}
          </h3>
          <a
            v-for="l in col.links"
            :key="l.label"
            :href="l.href"
            :target="col.external ? '_blank' : undefined"
            :rel="col.external ? 'noopener' : undefined"
            class="font-body-en text-cream-300/70 hover:text-cream-300 text-[0.8125rem] transition-colors"
          >
            {{ l.label }}
          </a>
        </div>
        <div class="flex flex-col gap-[0.625rem]">
          <h3
            class="font-body-en text-gold-500 text-[0.625rem] font-medium tracking-[0.16em]"
          >
            SOCIAL · सोशल
          </h3>
          <div class="flex items-center gap-4">
            <a
              v-for="s in social"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener"
              :aria-label="s.label"
              class="text-gold-500 hover:text-cream-300 transition-colors"
            >
              <UIcon :name="s.icon" class="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      <TricolorStrip />

      <p class="font-body-en text-cream-300/45 text-[0.6875rem]">
        © 2026 Kabbalah Academy India · A Bnei Baruch India initiative
      </p>
    </div>
  </footer>
</template>
