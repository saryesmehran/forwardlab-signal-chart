import type { IChartApi, ISeriesApi, Logical } from "lightweight-charts";
import type { Bar, Drawing, DrawingPoint } from "./types";

/**
 * Time ↔ logical index over the loaded bars.
 *
 * Drawings store real times, but the time scale is index-based: weekends and
 * gaps take no space, and points to the right of the last bar (a zone that
 * ends in the future) have no bar at all. So a time inside the data maps to
 * its bar index plus the fraction of the way to the next bar, and a time
 * outside the data is extrapolated one `step` per bar.
 */
export function timeToLogical(bars: Bar[], step: number, time: number): number | null {
  const n = bars.length;
  if (n === 0) return null;
  const first = bars[0].time;
  const last = bars[n - 1].time;
  if (time <= first) return (time - first) / step;
  if (time >= last) return n - 1 + (time - last) / step;
  let lo = 0;
  let hi = n - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (bars[mid].time <= time) lo = mid;
    else hi = mid;
  }
  const t0 = bars[lo].time;
  const t1 = bars[hi].time;
  return lo + (time - t0) / (t1 - t0);
}

export function logicalToTime(bars: Bar[], step: number, logical: number): number | null {
  const n = bars.length;
  if (n === 0) return null;
  if (logical <= 0) return Math.round(bars[0].time + logical * step);
  if (logical >= n - 1) return Math.round(bars[n - 1].time + (logical - (n - 1)) * step);
  const i = Math.floor(logical);
  const frac = logical - i;
  return Math.round(bars[i].time + frac * (bars[i + 1].time - bars[i].time));
}

export interface Ctx {
  chart: IChartApi;
  series: ISeriesApi<"Candlestick">;
  bars: Bar[];
  step: number;
}

export interface ScreenPoint {
  x: number;
  y: number;
}

export function toScreen(c: Ctx, p: DrawingPoint): ScreenPoint | null {
  const logical = timeToLogical(c.bars, c.step, p.time);
  if (logical === null) return null;
  const x = c.chart.timeScale().logicalToCoordinate(logical as Logical);
  const y = c.series.priceToCoordinate(p.price);
  if (x === null || y === null) return null;
  return { x, y };
}

export function fromScreen(c: Ctx, x: number, y: number): DrawingPoint | null {
  const logical = c.chart.timeScale().coordinateToLogical(x);
  const price = c.series.coordinateToPrice(y);
  if (logical === null || price === null) return null;
  const time = logicalToTime(c.bars, c.step, logical);
  if (time === null) return null;
  return { time, price };
}

function distToSegment(px: number, py: number, a: ScreenPoint, b: ScreenPoint): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - a.x) * dx + (py - a.y) * dy) / len2));
  return Math.hypot(px - (a.x + t * dx), py - (a.y + t * dy));
}

const HIT = 6;
const HANDLE_HIT = 8;

export type Hit = { id: string; part: "body" } | { id: string; part: "handle"; index: number };

/** Topmost drawing under the pointer: handles of the selected one first, then bodies, last drawn wins. */
export function hitTest(c: Ctx, drawings: Drawing[], selectedId: string | null, x: number, y: number): Hit | null {
  const selected = drawings.find((d) => d.id === selectedId);
  if (selected && selected.type !== "hline") {
    const pts = handlePoints(c, selected);
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      if (p && Math.hypot(p.x - x, p.y - y) <= HANDLE_HIT) return { id: selected.id, part: "handle", index: i };
    }
  }
  for (let i = drawings.length - 1; i >= 0; i--) {
    const d = drawings[i];
    if (d.type === "hline") {
      const y0 = c.series.priceToCoordinate(d.points[0].price);
      if (y0 !== null && Math.abs(y0 - y) <= HIT) return { id: d.id, part: "body" };
      continue;
    }
    const a = toScreen(c, d.points[0]);
    const b = toScreen(c, d.points[1]);
    if (!a || !b) continue;
    if (d.type === "trendline") {
      if (distToSegment(x, y, a, b) <= HIT) return { id: d.id, part: "body" };
    } else {
      const left = Math.min(a.x, b.x) - HIT;
      const right = Math.max(a.x, b.x) + HIT;
      const top = Math.min(a.y, b.y) - HIT;
      const bottom = Math.max(a.y, b.y) + HIT;
      if (x >= left && x <= right && y >= top && y <= bottom) return { id: d.id, part: "body" };
    }
  }
  return null;
}

/** Screen positions of a drawing's draggable handles (a rect has its 2 stored corners). */
export function handlePoints(c: Ctx, d: Drawing): (ScreenPoint | null)[] {
  return d.points.map((p) => toScreen(c, p));
}
