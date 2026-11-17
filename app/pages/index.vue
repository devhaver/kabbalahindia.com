<script setup lang="ts">
useSeoMeta({
  // The site title template appends "| Kabbalah Academy India".
  title: "Authentic Kabbalah Course in India · Free & Online",
  ogTitle: "Kabbalah Academy India — Authentic Kabbalah, Free & Online",
  description:
    "Learn authentic Kabbalah in India — a free online introductory course taught live in English by Indian students of Bnei Baruch. Join free.",
  ogDescription: "Real Kabbalah. In India. Free, online, taught live.",
  // Static share card in public/ — composed from a real convention frame;
  // no runtime og-image generation needed.
  ogImage: "https://kabbalahindia.com/og-image.jpg",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt:
    "Kabbalah Academy India — Free, online, authentic Kabbalah taught live.",
  twitterCard: "summary_large_image",
});

useSchemaOrg([
  defineCourse({
    name: "Introductory Kabbalah Course (India)",
    description:
      "A free online introductory course in authentic Kabbalah for students in India, taught live in English.",
    provider: {
      type: "Organization",
      name: "Kabbalah Academy India",
      url: "https://kabbalahindia.com",
      sameAs: ["https://www.kabbalah.info/"],
    },
    isAccessibleForFree: true,
    inLanguage: ["en", "hi"],
    courseMode: "Online",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: "PT4H",
      inLanguage: ["en", "hi"],
    },
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  }),
]);
</script>

<template>
  <div id="top" class="bg-mist-50 min-h-screen pb-16 md:pb-0">
    <!-- pb clears the fixed mobile WhatsAppBar. -->
    <main>
      <SectionHero />
      <SectionTeacher />
      <SectionIndianVoice />
      <SectionProgram />
      <SectionStudents />
      <SectionSource />
      <SectionWatch />
      <SectionFAQ />
      <SectionFinalCTA />
    </main>
    <SectionFooter />
  </div>
</template>
