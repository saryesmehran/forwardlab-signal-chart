/** Click placements, one utm_content each (PARTNER_SIGNAL_CHART_BRIEF.fa.md §3). */
export type Placement = "chart_watermark" | "chart_cta" | "signal_detail";
export declare const FORWARDLAB_URL = "https://forwardlab.ir/";
/**
 * The ForwardLab landing link for one placement. utm_medium and utm_campaign
 * are fixed for this partnership; `ref` is added on top of UTM, never instead.
 */
export declare function buildForwardLabUrl(opts: {
    partner: string;
    placement: Placement;
    refCode?: string;
    utmId?: string;
}): string;
