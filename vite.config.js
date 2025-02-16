import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  envPrefix: "VITE_", // ✅ Ensures only VITE_ prefixed env variables are used
});
