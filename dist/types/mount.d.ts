import type { Drawing, SignalChartProps } from "./types";
export interface MountedChart {
    /** Change any option, e.g. `update({ timeframe: "H1" })` or new drawings from the server. */
    update(next: Partial<SignalChartProps>): void;
    getDrawings(): Drawing[];
    /** The chart as a PNG data URL, watermark included. */
    screenshot(): string | null;
    destroy(): void;
}
/**
 * Plain-JS entry for pages without React of their own: renders the chart into
 * `el` and returns a handle. Drawings are kept here, so the page only needs to
 * listen to `onDrawingsChange` to save them.
 */
export declare function mount(el: HTMLElement, options: SignalChartProps): MountedChart;
