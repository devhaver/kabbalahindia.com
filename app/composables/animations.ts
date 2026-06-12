import type { Ref } from "vue";

export const useGsap = () => {
  const nuxtApp = useNuxtApp();

  return {
    gsap: nuxtApp.$gsap,
    ScrollTrigger: nuxtApp.$ScrollTrigger,
    SplitText: nuxtApp.$SplitText,
  };
};

/**
 * Runs `setup` inside gsap.matchMedia() gated on prefers-reduced-motion, so
 * reduced-motion users never see the animations and a live preference change
 * reverts every tween created inside. FOUC rule: never pre-hide elements in
 * CSS or templates — only gsap.from/fromTo inside `setup` — so the no-JS and
 * reduced-motion render is always the final state.
 */
export const useMotionSafe = (
  scope: Ref<HTMLElement | null>,
  setup: gsap.ContextFunc,
) => {
  const { gsap } = useGsap();
  let mm: gsap.MatchMedia | undefined;

  onMounted(async () => {
    await nextTick();
    if (!scope.value) return;
    mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", setup, scope.value);
  });

  onUnmounted(() => mm?.revert());
};

/** Stagger-reveal the children of a container once it scrolls into view. */
export const useStaggerReveal = (
  scope: Ref<HTMLElement | null>,
  options: {
    selector?: string;
    y?: number;
    stagger?: number;
    start?: string;
  } = {},
) => {
  const { gsap } = useGsap();
  const { selector, y = 28, stagger = 0.12, start = "top 80%" } = options;

  useMotionSafe(scope, () => {
    const el = scope.value!;
    const targets = selector
      ? el.querySelectorAll(selector)
      : Array.from(el.children);
    gsap.from(targets, {
      y,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger,
      scrollTrigger: { trigger: el, start, once: true },
    });
  });
};
