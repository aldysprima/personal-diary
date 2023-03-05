import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/diary": "https://diary-test.ifdenewhallaid.com",
      "/auth": "https://diary-test.ifdenewhallaid.com",
    },
  },
});
