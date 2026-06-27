import { describe, expect, it } from "vitest";
import {
  buildMetaCapiPayload,
  normalizeEmail,
  normalizePhone,
} from "~~/server/utils/meta";

describe("normalizeEmail", () => {
  it("trims and lowercases", () => {
    expect(normalizeEmail("  Priya@Example.COM ")).toBe("priya@example.com");
  });
});

describe("normalizePhone", () => {
  it("strips the plus and all non-digits, keeping the country code", () => {
    expect(normalizePhone("+91 98765 43210")).toBe("919876543210");
    expect(normalizePhone("+919876543210")).toBe("919876543210");
  });
});

describe("buildMetaCapiPayload", () => {
  const baseLead = {
    email: "priya@example.com",
    whatsapp: "+919876543210",
    eventId: "evt-123",
    eventSourceUrl: "https://kabbalahindia.com/#signup",
    clientIp: "203.0.113.7",
    userAgent: "Mozilla/5.0",
    eventTime: 1_750_000_000,
  };

  it("emits a single Lead event with website action_source", async () => {
    const payload = await buildMetaCapiPayload(baseLead);
    const event = (payload.data as Record<string, unknown>[])[0]!;
    expect(event.event_name).toBe("Lead");
    expect(event.action_source).toBe("website");
    expect(event.event_id).toBe("evt-123");
    expect(event.event_source_url).toBe("https://kabbalahindia.com/#signup");
    expect(event.event_time).toBe(1_750_000_000);
  });

  it("hashes email and phone (never sends them in the clear)", async () => {
    const payload = await buildMetaCapiPayload(baseLead);
    const event = (payload.data as Record<string, unknown>[])[0]!;
    const userData = event.user_data as Record<string, string[]>;
    expect(userData.em[0]).toMatch(/^[0-9a-f]{64}$/);
    expect(userData.ph[0]).toMatch(/^[0-9a-f]{64}$/);
    expect(JSON.stringify(payload)).not.toContain("priya@example.com");
    expect(JSON.stringify(payload)).not.toContain("919876543210");
  });

  it("hashes are stable for the same normalized input", async () => {
    const a = await buildMetaCapiPayload(baseLead);
    const b = await buildMetaCapiPayload({
      ...baseLead,
      email: "  PRIYA@example.com  ",
    });
    const em = (data: typeof a) =>
      (
        (data.data as Record<string, unknown>[])[0]!.user_data as Record<
          string,
          string[]
        >
      ).em[0];
    expect(em(a)).toBe(em(b));
    expect(em(a)).toHaveLength(64);
  });

  it("passes client ip and user agent into user_data when present", async () => {
    const payload = await buildMetaCapiPayload(baseLead);
    const userData = (payload.data as Record<string, unknown>[])[0]!
      .user_data as Record<string, unknown>;
    expect(userData.client_ip_address).toBe("203.0.113.7");
    expect(userData.client_user_agent).toBe("Mozilla/5.0");
  });

  it("includes test_event_code only when provided", async () => {
    expect(await buildMetaCapiPayload(baseLead)).not.toHaveProperty(
      "test_event_code",
    );
    const tagged = await buildMetaCapiPayload(baseLead, "TEST123");
    expect(tagged.test_event_code).toBe("TEST123");
  });
});
