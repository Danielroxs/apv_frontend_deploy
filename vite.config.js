import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const backendTarget = env.VITE_BACKEND_URL?.trim();
  const proxyTarget = backendTarget || "http://localhost:3000";

  return {
    plugins: [react(), tailwindcss()],
    server:
      mode === "development"
        ? {
            proxy: {
              "/api": {
                target: proxyTarget,
                changeOrigin: true,
                secure: false,
              },
            },
          }
        : undefined,
  };
});
