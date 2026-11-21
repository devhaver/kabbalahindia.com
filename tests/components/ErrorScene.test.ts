// @vitest-environment nuxt

import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";

import ErrorScene from "../../app/components/ErrorScene.vue";

const whatsappUrl = "https://chat.whatsapp.com/BDHXWFurg7QIWbqN9e4lQe";

const mountScene = (statusCode: number, path: string) =>
  mountSuspended(ErrorScene, { props: { statusCode, path, whatsappUrl } });

const buttonLabels = (component: Awaited<ReturnType<typeof mountScene>>) =>
  component.findAll("button").map((b) => b.text());

const button = (
  component: Awaited<ReturnType<typeof mountScene>>,
  text: string,
) => component.findAll("button").find((b) => b.text() === text)!;

describe("components/ErrorScene.vue", () => {
  it("renders the 404 variant with the sun numeral and real text for screen readers", async () => {
    const component = await mountScene(404, "/asdas");

    expect(component.get("h1").text()).toBe("This page isn't here.");
    expect(component.get(".sr-only").text()).toBe("404");
    expect(component.find("[aria-hidden='true']").exists()).toBe(true);
    expect(buttonLabels(component)).toEqual([
      "Go to the home page",
      "Read the daily lessons",
    ]);
  });

  it("renders the lesson variant with the actions swapped", async () => {
    const component = await mountScene(404, "/lessons/nope");

    expect(component.get("h1").text()).toBe("That lesson isn't here.");
    expect(component.get(".sr-only").text()).toBe("404");
    expect(buttonLabels(component)).toEqual([
      "See all lessons",
      "Go to the home page",
    ]);
  });

  it("renders the failure variant with a quiet code and no sun numeral", async () => {
    const component = await mountScene(500, "/");

    expect(component.get("h1").text()).toBe(
      "Something went wrong on our side.",
    );
    expect(component.text()).toContain("Error 500");
    expect(component.find(".sr-only").exists()).toBe(false);
    expect(buttonLabels(component)).toEqual([
      "Try again",
      "Go to the home page",
    ]);
  });

  it("emits home, lessons and retry from the matching buttons", async () => {
    const notFound = await mountScene(404, "/asdas");
    await button(notFound, "Go to the home page").trigger("click");
    await button(notFound, "Read the daily lessons").trigger("click");
    expect(notFound.emitted("home")).toHaveLength(1);
    expect(notFound.emitted("lessons")).toHaveLength(1);

    const lesson = await mountScene(404, "/lessons/nope");
    await button(lesson, "See all lessons").trigger("click");
    expect(lesson.emitted("lessons")).toHaveLength(1);

    const failure = await mountScene(503, "/");
    await button(failure, "Try again").trigger("click");
    expect(failure.emitted("retry")).toHaveLength(1);
  });

  it("links to WhatsApp safely", async () => {
    const component = await mountScene(404, "/asdas");
    const link = component.get("a");

    expect(link.text()).toContain("Message us on WhatsApp");
    expect(link.attributes("href")).toBe(whatsappUrl);
    expect(link.attributes("target")).toBe("_blank");
    expect(link.attributes("rel")).toBe("noopener");
  });

  it("never shows the requested path", async () => {
    const component = await mountScene(404, "/lessons/secret-path-xyz");

    expect(component.text()).not.toContain("secret-path-xyz");
  });
});
