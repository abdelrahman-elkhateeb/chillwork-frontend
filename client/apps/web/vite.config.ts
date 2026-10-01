import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const apiTarget = env.API_PROXY_TARGET || "http://localhost:3000"
  // A local API is reached as-is. A hosted one (e.g. Vercel) routes by Host,
  // so it must get its own Host — and then its CSRF guard compares Origin to
  // that Host, so the browser's Origin is swapped for the target's too.
  const isRemoteApi = !/^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(
    apiTarget
  )

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        // The API's auth cookies are HttpOnly with no Domain, so the browser
        // must talk to the API through this origin.
        "/api": {
          target: apiTarget,
          changeOrigin: isRemoteApi,
          secure: true,
          configure: (proxy) => {
            if (!isRemoteApi) return
            proxy.on("proxyReq", (proxyReq) => {
              if (proxyReq.getHeader("origin")) {
                proxyReq.setHeader("origin", new URL(apiTarget).origin)
              }
            })
          },
        },
      },
    },
  }
})
