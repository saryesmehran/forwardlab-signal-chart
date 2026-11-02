import type { Bar, Datafeed } from "./types";

export const FORWARDLAB_ENGINE_URL = "https://engin.forwardlab.ir";

interface EngineRow {
  bucket: number;
  open: string;
  high: string;
  low: string;
  close: string;
}

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
export function createForwardLabFeed(opts: { engineUrl?: string; pollMs?: number } = {}): Datafeed {
  const base = (opts.engineUrl ?? FORWARDLAB_ENGINE_URL).replace(/\/+$/, "");
  const pollMs = opts.pollMs ?? 3000;

  const get = async (symbol: string, tf: string, limit: number, toSec?: number): Promise<Bar[]> => {
    const q = new URLSearchParams({ symbol, tf, limit: String(Math.min(limit, 1000)) });
    if (toSec !== undefined) q.set("to", String(Math.floor(toSec) * 1000));
    const res = await fetch(`${base}/api/v1/client/market/candles?${q}`);
    if (!res.ok) throw new Error(`ForwardLab feed: HTTP ${res.status}`);
    const body = (await res.json()) as { success?: boolean; data?: EngineRow[] };
    if (body.success !== true || !Array.isArray(body.data)) throw new Error("ForwardLab feed: bad response");
    return body.data.map((r) => ({
      time: Math.floor(r.bucket / 1000),
      open: Number(r.open),
      high: Number(r.high),
      low: Number(r.low),
      close: Number(r.close),
    }));
  };

  return {
    getBars: ({ symbol, timeframe, limit, to }) => get(symbol, timeframe, limit, to),
    subscribe:
      pollMs > 0
        ? ({ symbol, timeframe }, onBar) => {
            let stopped = false;
            let timer: ReturnType<typeof setTimeout> | undefined;
            const tick = async () => {
              try {
                const bars = await get(symbol, timeframe, 2);
                if (!stopped) for (const b of bars) onBar(b);
              } catch {
                // Transient: the next poll tries again.
              }
              if (!stopped) timer = setTimeout(tick, pollMs);
            };
            timer = setTimeout(tick, pollMs);
            return () => {
              stopped = true;
              clearTimeout(timer);
            };
          }
        : undefined,
  };
}

let shared: Datafeed | null = null;

/** One feed for every chart on the page that didn't bring its own. */
export function defaultFeed(): Datafeed {
  return (shared ??= createForwardLabFeed());
}
