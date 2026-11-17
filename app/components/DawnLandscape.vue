<!-- Decorative blue-dawn landscape for the hero (pre-rendered rasters; sources
     in designs/landscape). The parent must be `relative` with overflow hidden. -->
<template>
  <picture>
    <source
      media="(max-width: 820px)"
      srcset="/landscape/hero-mobile.webp 1x, /landscape/hero-mobile-2x.webp 2x"
      width="390"
      height="520"
    />
    <img
      src="/landscape/hero-desktop.webp"
      alt=""
      width="1440"
      height="820"
      decoding="async"
      fetchpriority="high"
      class="dawn"
    />
  </picture>
</template>

<style scoped>
.dawn {
  position: absolute;
  z-index: 0;
  inset: auto 0 0 0;
  width: 100%;
  height: auto;
  pointer-events: none;
  /* Fade the image's top edge into the hero's CSS sky so no seam shows. */
  -webkit-mask-image: linear-gradient(to bottom, transparent, #000 22%);
  mask-image: linear-gradient(to bottom, transparent, #000 22%);
}

@media (min-width: 821px) {
  .dawn {
    inset: 0;
    height: 100%;
    object-fit: cover;
    object-position: 50% 100%;
    -webkit-mask-image: none;
    mask-image: none;
  }
}
</style>
