<script setup lang="ts">
// Verified via Spotify oEmbed (2026-06-12): official Bnei Baruch artist
// page and a community playlist of the convention melodies.
const embeds = [
  {
    src: "https://open.spotify.com/embed/artist/4xPRNAqZnPXVq6JvAa4BGK?utm_source=generator",
    title: "Bnei Baruch on Spotify",
  },
  {
    src: "https://open.spotify.com/embed/playlist/5XfyilnnvQCaWbIpMygOKb?utm_source=generator",
    title: "Kabbalah Music (Bnei Baruch) — playlist",
  },
];
</script>

<template>
  <section class="bg-cream-400">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-[1.375rem] px-8 py-12 md:px-12 md:py-20"
    >
      <Eyebrow text="MELODIES" tone="maroon" />
      <BilingualHeading :en-lines="['Wisdom you can hear.']" size="md" />
      <p
        class="font-body-en text-charcoal-700 max-w-prose text-[1.0625rem] md:text-base"
      >
        Baal HaSulam composed melodies to carry what words can't. A century
        later they're still sung — at every convention, in every language.
      </p>
      <div class="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
        <iframe
          v-for="e in embeds"
          :key="e.src"
          :src="e.src"
          :title="e.title"
          width="100%"
          height="352"
          frameborder="0"
          loading="lazy"
          allow="
            autoplay;
            clipboard-write;
            encrypted-media;
            fullscreen;
            picture-in-picture;
          "
          class="rounded-[0.75rem]"
        />
      </div>
    </div>
  </section>
</template>
