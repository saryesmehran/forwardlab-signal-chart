import { jsxs as R, jsx as f, Fragment as Ae } from "react/jsx-runtime";
import { forwardRef as $e, useState as z, useRef as k, useCallback as qe, useImperativeHandle as et, useEffect as V, createRef as tt } from "react";
import { createChart as it, CrosshairMode as nt, ColorType as rt } from "lightweight-charts";
import { createRoot as ot } from "react-dom/client";
const at = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTYwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJzcGluZUciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzdhNjA5MCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMzZDJkNTgiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYXlHIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNiOGJjYzYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNmU3MjdkIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJwdXJwRyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjN2E2MDkwIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzNkMmQ1OCIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxmaWx0ZXIgaWQ9Imdsb3ciIHg9Ii0yMCUiIHk9Ii0yMCUiIHdpZHRoPSIxNDAlIiBoZWlnaHQ9IjE0MCUiPgogICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxLjIiIHJlc3VsdD0iYmx1ciIvPgogICAgICA8ZmVNZXJnZT48ZmVNZXJnZU5vZGUgaW49ImJsdXIiLz48ZmVNZXJnZU5vZGUgaW49IlNvdXJjZUdyYXBoaWMiLz48L2ZlTWVyZ2U+CiAgICA8L2ZpbHRlcj4KICAgIDxmaWx0ZXIgaWQ9InNoYWRvdyIgeD0iLTEwJSIgeT0iLTEwJSIgd2lkdGg9IjEzMCUiIGhlaWdodD0iMTQwJSI+CiAgICAgIDxmZURyb3BTaGFkb3cgZHg9IjEiIGR5PSIyIiBzdGREZXZpYXRpb249IjEuNSIgZmxvb2QtY29sb3I9IiMxYTBmMmUiIGZsb29kLW9wYWNpdHk9IjAuNyIvPgogICAgPC9maWx0ZXI+CiAgPC9kZWZzPgoKICA8IS0tIFNQSU5FIC0tPgogIDxyZWN0IHg9IjIiIHk9IjQiIHdpZHRoPSI5IiBoZWlnaHQ9IjMyIiByeD0iMiIgZmlsbD0idXJsKCNzcGluZUcpIiBmaWx0ZXI9InVybCgjc2hhZG93KSIvPgogIDxyZWN0IHg9IjIiIHk9IjQiIHdpZHRoPSI0IiBoZWlnaHQ9IjMyIiByeD0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPgogIDxyZWN0IHg9IjYuNSIgeT0iMSIgd2lkdGg9IjEuNiIgaGVpZ2h0PSIzIiByeD0iMC44IiBmaWxsPSIjNWE0OTc2IiBvcGFjaXR5PSIwLjUiLz4KICA8cmVjdCB4PSI2LjUiIHk9IjM3IiB3aWR0aD0iMS42IiBoZWlnaHQ9IjMiIHJ4PSIwLjgiIGZpbGw9IiM1YTQ5NzYiIG9wYWNpdHk9IjAuNSIvPgoKICA8IS0tIFRPUCBBUk06IGdyYXkgY2FuZGxlIC0tPgogIDxyZWN0IHg9IjE0IiB5PSI0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxMSIgcng9IjIiIGZpbGw9InVybCgjZ3JheUcpIiBmaWx0ZXI9InVybCgjc2hhZG93KSIvPgogIDxyZWN0IHg9IjE0IiB5PSI0IiB3aWR0aD0iMyIgaGVpZ2h0PSIxMSIgcng9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xMikiLz4KICA8cmVjdCB4PSIxNyIgeT0iMSIgd2lkdGg9IjEuNCIgaGVpZ2h0PSIzIiByeD0iMC43IiBmaWxsPSIjYzhjY2Q0IiBvcGFjaXR5PSIwLjUiLz4KICA8IS0tIFRPUCBBUk06IHB1cnBsZSBjYW5kbGUgLS0+CiAgPHJlY3QgeD0iMjQiIHk9IjUiIHdpZHRoPSI2IiBoZWlnaHQ9IjkiIHJ4PSIyIiBmaWxsPSJ1cmwoI3B1cnBHKSIgZmlsdGVyPSJ1cmwoI3NoYWRvdykiIG9wYWNpdHk9IjAuODUiLz4KICA8cmVjdCB4PSIyNCIgeT0iNSIgd2lkdGg9IjIuNSIgaGVpZ2h0PSI5IiByeD0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+CiAgPHJlY3QgeD0iMjciIHk9IjEuNSIgd2lkdGg9IjEuMiIgaGVpZ2h0PSIzLjUiIHJ4PSIwLjYiIGZpbGw9IiM1YTQ5NzYiIG9wYWNpdHk9IjAuNCIvPgoKICA8IS0tIE1JRCBBUk06IGdyYXkgY2FuZGxlIC0tPgogIDxyZWN0IHg9IjE0IiB5PSIxOSIgd2lkdGg9IjciIGhlaWdodD0iMTAiIHJ4PSIyIiBmaWxsPSJ1cmwoI2dyYXlHKSIgZmlsdGVyPSJ1cmwoI3NoYWRvdykiIG9wYWNpdHk9IjAuNzUiLz4KICA8cmVjdCB4PSIxNCIgeT0iMTkiIHdpZHRoPSIzIiBoZWlnaHQ9IjEwIiByeD0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPgogIDxyZWN0IHg9IjE3IiB5PSIxNS41IiB3aWR0aD0iMS40IiBoZWlnaHQ9IjMuNSIgcng9IjAuNyIgZmlsbD0iI2M4Y2NkNCIgb3BhY2l0eT0iMC4zNSIvPgogIDwhLS0gTUlEIEFSTTogcHVycGxlIGNhbmRsZSAtLT4KICA8cmVjdCB4PSIyNCIgeT0iMjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjgiIHJ4PSIyIiBmaWxsPSJ1cmwoI3B1cnBHKSIgZmlsdGVyPSJ1cmwoI3NoYWRvdykiIG9wYWNpdHk9IjAuNiIvPgogIDxyZWN0IHg9IjI0IiB5PSIyMCIgd2lkdGg9IjIiIGhlaWdodD0iOCIgcng9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wOCkiLz4KICA8cmVjdCB4PSIyNi41IiB5PSIxNi41IiB3aWR0aD0iMS4yIiBoZWlnaHQ9IjMuNSIgcng9IjAuNiIgZmlsbD0iIzVhNDk3NiIgb3BhY2l0eT0iMC4zIi8+CgogIDwhLS0gV09SRE1BUksgLS0+CiAgPHRleHQgeD0iMzYiIHk9IjI3IgogICAgZm9udC1mYW1pbHk9Ik91dGZpdCxJbnRlcixzeXN0ZW0tdWksc2Fucy1zZXJpZiIKICAgIGZvbnQtc2l6ZT0iMTciIGZvbnQtd2VpZ2h0PSI4MDAiIGxldHRlci1zcGFjaW5nPSItMC40IgogICAgZmlsbD0iI2M4Y2NkNCI+Rm9yd2FyZDwvdGV4dD4KICA8dGV4dCB4PSIxMDMiIHk9IjI3IgogICAgZm9udC1mYW1pbHk9Ik91dGZpdCxJbnRlcixzeXN0ZW0tdWksc2Fucy1zZXJpZiIKICAgIGZvbnQtc2l6ZT0iMTciIGZvbnQtd2VpZ2h0PSI4MDAiIGxldHRlci1zcGFjaW5nPSItMC40IgogICAgZmlsbD0iIzVhNDk3NiI+TGFiPC90ZXh0Pgo8L3N2Zz4K", lt = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTYwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJzcGluZUdMIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM3YTYwOTAiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjM2QyZDU4Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrR0wiIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzNhMzA1MCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxYTEwMzUiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InB1cnBHTCIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjN2E2MDkwIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzNkMmQ1OCIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxmaWx0ZXIgaWQ9InNoYWRvd0wiPgogICAgICA8ZmVEcm9wU2hhZG93IGR4PSIxIiBkeT0iMiIgc3RkRGV2aWF0aW9uPSIxLjUiIGZsb29kLWNvbG9yPSIjMWEwZjJlIiBmbG9vZC1vcGFjaXR5PSIwLjQiLz4KICAgIDwvZmlsdGVyPgogIDwvZGVmcz4KCiAgPCEtLSBTUElORSAtLT4KICA8cmVjdCB4PSIyIiB5PSI0IiB3aWR0aD0iOSIgaGVpZ2h0PSIzMiIgcng9IjIiIGZpbGw9InVybCgjc3BpbmVHTCkiIGZpbHRlcj0idXJsKCNzaGFkb3dMKSIvPgogIDxyZWN0IHg9IjIiIHk9IjQiIHdpZHRoPSI0IiBoZWlnaHQ9IjMyIiByeD0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+CiAgPHJlY3QgeD0iNi41IiB5PSIxIiB3aWR0aD0iMS42IiBoZWlnaHQ9IjMiIHJ4PSIwLjgiIGZpbGw9IiM1YTQ5NzYiIG9wYWNpdHk9IjAuNSIvPgogIDxyZWN0IHg9IjYuNSIgeT0iMzciIHdpZHRoPSIxLjYiIGhlaWdodD0iMyIgcng9IjAuOCIgZmlsbD0iIzVhNDk3NiIgb3BhY2l0eT0iMC41Ii8+CgogIDwhLS0gVE9QIEFSTTogZGFyayBjYW5kbGUgLS0+CiAgPHJlY3QgeD0iMTQiIHk9IjQiIHdpZHRoPSI3IiBoZWlnaHQ9IjExIiByeD0iMiIgZmlsbD0idXJsKCNkYXJrR0wpIiBmaWx0ZXI9InVybCgjc2hhZG93TCkiIG9wYWNpdHk9IjAuODgiLz4KICA8cmVjdCB4PSIxNCIgeT0iNCIgd2lkdGg9IjMiIGhlaWdodD0iMTEiIHJ4PSIyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDYpIi8+CiAgPHJlY3QgeD0iMTciIHk9IjEiIHdpZHRoPSIxLjQiIGhlaWdodD0iMyIgcng9IjAuNyIgZmlsbD0iIzFhMTAzNSIgb3BhY2l0eT0iMC40Ii8+CiAgPCEtLSBUT1AgQVJNOiBwdXJwbGUgY2FuZGxlIC0tPgogIDxyZWN0IHg9IjI0IiB5PSI1IiB3aWR0aD0iNiIgaGVpZ2h0PSI5IiByeD0iMiIgZmlsbD0idXJsKCNwdXJwR0wpIiBmaWx0ZXI9InVybCgjc2hhZG93TCkiIG9wYWNpdHk9IjAuODUiLz4KICA8cmVjdCB4PSIyNCIgeT0iNSIgd2lkdGg9IjIuNSIgaGVpZ2h0PSI5IiByeD0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+CiAgPHJlY3QgeD0iMjciIHk9IjEuNSIgd2lkdGg9IjEuMiIgaGVpZ2h0PSIzLjUiIHJ4PSIwLjYiIGZpbGw9IiM1YTQ5NzYiIG9wYWNpdHk9IjAuNCIvPgoKICA8IS0tIE1JRCBBUk06IGRhcmsgY2FuZGxlIC0tPgogIDxyZWN0IHg9IjE0IiB5PSIxOSIgd2lkdGg9IjciIGhlaWdodD0iMTAiIHJ4PSIyIiBmaWxsPSJ1cmwoI2RhcmtHTCkiIGZpbHRlcj0idXJsKCNzaGFkb3dMKSIgb3BhY2l0eT0iMC42NSIvPgogIDxyZWN0IHg9IjE0IiB5PSIxOSIgd2lkdGg9IjMiIGhlaWdodD0iMTAiIHJ4PSIyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDQpIi8+CiAgPHJlY3QgeD0iMTciIHk9IjE1LjUiIHdpZHRoPSIxLjQiIGhlaWdodD0iMy41IiByeD0iMC43IiBmaWxsPSIjMWExMDM1IiBvcGFjaXR5PSIwLjI1Ii8+CiAgPCEtLSBNSUQgQVJNOiBwdXJwbGUgY2FuZGxlIC0tPgogIDxyZWN0IHg9IjI0IiB5PSIyMCIgd2lkdGg9IjUiIGhlaWdodD0iOCIgcng9IjIiIGZpbGw9InVybCgjcHVycEdMKSIgZmlsdGVyPSJ1cmwoI3NoYWRvd0wpIiBvcGFjaXR5PSIwLjYiLz4KICA8cmVjdCB4PSIyNCIgeT0iMjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjgiIHJ4PSIyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDgpIi8+CiAgPHJlY3QgeD0iMjYuNSIgeT0iMTYuNSIgd2lkdGg9IjEuMiIgaGVpZ2h0PSIzLjUiIHJ4PSIwLjYiIGZpbGw9IiM1YTQ5NzYiIG9wYWNpdHk9IjAuMyIvPgoKICA8IS0tIFdPUkRNQVJLIC0tPgogIDx0ZXh0IHg9IjM2IiB5PSIyNyIKICAgIGZvbnQtZmFtaWx5PSJPdXRmaXQsSW50ZXIsc3lzdGVtLXVpLHNhbnMtc2VyaWYiCiAgICBmb250LXNpemU9IjE3IiBmb250LXdlaWdodD0iODAwIiBsZXR0ZXItc3BhY2luZz0iLTAuNCIKICAgIGZpbGw9IiMwZjBmMTQiPkZvcndhcmQ8L3RleHQ+CiAgPHRleHQgeD0iMTAzIiB5PSIyNyIKICAgIGZvbnQtZmFtaWx5PSJPdXRmaXQsSW50ZXIsc3lzdGVtLXVpLHNhbnMtc2VyaWYiCiAgICBmb250LXNpemU9IjE3IiBmb250LXdlaWdodD0iODAwIiBsZXR0ZXItc3BhY2luZz0iLTAuNCIKICAgIGZpbGw9IiM1YTQ5NzYiPkxhYjwvdGV4dD4KPC9zdmc+Cg==";
function me(e, i, n) {
  const a = e.length;
  if (a === 0) return null;
  const r = e[0].time, l = e[a - 1].time;
  if (n <= r) return (n - r) / i;
  if (n >= l) return a - 1 + (n - l) / i;
  let s = 0, o = a - 1;
  for (; o - s > 1; ) {
    const d = s + o >> 1;
    e[d].time <= n ? s = d : o = d;
  }
  const m = e[s].time, c = e[o].time;
  return s + (n - m) / (c - m);
}
function xe(e, i, n) {
  const a = e.length;
  if (a === 0) return null;
  if (n <= 0) return Math.round(e[0].time + n * i);
  if (n >= a - 1) return Math.round(e[a - 1].time + (n - (a - 1)) * i);
  const r = Math.floor(n), l = n - r;
  return Math.round(e[r].time + l * (e[r + 1].time - e[r].time));
}
function Ie(e, i) {
  const n = me(e.bars, e.step, i.time);
  if (n === null) return null;
  const a = e.chart.timeScale().logicalToCoordinate(n), r = e.series.priceToCoordinate(i.price);
  return a === null || r === null ? null : { x: a, y: r };
}
function ve(e, i, n) {
  const a = e.chart.timeScale().coordinateToLogical(i), r = e.series.coordinateToPrice(n);
  if (a === null || r === null) return null;
  const l = xe(e.bars, e.step, a);
  return l === null ? null : { time: l, price: r };
}
function It(e, i, n, a) {
  const r = a.x - n.x, l = a.y - n.y, s = r * r + l * l, o = s === 0 ? 0 : Math.max(0, Math.min(1, ((e - n.x) * r + (i - n.y) * l) / s));
  return Math.hypot(e - (n.x + o * r), i - (n.y + o * l));
}
const te = 6, st = 8;
function Ne(e, i, n, a, r) {
  const l = i.find((s) => s.id === n);
  if (l && l.type !== "hline") {
    const s = Ye(e, l);
    for (let o = 0; o < s.length; o++) {
      const m = s[o];
      if (m && Math.hypot(m.x - a, m.y - r) <= st) return { id: l.id, part: "handle", index: o };
    }
  }
  for (let s = i.length - 1; s >= 0; s--) {
    const o = i[s];
    if (o.type === "hline") {
      const d = e.series.priceToCoordinate(o.points[0].price);
      if (d !== null && Math.abs(d - r) <= te) return { id: o.id, part: "body" };
      continue;
    }
    const m = Ie(e, o.points[0]), c = Ie(e, o.points[1]);
    if (!(!m || !c))
      if (o.type === "trendline") {
        if (It(a, r, m, c) <= te) return { id: o.id, part: "body" };
      } else {
        const d = Math.min(m.x, c.x) - te, h = Math.max(m.x, c.x) + te, P = Math.min(m.y, c.y) - te, g = Math.max(m.y, c.y) + te;
        if (a >= d && a <= h && r >= P && r <= g) return { id: o.id, part: "body" };
      }
  }
  return null;
}
function Ye(e, i) {
  return i.points.map((n) => Ie(e, n));
}
const ct = "https://engin.forwardlab.ir";
function dt(e = {}) {
  const i = (e.engineUrl ?? ct).replace(/\/+$/, ""), n = e.pollMs ?? 3e3, a = async (r, l, s, o) => {
    const m = new URLSearchParams({ symbol: r, tf: l, limit: String(Math.min(s, 1e3)) });
    o !== void 0 && m.set("to", String(Math.floor(o) * 1e3));
    const c = await fetch(`${i}/api/v1/client/market/candles?${m}`);
    if (!c.ok) throw new Error(`ForwardLab feed: HTTP ${c.status}`);
    const d = await c.json();
    if (d.success !== !0 || !Array.isArray(d.data)) throw new Error("ForwardLab feed: bad response");
    return d.data.map((h) => ({
      time: Math.floor(h.bucket / 1e3),
      open: Number(h.open),
      high: Number(h.high),
      low: Number(h.low),
      close: Number(h.close)
    }));
  };
  return {
    getBars: ({ symbol: r, timeframe: l, limit: s, to: o }) => a(r, l, s, o),
    subscribe: n > 0 ? ({ symbol: r, timeframe: l }, s) => {
      let o = !1, m;
      const c = async () => {
        try {
          const d = await a(r, l, 2);
          if (!o) for (const h of d) s(h);
        } catch {
        }
        o || (m = setTimeout(c, n));
      };
      return m = setTimeout(c, n), () => {
        o = !0, clearTimeout(m);
      };
    } : void 0
  };
}
let gt = null;
function ut() {
  return gt ??= dt();
}
const Ge = {
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
  const i = Ge[e] ?? Ge.en;
  return (n) => i[n];
}
const ke = "#8b6cf6", le = { width: 120, height: 30, margin: 10 };
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
    i.useMediaCoordinateSpace(({ context: s, mediaSize: o }) => {
      const m = r.draft ? [...r.drawings, r.draft] : r.drawings;
      for (const c of m) bt(s, l, c, r, o.width, c.id === r.selectedId || c === r.draft);
      yt(s, r, o.width, o.height);
    });
  }
}
function pt(e, i) {
  const n = /^#([0-9a-f]{6})$/i.exec(e);
  if (!n) return e;
  const a = parseInt(n[1], 16);
  return `rgba(${a >> 16 & 255}, ${a >> 8 & 255}, ${a & 255}, ${i})`;
}
function bt(e, i, n, a, r, l) {
  const s = a.colorOf(n), o = Math.max(1, Math.min(4, n.width ?? 2));
  e.save(), e.strokeStyle = s, e.lineWidth = o, e.setLineDash(n.dashed ? [6, 4] : []);
  let m = null;
  if (n.type === "hline") {
    const c = i.series.priceToCoordinate(n.points[0].price);
    if (c === null) return e.restore();
    e.beginPath(), e.moveTo(0, c), e.lineTo(r, c), e.stroke(), ft(e, n.points[0].price.toFixed(a.precision), r, c, s), m = { x: 8, y: c - 6, align: "left" };
  } else {
    const c = Ie(i, n.points[0]), d = Ie(i, n.points[1] ?? n.points[0]);
    if (!c || !d) return e.restore();
    if (n.type === "trendline") {
      e.beginPath(), e.moveTo(c.x, c.y), e.lineTo(d.x, d.y), e.stroke();
      const h = c.y < d.y ? c : d;
      m = { x: h.x, y: h.y - 6, align: "center" };
    } else {
      const h = Math.min(c.x, d.x), P = Math.min(c.y, d.y), g = Math.abs(c.x - d.x), K = Math.abs(c.y - d.y);
      e.fillStyle = pt(s, 0.16), e.fillRect(h, P, g, K), e.strokeRect(h, P, g, K), m = { x: h + 6, y: P + 14, align: "left" };
    }
  }
  if (n.label && m && (e.setLineDash([]), e.font = "600 12px Estedad, Vazirmatn, Tahoma, system-ui, sans-serif", e.textAlign = m.align, e.fillStyle = s, e.fillText(n.label, m.x, m.y)), l) {
    e.setLineDash([]);
    const c = n.type === "hline" ? [] : Ye(i, n);
    for (const d of c)
      d && (e.beginPath(), e.arc(d.x, d.y, 5, 0, Math.PI * 2), e.fillStyle = a.theme === "dark" ? "#0f1016" : "#ffffff", e.fill(), e.lineWidth = 2, e.stroke());
  }
  e.restore();
}
function ft(e, i, n, a, r) {
  e.setLineDash([]), e.font = "11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  const l = e.measureText(i).width + 10;
  e.fillStyle = r, e.fillRect(n - l, a - 9, l, 18), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle", e.fillText(i, n - l + 5, a), e.textBaseline = "alphabetic";
}
function yt(e, i, n, a) {
  if (!i.logo || !i.logo.complete || i.logo.naturalWidth === 0) return;
  const { width: r, height: l, margin: s } = le;
  e.save(), e.globalAlpha = 0.9, e.drawImage(i.logo, n - r - s, a - l - s, r, l), e.restore();
}
const St = ["XAUUSD", "EURUSD", "GBPUSD", "USDCHF"], Ct = ["M1", "M5", "M15", "H1", "H4"], We = {
  M1: 60,
  M5: 300,
  M15: 900,
  H1: 3600,
  H4: 14400
}, Be = {
  XAUUSD: 2,
  EURUSD: 5,
  GBPUSD: 5,
  USDCHF: 5
}, He = ["trendline", "hline", "rect"], wt = "https://forwardlab.ir/";
function Pt(e) {
  const i = new URL(wt);
  return e.refCode && i.searchParams.set("ref", e.refCode), i.searchParams.set("utm_source", e.partner.trim().toLowerCase()), i.searchParams.set("utm_medium", "referral"), i.searchParams.set("utm_campaign", "partner_signal_chart"), i.searchParams.set("utm_content", e.placement), e.utmId && i.searchParams.set("utm_id", e.utmId), i.toString();
}
const Le = 500, Mt = ["#8b6cf6", "#22c55e", "#ef4444", "#f59e0b", "#3b82f6", "#e5e7eb"], Zt = {
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
}, Dt = "Estedad, Vazirmatn, Tahoma, system-ui, sans-serif", jt = "Outfit, Inter, system-ui, -apple-system, Segoe UI, sans-serif", Te = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
function At() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `d_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
function ye(e) {
  const i = e.filter(
    (a) => Number.isFinite(a.time) && Number.isFinite(a.open) && Number.isFinite(a.high) && Number.isFinite(a.low) && Number.isFinite(a.close)
  );
  i.sort((a, r) => a.time - r.time);
  const n = [];
  for (const a of i)
    n.length && n[n.length - 1].time === a.time ? n[n.length - 1] = a : n.push(a);
  return n;
}
const Re = (e) => e, vt = $e(function(i, n) {
  const {
    mode: a,
    symbol: r,
    timeframe: l,
    theme: s = "dark",
    locale: o = "fa",
    height: m = 480,
    partner: c,
    strategies: d = []
  } = i, h = a === "admin", P = mt(o), g = Zt[s], K = o === "fa" ? Dt : jt, Ee = (i.tools ?? He).filter((t) => He.includes(t)), [Ue, ze] = z(i.defaultDrawings ?? []), W = i.drawings ?? Ue, [ie, O] = z(null), [G, B] = z(null), [Se, Ve] = z(() => /* @__PURE__ */ new Set()), [he, Je] = z(d[0]?.id), [ne, se] = z("loading"), [Qe, Xe] = z(0), [Ce, Fe] = z({ right: 60, bottom: 38 }), we = k(null), pe = k(null), J = k(null), _ = k(null), x = k(null), Y = k([]), Pe = k(null), j = k(null), Q = k(null), ce = W.filter((t) => !t.strategyId || !Se.has(t.strategyId)), Ke = new Map(d.map((t) => [t.id, t.color])), E = k({ props: i, drawings: W, visible: ce, tool: ie, selectedId: G, activeStrategyId: he, isAdmin: h });
  E.current = { props: i, drawings: W, visible: ce, tool: ie, selectedId: G, activeStrategyId: he, isAdmin: h };
  const Me = k(() => ({}));
  Me.current = () => {
    const t = Q.current, u = t?.preview ? ce.map((S) => S.id === t.preview.id ? t.preview : S) : ce;
    return {
      bars: Y.current,
      step: We[l],
      drawings: u,
      draft: j.current?.d ?? null,
      selectedId: G,
      colorOf: (S) => S.color ?? (S.strategyId ? Ke.get(S.strategyId) : void 0) ?? ke,
      precision: Be[r] ?? 5,
      theme: s,
      logo: Pe.current
    };
  };
  const X = qe((t) => {
    E.current.props.drawings === void 0 && ze(t), E.current.props.onDrawingsChange?.(t);
  }, []);
  et(
    n,
    () => ({
      screenshot: () => J.current?.takeScreenshot() ?? null,
      getDrawings: () => E.current.drawings
    }),
    []
  ), V(() => {
    const t = pe.current;
    if (!t) return;
    const u = it(t, {
      autoSize: !0,
      crosshair: { mode: nt.Normal },
      timeScale: { timeVisible: !0, secondsVisible: !1, rightOffset: 8 },
      rightPriceScale: { borderVisible: !1 }
    }), S = u.addCandlestickSeries({ borderVisible: !1 }), M = new ht(() => Me.current());
    S.attachPrimitive(M), J.current = u, _.current = S, x.current = M;
    const F = () => {
      Fe({
        right: u.priceScale("right").width() + le.margin,
        bottom: u.timeScale().height() + le.margin
      });
    };
    u.timeScale().subscribeSizeChange(F);
    const H = new ResizeObserver(F);
    return H.observe(t), () => {
      H.disconnect(), u.remove(), J.current = null, _.current = null, x.current = null;
    };
  }, []), V(() => {
    const t = J.current, u = _.current;
    if (!t || !u) return;
    t.applyOptions({
      layout: {
        background: { type: rt.Solid, color: g.bg },
        textColor: g.muted,
        fontFamily: Te
      },
      grid: { vertLines: { color: g.grid }, horzLines: { color: g.grid } },
      timeScale: { borderColor: g.border }
    }), u.applyOptions({
      upColor: g.up,
      downColor: g.down,
      wickUpColor: g.up,
      wickDownColor: g.down
    });
    const S = new Image();
    S.onload = () => x.current?.redraw(), S.src = s === "dark" ? at : lt, Pe.current = S, x.current?.redraw();
  }, [s, g]), V(() => {
    const t = Be[r] ?? 5;
    _.current?.applyOptions({
      priceFormat: { type: "price", precision: t, minMove: 1 / 10 ** t }
    });
  }, [r]), V(() => {
    const t = J.current, u = _.current;
    if (!t || !u) return;
    const S = E.current.props.datafeed ?? ut();
    let M = !0, F, H = !1, re = !0;
    Y.current = [], u.setData([]), se("loading");
    const oe = (A) => {
      if (!M) return;
      const [Z] = ye([A]);
      if (!Z) return;
      const D = Y.current, N = D[D.length - 1];
      N && Z.time < N.time || (N && Z.time === N.time ? D[D.length - 1] = Z : D.push(Z), u.update(Z), D.length === 1 && se("ready"));
    }, ae = async () => {
      const A = Y.current;
      if (!(H || !re || A.length === 0)) {
        H = !0;
        try {
          const Z = A[0].time, D = await S.getBars({ symbol: r, timeframe: l, limit: Le, to: Z });
          if (!M) return;
          const N = ye(D).filter((ue) => ue.time < Z);
          if (N.length === 0) {
            re = !1;
            return;
          }
          const ee = t.timeScale().getVisibleLogicalRange();
          Y.current = [...N, ...Y.current], u.setData(Re(Y.current)), ee && t.timeScale().setVisibleLogicalRange({
            from: ee.from + N.length,
            to: ee.to + N.length
          });
        } catch {
        } finally {
          H = !1;
        }
      }
    }, q = (A) => {
      A && A.from < 10 && ae();
    };
    return S.getBars({ symbol: r, timeframe: l, limit: Le }).then((A) => {
      if (!M) return;
      const Z = ye(A);
      Y.current = Z, u.setData(Re(Z));
      const D = Z.length;
      D > 0 && t.timeScale().setVisibleLogicalRange({ from: Math.max(0, D - 150), to: D + 8 }), se(D > 0 ? "ready" : "empty"), t.timeScale().subscribeVisibleLogicalRangeChange(q), F = S.subscribe?.({ symbol: r, timeframe: l }, oe);
    }).catch(() => M && se("error")), () => {
      M = !1, F?.(), t.timeScale().unsubscribeVisibleLogicalRangeChange(q);
    };
  }, [r, l, Qe]), V(() => {
    G && !W.some((t) => t.id === G) && B(null);
  }, [W, G]), V(() => {
    j.current = null, Q.current = null, O(null), B(null);
  }, [r, l, a]), V(() => {
    x.current?.redraw();
  }), V(() => {
    const t = pe.current;
    if (!t || !h) return;
    const u = () => {
      const I = J.current, b = _.current;
      return !I || !b ? null : { chart: I, series: b, bars: Y.current, step: We[l] };
    }, S = (I, b) => {
      const C = J.current;
      if (!C) return null;
      const p = t.getBoundingClientRect(), w = I - p.left, y = b - p.top, v = C.timeScale().width(), L = p.height - C.timeScale().height();
      return w < 0 || y < 0 || w > v || y > L ? null : { x: w, y };
    }, M = () => {
      const I = j.current;
      if (!I) return;
      j.current = null;
      const b = E.current;
      X([...b.drawings, I.d]), B(I.d.id), O(null);
    }, F = (I, b, C, p, w) => {
      if (w.part === "handle") {
        const T = I.points.slice();
        return T[w.index] = C, { ...I, points: T };
      }
      const y = C.price - b.price;
      if (I.type === "hline") return { ...I, points: [{ ...I.points[0], price: I.points[0].price + y }] };
      const v = me(p.bars, p.step, b.time), L = me(p.bars, p.step, C.time), U = v === null || L === null ? 0 : L - v;
      return {
        ...I,
        points: I.points.map((T) => {
          const je = me(p.bars, p.step, T.time);
          return { time: je === null ? T.time : xe(p.bars, p.step, je + U) ?? T.time, price: T.price + y };
        })
      };
    }, H = (I, b) => {
      const C = u(), p = S(I, b);
      if (!C || !p) return;
      const w = ve(C, p.x, p.y);
      if (!w) return;
      if (j.current) {
        const U = j.current.d;
        j.current.d = { ...U, points: [U.points[0], w] }, x.current?.redraw();
        return;
      }
      const y = Q.current;
      if (y) {
        y.preview = F(y.orig, y.start, w, C, y.hit), x.current?.redraw();
        return;
      }
      const v = E.current;
      if (v.tool) {
        t.style.cursor = "crosshair";
        return;
      }
      const L = Ne(C, v.visible, v.selectedId, p.x, p.y);
      t.style.cursor = L ? L.part === "handle" ? "grab" : "pointer" : "";
    }, re = (I, b) => {
      window.removeEventListener("mousemove", oe), window.removeEventListener("mouseup", ae), window.removeEventListener("touchmove", q), window.removeEventListener("touchend", A);
      const C = j.current;
      if (C?.downAt) {
        const w = Math.hypot(I - C.downAt.x, b - C.downAt.y) > 6;
        C.downAt = null, w && M();
        return;
      }
      const p = Q.current;
      if (Q.current = null, p?.preview) {
        const w = E.current;
        X(w.drawings.map((y) => y.id === p.preview.id ? p.preview : y));
      }
      x.current?.redraw();
    }, oe = (I) => H(I.clientX, I.clientY), ae = (I) => re(I.clientX, I.clientY), q = (I) => {
      const b = I.touches[0];
      b && (I.preventDefault(), H(b.clientX, b.clientY));
    }, A = (I) => {
      const b = I.changedTouches[0];
      re(b?.clientX ?? 0, b?.clientY ?? 0);
    }, Z = (I, b) => {
      const C = u(), p = S(I, b);
      if (!C || !p) return !1;
      const w = ve(C, p.x, p.y);
      if (!w) return !1;
      const y = E.current;
      if (j.current)
        return j.current.d = { ...j.current.d, points: [j.current.d.points[0], w] }, M(), !0;
      if (y.tool) {
        const U = { id: At(), strategyId: y.activeStrategyId };
        if (y.tool === "hline") {
          const T = { ...U, type: "hline", points: [w] };
          return X([...y.drawings, T]), B(T.id), O(null), !0;
        }
        return j.current = { d: { ...U, type: y.tool, points: [w, w] }, downAt: { x: I, y: b } }, x.current?.redraw(), !0;
      }
      const v = Ne(C, y.visible, y.selectedId, p.x, p.y);
      if (!v)
        return y.selectedId && B(null), !1;
      const L = y.drawings.find((U) => U.id === v.id);
      return L ? (B(v.id), Q.current = { hit: v, start: w, orig: L, preview: null }, !0) : !1;
    }, D = () => {
      window.addEventListener("mousemove", oe), window.addEventListener("mouseup", ae), window.addEventListener("touchmove", q, { passive: !1 }), window.addEventListener("touchend", A);
    }, N = (I) => {
      I.button === 0 && Z(I.clientX, I.clientY) && (I.stopPropagation(), I.preventDefault(), we.current?.focus({ preventScroll: !0 }), D());
    }, ee = (I) => {
      const b = I.touches[0];
      !b || I.touches.length > 1 || Z(b.clientX, b.clientY) && (I.stopPropagation(), I.preventDefault(), D());
    }, ue = (I) => {
      Q.current || H(I.clientX, I.clientY);
    };
    return t.addEventListener("mousedown", N, { capture: !0 }), t.addEventListener("touchstart", ee, { capture: !0, passive: !1 }), t.addEventListener("mousemove", ue), () => {
      t.removeEventListener("mousedown", N, { capture: !0 }), t.removeEventListener("touchstart", ee, { capture: !0 }), t.removeEventListener("mousemove", ue), window.removeEventListener("mousemove", oe), window.removeEventListener("mouseup", ae), window.removeEventListener("touchmove", q), window.removeEventListener("touchend", A), t.style.cursor = "";
    };
  }, [h, l, X]);
  const Oe = (t) => {
    if (!h) return;
    const u = t.target;
    u.tagName === "INPUT" || u.tagName === "SELECT" || (t.key === "Escape" ? (j.current = null, O(null), B(null)) : (t.key === "Delete" || t.key === "Backspace") && G && (t.preventDefault(), X(W.filter((S) => S.id !== G)), B(null)));
  }, _e = (t) => {
    G && X(W.map((u) => u.id === G ? { ...u, ...t } : u));
  }, de = h ? W.find((t) => t.id === G) ?? null : null, Ze = h ? d : d.filter((t) => W.some((u) => u.strategyId === t.id)), De = (t) => Pt({ partner: c, placement: t, refCode: i.refCode, utmId: i.utmId }), $ = (t) => ({
    font: "inherit",
    fontSize: 12,
    padding: "5px 10px",
    borderRadius: 8,
    border: `1px solid ${t ? g.brand : g.border}`,
    background: t ? g.brand : "transparent",
    color: t ? "#fff" : g.text,
    cursor: "pointer",
    lineHeight: 1.4
  }), be = {
    font: "inherit",
    fontSize: 12,
    padding: "4px 6px",
    borderRadius: 8,
    border: `1px solid ${g.border}`,
    background: g.bg,
    color: g.text
  }, fe = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
    padding: "8px 10px",
    background: g.panel,
    borderBottom: `1px solid ${g.border}`
  }, ge = { fontFamily: Te, direction: "ltr", unicodeBidi: "isolate" };
  return /* @__PURE__ */ R(
    "div",
    {
      ref: we,
      dir: o === "fa" ? "rtl" : "ltr",
      tabIndex: h ? 0 : void 0,
      onKeyDown: Oe,
      style: {
        fontFamily: K,
        color: g.text,
        background: g.bg,
        border: `1px solid ${g.border}`,
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
              style: { ...be, ...ge },
              value: r,
              onChange: (t) => i.onSymbolChange?.(t.target.value),
              children: St.map((t) => /* @__PURE__ */ f("option", { value: t, children: t }, t))
            }
          ) : /* @__PURE__ */ f("span", { style: { ...ge, fontWeight: 600, fontSize: 13 }, children: r }),
          h && i.onTimeframeChange ? /* @__PURE__ */ f("div", { style: { display: "flex", gap: 4 }, dir: "ltr", children: Ct.map((t) => /* @__PURE__ */ f(
            "button",
            {
              type: "button",
              style: { ...$(t === l), ...ge },
              onClick: () => i.onTimeframeChange?.(t),
              children: t
            },
            t
          )) }) : /* @__PURE__ */ f("span", { style: { ...ge, fontSize: 12, color: g.muted }, children: l }),
          h && /* @__PURE__ */ R(Ae, { children: [
            /* @__PURE__ */ f("span", { style: { width: 1, height: 20, background: g.border, margin: "0 4px" } }),
            /* @__PURE__ */ f("button", { type: "button", style: $(ie === null), onClick: () => O(null), children: P("cursor") }),
            Ee.map((t) => /* @__PURE__ */ f(
              "button",
              {
                type: "button",
                style: $(ie === t),
                onClick: () => {
                  j.current = null, B(null), O(ie === t ? null : t);
                },
                children: P(t)
              },
              t
            )),
            d.length > 0 && /* @__PURE__ */ R(
              "select",
              {
                "aria-label": P("strategy"),
                style: be,
                value: he ?? "",
                onChange: (t) => Je(t.target.value || void 0),
                children: [
                  /* @__PURE__ */ f("option", { value: "", children: P("noStrategy") }),
                  d.map((t) => /* @__PURE__ */ f("option", { value: t.id, children: t.name }, t.id))
                ]
              }
            )
          ] })
        ] }),
        de && /* @__PURE__ */ f(
          Nt,
          {
            drawing: de,
            strategies: d,
            t: P,
            colors: g,
            btn: $,
            select: be,
            barStyle: fe,
            onPatch: _e,
            onDelete: () => {
              X(W.filter((t) => t.id !== de.id)), B(null);
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
              title: P(u ? "showStrategy" : "hideStrategy"),
              style: { ...$(!1), opacity: u ? 0.45 : 1, display: "inline-flex", alignItems: "center", gap: 6 },
              onClick: () => Ve((S) => {
                const M = new Set(S);
                return M.has(t.id) ? M.delete(t.id) : M.add(t.id), M;
              }),
              children: [
                /* @__PURE__ */ f("span", { style: { width: 8, height: 8, borderRadius: 4, background: t.color ?? ke } }),
                t.name
              ]
            },
            t.id
          );
        }) }),
        /* @__PURE__ */ R("div", { dir: "ltr", style: { position: "relative", height: m }, children: [
          /* @__PURE__ */ f("div", { ref: pe, style: { position: "absolute", inset: 0 } }),
          /* @__PURE__ */ f(
            "a",
            {
              href: De("chart_watermark"),
              target: "_blank",
              rel: "noopener",
              "aria-label": P("watermarkAria"),
              onClick: () => i.onLinkClick?.("chart_watermark"),
              style: {
                position: "absolute",
                right: Ce.right,
                bottom: Ce.bottom,
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
                fontFamily: K,
                fontSize: 13,
                color: g.muted,
                pointerEvents: ne === "loading" ? "none" : "auto",
                zIndex: 1
              },
              children: [
                ne === "loading" && P("loading"),
                ne === "empty" && P("noData"),
                ne === "error" && /* @__PURE__ */ R(Ae, { children: [
                  P("error"),
                  /* @__PURE__ */ f("button", { type: "button", style: $(!0), onClick: () => Xe((t) => t + 1), children: P("retry") })
                ] })
              ]
            }
          )
        ] }),
        !i.hideCta && /* @__PURE__ */ f("div", { style: { padding: 10, borderTop: `1px solid ${g.border}`, background: g.panel }, children: /* @__PURE__ */ f(
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
              background: g.brand,
              color: "#fff",
              fontFamily: K,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none"
            },
            children: P("cta")
          }
        ) })
      ]
    }
  );
});
function Nt(e) {
  const { drawing: i, t: n, colors: a } = e, [r, l] = z(i.label ?? ""), s = () => {
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
        onBlur: s,
        onKeyDown: (o) => o.key === "Enter" && s(),
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
  const n = ot(e), a = tt();
  let r = { ...i }, l = i.drawings ?? i.defaultDrawings ?? [];
  const s = () => {
    n.render(
      /* @__PURE__ */ f(
        vt,
        {
          ref: a,
          ...r,
          drawings: l,
          onSymbolChange: r.onSymbolChange && ((o) => r.onSymbolChange?.(o)),
          onTimeframeChange: r.onTimeframeChange && ((o) => r.onTimeframeChange?.(o)),
          onDrawingsChange: (o) => {
            l = o, s(), r.onDrawingsChange?.(o);
          }
        }
      )
    );
  };
  return s(), {
    update(o) {
      r = { ...r, ...o }, o.drawings && (l = o.drawings), s();
    },
    getDrawings: () => l,
    screenshot: () => a.current?.screenshot()?.toDataURL("image/png") ?? null,
    destroy: () => n.unmount()
  };
}
export {
  He as DRAWING_TYPES,
  ct as FORWARDLAB_ENGINE_URL,
  wt as FORWARDLAB_URL,
  St as SYMBOLS,
  Be as SYMBOL_PRECISION,
  vt as SignalChart,
  Ct as TIMEFRAMES,
  We as TIMEFRAME_SECONDS,
  Pt as buildForwardLabUrl,
  dt as createForwardLabFeed,
  Lt as mount
};
//# sourceMappingURL=signal-chart.js.map
