import { START_LOCATION } from "vue-router";
import type { RouterConfig } from "@nuxt/schema";

// Custom scroll handling so deep links like /#signup land on the right section.
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // Back/forward — restore where the user was.
    if (savedPosition) return savedPosition;

    const hash = to.hash;
    if (hash && hash.length > 1) {
      // Cold load via a deep link (e.g. opening /#signup directly). The page is
      // image-heavy, so the target's position shifts as content above it loads.
      // Jump instantly once it exists, then re-correct after `load` settles the
      // layout. (Smooth-scrolling the full page height on first paint reads as
      // broken, so we override the CSS `scroll-behavior: smooth` here.)
      if (from === START_LOCATION) {
        return new Promise<false>((resolve) => {
          const jump = () =>
            document.querySelector(hash)?.scrollIntoView({ behavior: "instant" });
          requestAnimationFrame(() => {
            jump();
            if (document.readyState !== "complete") {
              window.addEventListener("load", () => jump(), { once: true });
            }
            resolve(false);
          });
        });
      }

      // In-page anchor click while the app is already running — let the CSS
      // `scroll-behavior: smooth` animate, with scroll-margin-top handling the
      // fixed header offset.
      return { el: hash };
    }

    // Any other navigation — top of the page.
    return { left: 0, top: 0 };
  },
};
