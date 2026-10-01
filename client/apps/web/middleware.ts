import { rewrite } from "@vercel/functions"

// Vercel Routing Middleware: the production twin of the Vite dev proxy.
// The app always calls the API at its own origin (/api/v1) so the API's
// HttpOnly, Domain-less auth cookies land on this site. Here we forward
// /api/* to the backend named by API_PROXY_TARGET (a Vercel env var).
// The backend sees this site as the Origin, so it must list it in its
// AUTH_ALLOWED_ORIGINS.
export const config = {
  matcher: "/api/:path*",
}

export default function middleware(request: Request) {
  const target = process.env.API_PROXY_TARGET

  if (!target) {
    return Response.json(
      {
        error: {
          code: "API_PROXY_TARGET_MISSING",
          message: "API_PROXY_TARGET is not set for this deployment",
        },
      },
      { status: 500 }
    )
  }

  const { pathname, search } = new URL(request.url)
  return rewrite(new URL(pathname + search, target))
}
