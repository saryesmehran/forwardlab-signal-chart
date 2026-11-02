/** Click placements, one utm_content each (PARTNER_SIGNAL_CHART_BRIEF.fa.md §3). */
export type Placement = "chart_watermark" | "chart_cta" | "signal_detail";

export const FORWARDLAB_URL = "https://forwardlab.ir/";

/**
 * The ForwardLab landing link for one placement. utm_medium and utm_campaign
 * are fixed for this partnership; `ref` is added on top of UTM, never instead.
 */
export function buildForwardLabUrl(opts: {
  partner: string;
  placement: Placement;
  refCode?: string;
  utmId?: string;
}): string {
  const url = new URL(FORWARDLAB_URL);
  if (opts.refCode) url.searchParams.set("ref", opts.refCode);
  url.searchParams.set("utm_source", opts.partner.trim().toLowerCase());
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", "partner_signal_chart");
  url.searchParams.set("utm_content", opts.placement);
  if (opts.utmId) url.searchParams.set("utm_id", opts.utmId);
  return url.toString();
}
