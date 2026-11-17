<script setup lang="ts">
import * as v from "valibot";

const schema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(2, "Please enter your name.")),
  whatsapp: v.pipe(
    v.string(),
    v.trim(),
    v.regex(/^\d{10}$/, "Enter your 10-digit number."),
  ),
  email: v.pipe(v.string(), v.trim(), v.email("Enter a valid email.")),
});

type SignupForm = v.InferOutput<typeof schema>;

const waUrl = useWhatsApp();
const book = useFreeBook();

const state = reactive<Partial<SignupForm> & { website: string }>({
  name: "",
  whatsapp: "",
  email: "",
  // Honeypot — must stay empty. Hidden via CSS, only bots fill it.
  website: "",
});

const submitting = ref(false);
const submitted = ref(false);
const submitError = ref("");

const fieldLabelClass = "text-mist-700 text-[0.75rem]";
const inputClass =
  "font-body-en bg-white text-ink-500 ring-mist-300 focus-visible:ring-indigo-500";

const { $metaTrack, $umamiTrack } = useNuxtApp();

const onSubmit = async () => {
  submitting.value = true;
  submitError.value = "";
  // Shared id so the browser Pixel Lead and the server-side CAPI Lead dedupe.
  const eventId = crypto.randomUUID();
  try {
    await $fetch("/api/signup", {
      method: "POST",
      body: {
        name: state.name,
        whatsapp: state.whatsapp,
        email: state.email,
        website: state.website,
        eventId,
      },
    });
    submitted.value = true;
    // Fire the conversion through both analytics — Meta for ad optimization,
    // Umami for first-party funnel/Goal tracking.
    $metaTrack("Lead", { content_name: "signup" }, { eventID: eventId });
    $umamiTrack("signup");
  } catch (err: unknown) {
    const e = err as { statusCode?: number; statusMessage?: string };
    submitError.value =
      e.statusMessage ||
      `Something went wrong. WhatsApp us if it keeps failing.`;
  } finally {
    submitting.value = false;
  }
};

const onBookDownload = () => {
  $umamiTrack("book-download");
};
</script>

<template>
  <section id="signup" class="bg-mist-100 relative">
    <div
      class="relative mx-auto flex max-w-[40rem] flex-col gap-8 px-6 py-16 md:px-9 md:py-24"
    >
      <div class="flex flex-col gap-3 text-center md:items-center">
        <p
          class="font-body-en text-mist-700 text-[0.875rem] font-medium uppercase"
          style="letter-spacing: 0.18em"
        >
          JOIN
        </p>
        <h2
          class="font-display-en text-indigo-500 text-[2rem] leading-tight text-balance md:text-[2.5rem]"
        >
          Just three details. That's all we need.
        </h2>
        <p class="font-body-en text-ink-400 max-w-prose text-[1.0625rem]">
          Name, WhatsApp, email. No password. No payment.
        </p>
      </div>

      <div
        class="border-mist-200 flex items-center gap-4 border-y py-5 md:gap-5"
      >
        <img
          :src="book.coverPath"
          :width="book.coverWidth"
          :height="book.coverHeight"
          :alt="`Cover of ${book.title}, a book by ${book.author}`"
          loading="lazy"
          decoding="async"
          class="border-mist-200 aspect-[2/3] w-24 shrink-0 rounded-[6px] border md:w-28"
        />
        <div class="flex flex-col gap-1">
          <p
            class="font-body-en text-mist-700 text-[0.75rem] font-medium uppercase"
            style="letter-spacing: 0.16em"
          >
            Free with your signup
          </p>
          <p class="font-display-en text-indigo-500 text-[1.5rem] leading-snug">
            {{ book.title }}
          </p>
          <p class="font-body-en text-ink-500 text-[1rem]">
            A {{ book.pages }}-page book by {{ book.author }}. Yours as a PDF
            the moment you join.
          </p>
        </div>
      </div>

      <Transition name="fade" mode="out-in">
        <SignupSuccess
          v-if="submitted"
          key="success"
          :whatsapp-url="waUrl"
          @book-download="onBookDownload"
        />

        <UForm
          v-else
          key="form"
          :schema="schema"
          :state="state"
          class="flex flex-col gap-4"
          @submit="onSubmit"
        >
          <UFormField
            label="NAME"
            name="name"
            required
            :ui="{ label: fieldLabelClass }"
          >
            <UInput
              v-model="state.name"
              placeholder="Your name"
              size="xl"
              autocomplete="name"
              class="w-full"
              :ui="{ base: inputClass }"
            />
          </UFormField>

          <UFormField
            label="WHATSAPP"
            name="whatsapp"
            required
            :ui="{ label: fieldLabelClass }"
          >
            <UInput
              v-model="state.whatsapp"
              type="tel"
              inputmode="numeric"
              placeholder="98XXX XXXXX"
              size="xl"
              autocomplete="tel-national"
              class="w-full"
              :ui="{ base: `${inputClass} ps-14` }"
            >
              <template #leading>
                <span
                  class="font-body-en text-ink-500 pr-1 text-[1.0625rem] font-medium"
                >
                  +91
                </span>
              </template>
            </UInput>
          </UFormField>

          <UFormField
            label="EMAIL"
            name="email"
            required
            :ui="{ label: fieldLabelClass }"
          >
            <UInput
              v-model="state.email"
              type="email"
              placeholder="your@email.com"
              size="xl"
              autocomplete="email"
              class="w-full"
              :ui="{ base: inputClass }"
            />
          </UFormField>

          <!-- Honeypot: hidden from real users, only bots fill it. -->
          <div
            class="absolute -left-[100rem] h-0 w-0 overflow-hidden"
            aria-hidden="true"
          >
            <label for="kai-website">Website</label>
            <input
              id="kai-website"
              v-model="state.website"
              type="text"
              tabindex="-1"
              autocomplete="off"
            />
          </div>

          <p
            v-if="submitError"
            class="font-body-en bg-red-50 text-red-700 rounded-md px-3 py-2 text-[1rem]"
            role="alert"
          >
            {{ submitError }}
          </p>

          <UButton
            type="submit"
            size="xl"
            block
            :loading="submitting"
            trailing-icon="i-lucide-arrow-right"
            :ui="{
              base: 'min-h-12 justify-center gap-2 text-base font-semibold',
              trailingIcon: 'ms-0 size-5',
            }"
            class="bg-saffron-500 hover:bg-saffron-600 text-indigo-500 mt-2"
          >
            Join the community
          </UButton>

          <p class="font-body-en text-ink-500 text-center text-[1rem]">
            Next cohort begins soon · Live every morning, 6:30 AM IST
          </p>

          <div
            class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
          >
            <span
              v-for="t in ['No payment', 'No login', 'Unsubscribe anytime']"
              :key="t"
              class="text-ink-400 flex items-center gap-[0.25rem] text-[0.9375rem]"
            >
              <UIcon
                name="i-lucide-check"
                class="text-mist-600 h-[0.625rem] w-[0.625rem]"
              />
              {{ t }}
            </span>
          </div>
        </UForm>
      </Transition>

      <a
        :href="waUrl"
        target="_blank"
        rel="noopener"
        class="font-body-en text-ink-400 hover:text-indigo-500 focus-visible:outline-indigo-500 -my-2 inline-flex min-h-11 items-center gap-[0.375rem] self-center rounded-sm text-[1rem] underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Or open WhatsApp directly
        <UIcon name="i-lucide-arrow-up-right" class="h-3 w-3" />
      </a>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
