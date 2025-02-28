import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext", // Ensure modern JavaScript is used
    rollupOptions: {
      output: {
        format: "es", // ES modules format, required for module scripts
      },
    },
  },
});
