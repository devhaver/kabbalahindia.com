// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  future: { compatibilityVersion: 4 },

  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@nuxt/fonts",
    "@nuxt/eslint",
    "@vueuse/nuxt",
    "@weburz/carousel",
    "@nuxtjs/seo",
  ],

  // Powers @nuxtjs/seo: canonical URLs, robots.txt, sitemap.xml, schema.org.
  site: {
    url: "https://kabbalahindia.com",
    name: "Kabbalah Academy India",
    description:
      "A free introductory course in authentic Kabbalah, taught in English. New cohorts start regularly — join free.",
    defaultLocale: "en",
  },

  // /lessons is listed; individual lessons are canonical on the lessons site,
  // so they stay out of the sitemap.
  sitemap: {
    urls: ["/lessons"],
    exclude: [/^\/lessons\/./],
  },

  // The org identity behind the site — emitted as schema.org JSON-LD.
  schemaOrg: {
    identity: {
      type: "Organization",
      name: "Kabbalah Academy India",
      url: "https://kabbalahindia.com",
      sameAs: [
        "https://www.youtube.com/@kabbalah_india",
        "https://www.kabbalah.info/",
      ],
    },
  },

  // No generated OG images — runtime image rendering is extra Worker weight
  // on Cloudflare for little gain on a single-page site.
  ogImage: { enabled: false },

  css: ["~/assets/css/main.css"],

  // Deps Vite's initial scan can't see (client-only plugin imports, deps of
  // auto-imported composables) — pre-bundle to avoid a dev page reload.
  vite: {
    optimizeDeps: {
      include: ["@unhead/schema-org/vue", "valibot"],
    },
  },

  ui: {
    colorMode: false,
    // Only generate theme classes for the Nuxt UI components the page uses.
    experimental: { componentDetection: true },
  },

  // Icons the page uses by static name; bundling them avoids runtime
  // requests to the icon API (SignupSuccess shows its download icon after
  // a client-side state change, so the scanner misses it).
  icon: {
    clientBundle: {
      icons: ["lucide:download", "lucide:check", "lucide:arrow-up-right"],
      scan: true,
    },
  },

  // Only what the design uses: DM Serif Display (regular + italic quotes),
  // Tiro Devanagari Hindi for the one Hindi line, Inter 400/500/600.
  // `display: swap` keeps text visible while the fonts load.
  fonts: {
    families: [
      {
        name: "DM Serif Display",
        provider: "google",
        weights: [400],
        styles: ["normal", "italic"],
        display: "swap",
      },
      {
        name: "Tiro Devanagari Hindi",
        provider: "google",
        weights: [400],
        styles: ["normal"],
        display: "swap",
      },
      {
        name: "Inter",
        provider: "google",
        weights: [400, 500, 600],
        styles: ["normal"],
        display: "swap",
      },
    ],
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "Kabbalah Academy India",
      // description/OG/canonical come from the page's useSeoMeta + @nuxtjs/seo.
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#f7f9fc" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22%3E%3Crect width=%2232%22 height=%2232%22 rx=%226%22 fill=%22%231A1A4D%22/%3E%3Ctext x=%2216%22 y=%2222%22 font-family=%22DM Serif Display,Georgia,serif%22 font-size=%2220%22 text-anchor=%22middle%22 fill=%22%23E27A2E%22%3EK%3C/text%3E%3C/svg%3E",
        },
      ],
    },
  },

  // Deployed to Cloudflare Pages. The homepage is prerendered for instant
  // TTFB and served from the global CDN, /api/* runs as a Worker.
  ssr: true,

  nitro: {
    preset: "cloudflare-pages",
    // Everything renders via the Worker so server/middleware/canonical.ts
    // can intercept pages.dev requests and 301 them to the apex domain.
    // Prerendering / would skip the Worker and break the redirect.
    routeRules: {
      "/**": {
        headers: {
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          "Strict-Transport-Security":
            "max-age=63072000; includeSubDomains; preload",
          "Permissions-Policy":
            "geolocation=(), microphone=(), camera=(), payment=(), interest-cohort=()",
          "X-DNS-Prefetch-Control": "off",
        },
      },
      // The free-book PDF is for signups, not search. Static files bypass the
      // Worker; the cloudflare-pages preset writes these rules to dist/_headers
      // where Cloudflare merges them with the "/*" rule above.
      "/downloads/**": {
        headers: {
          "X-Robots-Tag": "noindex, nofollow",
        },
      },
      // Only the signup endpoint is no-store; the lessons API sets its own
      // short public Cache-Control in its handlers.
      "/api/signup": {
        cors: false,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    },
  },

  runtimeConfig: {
    // Generic webhook — receives every accepted signup as JSON.
    // Leave empty to skip (useful in dev / before the receiver is wired up).
    signupWebhookUrl: "",
    // Optional bearer token for the generic webhook receiver to verify the call.
    signupWebhookToken: "",
    // Telegram bot for instant in-pocket notifications. Both must be set.
    // Get the token from @BotFather, then message the bot once and read
    // chat_id from https://api.telegram.org/bot<TOKEN>/getUpdates
    telegramBotToken: "",
    telegramChatId: "",
    // Meta Conversions API (CAPI) — server-side Lead events, deduped against
    // the browser Pixel via a shared event_id. Set the System-User access
    // token via NUXT_META_CAPI_ACCESS_TOKEN. When empty (or the Pixel ID is
    // unset), the server skips CAPI delivery.
    metaCapiAccessToken: "",
    // Optional. Set NUXT_META_CAPI_TEST_EVENT_CODE while validating events in
    // Events Manager → Test Events; leave empty in production.
    metaCapiTestEventCode: "",
    public: {
      whatsappUrl: "https://chat.whatsapp.com/BDHXWFurg7QIWbqN9e4lQe",
      // Self-hosted Umami at https://umami.weburz.com. Set the site UUID via
      // NUXT_PUBLIC_UMAMI_WEBSITE_ID — when empty, app.vue skips the script.
      umamiWebsiteId: "",
      // Meta Pixel ID. Set via NUXT_PUBLIC_META_PIXEL_ID — when empty, the
      // meta-pixel.client.ts plugin skips loading the Pixel entirely. Also
      // used server-side to build the CAPI endpoint URL.
      metaPixelId: "",
      // Daily Lessons site the /lessons pages read from. Set via
      // NUXT_PUBLIC_LESSONS_BASE_URL (e.g. to a local mirror in dev).
      lessonsBaseUrl: "https://bb-docs.github.io",
    },
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },

  experimental: {
    payloadExtraction: false,
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },
});
