import type { Datafeed } from "./types";
export declare const FORWARDLAB_ENGINE_URL = "https://engin.forwardlab.ir";
/**
 * Prices straight from the ForwardLab engine — the chart's default feed, so a
 * host page supplies no data of its own.
 *
 *   GET {engine}/api/v1/client/market/candles?symbol&tf&limit[&to=<ms>]
 *
 * Rows are oldest → newest, `bucket` is the bar start in UTC epoch ms, OHLC
 * are decimal strings (bid side). No auth: the engine serves the last 90 days
 * without one, plenty for signal charts on M1–H4. The engine answers browsers
 * only from allowlisted origins, so the partner's domain must be on that list.
 *
 * Live updates poll the newest 2 bars every `pollMs`; the chart replaces the
 * forming bar or appends the next one.
 */
export declare function createForwardLabFeed(opts?: {
    engineUrl?: string;
    pollMs?: number;
}): Datafeed;
/** One feed for every chart on the page that didn't bring its own. */
export declare function defaultFeed(): Datafeed;
