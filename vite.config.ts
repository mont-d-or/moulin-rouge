import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pkg from "vite-plugin-linter";
const { linterPlugin, TypeScriptLinter, EsLinter } = pkg;

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    react(),
    linterPlugin({
      include: ["./src/**/*.ts", "./src/**/*.tsx"],
      linters: [new EsLinter({
        configEnv: configEnv,
        serveOptions: { clearCacheOnStart: true },
      }),
      new TypeScriptLinter()],
      build: { includeMode: "filesInFolder" }
    }),

  ]
}));