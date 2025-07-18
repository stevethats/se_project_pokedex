import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/se_project_pokedex",
  plugins: [react()],
  server: {
    port: 3000,
  },
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      crypto: "crypto-browserify",
    },
  },
  optimizeDeps: {
    include: ["crypto-browserify"],
  },
});
