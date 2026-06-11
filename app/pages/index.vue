<script setup lang="ts">
useSeoMeta({
  title: "Kabbalah Academy India · असली कबाला, अब भारत में।",
  ogTitle: "Kabbalah Academy India",
  description:
    "A free introductory course in authentic Kabbalah, taught in English and Hindi. New cohorts start regularly — join free.",
});
</script>

<template>
  <!-- pt compensates for the fixed SiteHeader (h-[3.25rem]) in app.vue;
       pb clears the fixed mobile WhatsAppBar. -->
  <div id="top" class="bg-cream-300 min-h-screen pt-[3.25rem] pb-14 md:pb-0">
    <TricolorStrip />
    <main>
      <SectionHero />
      <SectionMoments />
      <SectionIndianVoice />
      <SectionValueStack />
      <SectionWhatChanges />
      <SectionLineage />
      <SectionRavLaitman />
      <SectionRavQuote />
      <SectionTeachers />
      <SectionStudents />
      <SectionProgram />
      <SectionDayInside />
      <SectionMelodies />
      <SectionWisdomVideo />
      <SectionAfterCourse />
      <SectionFAQ />
      <SectionFinalCTA />
      <SectionFooter />
    </main>
  </div>
</template>
