import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pkg from "vite-plugin-linter";
import { VitePWA } from "vite-plugin-pwa";
const { linterPlugin, TypeScriptLinter, EsLinter } = pkg;

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    react(),
    linterPlugin({
      include: ["./src/**/*.ts", "./src/**/*.tsx"],
      linters: [
        new EsLinter({
          configEnv: configEnv,
          serveOptions: { clearCacheOnStart: true },
        }),
        new TypeScriptLinter(),
      ],
      build: { includeMode: "filesInFolder" },
    }),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Moulin Rouge",
        short_name: "Moulin Rouge",
        description: "Moulin Rouge",
        icons: [
          {
            src: "vite_192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "vite.svg",
            type: "image/svg+xml",
            sizes: "512x512",
          },
        ],
        start_url: "./index.html",
        display: "standalone",
      },
    }),
  ],
}));
