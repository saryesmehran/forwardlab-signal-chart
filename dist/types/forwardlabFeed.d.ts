import type { Datafeed } from "./types";
export declare const FORWARDLAB_ENGINE_URL = "https://engin.forwardlab.ir";
/**
 * Prices straight from the ForwardLab engine — the chart's default feed, so a
 * host page supplies no data of its own.
 *
 *   GET {engine}/api/v1/client/market/candles?symbol&tf&limit[&to=<ms>]
 *
 * Rows are oldest → newest, `bucket` is the bar start in UTC epoch ms, OHLC
 * are decimal strings (bid side).
 *
 * Access: with an embed key (`fl_pk_…`, issued by ForwardLab) the engine serves
 * any origin. The key is sent as `X-Embed-Key`, and only when given: without
 * one the request stays a plain GET, which the engine answers for allowlisted
 * origins only (forwardlab.ir itself). The key is publishable — it sits in the
 * page source by design and grants read-only market data, nothing else.
 *
 * Live updates poll the newest 2 bars every `pollMs`; the chart replaces the
 * forming bar or appends the next one.
 */
export declare function createForwardLabFeed(opts?: {
    apiKey?: string;
    engineUrl?: string;
    pollMs?: number;
}): Datafeed;
/** One feed per key for every chart on the page that didn't bring its own. */
export declare function defaultFeed(apiKey?: string): Datafeed;
