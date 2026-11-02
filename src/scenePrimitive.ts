import type { CanvasRenderingTarget2D } from "fancy-canvas";
import type {
  IChartApi,
  ISeriesPrimitivePaneRenderer,
  ISeriesPrimitivePaneView,
  ISeriesApi,
  ISeriesPrimitive,
  SeriesAttachedParameter,
  Time,
} from "lightweight-charts";
import { handlePoints, toScreen, type Ctx } from "./geometry";
import type { Bar, ChartTheme, Drawing } from "./types";

export const DEFAULT_COLOR = "#8b6cf6";

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
export const WATERMARK = { width: 120, height: 30, margin: 10 };

/**
 * Drawings and the ForwardLab watermark, painted inside the chart's own
 * canvas. That is the point of doing it as a primitive rather than a DOM
 * overlay: chart.takeScreenshot() includes it, and host CSS can't hide or
 * cover it without hiding the chart itself.
 */
export class ScenePrimitive implements ISeriesPrimitive<Time> {
  private chart: IChartApi | null = null;
  private series: ISeriesApi<"Candlestick"> | null = null;
  private requestUpdate: (() => void) | null = null;
  private readonly views: ISeriesPrimitivePaneView[];

  constructor(private readonly getState: () => SceneState) {
    const renderer: ISeriesPrimitivePaneRenderer = {
      draw: (target) => this.draw(target),
    };
    this.views = [{ renderer: () => renderer, zOrder: () => "top" }];
  }

  attached(p: SeriesAttachedParameter<Time>): void {
    this.chart = p.chart as IChartApi;
    this.series = p.series as ISeriesApi<"Candlestick">;
    this.requestUpdate = p.requestUpdate;
  }

  detached(): void {
    this.chart = null;
    this.series = null;
    this.requestUpdate = null;
  }

  paneViews(): readonly ISeriesPrimitivePaneView[] {
    return this.views;
  }

  /** Repaint after the state changed outside of a chart interaction. */
  redraw(): void {
    this.requestUpdate?.();
  }

  private draw(target: CanvasRenderingTarget2D): void {
    const chart = this.chart;
    const series = this.series;
    if (!chart || !series) return;
    const s = this.getState();
    const c: Ctx = { chart, series, bars: s.bars, step: s.step };

    target.useMediaCoordinateSpace(({ context: ctx, mediaSize }) => {
      const all = s.draft ? [...s.drawings, s.draft] : s.drawings;
      for (const d of all) drawOne(ctx, c, d, s, mediaSize.width, d.id === s.selectedId || d === s.draft);
      drawWatermark(ctx, s, mediaSize.width, mediaSize.height);
    });
  }
}

function withAlpha(hex: string, alpha: number): string {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

function drawOne(
  ctx: CanvasRenderingContext2D,
  c: Ctx,
  d: Drawing,
  s: SceneState,
  paneWidth: number,
  selected: boolean,
): void {
  const color = s.colorOf(d);
  const width = Math.max(1, Math.min(4, d.width ?? 2));
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.setLineDash(d.dashed ? [6, 4] : []);

  let labelAt: { x: number; y: number; align: CanvasTextAlign } | null = null;

  if (d.type === "hline") {
    const y = c.series.priceToCoordinate(d.points[0].price);
    if (y === null) return ctx.restore();
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(paneWidth, y);
    ctx.stroke();
    drawPriceTag(ctx, d.points[0].price.toFixed(s.precision), paneWidth, y, color);
    labelAt = { x: 8, y: y - 6, align: "left" };
  } else {
    const a = toScreen(c, d.points[0]);
    const b = toScreen(c, d.points[1] ?? d.points[0]);
    if (!a || !b) return ctx.restore();
    if (d.type === "trendline") {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      const top = a.y < b.y ? a : b;
      labelAt = { x: top.x, y: top.y - 6, align: "center" };
    } else {
      const x = Math.min(a.x, b.x);
      const y = Math.min(a.y, b.y);
      const w = Math.abs(a.x - b.x);
      const h = Math.abs(a.y - b.y);
      ctx.fillStyle = withAlpha(color, 0.16);
      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);
      labelAt = { x: x + 6, y: y + 14, align: "left" };
    }
  }

  if (d.label && labelAt) {
    ctx.setLineDash([]);
    ctx.font = "600 12px Estedad, Vazirmatn, Tahoma, system-ui, sans-serif";
    ctx.textAlign = labelAt.align;
    ctx.fillStyle = color;
    ctx.fillText(d.label, labelAt.x, labelAt.y);
  }

  if (selected) {
    ctx.setLineDash([]);
    const pts = d.type === "hline" ? [] : handlePoints(c, d);
    for (const p of pts) {
      if (!p) continue;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = s.theme === "dark" ? "#0f1016" : "#ffffff";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawPriceTag(ctx: CanvasRenderingContext2D, text: string, paneWidth: number, y: number, color: string): void {
  ctx.setLineDash([]);
  ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  const w = ctx.measureText(text).width + 10;
  ctx.fillStyle = color;
  ctx.fillRect(paneWidth - w, y - 9, w, 18);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(text, paneWidth - w + 5, y);
  ctx.textBaseline = "alphabetic";
}

function drawWatermark(ctx: CanvasRenderingContext2D, s: SceneState, w: number, h: number): void {
  if (!s.logo || !s.logo.complete || s.logo.naturalWidth === 0) return;
  const { width, height, margin } = WATERMARK;
  ctx.save();
  ctx.globalAlpha = 0.9;
  ctx.drawImage(s.logo, w - width - margin, h - height - margin, width, height);
  ctx.restore();
}
