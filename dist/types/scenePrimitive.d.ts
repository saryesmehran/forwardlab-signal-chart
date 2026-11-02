import type { ISeriesPrimitivePaneView, ISeriesPrimitive, SeriesAttachedParameter, Time } from "lightweight-charts";
import type { Bar, ChartTheme, Drawing } from "./types";
export declare const DEFAULT_COLOR = "#8b6cf6";
/** Everything the layer draws, read fresh on every paint. */
export interface SceneState {
    bars: Bar[];
    step: number;
    drawings: Drawing[];
    draft: Drawing | null;
    selectedId: string | null;
    colorOf: (d: Drawing) => string;
    precision: number;
    theme: ChartTheme;
    logo: HTMLImageElement | null;
}
/** Watermark box in pane coordinates, shared with the DOM link laid over it. */
export declare const WATERMARK: {
    width: number;
    height: number;
    margin: number;
};
/**
 * Drawings and the ForwardLab watermark, painted inside the chart's own
 * canvas. That is the point of doing it as a primitive rather than a DOM
 * overlay: chart.takeScreenshot() includes it, and host CSS can't hide or
 * cover it without hiding the chart itself.
 */
export declare class ScenePrimitive implements ISeriesPrimitive<Time> {
    private readonly getState;
    private chart;
    private series;
    private requestUpdate;
    private readonly views;
    constructor(getState: () => SceneState);
    attached(p: SeriesAttachedParameter<Time>): void;
    detached(): void;
    paneViews(): readonly ISeriesPrimitivePaneView[];
    /** Repaint after the state changed outside of a chart interaction. */
    redraw(): void;
    private draw;
}
