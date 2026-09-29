import { ROUTES, pathTo } from "@/config/routes"

/** The link the admin copies and sends (no email service yet). */
export function activationLink(token: string): string {
  return `${window.location.origin}${pathTo(ROUTES.activate, { token })}`
}
