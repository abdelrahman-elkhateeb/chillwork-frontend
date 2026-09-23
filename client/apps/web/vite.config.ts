import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        // The API's auth cookies are HttpOnly with no Domain, and its CSRF
        // guard compares Origin to the request's own Host — so the browser
        // must talk to the API through this origin. Keep changeOrigin off:
        // rewriting Host to the API's would make every POST fail the
        // origin check with 403 CSRF_ORIGIN_REJECTED.
        "/api": {
          target: env.API_PROXY_TARGET || "http://localhost:3000",
          changeOrigin: false,
        },
      },
    },
  }
})
