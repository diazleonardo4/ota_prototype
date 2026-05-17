import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import handler from "./api/chat.js";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  if (env.ANTHROPIC_API_KEY) process.env.ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY;

  return {
    root: "backup",
    plugins: [
      react(),
      {
        name: "api-chat-dev-backup",
        configureServer(server) {
          server.middlewares.use("/api/chat", (req, res, next) => {
            handler(req, res).catch(next);
          });
        },
      },
    ],
    server: { port: 5174, strictPort: true },
    esbuild: { loader: "jsx", include: /\.(jsx?|tsx?)$/ },
    optimizeDeps: { esbuildOptions: { loader: { ".js": "jsx" } } },
  };
});
