export default defineAppConfig({
  ui: {
    colors: {
      primary: "saffron",
      neutral: "charcoal",
    },
    button: {
      slots: {
        base: "font-body-en font-medium rounded-full",
      },
      defaultVariants: {
        size: "lg",
        color: "primary",
      },
    },
    input: {
      slots: {
        base: "font-body-en rounded-[0.625rem] bg-white",
      },
    },
    formField: {
      slots: {
        label:
          "font-body-en text-mist-700 text-[0.5625rem] font-medium tracking-[0.16em] uppercase",
      },
    },
    accordion: {
      slots: {
        item: "border-mist-200 border-b last:border-b-0",
        trigger: "font-body-en text-indigo-500 font-medium py-4",
        content: "font-body-en text-ink-500 pb-4",
      },
    },
    badge: {
      slots: {
        base: "font-body-en font-medium rounded-full",
      },
    },
  },
});
