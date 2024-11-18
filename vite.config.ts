import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    host: "localhost",
    port: 8082,
    proxy: {
      // '/api':'url'
      "/api": {
        target: "http://api.front-end.asia",
        // target: "http://127.0.0.1:4523/m1/5332008-0-default",
        // rewrite:(path)=>path.replace(/^\/api/,''),
      },
    },
    open: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
