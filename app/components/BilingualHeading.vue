<script setup lang="ts">
withDefaults(
  defineProps<{
    enLines: string[];
    hi?: string;
    size?: "sm" | "md" | "lg" | "xl";
    tone?: "on-light" | "on-dark" | "on-maroon";
    accentIndex?: number;
  }>(),
  {
    hi: "",
    size: "lg",
    tone: "on-light",
    accentIndex: -1,
  },
);

const enSizes = {
  sm: "text-[1.375rem] md:text-[1.75rem]",
  md: "text-[1.625rem] md:text-[2.25rem]",
  lg: "text-[1.75rem] md:text-[2.75rem]",
  xl: "text-[2rem] md:text-[3.5rem]",
};

const hiSizes = {
  sm: "text-[1.0625rem] md:text-[1.25rem]",
  md: "text-[1.125rem] md:text-[1.5rem]",
  lg: "text-[1.125rem] md:text-[1.75rem]",
  xl: "text-[1.375rem] md:text-[2rem]",
};

const toneClass = {
  "on-light": "text-indigo-500",
  "on-dark": "text-cream-300",
  "on-maroon": "text-cream-300",
};

const accentClass = {
  "on-light": "text-maroon-500",
  "on-dark": "text-gold-500",
  "on-maroon": "text-gold-500",
};

const hiClass = {
  "on-light": "text-charcoal-500",
  "on-dark": "text-cream-300/75",
  "on-maroon": "text-gold-500",
};

const root = ref<HTMLElement | null>(null);
const { gsap } = useGsap();

useMotionSafe(root, () => {
  gsap.from(root.value!.querySelectorAll("h2 > span, p"), {
    y: 24,
    opacity: 0,
    duration: 0.7,
    ease: "power2.out",
    stagger: 0.12,
    scrollTrigger: { trigger: root.value!, start: "top 85%", once: true },
  });
});
</script>

<template>
  <div ref="root" class="flex flex-col gap-[0.375rem]">
    <h2 :class="['font-display-en text-balance leading-[1.05]', enSizes[size]]">
      <span
        v-for="(line, i) in enLines"
        :key="i"
        class="block"
        :class="i === accentIndex ? accentClass[tone] : toneClass[tone]"
      >
        {{ line }}
      </span>
    </h2>
    <p
      v-if="hi"
      :class="['font-display-hi text-pretty', hiSizes[size], hiClass[tone]]"
    >
      {{ hi }}
    </p>
  </div>
</template>
