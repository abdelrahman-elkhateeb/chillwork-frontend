import { NotFoundState } from "@/components/states/not-found-state"
import { ROUTES } from "@/config/routes"

/**
 * Deliberately a 404, never a 403: "you can't see this" would confirm the
 * visit exists. The same answer when it was reassigned away from him.
 */
export function VisitNotFound() {
  return (
    <NotFoundState
      title="No such visit"
      backTo={ROUTES.visits}
      backLabel="Back to my visits"
      className="flex-1"
    />
  )
}
