<script setup lang="ts">
// Site-wide share card (static, rendered from designs/og). Pages override it
// with their own useSeoMeta. The URL must be absolute for scrapers.
const { url } = useSiteConfig();

useSeoMeta({
  ogLocale: "en_IN",
  ogImage: `${url}/og-dawn.jpg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt:
    "Kabbalah Academy India — Free, online, authentic Kabbalah taught live.",
  twitterCard: "summary_large_image",
  twitterImage: `${url}/og-dawn.jpg`,
});
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <SiteHeader />
    <NuxtPage />
    <WhatsAppBar />
  </UApp>
</template>
