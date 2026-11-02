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
export function createForwardLabFeed(
  opts: { apiKey?: string; engineUrl?: string; pollMs?: number } = {},
): Datafeed {
  const base = (opts.engineUrl ?? FORWARDLAB_ENGINE_URL).replace(/\/+$/, "");
  const pollMs = opts.pollMs ?? 3000;
  const apiKey = opts.apiKey?.trim();
  // A custom header makes the browser preflight, so send it only when there is a key.
  const init: RequestInit | undefined = apiKey ? { headers: { "X-Embed-Key": apiKey } } : undefined;

  const get = async (symbol: string, tf: string, limit: number, toSec?: number): Promise<Bar[]> => {
    const q = new URLSearchParams({ symbol, tf, limit: String(Math.min(limit, 1000)) });
    if (toSec !== undefined) q.set("to", String(Math.floor(toSec) * 1000));
    const res = await fetch(`${base}/api/v1/client/market/candles?${q}`, init);
    if (!res.ok) {
      const code = await res
        .json()
        .then((b: { error_code?: string }) => b.error_code)
        .catch(() => undefined);
      throw new Error(`ForwardLab feed: HTTP ${res.status}${code ? ` ${code}` : ""}`);
    }
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

const shared = new Map<string, Datafeed>();

/** One feed per key for every chart on the page that didn't bring its own. */
export function defaultFeed(apiKey?: string): Datafeed {
  const k = apiKey?.trim() ?? "";
  let feed = shared.get(k);
  if (!feed) shared.set(k, (feed = createForwardLabFeed({ apiKey: k || undefined })));
  return feed;
}
