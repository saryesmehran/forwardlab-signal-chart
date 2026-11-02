import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  ColorType,
  CrosshairMode,
  createChart,
  type CandlestickData,
  type IChartApi,
  type ISeriesApi,
  type Time,
} from "lightweight-charts";
import logoDark from "../assets/logo-dark.svg";
import logoLight from "../assets/logo-light.svg";
import { fromScreen, hitTest, logicalToTime, timeToLogical, type Ctx, type Hit } from "./geometry";
import { defaultFeed } from "./forwardlabFeed";
import { translator } from "./i18n";
import { DEFAULT_COLOR, ScenePrimitive, WATERMARK, type SceneState } from "./scenePrimitive";
import {
  DRAWING_TYPES,
  SYMBOLS,
  SYMBOL_PRECISION,
  TIMEFRAMES,
  TIMEFRAME_SECONDS,
  type Bar,
  type Drawing,
  type DrawingPoint,
  type DrawingType,
  type SignalChartHandle,
  type SignalChartProps,
} from "./types";
import { buildForwardLabUrl } from "./utm";

const PAGE = 500;
const PALETTE = ["#8b6cf6", "#22c55e", "#ef4444", "#f59e0b", "#3b82f6", "#e5e7eb"];

const THEMES = {
  dark: {
    bg: "#0f1016",
    panel: "#16171f",
    border: "rgba(255,255,255,0.08)",
    text: "#d4d6de",
    muted: "#8a8d99",
    grid: "rgba(255,255,255,0.04)",
    up: "rgb(76,175,125)",
    down: "rgb(192,57,43)",
    brand: "#7a5af5",
  },
  light: {
    bg: "#ffffff",
    panel: "#f5f5f8",
    border: "rgba(0,0,0,0.1)",
    text: "#1f2030",
    muted: "#6b6e7b",
    grid: "rgba(0,0,0,0.05)",
    up: "rgb(17,125,61)",
    down: "rgb(202,36,44)",
    brand: "#6a48e8",
  },
};

const FA_FONT = "Estedad, Vazirmatn, Tahoma, system-ui, sans-serif";
const EN_FONT = "Outfit, Inter, system-ui, -apple-system, Segoe UI, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

function newId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `d_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/** Finite, sorted, one bar per time — a custom datafeed may hand us anything. */
function normalizeBars(bars: Bar[]): Bar[] {
  const ok = bars.filter(
    (b) =>
      Number.isFinite(b.time) &&
      Number.isFinite(b.open) &&
      Number.isFinite(b.high) &&
      Number.isFinite(b.low) &&
      Number.isFinite(b.close),
  );
  ok.sort((a, b) => a.time - b.time);
  const out: Bar[] = [];
  for (const b of ok) {
    if (out.length && out[out.length - 1].time === b.time) out[out.length - 1] = b;
    else out.push(b);
  }
  return out;
}

const asData = (bars: Bar[]) => bars as unknown as CandlestickData<Time>[];

interface Drag {
  hit: Hit;
  start: DrawingPoint;
  orig: Drawing;
  preview: Drawing | null;
}

export const SignalChart = forwardRef<SignalChartHandle, SignalChartProps>(function SignalChart(props, ref) {
  const {
    mode,
    symbol,
    timeframe,
    theme = "dark",
    locale = "fa",
    height = 480,
    partner,
    strategies = [],
  } = props;
  const isAdmin = mode === "admin";
  const t = translator(locale);
  const colors = THEMES[theme];
  const font = locale === "fa" ? FA_FONT : EN_FONT;
  const tools = (props.tools ?? DRAWING_TYPES).filter((x) => DRAWING_TYPES.includes(x));

  const [innerDrawings, setInnerDrawings] = useState<Drawing[]>(props.defaultDrawings ?? []);
  const drawings = props.drawings ?? innerDrawings;
  const [tool, setTool] = useState<DrawingType | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hidden, setHidden] = useState<Set<string>>(() => new Set());
  const [activeStrategyId, setActiveStrategyId] = useState<string | undefined>(strategies[0]?.id);
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "error">("loading");
  const [reloadKey, setReloadKey] = useState(0);
  const [wmPos, setWmPos] = useState({ right: 60, bottom: 38 });

  const wrapRef = useRef<HTMLDivElement>(null);
  const chartElRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const primitiveRef = useRef<ScenePrimitive | null>(null);
  const barsRef = useRef<Bar[]>([]);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const draftRef = useRef<{ d: Drawing; downAt: { x: number; y: number } | null } | null>(null);
  const dragRef = useRef<Drag | null>(null);

  const visible = drawings.filter((d) => !d.strategyId || !hidden.has(d.strategyId));
  const strategyColor = new Map(strategies.map((s) => [s.id, s.color]));

  // Everything event handlers and the canvas layer read, refreshed each render
  // so long-lived listeners never act on a stale closure.
  const latest = useRef({ props, drawings, visible, tool, selectedId, activeStrategyId, isAdmin });
  latest.current = { props, drawings, visible, tool, selectedId, activeStrategyId, isAdmin };

  const sceneRef = useRef<() => SceneState>(() => ({}) as SceneState);
  sceneRef.current = () => {
    const drag = dragRef.current;
    const shown = drag?.preview ? visible.map((d) => (d.id === drag.preview!.id ? drag.preview! : d)) : visible;
    return {
      bars: barsRef.current,
      step: TIMEFRAME_SECONDS[timeframe],
      drawings: shown,
      draft: draftRef.current?.d ?? null,
      selectedId,
      colorOf: (d) => d.color ?? (d.strategyId ? strategyColor.get(d.strategyId) : undefined) ?? DEFAULT_COLOR,
      precision: SYMBOL_PRECISION[symbol] ?? 5,
      theme,
      logo: logoRef.current,
    };
  };

  const commit = useCallback((next: Drawing[]) => {
    if (latest.current.props.drawings === undefined) setInnerDrawings(next);
    latest.current.props.onDrawingsChange?.(next);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      screenshot: () => chartRef.current?.takeScreenshot() ?? null,
      getDrawings: () => latest.current.drawings,
    }),
    [],
  );

  // ── chart lifecycle ─────────────────────────────────────────────
  useEffect(() => {
    const el = chartElRef.current;
    if (!el) return;
    const chart = createChart(el, {
      autoSize: true,
      crosshair: { mode: CrosshairMode.Normal },
      timeScale: { timeVisible: true, secondsVisible: false, rightOffset: 8 },
      rightPriceScale: { borderVisible: false },
    });
    const series = chart.addCandlestickSeries({ borderVisible: false });
    const primitive = new ScenePrimitive(() => sceneRef.current());
    series.attachPrimitive(primitive);
    chartRef.current = chart;
    seriesRef.current = series;
    primitiveRef.current = primitive;

    // Keep the clickable watermark link over the painted logo.
    const place = () => {
      setWmPos({
        right: chart.priceScale("right").width() + WATERMARK.margin,
        bottom: chart.timeScale().height() + WATERMARK.margin,
      });
    };
    chart.timeScale().subscribeSizeChange(place);
    const ro = new ResizeObserver(place);
    ro.observe(el);
    return () => {
      ro.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
      primitiveRef.current = null;
    };
  }, []);

  useEffect(() => {
    const chart = chartRef.current;
    const series = seriesRef.current;
    if (!chart || !series) return;
    chart.applyOptions({
      layout: {
        background: { type: ColorType.Solid, color: colors.bg },
        textColor: colors.muted,
        fontFamily: MONO,
      },
      grid: { vertLines: { color: colors.grid }, horzLines: { color: colors.grid } },
      timeScale: { borderColor: colors.border },
    });
    series.applyOptions({
      upColor: colors.up,
      downColor: colors.down,
      wickUpColor: colors.up,
      wickDownColor: colors.down,
    });
    const img = new Image();
    img.onload = () => primitiveRef.current?.redraw();
    img.src = theme === "dark" ? logoDark : logoLight;
    logoRef.current = img;
    primitiveRef.current?.redraw();
  }, [theme, colors]);

  useEffect(() => {
    const precision = SYMBOL_PRECISION[symbol] ?? 5;
    seriesRef.current?.applyOptions({
      priceFormat: { type: "price", precision, minMove: 1 / 10 ** precision },
    });
  }, [symbol]);

  // ── data ────────────────────────────────────────────────────────
  useEffect(() => {
    const chart = chartRef.current;
    const series = seriesRef.current;
    if (!chart || !series) return;
    const feed = latest.current.props.datafeed ?? defaultFeed();
    let alive = true;
    let unsubscribe: (() => void) | undefined;
    let loadingMore = false;
    let hasMore = true;

    barsRef.current = [];
    series.setData([]);
    setStatus("loading");

    const onBar = (raw: Bar) => {
      if (!alive) return;
      const [bar] = normalizeBars([raw]);
      if (!bar) return;
      const bars = barsRef.current;
      const last = bars[bars.length - 1];
      if (last && bar.time < last.time) return;
      if (last && bar.time === last.time) bars[bars.length - 1] = bar;
      else bars.push(bar);
      series.update(bar as unknown as CandlestickData<Time>);
      if (bars.length === 1) setStatus("ready");
    };

    const loadOlder = async () => {
      const bars = barsRef.current;
      if (loadingMore || !hasMore || bars.length === 0) return;
      loadingMore = true;
      try {
        const first = bars[0].time;
        const res = await feed.getBars({ symbol, timeframe, limit: PAGE, to: first });
        if (!alive) return;
        const older = normalizeBars(res).filter((b) => b.time < first);
        if (older.length === 0) {
          hasMore = false;
          return;
        }
        const range = chart.timeScale().getVisibleLogicalRange();
        barsRef.current = [...older, ...barsRef.current];
        series.setData(asData(barsRef.current));
        if (range) {
          chart.timeScale().setVisibleLogicalRange({
            from: range.from + older.length,
            to: range.to + older.length,
          });
        }
      } catch {
        // A failed page just stops paging; scrolling back retries it.
      } finally {
        loadingMore = false;
      }
    };

    const onRange = (range: { from: number; to: number } | null) => {
      if (range && range.from < 10) void loadOlder();
    };

    feed
      .getBars({ symbol, timeframe, limit: PAGE })
      .then((res) => {
        if (!alive) return;
        const bars = normalizeBars(res);
        barsRef.current = bars;
        series.setData(asData(bars));
        const n = bars.length;
        if (n > 0) chart.timeScale().setVisibleLogicalRange({ from: Math.max(0, n - 150), to: n + 8 });
        setStatus(n > 0 ? "ready" : "empty");
        chart.timeScale().subscribeVisibleLogicalRangeChange(onRange);
        unsubscribe = feed.subscribe?.({ symbol, timeframe }, onBar);
      })
      .catch(() => alive && setStatus("error"));

    return () => {
      alive = false;
      unsubscribe?.();
      chart.timeScale().unsubscribeVisibleLogicalRangeChange(onRange);
    };
  }, [symbol, timeframe, reloadKey]);

  // Drop a selection or draft that no longer exists / no longer applies.
  useEffect(() => {
    if (selectedId && !drawings.some((d) => d.id === selectedId)) setSelectedId(null);
  }, [drawings, selectedId]);
  useEffect(() => {
    draftRef.current = null;
    dragRef.current = null;
    setTool(null);
    setSelectedId(null);
  }, [symbol, timeframe, mode]);

  // Repaint the canvas layer whenever React state it reads changed.
  useEffect(() => {
    primitiveRef.current?.redraw();
  });

  // ── admin interaction ──────────────────────────────────────────
  useEffect(() => {
    const wrap = chartElRef.current;
    if (!wrap || !isAdmin) return;

    const ctx = (): Ctx | null => {
      const chart = chartRef.current;
      const series = seriesRef.current;
      if (!chart || !series) return null;
      return { chart, series, bars: barsRef.current, step: TIMEFRAME_SECONDS[timeframe] };
    };

    /** Pointer position in pane coordinates, or null when over an axis. */
    const local = (clientX: number, clientY: number) => {
      const chart = chartRef.current;
      if (!chart) return null;
      const r = wrap.getBoundingClientRect();
      const x = clientX - r.left;
      const y = clientY - r.top;
      const paneW = chart.timeScale().width();
      const paneH = r.height - chart.timeScale().height();
      if (x < 0 || y < 0 || x > paneW || y > paneH) return null;
      return { x, y };
    };

    const finishDraft = () => {
      const draft = draftRef.current;
      if (!draft) return;
      draftRef.current = null;
      const L = latest.current;
      commit([...L.drawings, draft.d]);
      setSelectedId(draft.d.id);
      setTool(null);
    };

    const moved = (orig: Drawing, start: DrawingPoint, now: DrawingPoint, c: Ctx, hit: Hit): Drawing => {
      if (hit.part === "handle") {
        const points = orig.points.slice();
        points[hit.index] = now;
        return { ...orig, points };
      }
      const dp = now.price - start.price;
      if (orig.type === "hline") return { ...orig, points: [{ ...orig.points[0], price: orig.points[0].price + dp }] };
      const l0 = timeToLogical(c.bars, c.step, start.time);
      const l1 = timeToLogical(c.bars, c.step, now.time);
      const dl = l0 === null || l1 === null ? 0 : l1 - l0;
      return {
        ...orig,
        points: orig.points.map((p) => {
          const l = timeToLogical(c.bars, c.step, p.time);
          const time = l === null ? p.time : logicalToTime(c.bars, c.step, l + dl) ?? p.time;
          return { time, price: p.price + dp };
        }),
      };
    };

    const onMove = (clientX: number, clientY: number) => {
      const c = ctx();
      const pos = local(clientX, clientY);
      if (!c || !pos) return;
      const p = fromScreen(c, pos.x, pos.y);
      if (!p) return;
      if (draftRef.current) {
        const d = draftRef.current.d;
        draftRef.current.d = { ...d, points: [d.points[0], p] };
        primitiveRef.current?.redraw();
        return;
      }
      const drag = dragRef.current;
      if (drag) {
        drag.preview = moved(drag.orig, drag.start, p, c, drag.hit);
        primitiveRef.current?.redraw();
        return;
      }
      const L = latest.current;
      if (L.tool) {
        wrap.style.cursor = "crosshair";
        return;
      }
      const hit = hitTest(c, L.visible, L.selectedId, pos.x, pos.y);
      wrap.style.cursor = !hit ? "" : hit.part === "handle" ? "grab" : "pointer";
    };

    const onUp = (clientX: number, clientY: number) => {
      window.removeEventListener("mousemove", onWinMouseMove);
      window.removeEventListener("mouseup", onWinMouseUp);
      window.removeEventListener("touchmove", onWinTouchMove);
      window.removeEventListener("touchend", onWinTouchEnd);
      const draft = draftRef.current;
      if (draft?.downAt) {
        // Press-drag-release draws in one gesture; a plain click waits for the second click.
        const far = Math.hypot(clientX - draft.downAt.x, clientY - draft.downAt.y) > 6;
        draft.downAt = null;
        if (far) finishDraft();
        return;
      }
      const drag = dragRef.current;
      dragRef.current = null;
      if (drag?.preview) {
        const L = latest.current;
        commit(L.drawings.map((d) => (d.id === drag.preview!.id ? drag.preview! : d)));
      }
      primitiveRef.current?.redraw();
    };

    const onWinMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onWinMouseUp = (e: MouseEvent) => onUp(e.clientX, e.clientY);
    const onWinTouchMove = (e: TouchEvent) => {
      const tt = e.touches[0];
      if (!tt) return;
      e.preventDefault();
      onMove(tt.clientX, tt.clientY);
    };
    const onWinTouchEnd = (e: TouchEvent) => {
      const tt = e.changedTouches[0];
      onUp(tt?.clientX ?? 0, tt?.clientY ?? 0);
    };

    /** Returns true when the gesture is ours (the chart must not pan). */
    const onDown = (clientX: number, clientY: number): boolean => {
      const c = ctx();
      const pos = local(clientX, clientY);
      if (!c || !pos) return false;
      const p = fromScreen(c, pos.x, pos.y);
      if (!p) return false;
      const L = latest.current;

      if (draftRef.current) {
        draftRef.current.d = { ...draftRef.current.d, points: [draftRef.current.d.points[0], p] };
        finishDraft();
        return true;
      }
      if (L.tool) {
        const base = { id: newId(), strategyId: L.activeStrategyId };
        if (L.tool === "hline") {
          const d: Drawing = { ...base, type: "hline", points: [p] };
          commit([...L.drawings, d]);
          setSelectedId(d.id);
          setTool(null);
          return true;
        }
        draftRef.current = { d: { ...base, type: L.tool, points: [p, p] }, downAt: { x: clientX, y: clientY } };
        primitiveRef.current?.redraw();
        return true;
      }
      const hit = hitTest(c, L.visible, L.selectedId, pos.x, pos.y);
      if (!hit) {
        if (L.selectedId) setSelectedId(null);
        return false;
      }
      const orig = L.drawings.find((d) => d.id === hit.id);
      if (!orig) return false;
      setSelectedId(hit.id);
      dragRef.current = { hit, start: p, orig, preview: null };
      return true;
    };

    const take = () => {
      window.addEventListener("mousemove", onWinMouseMove);
      window.addEventListener("mouseup", onWinMouseUp);
      window.addEventListener("touchmove", onWinTouchMove, { passive: false });
      window.addEventListener("touchend", onWinTouchEnd);
    };

    // Capture phase on an ancestor of the chart's canvases: a gesture we take
    // never reaches lightweight-charts, so it doesn't pan under the tool.
    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (onDown(e.clientX, e.clientY)) {
        e.stopPropagation();
        e.preventDefault();
        // preventDefault also cancels the focus change; Delete/Escape need it.
        wrapRef.current?.focus({ preventScroll: true });
        take();
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      const tt = e.touches[0];
      if (!tt || e.touches.length > 1) return;
      if (onDown(tt.clientX, tt.clientY)) {
        e.stopPropagation();
        e.preventDefault();
        take();
      }
    };
    const onHover = (e: MouseEvent) => {
      if (!dragRef.current) onMove(e.clientX, e.clientY);
    };

    wrap.addEventListener("mousedown", onMouseDown, { capture: true });
    wrap.addEventListener("touchstart", onTouchStart, { capture: true, passive: false });
    wrap.addEventListener("mousemove", onHover);
    return () => {
      wrap.removeEventListener("mousedown", onMouseDown, { capture: true });
      wrap.removeEventListener("touchstart", onTouchStart, { capture: true });
      wrap.removeEventListener("mousemove", onHover);
      window.removeEventListener("mousemove", onWinMouseMove);
      window.removeEventListener("mouseup", onWinMouseUp);
      window.removeEventListener("touchmove", onWinTouchMove);
      window.removeEventListener("touchend", onWinTouchEnd);
      wrap.style.cursor = "";
    };
  }, [isAdmin, timeframe, commit]);

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (!isAdmin) return;
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT" || target.tagName === "SELECT") return;
    if (e.key === "Escape") {
      draftRef.current = null;
      setTool(null);
      setSelectedId(null);
    } else if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
      e.preventDefault();
      commit(drawings.filter((d) => d.id !== selectedId));
      setSelectedId(null);
    }
  };

  const updateSelected = (patch: Partial<Drawing>) => {
    if (!selectedId) return;
    commit(drawings.map((d) => (d.id === selectedId ? { ...d, ...patch } : d)));
  };

  const selected = isAdmin ? drawings.find((d) => d.id === selectedId) ?? null : null;
  const usedStrategies = isAdmin
    ? strategies
    : strategies.filter((s) => drawings.some((d) => d.strategyId === s.id));

  const link = (placement: "chart_watermark" | "chart_cta") =>
    buildForwardLabUrl({ partner, placement, refCode: props.refCode, utmId: props.utmId });

  // ── styles ─────────────────────────────────────────────────────
  const btn = (active: boolean): CSSProperties => ({
    font: "inherit",
    fontSize: 12,
    padding: "5px 10px",
    borderRadius: 8,
    border: `1px solid ${active ? colors.brand : colors.border}`,
    background: active ? colors.brand : "transparent",
    color: active ? "#fff" : colors.text,
    cursor: "pointer",
    lineHeight: 1.4,
  });
  const select: CSSProperties = {
    font: "inherit",
    fontSize: 12,
    padding: "4px 6px",
    borderRadius: 8,
    border: `1px solid ${colors.border}`,
    background: colors.bg,
    color: colors.text,
  };
  const bar: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
    padding: "8px 10px",
    background: colors.panel,
    borderBottom: `1px solid ${colors.border}`,
  };
  const mono: CSSProperties = { fontFamily: MONO, direction: "ltr", unicodeBidi: "isolate" };

  return (
    <div
      ref={wrapRef}
      dir={locale === "fa" ? "rtl" : "ltr"}
      tabIndex={isAdmin ? 0 : undefined}
      onKeyDown={onKeyDown}
      style={{
        fontFamily: font,
        color: colors.text,
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        overflow: "hidden",
        outline: "none",
      }}
    >
      <div style={bar}>
        {isAdmin && props.onSymbolChange ? (
          <select
            aria-label="symbol"
            style={{ ...select, ...mono }}
            value={symbol}
            onChange={(e) => props.onSymbolChange?.(e.target.value as typeof symbol)}
          >
            {SYMBOLS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        ) : (
          <span style={{ ...mono, fontWeight: 600, fontSize: 13 }}>{symbol}</span>
        )}
        {isAdmin && props.onTimeframeChange ? (
          <div style={{ display: "flex", gap: 4 }} dir="ltr">
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf}
                type="button"
                style={{ ...btn(tf === timeframe), ...mono }}
                onClick={() => props.onTimeframeChange?.(tf)}
              >
                {tf}
              </button>
            ))}
          </div>
        ) : (
          <span style={{ ...mono, fontSize: 12, color: colors.muted }}>{timeframe}</span>
        )}

        {isAdmin && (
          <>
            <span style={{ width: 1, height: 20, background: colors.border, margin: "0 4px" }} />
            <button type="button" style={btn(tool === null)} onClick={() => setTool(null)}>
              {t("cursor")}
            </button>
            {tools.map((x) => (
              <button
                key={x}
                type="button"
                style={btn(tool === x)}
                onClick={() => {
                  draftRef.current = null;
                  setSelectedId(null);
                  setTool(tool === x ? null : x);
                }}
              >
                {t(x)}
              </button>
            ))}
            {strategies.length > 0 && (
              <select
                aria-label={t("strategy")}
                style={select}
                value={activeStrategyId ?? ""}
                onChange={(e) => setActiveStrategyId(e.target.value || undefined)}
              >
                <option value="">{t("noStrategy")}</option>
                {strategies.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            )}
          </>
        )}
      </div>

      {selected && (
        <SelectionBar
          key={selected.id}
          drawing={selected}
          strategies={strategies}
          t={t}
          colors={colors}
          btn={btn}
          select={select}
          barStyle={bar}
          onPatch={updateSelected}
          onDelete={() => {
            commit(drawings.filter((d) => d.id !== selected.id));
            setSelectedId(null);
          }}
        />
      )}

      {usedStrategies.length > 0 && (
        <div style={{ ...bar, paddingTop: 6, paddingBottom: 6 }}>
          {usedStrategies.map((s) => {
            const off = hidden.has(s.id);
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={!off}
                title={off ? t("showStrategy") : t("hideStrategy")}
                style={{ ...btn(false), opacity: off ? 0.45 : 1, display: "inline-flex", alignItems: "center", gap: 6 }}
                onClick={() =>
                  setHidden((prev) => {
                    const next = new Set(prev);
                    if (next.has(s.id)) next.delete(s.id);
                    else next.add(s.id);
                    return next;
                  })
                }
              >
                <span style={{ width: 8, height: 8, borderRadius: 4, background: s.color ?? DEFAULT_COLOR }} />
                {s.name}
              </button>
            );
          })}
        </div>
      )}

      <div dir="ltr" style={{ position: "relative", height }}>
        <div ref={chartElRef} style={{ position: "absolute", inset: 0 }} />
        <a
          href={link("chart_watermark")}
          target="_blank"
          rel="noopener"
          aria-label={t("watermarkAria")}
          onClick={() => props.onLinkClick?.("chart_watermark")}
          style={{
            position: "absolute",
            right: wmPos.right,
            bottom: wmPos.bottom,
            width: WATERMARK.width,
            height: WATERMARK.height,
            zIndex: 2,
          }}
        />
        {status !== "ready" && (
          <div
            dir={locale === "fa" ? "rtl" : "ltr"}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              fontFamily: font,
              fontSize: 13,
              color: colors.muted,
              pointerEvents: status === "loading" ? "none" : "auto",
              zIndex: 1,
            }}
          >
            {status === "loading" && t("loading")}
            {status === "empty" && t("noData")}
            {status === "error" && (
              <>
                {t("error")}
                <button type="button" style={btn(true)} onClick={() => setReloadKey((k) => k + 1)}>
                  {t("retry")}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {!props.hideCta && (
        <div style={{ padding: 10, borderTop: `1px solid ${colors.border}`, background: colors.panel }}>
          <a
            href={link("chart_cta")}
            target="_blank"
            rel="noopener"
            onClick={() => props.onLinkClick?.("chart_cta")}
            style={{
              display: "block",
              textAlign: "center",
              padding: "10px 14px",
              borderRadius: 10,
              background: colors.brand,
              color: "#fff",
              fontFamily: font,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {t("cta")}
          </a>
        </div>
      )}
    </div>
  );
});

function SelectionBar(p: {
  drawing: Drawing;
  strategies: { id: string; name: string }[];
  t: ReturnType<typeof translator>;
  colors: (typeof THEMES)["dark"];
  btn: (active: boolean) => CSSProperties;
  select: CSSProperties;
  barStyle: CSSProperties;
  onPatch: (patch: Partial<Drawing>) => void;
  onDelete: () => void;
}) {
  const { drawing: d, t, colors } = p;
  // Label is committed on blur / Enter so typing doesn't fire a save per key.
  const [label, setLabel] = useState(d.label ?? "");
  const saveLabel = () => {
    const v = label.trim();
    if (v !== (d.label ?? "")) p.onPatch({ label: v || undefined });
  };
  return (
    <div style={{ ...p.barStyle, paddingTop: 6, paddingBottom: 6 }}>
      <div style={{ display: "flex", gap: 4 }}>
        {PALETTE.map((c) => (
          <button
            key={c}
            type="button"
            aria-label={c}
            onClick={() => p.onPatch({ color: c })}
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              background: c,
              cursor: "pointer",
              border: d.color === c ? `2px solid ${colors.text}` : `1px solid ${colors.border}`,
            }}
          />
        ))}
      </div>
      <button type="button" style={p.btn(!!d.dashed)} onClick={() => p.onPatch({ dashed: !d.dashed })}>
        {t("dashed")}
      </button>
      <input
        aria-label={t("label")}
        placeholder={t("labelPlaceholder")}
        value={label}
        maxLength={40}
        onChange={(e) => setLabel(e.target.value)}
        onBlur={saveLabel}
        onKeyDown={(e) => e.key === "Enter" && saveLabel()}
        style={{ ...p.select, width: 120 }}
      />
      {p.strategies.length > 0 && (
        <select
          aria-label={t("strategy")}
          style={p.select}
          value={d.strategyId ?? ""}
          onChange={(e) => p.onPatch({ strategyId: e.target.value || undefined })}
        >
          <option value="">{t("noStrategy")}</option>
          {p.strategies.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      )}
      <button
        type="button"
        style={{ ...p.btn(false), borderColor: "#ef4444", color: "#ef4444" }}
        onClick={p.onDelete}
      >
        {t("delete")}
      </button>
    </div>
  );
}
