// @vitest-environment nuxt

import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";

import SignupSuccess from "../../app/components/SignupSuccess.vue";

describe("components/SignupSuccess.vue", () => {
  it("renders a safe link to the configured WhatsApp community", async () => {
    const whatsappUrl = "https://chat.whatsapp.com/BDHXWFurg7QIWbqN9e4lQe";
    const component = await mountSuspended(SignupSuccess, {
      props: { whatsappUrl },
    });
    const link = component.get("a");

    expect(link.text()).toContain("Join the WhatsApp community");
    expect(link.attributes("href")).toBe(whatsappUrl);
    expect(link.attributes("target")).toBe("_blank");
    expect(link.attributes("rel")).toBe("noopener");
  });
});
