/** Instruments the partner chart serves today. */
export declare const SYMBOLS: readonly ["XAUUSD", "EURUSD", "GBPUSD", "USDCHF"];
export type SignalSymbol = (typeof SYMBOLS)[number];
/** Timeframes the partner chart serves; the engine serves all of them natively. */
export declare const TIMEFRAMES: readonly ["M1", "M5", "M15", "H1", "H4"];
export type Timeframe = (typeof TIMEFRAMES)[number];
export declare const TIMEFRAME_SECONDS: Record<Timeframe, number>;
/** Price precision per symbol: gold in cents, the FX pairs in fifth decimals. */
export declare const SYMBOL_PRECISION: Record<SignalSymbol, number>;
/** One candle. `time` is the bucket start in UTC epoch SECONDS. */
export interface Bar {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
}
/**
 * Where the candles come from. The chart ships with the ForwardLab feed and
 * uses it unless a `datafeed` prop overrides it (offline demos, tests).
 */
export interface Datafeed {
    /**
     * Bars oldest → newest. Without `to`, the newest `limit` bars. With `to`
     * (epoch seconds, exclusive), the `limit` bars before it, used when the
     * user scrolls back. An empty array means "no more history".
     */
    getBars(req: {
        symbol: SignalSymbol;
        timeframe: Timeframe;
        limit: number;
        to?: number;
    }): Promise<Bar[]>;
    /**
     * Optional live updates. Call `onBar` with the forming bar (same `time` =
     * replace) or a new one (later `time` = append). Returns an unsubscribe.
     */
    subscribe?(req: {
        symbol: SignalSymbol;
        timeframe: Timeframe;
    }, onBar: (bar: Bar) => void): () => void;
}
export type DrawingType = "trendline" | "hline" | "rect";
export declare const DRAWING_TYPES: DrawingType[];
/** A point on the chart: UTC epoch seconds + price. */
export interface DrawingPoint {
    time: number;
    price: number;
}
/**
 * One drawing, as plain JSON. The partner stores these on its own server and
 * decides which ones each user receives; this library only draws them.
 *
 * Points: trendline 2, hline 1 (time unused), rect 2 opposite corners. A rect's
 * two times are its time range, so a zone can start and end at given candles.
 */
export interface Drawing {
    id: string;
    type: DrawingType;
    points: DrawingPoint[];
    /** Falls back to the strategy's colour, then to the default. */
    color?: string;
    /** Line width in px, 1–4. */
    width?: number;
    dashed?: boolean;
    /** Short text shown on the drawing, e.g. "TP1" or "Buy zone". */
    label?: string;
    /** Which strategy/pack this drawing belongs to. */
    strategyId?: string;
}
export interface Strategy {
    id: string;
    name: string;
    color?: string;
}
export type ChartMode = "admin" | "viewer";
export type ChartTheme = "dark" | "light";
export type ChartLocale = "fa" | "en";
export interface SignalChartProps {
    /** `admin` gets the drawing tools and symbol/timeframe pickers; `viewer` is read-only. */
    mode: ChartMode;
    symbol: SignalSymbol;
    /** Chosen by the admin; a viewer sees exactly this timeframe. */
    timeframe: Timeframe;
    /** Prices come from ForwardLab by default; override only for demos and tests. */
    datafeed?: Datafeed;
    /** ForwardLab embed key (`fl_pk_…`). Lets the chart load prices on any domain. */
    apiKey?: string;
    /** Controlled drawings. Leave undefined to let the chart keep its own (seeded by `defaultDrawings`). */
    drawings?: Drawing[];
    defaultDrawings?: Drawing[];
    /** Fires after every finished edit (create, move, restyle, delete) with the full list. */
    onDrawingsChange?: (drawings: Drawing[]) => void;
    /** Admin only: symbol / timeframe pickers call these. Without them the pickers are hidden. */
    onSymbolChange?: (symbol: SignalSymbol) => void;
    onTimeframeChange?: (timeframe: Timeframe) => void;
    /** Strategies the drawings belong to. Viewers can toggle them on and off. */
    strategies?: Strategy[];
    /** Admin: which tools the toolbar offers. Default: all three. */
    tools?: DrawingType[];
    theme?: ChartTheme;
    locale?: ChartLocale;
    /** Chart area height in px. Default 480. The width follows the container. */
    height?: number;
    /** Required: the partner slug, used as utm_source on every ForwardLab link. */
    partner: string;
    /** Optional affiliate code / utm_id issued by ForwardLab. */
    refCode?: string;
    utmId?: string;
    /** Hide the CTA button under the chart. The watermark is always shown. */
    hideCta?: boolean;
    /**
     * Fires when the watermark or the CTA is clicked, for the partner's own
     * analytics event. Must not block: the link opens regardless.
     */
    onLinkClick?: (placement: "chart_watermark" | "chart_cta") => void;
}
export interface SignalChartHandle {
    /** The chart as a canvas, watermark included. */
    screenshot(): HTMLCanvasElement | null;
    getDrawings(): Drawing[];
}
