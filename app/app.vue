<script setup lang="ts">
const { gsap, ScrollSmoother } = useGsap();

// ScrollSmoother is itself motion — created only when the user allows it, so
// reduced-motion visitors keep plain native scrolling. Single page, so no
// router.afterEach refresh is needed (unlike weburz).
let mm: gsap.MatchMedia | undefined;

// In-page anchor clicks must go through the smoother: the content is moved
// by a transform, so a native hash jump scrolls the real scrollbar while the
// transformed content stays put — the page lands half-rendered. Capture
// phase so this wins over NuxtLink's own click handling.
const headerOffset = () =>
  3.25 * Number.parseFloat(getComputedStyle(document.documentElement).fontSize);

const onAnchorClick = (e: MouseEvent) => {
  if (e.defaultPrevented || e.button !== 0) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const anchor = (e.target as HTMLElement).closest?.('a[href^="#"]');
  if (!anchor) return;
  const hash = anchor.getAttribute("href")!;
  const target = hash.length > 1 && document.querySelector(hash);
  if (!target) return;

  e.preventDefault();
  e.stopPropagation();
  const smoother = ScrollSmoother.get();
  if (smoother) {
    const y = smoother.offset(target, "top top") - headerOffset();
    smoother.scrollTo(Math.max(0, y), true);
  } else {
    const y =
      target.getBoundingClientRect().top + window.scrollY - headerOffset();
    window.scrollTo({ top: Math.max(0, y) });
  }
  history.replaceState(null, "", hash);
};

onMounted(() => {
  mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
    });
    return () => smoother.kill();
  });
  document.addEventListener("click", onAnchorClick, { capture: true });
});

onUnmounted(() => {
  mm?.revert();
  document.removeEventListener("click", onAnchorClick, { capture: true });
});
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <!-- Pinned chrome lives outside the smoother; it transforms #smooth-content. -->
    <SiteHeader />
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <NuxtPage />
      </div>
    </div>
    <WhatsAppBar />
  </UApp>
</template>
