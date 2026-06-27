// Meta Pixel loader. Mirrors umami.client.ts: reads the ID from public runtime
// config and skips entirely when unset, so dev/preview stay clean until
// NUXT_PUBLIC_META_PIXEL_ID is provided. Fires PageView on load; the Lead
// event is fired from the sign-up form on success (see SectionFinalCTA.vue),
// with a shared event_id so the server-side CAPI event dedupes against it.

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded: boolean;
  version: string;
  push: Fbq;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export default defineNuxtPlugin(() => {
  const { metaPixelId } = useRuntimeConfig().public;

  // Provide a no-op-safe tracker regardless, so callers never need to guard
  // on window.fbq existing. When the Pixel is disabled it simply does nothing.
  const track = (
    event: string,
    params?: Record<string, unknown>,
    options?: { eventID?: string },
  ) => {
    window.fbq?.("track", event, params ?? {}, options);
  };

  if (!metaPixelId) {
    return { provide: { metaTrack: track } };
  }

  // Standard Meta Pixel bootstrap (the official snippet, hand-typed).
  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue.push(args);
    }
  } as Fbq;

  if (!window._fbq) window._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;

  useHead({
    script: [
      {
        defer: true,
        src: "https://connect.facebook.net/en_US/fbevents.js",
      },
    ],
  });

  window.fbq("init", metaPixelId);
  window.fbq("track", "PageView");

  return { provide: { metaTrack: track } };
});
