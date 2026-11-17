// @vitest-environment nuxt

import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";

import VideoFacade from "../../app/components/VideoFacade.vue";

const props = { id: "wC3QgL8oJQA", title: "Does nature sing?" };

describe("components/VideoFacade.vue", () => {
  it("shows a lazy thumbnail and no iframe before a tap", async () => {
    const component = await mountSuspended(VideoFacade, { props });
    const img = component.get("img");

    expect(img.attributes("src")).toBe(
      "https://i.ytimg.com/vi/wC3QgL8oJQA/hqdefault.jpg",
    );
    expect(img.attributes("loading")).toBe("lazy");
    expect(img.attributes("width")).toBe("480");
    expect(img.attributes("height")).toBe("360");
    expect(component.find("iframe").exists()).toBe(false);
  });

  it("labels the play button with the video title", async () => {
    const component = await mountSuspended(VideoFacade, { props });

    expect(component.get("button").attributes("aria-label")).toBe(
      "Play: Does nature sing?",
    );
  });

  it("swaps in the privacy-enhanced autoplay embed on tap", async () => {
    const component = await mountSuspended(VideoFacade, { props });

    await component.get("button").trigger("click");
    const frame = component.get("iframe");

    expect(frame.attributes("src")).toBe(
      "https://www.youtube-nocookie.com/embed/wC3QgL8oJQA?autoplay=1&playsinline=1&rel=0",
    );
    expect(frame.attributes("title")).toBe("Does nature sing?");
    expect(component.find("button").exists()).toBe(false);
  });

  it("uses a 16:9 slot by default, 9:16 for tall and 1:1 for square", async () => {
    const wide = await mountSuspended(VideoFacade, { props });
    const tall = await mountSuspended(VideoFacade, {
      props: { ...props, shape: "tall" },
    });
    const square = await mountSuspended(VideoFacade, {
      props: { ...props, shape: "square" },
    });

    expect(wide.attributes("style")).toContain("aspect-ratio: 16 / 9");
    expect(tall.attributes("style")).toContain("aspect-ratio: 9 / 16");
    expect(square.attributes("style")).toContain("aspect-ratio: 1 / 1");
  });

  it("shows a custom poster in its own ratio, then the player ratio", async () => {
    const poster = {
      src: "/people/shamir-intro-480.webp",
      width: 480,
      height: 573,
      alt: "Shamir Shimshon Galsurkar",
      ratio: "4 / 5",
    };
    const component = await mountSuspended(VideoFacade, {
      props: { ...props, shape: "tall", poster },
    });

    expect(component.get("img").attributes("src")).toBe(poster.src);
    expect(component.get("img").attributes("alt")).toBe(poster.alt);
    expect(component.attributes("style")).toContain("aspect-ratio: 4 / 5");

    await component.get("button").trigger("click");

    expect(component.attributes("style")).toContain("aspect-ratio: 9 / 16");
  });
});
