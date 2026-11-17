// @vitest-environment nuxt

import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";

import SignupSuccess from "../../app/components/SignupSuccess.vue";
import { useFreeBook } from "../../app/composables/useFreeBook";

const whatsappUrl = "https://chat.whatsapp.com/BDHXWFurg7QIWbqN9e4lQe";
const book = useFreeBook();

const mountSuccess = () =>
  mountSuspended(SignupSuccess, { props: { whatsappUrl } });

describe("components/SignupSuccess.vue", () => {
  it("renders the welcome heading and the saved-details confirmation", async () => {
    const component = await mountSuccess();

    expect(component.get("h3").text()).toBe("Welcome, friend.");
    expect(component.text()).toContain("Your details are saved");
  });

  it("renders a safe link to the configured WhatsApp community", async () => {
    const component = await mountSuccess();
    const link = component
      .findAll("a")
      .find((a) => a.text().includes("Join the WhatsApp community"));

    expect(link).toBeDefined();
    expect(link!.attributes("href")).toBe(whatsappUrl);
    expect(link!.attributes("target")).toBe("_blank");
    expect(link!.attributes("rel")).toBe("noopener");
  });

  it("links the free book download to the PDF with a download filename", async () => {
    const component = await mountSuccess();
    const link = component
      .findAll("a")
      .find((a) => a.text().includes("Download your free book"));

    expect(link).toBeDefined();
    expect(link!.attributes("href")).toBe(book.pdfPath);
    expect(link!.attributes("download")).toBe(book.downloadName);
  });

  it("shows the book cover with descriptive alt text, title and facts", async () => {
    const component = await mountSuccess();
    const cover = component.get("img");

    expect(cover.attributes("src")).toBe(book.coverPath);
    expect(cover.attributes("alt")).toContain(book.title);
    expect(component.text()).toContain(book.title);
    expect(component.text()).toContain(
      `by ${book.author} · PDF · ${book.pages} pages`,
    );
  });

  it("emits book-download when the download link is clicked", async () => {
    const component = await mountSuccess();
    const link = component
      .findAll("a")
      .find((a) => a.text().includes("Download your free book"));

    await link!.trigger("click");

    expect(component.emitted("book-download")).toHaveLength(1);
  });

  it("does not emit book-download when the WhatsApp link is clicked", async () => {
    const component = await mountSuccess();
    const link = component
      .findAll("a")
      .find((a) => a.text().includes("Join the WhatsApp community"));

    await link!.trigger("click");

    expect(component.emitted("book-download")).toBeUndefined();
  });
});
