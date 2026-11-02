/**
 * Two builds from one source:
 *
 *  --mode lib         → dist/signal-chart.js (ESM). React and lightweight-charts
 *                       stay external, for a React host that installs the package.
 *  --mode standalone  → dist/signal-chart.standalone.js (IIFE). Everything is
 *                       bundled, React included, and exposed as
 *                       window.ForwardLabSignalChart, for a plain HTML page
 *                       (the partner's Python templates) that loads one <script>.
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ mode }) => {
  const standalone = mode === "standalone";
  return {
    root,
    plugins: [react()],
    // The IIFE has no bundler on the other side to replace these.
    define: standalone ? { "process.env.NODE_ENV": JSON.stringify("production") } : {},
    build: {
      outDir: "dist",
      // The two modes write into the same folder one after the other.
      emptyOutDir: false,
      // Logos are imported as URLs; in lib mode Vite inlines them as data URIs,
      // which is what we want: the watermark must not depend on a second request.
      assetsInlineLimit: 100_000,
      sourcemap: true,
      lib: {
        entry: standalone ? "src/standalone.tsx" : "src/index.ts",
        name: "ForwardLabSignalChart",
        formats: standalone ? ["iife"] : ["es"],
        fileName: () => (standalone ? "signal-chart.standalone.js" : "signal-chart.js"),
      },
      rollupOptions: {
        external: standalone
          ? []
          : ["react", "react-dom", "react-dom/client", "react/jsx-runtime", "lightweight-charts"],
      },
    },
  };
});
