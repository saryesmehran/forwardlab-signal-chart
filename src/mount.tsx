import { createRef } from "react";
import { createRoot } from "react-dom/client";
import { SignalChart } from "./SignalChart";
import type { Drawing, SignalChartHandle, SignalChartProps } from "./types";

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
export function mount(el: HTMLElement, options: SignalChartProps): MountedChart {
  const root = createRoot(el);
  const handle = createRef<SignalChartHandle>();
  let props: SignalChartProps = { ...options };
  let drawings: Drawing[] = options.drawings ?? options.defaultDrawings ?? [];

  const render = () => {
    root.render(
      <SignalChart
        ref={handle}
        {...props}
        drawings={drawings}
        onSymbolChange={props.onSymbolChange && ((s) => props.onSymbolChange?.(s))}
        onTimeframeChange={props.onTimeframeChange && ((tf) => props.onTimeframeChange?.(tf))}
        onDrawingsChange={(next) => {
          drawings = next;
          render();
          props.onDrawingsChange?.(next);
        }}
      />,
    );
  };
  render();

  return {
    update(next) {
      props = { ...props, ...next };
      if (next.drawings) drawings = next.drawings;
      render();
    },
    getDrawings: () => drawings,
    screenshot: () => handle.current?.screenshot()?.toDataURL("image/png") ?? null,
    destroy: () => root.unmount(),
  };
}
