export const ROUTES = {
  home: "/",
  login: "/login",
  signup: "/signup",
  account: "/account",
  /** The customer's home once signed in. */
  requests: "/requests",
  newRequest: "/requests/new",
  request: "/requests/:requestId",
} as const

/** Fills `:params` in a route pattern. */
export function pathTo(
  pattern: string,
  params: Record<string, string>
): string {
  return pattern.replace(/:(\w+)/g, (_, key: string) =>
    encodeURIComponent(params[key] ?? "")
  )
}
