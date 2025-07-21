import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  base: "/se_project_pokedex/",
  plugins: [react()],
  server: {
    port: 3000,
  },
  define: {
    global: "globalThis",
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      external: ["crypto"],
      output: {
        globals: {
          crypto: require.resolve("crypto-browserify"),
        },
      },
    },
  },
});
