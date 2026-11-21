<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

const route = useRoute();
const whatsappUrl = useWhatsApp();

const title = computed(() =>
  props.error.statusCode === 404
    ? "Page not found — Kabbalah Academy India"
    : "Something went wrong — Kabbalah Academy India",
);

useSeoMeta({ title, ogTitle: title, robots: "noindex" });

const leaveTo = (redirect: string) => clearError({ redirect });
const retry = () => reloadNuxtApp({ path: route.fullPath });
</script>

<template>
  <UApp>
    <SiteHeader />
    <ErrorScene
      :status-code="error.statusCode ?? 500"
      :path="route.path"
      :whatsapp-url="whatsappUrl"
      @home="leaveTo('/')"
      @lessons="leaveTo('/lessons')"
      @retry="retry"
    />
  </UApp>
</template>
