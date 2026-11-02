import type { IChartApi, ISeriesApi } from "lightweight-charts";
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
export declare function timeToLogical(bars: Bar[], step: number, time: number): number | null;
export declare function logicalToTime(bars: Bar[], step: number, logical: number): number | null;
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
export declare function toScreen(c: Ctx, p: DrawingPoint): ScreenPoint | null;
export declare function fromScreen(c: Ctx, x: number, y: number): DrawingPoint | null;
export type Hit = {
    id: string;
    part: "body";
} | {
    id: string;
    part: "handle";
    index: number;
};
/** Topmost drawing under the pointer: handles of the selected one first, then bodies, last drawn wins. */
export declare function hitTest(c: Ctx, drawings: Drawing[], selectedId: string | null, x: number, y: number): Hit | null;
/** Screen positions of a drawing's draggable handles (a rect has its 2 stored corners). */
export declare function handlePoints(c: Ctx, d: Drawing): (ScreenPoint | null)[];
