import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Proxy /api/* to the Vercel dev server during local dev
    // Run `vercel dev` instead of `vite` for full local experience
  },
});
