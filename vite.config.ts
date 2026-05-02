import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// In production we deploy to https://kai-denrei.github.io/kakistogenesis/
// so Vite must rewrite asset URLs against that subpath.
// In dev we keep `/` so localhost:5173/ keeps working with HMR.
// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const base = command === "build" ? "/kakistogenesis/" : "/";
  return {
    base,
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.svg"],
        manifest: {
          name: "ペシ魔鉄則 — Peshi-ma Tessoku",
          short_name: "Peshi-ma",
          description:
            "An animated reference for the institutional mechanisms by which mixed intent becomes asymmetrically negative output.",
          theme_color: "#1c1916",
          background_color: "#1c1916",
          display: "standalone",
          start_url: base,
          scope: base,
          icons: [
            {
              src: `${base}icon-192.svg`,
              sizes: "192x192",
              type: "image/svg+xml",
              purpose: "any maskable",
            },
            {
              src: `${base}icon-512.svg`,
              sizes: "512x512",
              type: "image/svg+xml",
              purpose: "any maskable",
            },
          ],
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,svg,woff2,ico,png}"],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts-stylesheets",
                expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts-webfonts",
                expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              },
            },
          ],
        },
      }),
    ],
  };
});
