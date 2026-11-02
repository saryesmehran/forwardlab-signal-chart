# ForwardLab Signal Chart

A drop-in candlestick chart for signal pages. **ForwardLab provides the chart and the live prices.** Your site only places it on the page and stores your drawings.

- **Admin mode:** simple drawing tools (trend line, horizontal line, rectangle/zone), plus symbol and timeframe pickers. Each drawing has a colour, a dashed option, a label (e.g. `TP1`) and a strategy.
- **Viewer mode:** read-only. Subscribers see the timeframe the admin picked and can toggle strategies on and off.
- **ForwardLab watermark:** painted inside the chart canvas, so it shows at every size and theme and in screenshots. Clicking it opens ForwardLab with UTM tags.
- **CTA button** under the chart, also UTM-tagged.

Symbols: `XAUUSD`, `EURUSD`, `GBPUSD`, `USDCHF`. Timeframes: `M1`, `M5`, `M15`, `H1`, `H4`.

## Who does what

| | ForwardLab (this package) | Your site |
|---|---|---|
| Chart, live prices, drawing tools, watermark, CTA | ✔ | |
| Storing drawings (plain JSON) | | ✔ |
| Strategies, packs, plans, and who sees which drawings | | ✔ |

> **Access control is your server's job.** Send each subscriber **only** the drawings their plan allows. The strategy toggle in the chart is a display filter, not a security boundary: anything sent to the browser can be read.

**Prices:** the chart loads candles from the ForwardLab engine by itself. There is no API key, no proxy, and nothing to set up on your side. ForwardLab must add your site's domain(s) to the engine's allowlist. Send us your production and staging domains, e.g. `https://example.com`.

---

## Install

**npm (React or any bundler):**

```bash
npm i github:saryesmehran/forwardlab-signal-char
```

**Plain HTML (e.g. server-rendered Python templates):** copy [`dist/signal-chart.standalone.js`](dist/signal-chart.standalone.js) to your static files. It is one file with React bundled inside, so the page needs nothing else.

## Plain HTML

```html
<div id="signal-chart"></div>
<script src="/static/signal-chart.standalone.js"></script>
<script>
  const FL = window.ForwardLabSignalChart;
  const chart = FL.mount(document.getElementById("signal-chart"), {
    mode: "viewer",                 // "admin" on your admin panel
    symbol: "XAUUSD",
    timeframe: "M15",
    partner: "investoport",         // your utm_source
    locale: "en",                   // or "fa" (RTL)
    theme: "dark",                  // or "light"
    strategies: [{ id: "scalp", name: "Scalp", color: "#22c55e" }],
    drawings: {{ drawings_json | safe }},   // from your server, already filtered for this user
    onLinkClick: (placement) => myAnalytics("forwardlab_chart_click", { placement }),
  });
</script>
```

Admin panel:

```js
const chart = FL.mount(el, {
  mode: "admin", symbol: "XAUUSD", timeframe: "M15", partner: "investoport",
  strategies,
  drawings: savedDrawings,
  onSymbolChange: (symbol) => chart.update({ symbol }),
  onTimeframeChange: (timeframe) => chart.update({ timeframe }),
  onDrawingsChange: (drawings) => fetch("/admin/api/drawings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symbol: "XAUUSD", timeframe: "M15", drawings }),
  }),
});
```

`mount()` returns `update(options)`, `getDrawings()`, `screenshot()` (a PNG data URL with the watermark) and `destroy()`.

## React

```tsx
import { SignalChart } from "forwardlab-signal-chart";

<SignalChart
  mode="viewer"
  symbol="EURUSD"
  timeframe="H1"
  partner="investoport"
  drawings={drawings}
  strategies={strategies}
/>
```

`react` and `react-dom` (18 or newer) are peer dependencies.

## Options

| Option | Type | Notes |
|---|---|---|
| `mode` | `"admin" \| "viewer"` | required |
| `symbol` | `"XAUUSD" \| "EURUSD" \| "GBPUSD" \| "USDCHF"` | required |
| `timeframe` | `"M1" \| "M5" \| "M15" \| "H1" \| "H4"` | required; chosen by the admin |
| `partner` | `string` | required; sent as `utm_source` |
| `drawings` | `Drawing[]` | drawings to show (controlled) |
| `onDrawingsChange` | `(drawings) => void` | admin: fires after every finished edit with the full list |
| `onSymbolChange`, `onTimeframeChange` | callbacks | admin: pickers appear only when these are given |
| `strategies` | `{ id, name, color? }[]` | strategy list; viewers can toggle them |
| `tools` | `("trendline" \| "hline" \| "rect")[]` | admin: which tools to offer (default: all) |
| `theme` | `"dark" \| "light"` | default `"dark"` |
| `locale` | `"en" \| "fa"` | default `"fa"` |
| `height` | `number` | chart height in px, default `480`; width follows the container |
| `refCode`, `utmId` | `string` | added to ForwardLab links if ForwardLab issues them |
| `hideCta` | `boolean` | hides the button under the chart (the watermark always stays) |
| `onLinkClick` | `(placement) => void` | for your own click analytics; never blocks the link |

## Drawing format

```json
{
  "id": "c1f0…",
  "type": "rect",
  "points": [{ "time": 1730700000, "price": 2741.5 }, { "time": 1730728800, "price": 2735.2 }],
  "color": "#22c55e",
  "dashed": false,
  "label": "Buy zone",
  "strategyId": "scalp"
}
```

- `type`: `trendline` takes 2 points. `hline` takes 1 point, and only its `price` matters. `rect` takes 2 opposite corners, and their two `time`s are the zone's time range.
- `time` is in UTC Unix **seconds**.
- `width` (1–4) is optional. Without `color`, the strategy's colour is used.

Tip: store drawings per `(symbol, timeframe)`, since the admin draws on one specific timeframe.

## Links and UTM

Every link goes to `https://forwardlab.ir/` with:

| Click | `utm_content` |
|---|---|
| Watermark on the chart | `chart_watermark` |
| Button under the chart | `chart_cta` |

`utm_source` is your `partner`, `utm_medium=referral`, and `utm_campaign=partner_signal_chart`. Links open in a new tab with `rel="noopener"`.

## Try it

```bash
npm install
npm run example     # opens http://localhost:5173/example/ with live ForwardLab prices
```

## Build

`dist/` is committed, so you don't need to build to use the package. To rebuild:

```bash
npm install
npm run build
# dist/signal-chart.js             ESM for bundlers (react + lightweight-charts external)
# dist/signal-chart.standalone.js  IIFE for plain HTML (everything bundled)
# dist/types/                      TypeScript declarations
```

© ForwardLab. All rights reserved. The ForwardLab name and logo may not be removed or altered.
