type Umami = {
  track: (event: string, data?: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    umami?: Umami;
  }
}

export default defineNuxtPlugin(() => {
  const { umamiWebsiteId } = useRuntimeConfig().public;

  // Symmetric with meta-pixel.client.ts: a no-op-safe tracker so callers never
  // need to guard on window.umami. Fire the same funnel actions through both
  // ($umamiTrack here, $metaTrack there) to keep the two analytics in step.
  const track = (event: string, data?: Record<string, unknown>) => {
    window.umami?.track(event, data);
  };

  if (!umamiWebsiteId) {
    return { provide: { umamiTrack: track } };
  }

  useHead({
    script: [
      {
        defer: true,
        src: "https://umami.weburz.com/script.js",
        "data-website-id": umamiWebsiteId,
      },
    ],
  });

  return { provide: { umamiTrack: track } };
});
