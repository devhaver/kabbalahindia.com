// Meta Conversions API (CAPI) — server-side Lead events. Sent alongside the
// browser Pixel and deduplicated by Meta via a shared event_id, so leads still
// land when the browser Pixel is blocked (ad-blockers, iOS tracking limits).
// https://developers.facebook.com/docs/marketing-api/conversions-api

const GRAPH_API_VERSION = "v21.0";

export type MetaCapiLead = {
  email: string; // already lowercased, e.g. "user@example.com"
  whatsapp: string; // "+919876543210"
  eventId?: string; // shared with the browser Pixel for dedup
  eventSourceUrl?: string; // the page the lead came from
  clientIp?: string | null;
  userAgent?: string | null;
  fbp?: string | null; // _fbp cookie
  fbc?: string | null; // _fbc cookie
  eventTime?: number; // unix seconds; defaults to now
};

// Meta requires PII normalized then SHA-256 hashed (lowercase hex).
const sha256Hex = async (value: string): Promise<string> => {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

export const normalizeEmail = (email: string): string =>
  email.trim().toLowerCase();

// "+919876543210" → "919876543210" (digits only, country code included).
export const normalizePhone = (waWithPlus: string): string =>
  waWithPlus.replace(/\D/g, "");

/**
 * Build the CAPI request body for a single Lead event. Pure aside from the
 * async hashing — easy to unit-test.
 */
export const buildMetaCapiPayload = async (
  lead: MetaCapiLead,
  testEventCode?: string,
): Promise<Record<string, unknown>> => {
  const [em, ph] = await Promise.all([
    sha256Hex(normalizeEmail(lead.email)),
    sha256Hex(normalizePhone(lead.whatsapp)),
  ]);

  const userData: Record<string, unknown> = { em: [em], ph: [ph] };
  if (lead.clientIp) userData.client_ip_address = lead.clientIp;
  if (lead.userAgent) userData.client_user_agent = lead.userAgent;
  if (lead.fbp) userData.fbp = lead.fbp;
  if (lead.fbc) userData.fbc = lead.fbc;

  const event: Record<string, unknown> = {
    event_name: "Lead",
    event_time: lead.eventTime ?? Math.floor(Date.now() / 1000),
    action_source: "website",
    user_data: userData,
  };
  if (lead.eventId) event.event_id = lead.eventId;
  if (lead.eventSourceUrl) event.event_source_url = lead.eventSourceUrl;

  return {
    data: [event],
    ...(testEventCode ? { test_event_code: testEventCode } : {}),
  };
};

export const sendMetaCapiLead = async (
  pixelId: string,
  accessToken: string,
  lead: MetaCapiLead,
  testEventCode?: string,
): Promise<void> => {
  const body = await buildMetaCapiPayload(lead, testEventCode);
  await $fetch(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events`,
    {
      method: "POST",
      query: { access_token: accessToken },
      body,
      timeout: 5000,
    },
  );
};
