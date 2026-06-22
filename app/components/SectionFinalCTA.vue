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

const onSubmit = async () => {
  submitting.value = true;
  submitError.value = "";
  try {
    await $fetch("/api/signup", {
      method: "POST",
      body: {
        name: state.name,
        whatsapp: state.whatsapp,
        email: state.email,
        website: state.website,
      },
    });
    submitted.value = true;
  } catch (err: unknown) {
    const e = err as { statusCode?: number; statusMessage?: string };
    submitError.value =
      e.statusCode === 429
        ? "Too many attempts — please try again in a bit."
        : e.statusMessage ||
          `Something went wrong. WhatsApp us if it keeps failing.`;
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <section id="signup" class="bg-indigo-500 text-cream-300 relative">
    <ParticleBackdrop
      :config="{
        count: 40,
        color: ['#c89b3c', '#f5ebd7', '#e27a2e'],
        size: { min: 1, max: 2.5 },
        opacity: { min: 0.08, max: 0.35 },
        speed: { min: 0.08, max: 0.35 },
        linked: { distance: 130, color: '#c89b3c', opacity: 0.12 },
      }"
    />
    <div
      class="relative mx-auto flex max-w-2xl flex-col gap-[1.375rem] px-9 py-[2.25rem] md:py-24"
    >
      <div class="flex flex-col gap-3 md:items-center md:text-center">
        <Eyebrow text="JOIN" tone="gold" />
        <BilingualHeading
          :en-lines="['Just three details.', `That's all we need.`]"
          size="lg"
          tone="on-dark"
          :accent-index="1"
        />
        <p
          class="font-body-en text-cream-300/75 max-w-prose text-[1.0625rem] md:text-base"
        >
          Name, WhatsApp, email. No password. No payment.
        </p>
      </div>

      <Transition name="fade" mode="out-in">
        <div
          v-if="submitted"
          key="success"
          class="bg-cream-300 text-charcoal-800 flex flex-col items-start gap-3 rounded-[0.875rem] p-[1.125rem] md:p-8"
        >
          <div
            class="bg-forest-500 flex h-12 w-12 items-center justify-center rounded-full"
          >
            <UIcon name="i-lucide-check" class="text-cream-300 h-6 w-6" />
          </div>
          <h3 class="font-display-en text-indigo-500 text-2xl md:text-3xl">
            Welcome, friend.
          </h3>
          <p class="font-body-en text-charcoal-700 text-base md:text-base">
            A real teacher will WhatsApp you within an hour.
          </p>
        </div>

        <UForm
          v-else
          key="form"
          :schema="schema"
          :state="state"
          class="bg-cream-300 flex flex-col gap-4 rounded-[0.875rem] p-[1.125rem] md:p-8"
          @submit="onSubmit"
        >
          <UFormField label="NAME" name="name" required>
            <UInput
              v-model="state.name"
              placeholder="Your name"
              size="xl"
              autocomplete="name"
              class="w-full"
              :ui="{ base: 'font-body-en' }"
            />
          </UFormField>

          <UFormField label="WHATSAPP" name="whatsapp" required>
            <UInput
              v-model="state.whatsapp"
              type="tel"
              inputmode="numeric"
              placeholder="98XXX XXXXX"
              size="xl"
              autocomplete="tel-national"
              class="w-full"
              :ui="{ base: 'font-body-en' }"
            >
              <template #leading>
                <span
                  class="font-body-en text-charcoal-800 text-[1.0625rem] font-medium"
                >
                  +91
                </span>
              </template>
            </UInput>
          </UFormField>

          <UFormField label="EMAIL" name="email" required>
            <UInput
              v-model="state.email"
              type="email"
              placeholder="your@email.com"
              size="xl"
              autocomplete="email"
              class="w-full"
              :ui="{ base: 'font-body-en' }"
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
            class="text-vermillion-500 font-body-en bg-vermillion-500/10 rounded-md px-3 py-2 text-[1rem]"
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
            class="text-charcoal-800 mt-2"
          >
            Join the community
          </UButton>

          <div class="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
            <span
              v-for="t in ['No payment', 'No login', 'Unsubscribe anytime']"
              :key="t"
              class="text-charcoal-500 flex items-center gap-[0.25rem] text-[0.9375rem]"
            >
              <UIcon
                name="i-lucide-check"
                class="text-forest-500 h-[0.625rem] w-[0.625rem]"
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
        class="font-body-en text-cream-300/70 hover:text-gold-500 inline-flex items-center gap-[0.375rem] text-[1rem] transition-colors"
      >
        Or open WhatsApp directly
        <UIcon name="i-lucide-arrow-up-right" class="text-gold-500 h-3 w-3" />
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
