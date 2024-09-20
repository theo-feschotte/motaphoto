import path from "path";
import { defineConfig } from "vite";

const ROOT = path.resolve("../../../");
const BASE = __dirname.replace(ROOT, "");

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? `${BASE}/dist/` : BASE,
  build: {
    manifest: true,
    assetsDir: ".",
    outDir: `dist`,
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        appCSS: "assets/styles/app.css",
        editorCSS: "assets/styles/editor-style.css",
        loginCSS: "assets/styles/login-style.css",
        // appCSS: "assets/styles/app.scss",
        // editorCSS: "assets/styles/editor.scss",
        // loginCSS: "assets/styles/login.scss",
        appJS: "assets/scripts/app.js",
      },
      output: {
        entryFileNames: "[name][hash].js",
        assetFileNames: "[name][hash].[ext]",
      },
    },
    plugins: [
      {
        name: "php",
        handleHotUpdate({ file, server }) {
          if (file.endsWith(".php") || file.endsWith(".twig")) {
            server.ws.send({ type: "full-reload" });
          }
        },
      },
    ],
  },
});
