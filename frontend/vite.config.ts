import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import pkg from "./package.json";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://localhost:7085/",
        secure: false,
      },
    },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  plugins: [react()],
  define: {
    APP_VERSION: JSON.stringify(process.env.VITE_APP_VERSION ?? pkg.version),
  },
});
