import { jsxs as R, jsx as f, Fragment as ve } from "react/jsx-runtime";
import { forwardRef as qe, useState as z, useRef as k, useCallback as et, useImperativeHandle as tt, useEffect as J, createRef as it } from "react";
import { createChart as nt, CrosshairMode as rt, ColorType as ot } from "lightweight-charts";
import { createRoot as at } from "react-dom/client";
const lt = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTYwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJzcGluZUciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzdhNjA5MCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMzZDJkNTgiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYXlHIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNiOGJjYzYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNmU3MjdkIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJwdXJwRyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjN2E2MDkwIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzNkMmQ1OCIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxmaWx0ZXIgaWQ9Imdsb3ciIHg9Ii0yMCUiIHk9Ii0yMCUiIHdpZHRoPSIxNDAlIiBoZWlnaHQ9IjE0MCUiPgogICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxLjIiIHJlc3VsdD0iYmx1ciIvPgogICAgICA8ZmVNZXJnZT48ZmVNZXJnZU5vZGUgaW49ImJsdXIiLz48ZmVNZXJnZU5vZGUgaW49IlNvdXJjZUdyYXBoaWMiLz48L2ZlTWVyZ2U+CiAgICA8L2ZpbHRlcj4KICAgIDxmaWx0ZXIgaWQ9InNoYWRvdyIgeD0iLTEwJSIgeT0iLTEwJSIgd2lkdGg9IjEzMCUiIGhlaWdodD0iMTQwJSI+CiAgICAgIDxmZURyb3BTaGFkb3cgZHg9IjEiIGR5PSIyIiBzdGREZXZpYXRpb249IjEuNSIgZmxvb2QtY29sb3I9IiMxYTBmMmUiIGZsb29kLW9wYWNpdHk9IjAuNyIvPgogICAgPC9maWx0ZXI+CiAgPC9kZWZzPgoKICA8IS0tIFNQSU5FIC0tPgogIDxyZWN0IHg9IjIiIHk9IjQiIHdpZHRoPSI5IiBoZWlnaHQ9IjMyIiByeD0iMiIgZmlsbD0idXJsKCNzcGluZUcpIiBmaWx0ZXI9InVybCgjc2hhZG93KSIvPgogIDxyZWN0IHg9IjIiIHk9IjQiIHdpZHRoPSI0IiBoZWlnaHQ9IjMyIiByeD0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPgogIDxyZWN0IHg9IjYuNSIgeT0iMSIgd2lkdGg9IjEuNiIgaGVpZ2h0PSIzIiByeD0iMC44IiBmaWxsPSIjNWE0OTc2IiBvcGFjaXR5PSIwLjUiLz4KICA8cmVjdCB4PSI2LjUiIHk9IjM3IiB3aWR0aD0iMS42IiBoZWlnaHQ9IjMiIHJ4PSIwLjgiIGZpbGw9IiM1YTQ5NzYiIG9wYWNpdHk9IjAuNSIvPgoKICA8IS0tIFRPUCBBUk06IGdyYXkgY2FuZGxlIC0tPgogIDxyZWN0IHg9IjE0IiB5PSI0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxMSIgcng9IjIiIGZpbGw9InVybCgjZ3JheUcpIiBmaWx0ZXI9InVybCgjc2hhZG93KSIvPgogIDxyZWN0IHg9IjE0IiB5PSI0IiB3aWR0aD0iMyIgaGVpZ2h0PSIxMSIgcng9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xMikiLz4KICA8cmVjdCB4PSIxNyIgeT0iMSIgd2lkdGg9IjEuNCIgaGVpZ2h0PSIzIiByeD0iMC43IiBmaWxsPSIjYzhjY2Q0IiBvcGFjaXR5PSIwLjUiLz4KICA8IS0tIFRPUCBBUk06IHB1cnBsZSBjYW5kbGUgLS0+CiAgPHJlY3QgeD0iMjQiIHk9IjUiIHdpZHRoPSI2IiBoZWlnaHQ9IjkiIHJ4PSIyIiBmaWxsPSJ1cmwoI3B1cnBHKSIgZmlsdGVyPSJ1cmwoI3NoYWRvdykiIG9wYWNpdHk9IjAuODUiLz4KICA8cmVjdCB4PSIyNCIgeT0iNSIgd2lkdGg9IjIuNSIgaGVpZ2h0PSI5IiByeD0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+CiAgPHJlY3QgeD0iMjciIHk9IjEuNSIgd2lkdGg9IjEuMiIgaGVpZ2h0PSIzLjUiIHJ4PSIwLjYiIGZpbGw9IiM1YTQ5NzYiIG9wYWNpdHk9IjAuNCIvPgoKICA8IS0tIE1JRCBBUk06IGdyYXkgY2FuZGxlIC0tPgogIDxyZWN0IHg9IjE0IiB5PSIxOSIgd2lkdGg9IjciIGhlaWdodD0iMTAiIHJ4PSIyIiBmaWxsPSJ1cmwoI2dyYXlHKSIgZmlsdGVyPSJ1cmwoI3NoYWRvdykiIG9wYWNpdHk9IjAuNzUiLz4KICA8cmVjdCB4PSIxNCIgeT0iMTkiIHdpZHRoPSIzIiBoZWlnaHQ9IjEwIiByeD0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPgogIDxyZWN0IHg9IjE3IiB5PSIxNS41IiB3aWR0aD0iMS40IiBoZWlnaHQ9IjMuNSIgcng9IjAuNyIgZmlsbD0iI2M4Y2NkNCIgb3BhY2l0eT0iMC4zNSIvPgogIDwhLS0gTUlEIEFSTTogcHVycGxlIGNhbmRsZSAtLT4KICA8cmVjdCB4PSIyNCIgeT0iMjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjgiIHJ4PSIyIiBmaWxsPSJ1cmwoI3B1cnBHKSIgZmlsdGVyPSJ1cmwoI3NoYWRvdykiIG9wYWNpdHk9IjAuNiIvPgogIDxyZWN0IHg9IjI0IiB5PSIyMCIgd2lkdGg9IjIiIGhlaWdodD0iOCIgcng9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wOCkiLz4KICA8cmVjdCB4PSIyNi41IiB5PSIxNi41IiB3aWR0aD0iMS4yIiBoZWlnaHQ9IjMuNSIgcng9IjAuNiIgZmlsbD0iIzVhNDk3NiIgb3BhY2l0eT0iMC4zIi8+CgogIDwhLS0gV09SRE1BUksgLS0+CiAgPHRleHQgeD0iMzYiIHk9IjI3IgogICAgZm9udC1mYW1pbHk9Ik91dGZpdCxJbnRlcixzeXN0ZW0tdWksc2Fucy1zZXJpZiIKICAgIGZvbnQtc2l6ZT0iMTciIGZvbnQtd2VpZ2h0PSI4MDAiIGxldHRlci1zcGFjaW5nPSItMC40IgogICAgZmlsbD0iI2M4Y2NkNCI+Rm9yd2FyZDwvdGV4dD4KICA8dGV4dCB4PSIxMDMiIHk9IjI3IgogICAgZm9udC1mYW1pbHk9Ik91dGZpdCxJbnRlcixzeXN0ZW0tdWksc2Fucy1zZXJpZiIKICAgIGZvbnQtc2l6ZT0iMTciIGZvbnQtd2VpZ2h0PSI4MDAiIGxldHRlci1zcGFjaW5nPSItMC40IgogICAgZmlsbD0iIzVhNDk3NiI+TGFiPC90ZXh0Pgo8L3N2Zz4K", st = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTYwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJzcGluZUdMIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM3YTYwOTAiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjM2QyZDU4Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrR0wiIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzNhMzA1MCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxYTEwMzUiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InB1cnBHTCIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjN2E2MDkwIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzNkMmQ1OCIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxmaWx0ZXIgaWQ9InNoYWRvd0wiPgogICAgICA8ZmVEcm9wU2hhZG93IGR4PSIxIiBkeT0iMiIgc3RkRGV2aWF0aW9uPSIxLjUiIGZsb29kLWNvbG9yPSIjMWEwZjJlIiBmbG9vZC1vcGFjaXR5PSIwLjQiLz4KICAgIDwvZmlsdGVyPgogIDwvZGVmcz4KCiAgPCEtLSBTUElORSAtLT4KICA8cmVjdCB4PSIyIiB5PSI0IiB3aWR0aD0iOSIgaGVpZ2h0PSIzMiIgcng9IjIiIGZpbGw9InVybCgjc3BpbmVHTCkiIGZpbHRlcj0idXJsKCNzaGFkb3dMKSIvPgogIDxyZWN0IHg9IjIiIHk9IjQiIHdpZHRoPSI0IiBoZWlnaHQ9IjMyIiByeD0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+CiAgPHJlY3QgeD0iNi41IiB5PSIxIiB3aWR0aD0iMS42IiBoZWlnaHQ9IjMiIHJ4PSIwLjgiIGZpbGw9IiM1YTQ5NzYiIG9wYWNpdHk9IjAuNSIvPgogIDxyZWN0IHg9IjYuNSIgeT0iMzciIHdpZHRoPSIxLjYiIGhlaWdodD0iMyIgcng9IjAuOCIgZmlsbD0iIzVhNDk3NiIgb3BhY2l0eT0iMC41Ii8+CgogIDwhLS0gVE9QIEFSTTogZGFyayBjYW5kbGUgLS0+CiAgPHJlY3QgeD0iMTQiIHk9IjQiIHdpZHRoPSI3IiBoZWlnaHQ9IjExIiByeD0iMiIgZmlsbD0idXJsKCNkYXJrR0wpIiBmaWx0ZXI9InVybCgjc2hhZG93TCkiIG9wYWNpdHk9IjAuODgiLz4KICA8cmVjdCB4PSIxNCIgeT0iNCIgd2lkdGg9IjMiIGhlaWdodD0iMTEiIHJ4PSIyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDYpIi8+CiAgPHJlY3QgeD0iMTciIHk9IjEiIHdpZHRoPSIxLjQiIGhlaWdodD0iMyIgcng9IjAuNyIgZmlsbD0iIzFhMTAzNSIgb3BhY2l0eT0iMC40Ii8+CiAgPCEtLSBUT1AgQVJNOiBwdXJwbGUgY2FuZGxlIC0tPgogIDxyZWN0IHg9IjI0IiB5PSI1IiB3aWR0aD0iNiIgaGVpZ2h0PSI5IiByeD0iMiIgZmlsbD0idXJsKCNwdXJwR0wpIiBmaWx0ZXI9InVybCgjc2hhZG93TCkiIG9wYWNpdHk9IjAuODUiLz4KICA8cmVjdCB4PSIyNCIgeT0iNSIgd2lkdGg9IjIuNSIgaGVpZ2h0PSI5IiByeD0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+CiAgPHJlY3QgeD0iMjciIHk9IjEuNSIgd2lkdGg9IjEuMiIgaGVpZ2h0PSIzLjUiIHJ4PSIwLjYiIGZpbGw9IiM1YTQ5NzYiIG9wYWNpdHk9IjAuNCIvPgoKICA8IS0tIE1JRCBBUk06IGRhcmsgY2FuZGxlIC0tPgogIDxyZWN0IHg9IjE0IiB5PSIxOSIgd2lkdGg9IjciIGhlaWdodD0iMTAiIHJ4PSIyIiBmaWxsPSJ1cmwoI2RhcmtHTCkiIGZpbHRlcj0idXJsKCNzaGFkb3dMKSIgb3BhY2l0eT0iMC42NSIvPgogIDxyZWN0IHg9IjE0IiB5PSIxOSIgd2lkdGg9IjMiIGhlaWdodD0iMTAiIHJ4PSIyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDQpIi8+CiAgPHJlY3QgeD0iMTciIHk9IjE1LjUiIHdpZHRoPSIxLjQiIGhlaWdodD0iMy41IiByeD0iMC43IiBmaWxsPSIjMWExMDM1IiBvcGFjaXR5PSIwLjI1Ii8+CiAgPCEtLSBNSUQgQVJNOiBwdXJwbGUgY2FuZGxlIC0tPgogIDxyZWN0IHg9IjI0IiB5PSIyMCIgd2lkdGg9IjUiIGhlaWdodD0iOCIgcng9IjIiIGZpbGw9InVybCgjcHVycEdMKSIgZmlsdGVyPSJ1cmwoI3NoYWRvd0wpIiBvcGFjaXR5PSIwLjYiLz4KICA8cmVjdCB4PSIyNCIgeT0iMjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjgiIHJ4PSIyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDgpIi8+CiAgPHJlY3QgeD0iMjYuNSIgeT0iMTYuNSIgd2lkdGg9IjEuMiIgaGVpZ2h0PSIzLjUiIHJ4PSIwLjYiIGZpbGw9IiM1YTQ5NzYiIG9wYWNpdHk9IjAuMyIvPgoKICA8IS0tIFdPUkRNQVJLIC0tPgogIDx0ZXh0IHg9IjM2IiB5PSIyNyIKICAgIGZvbnQtZmFtaWx5PSJPdXRmaXQsSW50ZXIsc3lzdGVtLXVpLHNhbnMtc2VyaWYiCiAgICBmb250LXNpemU9IjE3IiBmb250LXdlaWdodD0iODAwIiBsZXR0ZXItc3BhY2luZz0iLTAuNCIKICAgIGZpbGw9IiMwZjBmMTQiPkZvcndhcmQ8L3RleHQ+CiAgPHRleHQgeD0iMTAzIiB5PSIyNyIKICAgIGZvbnQtZmFtaWx5PSJPdXRmaXQsSW50ZXIsc3lzdGVtLXVpLHNhbnMtc2VyaWYiCiAgICBmb250LXNpemU9IjE3IiBmb250LXdlaWdodD0iODAwIiBsZXR0ZXItc3BhY2luZz0iLTAuNCIKICAgIGZpbGw9IiM1YTQ5NzYiPkxhYjwvdGV4dD4KPC9zdmc+Cg==";
function me(e, i, n) {
  const a = e.length;
  if (a === 0) return null;
  const r = e[0].time, l = e[a - 1].time;
  if (n <= r) return (n - r) / i;
  if (n >= l) return a - 1 + (n - l) / i;
  let I = 0, o = a - 1;
  for (; o - I > 1; ) {
    const g = I + o >> 1;
    e[g].time <= n ? I = g : o = g;
  }
  const m = e[I].time, d = e[o].time;
  return I + (n - m) / (d - m);
}
function Ye(e, i, n) {
  const a = e.length;
  if (a === 0) return null;
  if (n <= 0) return Math.round(e[0].time + n * i);
  if (n >= a - 1) return Math.round(e[a - 1].time + (n - (a - 1)) * i);
  const r = Math.floor(n), l = n - r;
  return Math.round(e[r].time + l * (e[r + 1].time - e[r].time));
}
function se(e, i) {
  const n = me(e.bars, e.step, i.time);
  if (n === null) return null;
  const a = e.chart.timeScale().logicalToCoordinate(n), r = e.series.priceToCoordinate(i.price);
  return a === null || r === null ? null : { x: a, y: r };
}
function Ae(e, i, n) {
  const a = e.chart.timeScale().coordinateToLogical(i), r = e.series.coordinateToPrice(n);
  if (a === null || r === null) return null;
  const l = Ye(e.bars, e.step, a);
  return l === null ? null : { time: l, price: r };
}
function It(e, i, n, a) {
  const r = a.x - n.x, l = a.y - n.y, I = r * r + l * l, o = I === 0 ? 0 : Math.max(0, Math.min(1, ((e - n.x) * r + (i - n.y) * l) / I));
  return Math.hypot(e - (n.x + o * r), i - (n.y + o * l));
}
const te = 6, ct = 8;
function Ne(e, i, n, a, r) {
  const l = i.find((I) => I.id === n);
  if (l && l.type !== "hline") {
    const I = Ee(e, l);
    for (let o = 0; o < I.length; o++) {
      const m = I[o];
      if (m && Math.hypot(m.x - a, m.y - r) <= ct) return { id: l.id, part: "handle", index: o };
    }
  }
  for (let I = i.length - 1; I >= 0; I--) {
    const o = i[I];
    if (o.type === "hline") {
      const g = e.series.priceToCoordinate(o.points[0].price);
      if (g !== null && Math.abs(g - r) <= te) return { id: o.id, part: "body" };
      continue;
    }
    const m = se(e, o.points[0]), d = se(e, o.points[1]);
    if (!(!m || !d))
      if (o.type === "trendline") {
        if (It(a, r, m, d) <= te) return { id: o.id, part: "body" };
      } else {
        const g = Math.min(m.x, d.x) - te, h = Math.max(m.x, d.x) + te, b = Math.min(m.y, d.y) - te, c = Math.max(m.y, d.y) + te;
        if (a >= g && a <= h && r >= b && r <= c) return { id: o.id, part: "body" };
      }
  }
  return null;
}
function Ee(e, i) {
  return i.points.map((n) => se(e, n));
}
const dt = "https://engin.forwardlab.ir";
function gt(e = {}) {
  const i = (e.engineUrl ?? dt).replace(/\/+$/, ""), n = e.pollMs ?? 3e3, a = e.apiKey?.trim(), r = a ? { headers: { "X-Embed-Key": a } } : void 0, l = async (I, o, m, d) => {
    const g = new URLSearchParams({ symbol: I, tf: o, limit: String(Math.min(m, 1e3)) });
    d !== void 0 && g.set("to", String(Math.floor(d) * 1e3));
    const h = await fetch(`${i}/api/v1/client/market/candles?${g}`, r);
    if (!h.ok) {
      const c = await h.json().then((V) => V.error_code).catch(() => {
      });
      throw new Error(`ForwardLab feed: HTTP ${h.status}${c ? ` ${c}` : ""}`);
    }
    const b = await h.json();
    if (b.success !== !0 || !Array.isArray(b.data)) throw new Error("ForwardLab feed: bad response");
    return b.data.map((c) => ({
      time: Math.floor(c.bucket / 1e3),
      open: Number(c.open),
      high: Number(c.high),
      low: Number(c.low),
      close: Number(c.close)
    }));
  };
  return {
    getBars: ({ symbol: I, timeframe: o, limit: m, to: d }) => l(I, o, m, d),
    subscribe: n > 0 ? ({ symbol: I, timeframe: o }, m) => {
      let d = !1, g;
      const h = async () => {
        try {
          const b = await l(I, o, 2);
          if (!d) for (const c of b) m(c);
        } catch {
        }
        d || (g = setTimeout(h, n));
      };
      return g = setTimeout(h, n), () => {
        d = !0, clearTimeout(g);
      };
    } : void 0
  };
}
const Ge = /* @__PURE__ */ new Map();
function ut(e) {
  const i = e?.trim() ?? "";
  let n = Ge.get(i);
  return n || Ge.set(i, n = gt({ apiKey: i || void 0 })), n;
}
const ke = {
  en: {
    cursor: "Select",
    trendline: "Trend line",
    hline: "Horizontal line",
    rect: "Rectangle",
    delete: "Delete",
    label: "Label",
    labelPlaceholder: "e.g. TP1",
    strategy: "Strategy",
    noStrategy: "No strategy",
    dashed: "Dashed",
    loading: "Loading chart…",
    error: "Couldn't load the chart.",
    retry: "Retry",
    noData: "No data for this symbol.",
    cta: "Practice on this chart at ForwardLab",
    watermarkAria: "ForwardLab — open the website in a new tab",
    hideStrategy: "Hide",
    showStrategy: "Show"
  },
  fa: {
    cursor: "انتخاب",
    trendline: "خط روند",
    hline: "خط افقی",
    rect: "مستطیل",
    delete: "حذف",
    label: "برچسب",
    labelPlaceholder: "مثلاً TP1",
    strategy: "استراتژی",
    noStrategy: "بدون استراتژی",
    dashed: "خط‌چین",
    loading: "در حال بارگذاری چارت…",
    error: "بارگذاری چارت انجام نشد.",
    retry: "تلاش دوباره",
    noData: "برای این نماد داده‌ای نیست.",
    cta: "تمرین روی همین چارت در ForwardLab",
    watermarkAria: "ForwardLab — باز کردن سایت در تب جدید",
    hideStrategy: "پنهان",
    showStrategy: "نمایش"
  }
};
function mt(e) {
  const i = ke[e] ?? ke.en;
  return (n) => i[n];
}
const We = "#8b6cf6", le = { width: 120, height: 30, margin: 10 };
class ht {
  constructor(i) {
    this.getState = i, this.chart = null, this.series = null, this.requestUpdate = null;
    const n = {
      draw: (a) => this.draw(a)
    };
    this.views = [{ renderer: () => n, zOrder: () => "top" }];
  }
  attached(i) {
    this.chart = i.chart, this.series = i.series, this.requestUpdate = i.requestUpdate;
  }
  detached() {
    this.chart = null, this.series = null, this.requestUpdate = null;
  }
  paneViews() {
    return this.views;
  }
  /** Repaint after the state changed outside of a chart interaction. */
  redraw() {
    this.requestUpdate?.();
  }
  draw(i) {
    const n = this.chart, a = this.series;
    if (!n || !a) return;
    const r = this.getState(), l = { chart: n, series: a, bars: r.bars, step: r.step };
    i.useMediaCoordinateSpace(({ context: I, mediaSize: o }) => {
      const m = r.draft ? [...r.drawings, r.draft] : r.drawings;
      for (const d of m) pt(I, l, d, r, o.width, d.id === r.selectedId || d === r.draft);
      bt(I, r, o.width, o.height);
    });
  }
}
function yt(e, i) {
  const n = /^#([0-9a-f]{6})$/i.exec(e);
  if (!n) return e;
  const a = parseInt(n[1], 16);
  return `rgba(${a >> 16 & 255}, ${a >> 8 & 255}, ${a & 255}, ${i})`;
}
function pt(e, i, n, a, r, l) {
  const I = a.colorOf(n), o = Math.max(1, Math.min(4, n.width ?? 2));
  e.save(), e.strokeStyle = I, e.lineWidth = o, e.setLineDash(n.dashed ? [6, 4] : []);
  let m = null;
  if (n.type === "hline") {
    const d = i.series.priceToCoordinate(n.points[0].price);
    if (d === null) return e.restore();
    e.beginPath(), e.moveTo(0, d), e.lineTo(r, d), e.stroke(), ft(e, n.points[0].price.toFixed(a.precision), r, d, I), m = { x: 8, y: d - 6, align: "left" };
  } else {
    const d = se(i, n.points[0]), g = se(i, n.points[1] ?? n.points[0]);
    if (!d || !g) return e.restore();
    if (n.type === "trendline") {
      e.beginPath(), e.moveTo(d.x, d.y), e.lineTo(g.x, g.y), e.stroke();
      const h = d.y < g.y ? d : g;
      m = { x: h.x, y: h.y - 6, align: "center" };
    } else {
      const h = Math.min(d.x, g.x), b = Math.min(d.y, g.y), c = Math.abs(d.x - g.x), V = Math.abs(d.y - g.y);
      e.fillStyle = yt(I, 0.16), e.fillRect(h, b, c, V), e.strokeRect(h, b, c, V), m = { x: h + 6, y: b + 14, align: "left" };
    }
  }
  if (n.label && m && (e.setLineDash([]), e.font = "600 12px Estedad, Vazirmatn, Tahoma, system-ui, sans-serif", e.textAlign = m.align, e.fillStyle = I, e.fillText(n.label, m.x, m.y)), l) {
    e.setLineDash([]);
    const d = n.type === "hline" ? [] : Ee(i, n);
    for (const g of d)
      g && (e.beginPath(), e.arc(g.x, g.y, 5, 0, Math.PI * 2), e.fillStyle = a.theme === "dark" ? "#0f1016" : "#ffffff", e.fill(), e.lineWidth = 2, e.stroke());
  }
  e.restore();
}
function ft(e, i, n, a, r) {
  e.setLineDash([]), e.font = "11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  const l = e.measureText(i).width + 10;
  e.fillStyle = r, e.fillRect(n - l, a - 9, l, 18), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.fillText(i, n - l + 5, a), e.textBaseline = "alphabetic";
}
function bt(e, i, n, a) {
  if (!i.logo || !i.logo.complete || i.logo.naturalWidth === 0) return;
  const { width: r, height: l, margin: I } = le;
  e.save(), e.globalAlpha = 0.9, e.drawImage(i.logo, n - r - I, a - l - I, r, l), e.restore();
}
const St = ["XAUUSD", "EURUSD", "GBPUSD", "USDCHF"], wt = ["M1", "M5", "M15", "H1", "H4"], Be = {
  M1: 60,
  M5: 300,
  M15: 900,
  H1: 3600,
  H4: 14400
}, He = {
  XAUUSD: 2,
  EURUSD: 5,
  GBPUSD: 5,
  USDCHF: 5
}, Le = ["trendline", "hline", "rect"], Ct = "https://forwardlab.ir/";
function Pt(e) {
  const i = new URL(Ct);
  return e.refCode && i.searchParams.set("ref", e.refCode), i.searchParams.set("utm_source", e.partner.trim().toLowerCase()), i.searchParams.set("utm_medium", "referral"), i.searchParams.set("utm_campaign", "partner_signal_chart"), i.searchParams.set("utm_content", e.placement), e.utmId && i.searchParams.set("utm_id", e.utmId), i.toString();
}
const Te = 500, Mt = ["#8b6cf6", "#22c55e", "#ef4444", "#f59e0b", "#3b82f6", "#e5e7eb"], Zt = {
  dark: {
    bg: "#0f1016",
    panel: "#16171f",
    border: "rgba(255,255,255,0.08)",
    text: "#d4d6de",
    muted: "#8a8d99",
    grid: "rgba(255,255,255,0.04)",
    up: "rgb(76,175,125)",
    down: "rgb(192,57,43)",
    brand: "#7a5af5"
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
    brand: "#6a48e8"
  }
}, Dt = "Estedad, Vazirmatn, Tahoma, system-ui, sans-serif", jt = "Outfit, Inter, system-ui, -apple-system, Segoe UI, sans-serif", Re = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
function vt() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `d_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
function be(e) {
  const i = e.filter(
    (a) => Number.isFinite(a.time) && Number.isFinite(a.open) && Number.isFinite(a.high) && Number.isFinite(a.low) && Number.isFinite(a.close)
  );
  i.sort((a, r) => a.time - r.time);
  const n = [];
  for (const a of i)
    n.length && n[n.length - 1].time === a.time ? n[n.length - 1] = a : n.push(a);
  return n;
}
const xe = (e) => e, At = qe(function(i, n) {
  const {
    mode: a,
    symbol: r,
    timeframe: l,
    theme: I = "dark",
    locale: o = "fa",
    height: m = 480,
    partner: d,
    strategies: g = []
  } = i, h = a === "admin", b = mt(o), c = Zt[I], V = o === "fa" ? Dt : jt, Ue = (i.tools ?? Le).filter((t) => Le.includes(t)), [ze, Ve] = z(i.defaultDrawings ?? []), W = i.drawings ?? ze, [ie, O] = z(null), [G, B] = z(null), [Se, Je] = z(() => /* @__PURE__ */ new Set()), [he, Qe] = z(g[0]?.id), [ne, Ie] = z("loading"), [Xe, Fe] = z(0), [we, Ke] = z({ right: 60, bottom: 38 }), Ce = k(null), ye = k(null), Q = k(null), _ = k(null), x = k(null), Y = k([]), Pe = k(null), j = k(null), X = k(null), ce = W.filter((t) => !t.strategyId || !Se.has(t.strategyId)), Oe = new Map(g.map((t) => [t.id, t.color])), E = k({ props: i, drawings: W, visible: ce, tool: ie, selectedId: G, activeStrategyId: he, isAdmin: h });
  E.current = { props: i, drawings: W, visible: ce, tool: ie, selectedId: G, activeStrategyId: he, isAdmin: h };
  const Me = k(() => ({}));
  Me.current = () => {
    const t = X.current, u = t?.preview ? ce.map((w) => w.id === t.preview.id ? t.preview : w) : ce;
    return {
      bars: Y.current,
      step: Be[l],
      drawings: u,
      draft: j.current?.d ?? null,
      selectedId: G,
      colorOf: (w) => w.color ?? (w.strategyId ? Oe.get(w.strategyId) : void 0) ?? We,
      precision: He[r] ?? 5,
      theme: I,
      logo: Pe.current
    };
  };
  const F = et((t) => {
    E.current.props.drawings === void 0 && Ve(t), E.current.props.onDrawingsChange?.(t);
  }, []);
  tt(
    n,
    () => ({
      screenshot: () => Q.current?.takeScreenshot() ?? null,
      getDrawings: () => E.current.drawings
    }),
    []
  ), J(() => {
    const t = ye.current;
    if (!t) return;
    const u = nt(t, {
      autoSize: !0,
      crosshair: { mode: rt.Normal },
      timeScale: { timeVisible: !0, secondsVisible: !1, rightOffset: 8 },
      rightPriceScale: { borderVisible: !1 }
    }), w = u.addCandlestickSeries({ borderVisible: !1 }), M = new ht(() => Me.current());
    w.attachPrimitive(M), Q.current = u, _.current = w, x.current = M;
    const K = () => {
      Ke({
        right: u.priceScale("right").width() + le.margin,
        bottom: u.timeScale().height() + le.margin
      });
    };
    u.timeScale().subscribeSizeChange(K);
    const H = new ResizeObserver(K);
    return H.observe(t), () => {
      H.disconnect(), u.remove(), Q.current = null, _.current = null, x.current = null;
    };
  }, []), J(() => {
    const t = Q.current, u = _.current;
    if (!t || !u) return;
    t.applyOptions({
      layout: {
        background: { type: ot.Solid, color: c.bg },
        textColor: c.muted,
        fontFamily: Re
      },
      grid: { vertLines: { color: c.grid }, horzLines: { color: c.grid } },
      timeScale: { borderColor: c.border }
    }), u.applyOptions({
      upColor: c.up,
      downColor: c.down,
      wickUpColor: c.up,
      wickDownColor: c.down
    });
    const w = new Image();
    w.onload = () => x.current?.redraw(), w.src = I === "dark" ? lt : st, Pe.current = w, x.current?.redraw();
  }, [I, c]), J(() => {
    const t = He[r] ?? 5;
    _.current?.applyOptions({
      priceFormat: { type: "price", precision: t, minMove: 1 / 10 ** t }
    });
  }, [r]), J(() => {
    const t = Q.current, u = _.current;
    if (!t || !u) return;
    const w = E.current.props.datafeed ?? ut(i.apiKey);
    let M = !0, K, H = !1, re = !0;
    Y.current = [], u.setData([]), Ie("loading");
    const oe = (v) => {
      if (!M) return;
      const [Z] = be([v]);
      if (!Z) return;
      const D = Y.current, N = D[D.length - 1];
      N && Z.time < N.time || (N && Z.time === N.time ? D[D.length - 1] = Z : D.push(Z), u.update(Z), D.length === 1 && Ie("ready"));
    }, ae = async () => {
      const v = Y.current;
      if (!(H || !re || v.length === 0)) {
        H = !0;
        try {
          const Z = v[0].time, D = await w.getBars({ symbol: r, timeframe: l, limit: Te, to: Z });
          if (!M) return;
          const N = be(D).filter((ue) => ue.time < Z);
          if (N.length === 0) {
            re = !1;
            return;
          }
          const ee = t.timeScale().getVisibleLogicalRange();
          Y.current = [...N, ...Y.current], u.setData(xe(Y.current)), ee && t.timeScale().setVisibleLogicalRange({
            from: ee.from + N.length,
            to: ee.to + N.length
          });
        } catch {
        } finally {
          H = !1;
        }
      }
    }, q = (v) => {
      v && v.from < 10 && ae();
    };
    return w.getBars({ symbol: r, timeframe: l, limit: Te }).then((v) => {
      if (!M) return;
      const Z = be(v);
      Y.current = Z, u.setData(xe(Z));
      const D = Z.length;
      D > 0 && t.timeScale().setVisibleLogicalRange({ from: Math.max(0, D - 150), to: D + 8 }), Ie(D > 0 ? "ready" : "empty"), t.timeScale().subscribeVisibleLogicalRangeChange(q), K = w.subscribe?.({ symbol: r, timeframe: l }, oe);
    }).catch(() => M && Ie("error")), () => {
      M = !1, K?.(), t.timeScale().unsubscribeVisibleLogicalRangeChange(q);
    };
  }, [r, l, i.apiKey, Xe]), J(() => {
    G && !W.some((t) => t.id === G) && B(null);
  }, [W, G]), J(() => {
    j.current = null, X.current = null, O(null), B(null);
  }, [r, l, a]), J(() => {
    x.current?.redraw();
  }), J(() => {
    const t = ye.current;
    if (!t || !h) return;
    const u = () => {
      const s = Q.current, p = _.current;
      return !s || !p ? null : { chart: s, series: p, bars: Y.current, step: Be[l] };
    }, w = (s, p) => {
      const C = Q.current;
      if (!C) return null;
      const y = t.getBoundingClientRect(), P = s - y.left, S = p - y.top, A = C.timeScale().width(), L = y.height - C.timeScale().height();
      return P < 0 || S < 0 || P > A || S > L ? null : { x: P, y: S };
    }, M = () => {
      const s = j.current;
      if (!s) return;
      j.current = null;
      const p = E.current;
      F([...p.drawings, s.d]), B(s.d.id), O(null);
    }, K = (s, p, C, y, P) => {
      if (P.part === "handle") {
        const T = s.points.slice();
        return T[P.index] = C, { ...s, points: T };
      }
      const S = C.price - p.price;
      if (s.type === "hline") return { ...s, points: [{ ...s.points[0], price: s.points[0].price + S }] };
      const A = me(y.bars, y.step, p.time), L = me(y.bars, y.step, C.time), U = A === null || L === null ? 0 : L - A;
      return {
        ...s,
        points: s.points.map((T) => {
          const je = me(y.bars, y.step, T.time);
          return { time: je === null ? T.time : Ye(y.bars, y.step, je + U) ?? T.time, price: T.price + S };
        })
      };
    }, H = (s, p) => {
      const C = u(), y = w(s, p);
      if (!C || !y) return;
      const P = Ae(C, y.x, y.y);
      if (!P) return;
      if (j.current) {
        const U = j.current.d;
        j.current.d = { ...U, points: [U.points[0], P] }, x.current?.redraw();
        return;
      }
      const S = X.current;
      if (S) {
        S.preview = K(S.orig, S.start, P, C, S.hit), x.current?.redraw();
        return;
      }
      const A = E.current;
      if (A.tool) {
        t.style.cursor = "crosshair";
        return;
      }
      const L = Ne(C, A.visible, A.selectedId, y.x, y.y);
      t.style.cursor = L ? L.part === "handle" ? "grab" : "pointer" : "";
    }, re = (s, p) => {
      window.removeEventListener("mousemove", oe), window.removeEventListener("mouseup", ae), window.removeEventListener("touchmove", q), window.removeEventListener("touchend", v);
      const C = j.current;
      if (C?.downAt) {
        const P = Math.hypot(s - C.downAt.x, p - C.downAt.y) > 6;
        C.downAt = null, P && M();
        return;
      }
      const y = X.current;
      if (X.current = null, y?.preview) {
        const P = E.current;
        F(P.drawings.map((S) => S.id === y.preview.id ? y.preview : S));
      }
      x.current?.redraw();
    }, oe = (s) => H(s.clientX, s.clientY), ae = (s) => re(s.clientX, s.clientY), q = (s) => {
      const p = s.touches[0];
      p && (s.preventDefault(), H(p.clientX, p.clientY));
    }, v = (s) => {
      const p = s.changedTouches[0];
      re(p?.clientX ?? 0, p?.clientY ?? 0);
    }, Z = (s, p) => {
      const C = u(), y = w(s, p);
      if (!C || !y) return !1;
      const P = Ae(C, y.x, y.y);
      if (!P) return !1;
      const S = E.current;
      if (j.current)
        return j.current.d = { ...j.current.d, points: [j.current.d.points[0], P] }, M(), !0;
      if (S.tool) {
        const U = { id: vt(), strategyId: S.activeStrategyId };
        if (S.tool === "hline") {
          const T = { ...U, type: "hline", points: [P] };
          return F([...S.drawings, T]), B(T.id), O(null), !0;
        }
        return j.current = { d: { ...U, type: S.tool, points: [P, P] }, downAt: { x: s, y: p } }, x.current?.redraw(), !0;
      }
      const A = Ne(C, S.visible, S.selectedId, y.x, y.y);
      if (!A)
        return S.selectedId && B(null), !1;
      const L = S.drawings.find((U) => U.id === A.id);
      return L ? (B(A.id), X.current = { hit: A, start: P, orig: L, preview: null }, !0) : !1;
    }, D = () => {
      window.addEventListener("mousemove", oe), window.addEventListener("mouseup", ae), window.addEventListener("touchmove", q, { passive: !1 }), window.addEventListener("touchend", v);
    }, N = (s) => {
      s.button === 0 && Z(s.clientX, s.clientY) && (s.stopPropagation(), s.preventDefault(), Ce.current?.focus({ preventScroll: !0 }), D());
    }, ee = (s) => {
      const p = s.touches[0];
      !p || s.touches.length > 1 || Z(p.clientX, p.clientY) && (s.stopPropagation(), s.preventDefault(), D());
    }, ue = (s) => {
      X.current || H(s.clientX, s.clientY);
    };
    return t.addEventListener("mousedown", N, { capture: !0 }), t.addEventListener("touchstart", ee, { capture: !0, passive: !1 }), t.addEventListener("mousemove", ue), () => {
      t.removeEventListener("mousedown", N, { capture: !0 }), t.removeEventListener("touchstart", ee, { capture: !0 }), t.removeEventListener("mousemove", ue), window.removeEventListener("mousemove", oe), window.removeEventListener("mouseup", ae), window.removeEventListener("touchmove", q), window.removeEventListener("touchend", v), t.style.cursor = "";
    };
  }, [h, l, F]);
  const _e = (t) => {
    if (!h) return;
    const u = t.target;
    u.tagName === "INPUT" || u.tagName === "SELECT" || (t.key === "Escape" ? (j.current = null, O(null), B(null)) : (t.key === "Delete" || t.key === "Backspace") && G && (t.preventDefault(), F(W.filter((w) => w.id !== G)), B(null)));
  }, $e = (t) => {
    G && F(W.map((u) => u.id === G ? { ...u, ...t } : u));
  }, de = h ? W.find((t) => t.id === G) ?? null : null, Ze = h ? g : g.filter((t) => W.some((u) => u.strategyId === t.id)), De = (t) => Pt({ partner: d, placement: t, refCode: i.refCode, utmId: i.utmId }), $ = (t) => ({
    font: "inherit",
    fontSize: 12,
    padding: "5px 10px",
    borderRadius: 8,
    border: `1px solid ${t ? c.brand : c.border}`,
    background: t ? c.brand : "transparent",
    color: t ? "#fff" : c.text,
    cursor: "pointer",
    lineHeight: 1.4
  }), pe = {
    font: "inherit",
    fontSize: 12,
    padding: "4px 6px",
    borderRadius: 8,
    border: `1px solid ${c.border}`,
    background: c.bg,
    color: c.text
  }, fe = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
    padding: "8px 10px",
    background: c.panel,
    borderBottom: `1px solid ${c.border}`
  }, ge = { fontFamily: Re, direction: "ltr", unicodeBidi: "isolate" };
  return /* @__PURE__ */ R(
    "div",
    {
      ref: Ce,
      dir: o === "fa" ? "rtl" : "ltr",
      tabIndex: h ? 0 : void 0,
      onKeyDown: _e,
      style: {
        fontFamily: V,
        color: c.text,
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 12,
        overflow: "hidden",
        outline: "none"
      },
      children: [
        /* @__PURE__ */ R("div", { style: fe, children: [
          h && i.onSymbolChange ? /* @__PURE__ */ f(
            "select",
            {
              "aria-label": "symbol",
              style: { ...pe, ...ge },
              value: r,
              onChange: (t) => i.onSymbolChange?.(t.target.value),
              children: St.map((t) => /* @__PURE__ */ f("option", { value: t, children: t }, t))
            }
          ) : /* @__PURE__ */ f("span", { style: { ...ge, fontWeight: 600, fontSize: 13 }, children: r }),
          h && i.onTimeframeChange ? /* @__PURE__ */ f("div", { style: { display: "flex", gap: 4 }, dir: "ltr", children: wt.map((t) => /* @__PURE__ */ f(
            "button",
            {
              type: "button",
              style: { ...$(t === l), ...ge },
              onClick: () => i.onTimeframeChange?.(t),
              children: t
            },
            t
          )) }) : /* @__PURE__ */ f("span", { style: { ...ge, fontSize: 12, color: c.muted }, children: l }),
          h && /* @__PURE__ */ R(ve, { children: [
            /* @__PURE__ */ f("span", { style: { width: 1, height: 20, background: c.border, margin: "0 4px" } }),
            /* @__PURE__ */ f("button", { type: "button", style: $(ie === null), onClick: () => O(null), children: b("cursor") }),
            Ue.map((t) => /* @__PURE__ */ f(
              "button",
              {
                type: "button",
                style: $(ie === t),
                onClick: () => {
                  j.current = null, B(null), O(ie === t ? null : t);
                },
                children: b(t)
              },
              t
            )),
            g.length > 0 && /* @__PURE__ */ R(
              "select",
              {
                "aria-label": b("strategy"),
                style: pe,
                value: he ?? "",
                onChange: (t) => Qe(t.target.value || void 0),
                children: [
                  /* @__PURE__ */ f("option", { value: "", children: b("noStrategy") }),
                  g.map((t) => /* @__PURE__ */ f("option", { value: t.id, children: t.name }, t.id))
                ]
              }
            )
          ] })
        ] }),
        de && /* @__PURE__ */ f(
          Nt,
          {
            drawing: de,
            strategies: g,
            t: b,
            colors: c,
            btn: $,
            select: pe,
            barStyle: fe,
            onPatch: $e,
            onDelete: () => {
              F(W.filter((t) => t.id !== de.id)), B(null);
            }
          },
          de.id
        ),
        Ze.length > 0 && /* @__PURE__ */ f("div", { style: { ...fe, paddingTop: 6, paddingBottom: 6 }, children: Ze.map((t) => {
          const u = Se.has(t.id);
          return /* @__PURE__ */ R(
            "button",
            {
              type: "button",
              "aria-pressed": !u,
              title: b(u ? "showStrategy" : "hideStrategy"),
              style: { ...$(!1), opacity: u ? 0.45 : 1, display: "inline-flex", alignItems: "center", gap: 6 },
              onClick: () => Je((w) => {
                const M = new Set(w);
                return M.has(t.id) ? M.delete(t.id) : M.add(t.id), M;
              }),
              children: [
                /* @__PURE__ */ f("span", { style: { width: 8, height: 8, borderRadius: 4, background: t.color ?? We } }),
                t.name
              ]
            },
            t.id
          );
        }) }),
        /* @__PURE__ */ R("div", { dir: "ltr", style: { position: "relative", height: m }, children: [
          /* @__PURE__ */ f("div", { ref: ye, style: { position: "absolute", inset: 0 } }),
          /* @__PURE__ */ f(
            "a",
            {
              href: De("chart_watermark"),
              target: "_blank",
              rel: "noopener",
              "aria-label": b("watermarkAria"),
              onClick: () => i.onLinkClick?.("chart_watermark"),
              style: {
                position: "absolute",
                right: we.right,
                bottom: we.bottom,
                width: le.width,
                height: le.height,
                zIndex: 2
              }
            }
          ),
          ne !== "ready" && /* @__PURE__ */ R(
            "div",
            {
              dir: o === "fa" ? "rtl" : "ltr",
              style: {
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                fontFamily: V,
                fontSize: 13,
                color: c.muted,
                pointerEvents: ne === "loading" ? "none" : "auto",
                zIndex: 1
              },
              children: [
                ne === "loading" && b("loading"),
                ne === "empty" && b("noData"),
                ne === "error" && /* @__PURE__ */ R(ve, { children: [
                  b("error"),
                  /* @__PURE__ */ f("button", { type: "button", style: $(!0), onClick: () => Fe((t) => t + 1), children: b("retry") })
                ] })
              ]
            }
          )
        ] }),
        !i.hideCta && /* @__PURE__ */ f("div", { style: { padding: 10, borderTop: `1px solid ${c.border}`, background: c.panel }, children: /* @__PURE__ */ f(
          "a",
          {
            href: De("chart_cta"),
            target: "_blank",
            rel: "noopener",
            onClick: () => i.onLinkClick?.("chart_cta"),
            style: {
              display: "block",
              textAlign: "center",
              padding: "10px 14px",
              borderRadius: 10,
              background: c.brand,
              color: "#fff",
              fontFamily: V,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none"
            },
            children: b("cta")
          }
        ) })
      ]
    }
  );
});
function Nt(e) {
  const { drawing: i, t: n, colors: a } = e, [r, l] = z(i.label ?? ""), I = () => {
    const o = r.trim();
    o !== (i.label ?? "") && e.onPatch({ label: o || void 0 });
  };
  return /* @__PURE__ */ R("div", { style: { ...e.barStyle, paddingTop: 6, paddingBottom: 6 }, children: [
    /* @__PURE__ */ f("div", { style: { display: "flex", gap: 4 }, children: Mt.map((o) => /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        "aria-label": o,
        onClick: () => e.onPatch({ color: o }),
        style: {
          width: 20,
          height: 20,
          borderRadius: 10,
          background: o,
          cursor: "pointer",
          border: i.color === o ? `2px solid ${a.text}` : `1px solid ${a.border}`
        }
      },
      o
    )) }),
    /* @__PURE__ */ f("button", { type: "button", style: e.btn(!!i.dashed), onClick: () => e.onPatch({ dashed: !i.dashed }), children: n("dashed") }),
    /* @__PURE__ */ f(
      "input",
      {
        "aria-label": n("label"),
        placeholder: n("labelPlaceholder"),
        value: r,
        maxLength: 40,
        onChange: (o) => l(o.target.value),
        onBlur: I,
        onKeyDown: (o) => o.key === "Enter" && I(),
        style: { ...e.select, width: 120 }
      }
    ),
    e.strategies.length > 0 && /* @__PURE__ */ R(
      "select",
      {
        "aria-label": n("strategy"),
        style: e.select,
        value: i.strategyId ?? "",
        onChange: (o) => e.onPatch({ strategyId: o.target.value || void 0 }),
        children: [
          /* @__PURE__ */ f("option", { value: "", children: n("noStrategy") }),
          e.strategies.map((o) => /* @__PURE__ */ f("option", { value: o.id, children: o.name }, o.id))
        ]
      }
    ),
    /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        style: { ...e.btn(!1), borderColor: "#ef4444", color: "#ef4444" },
        onClick: e.onDelete,
        children: n("delete")
      }
    )
  ] });
}
function Lt(e, i) {
  const n = at(e), a = it();
  let r = { ...i }, l = i.drawings ?? i.defaultDrawings ?? [];
  const I = () => {
    n.render(
      /* @__PURE__ */ f(
        At,
        {
          ref: a,
          ...r,
          drawings: l,
          onSymbolChange: r.onSymbolChange && ((o) => r.onSymbolChange?.(o)),
          onTimeframeChange: r.onTimeframeChange && ((o) => r.onTimeframeChange?.(o)),
          onDrawingsChange: (o) => {
            l = o, I(), r.onDrawingsChange?.(o);
          }
        }
      )
    );
  };
  return I(), {
    update(o) {
      r = { ...r, ...o }, o.drawings && (l = o.drawings), I();
    },
    getDrawings: () => l,
    screenshot: () => a.current?.screenshot()?.toDataURL("image/png") ?? null,
    destroy: () => n.unmount()
  };
}
export {
  Le as DRAWING_TYPES,
  dt as FORWARDLAB_ENGINE_URL,
  Ct as FORWARDLAB_URL,
  St as SYMBOLS,
  He as SYMBOL_PRECISION,
  At as SignalChart,
  wt as TIMEFRAMES,
  Be as TIMEFRAME_SECONDS,
  Pt as buildForwardLabUrl,
  gt as createForwardLabFeed,
  Lt as mount
};
//# sourceMappingURL=signal-chart.js.map
