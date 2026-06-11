// Lightweight conversion tracking. Pushes events to window.dataLayer
// (GTM/GA4 compatible) and dispatches a CustomEvent for any local listeners.
// In dev, logs to the console for visibility.
export type AnalyticsEvent =
  | "enquiry_submit"
  | "enquiry_cta_click"
  | "agent_call_click"
  | "agent_tour_click"
  | "property_save"
  | "property_share"
  | "property_print"
  | "gallery_open"
  | "gallery_next"
  | "gallery_prev";

export interface AnalyticsPayload {
  property_id?: string;
  property_ref?: string;
  property_title?: string;
  property_price?: string;
  property_type?: string;
  property_region?: string;
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(event: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;
  const data = { event, ...payload, timestamp: Date.now() };
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
    window.dispatchEvent(new CustomEvent("gv:track", { detail: data }));
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.info("[analytics]", event, payload);
    }
  } catch {
    // no-op
  }
}
