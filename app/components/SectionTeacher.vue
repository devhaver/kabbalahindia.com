<script setup lang="ts">
// The 60-second intro (a Short on youtube.com/@kabbalah_india). A calm still
// stands in until the visitor taps play, so nothing from YouTube loads before
// that; the privacy-enhanced embed then replaces the still.
const introVideoId = "Fo70eIc4O6s";
const introSrc = `https://www.youtube-nocookie.com/embed/${introVideoId}?autoplay=1&playsinline=1&rel=0`;

const playing = ref(false);
</script>

<template>
  <section id="teachers" class="bg-mist-50 px-5 py-20 md:px-6 md:py-28">
    <div class="mx-auto max-w-[71.875rem]">
      <Eyebrow text="Companions on your journey" class="mb-4" />
      <h2
        class="font-display-en text-indigo-500 max-w-[51.25rem] text-[2rem] leading-[1.15] md:text-[2.625rem]"
      >
        Not a guru. A companion on your journey.
      </h2>
      <p
        class="font-body-en text-ink-500 mt-[1.125rem] max-w-[35rem] text-[1.0625rem] leading-relaxed md:text-lg"
      >
        Someone a few steps ahead, walking the same path.
      </p>

      <div
        class="mt-10 grid grid-cols-1 items-center gap-10 md:mt-14 md:grid-cols-2 md:gap-[4.5rem]"
      >
        <figure class="mx-auto w-full">
          <div
            class="bg-mist-200 relative mx-auto overflow-hidden rounded-[1.125rem]"
            :class="playing ? 'aspect-[9/16] max-w-[19rem]' : 'aspect-[16/10]'"
          >
            <iframe
              v-if="playing"
              :src="introSrc"
              title="Shamir Galsurkar — 60-second intro to Kabbalah"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowfullscreen
              class="absolute inset-0 size-full border-0"
            />
            <button
              v-else
              type="button"
              aria-label="Play the 60-second intro"
              class="group absolute inset-0 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-indigo-500"
              @click="playing = true"
            >
              <img
                src="/people/shamir-poster-600.webp"
                alt="Shamir Shimshon Galsurkar"
                width="600"
                height="375"
                loading="lazy"
                decoding="async"
                class="size-full object-cover"
              />
              <span
                aria-hidden="true"
                class="text-indigo-500 absolute bottom-5 left-5 flex size-[3.25rem] items-center justify-center rounded-full bg-white/90 pl-0.5 transition-colors group-hover:bg-white"
              >
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
                </svg>
              </span>
            </button>
          </div>
          <figcaption class="font-body-en text-ink-400 mt-3 text-sm">
            Watch the 60-second intro
          </figcaption>
        </figure>
        <div>
          <h3 class="font-display-en text-indigo-500 text-[1.625rem]">
            Shamir Shimshon Galsurkar
          </h3>
          <p class="font-body-en text-ink-400 mt-1 mb-[1.125rem] text-sm">
            Your companion · Mumbai
          </p>
          <p class="font-body-en text-ink-500 text-[1.0625rem] leading-[1.7]">
            An engineering consultant with many years of experience in community
            building, education, and personal development. He has been teaching
            and disseminating the wisdom of Kabbalah for many years and serves
            as a coordinator for India, supporting learning, connection, and
            community initiatives.
          </p>
          <p class="font-body-en text-ink-400 mt-3.5 text-sm">
            English · Marathi
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
