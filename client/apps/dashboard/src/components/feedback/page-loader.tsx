import { Spinner } from "@workspace/ui/components/spinner"

/** Only for the session check before any layout exists — pages use skeletons. */
export function PageLoader() {
  return (
    <div
      role="status"
      className="flex min-h-svh items-center justify-center bg-background text-muted-foreground"
    >
      <Spinner className="size-6" />
      <span className="sr-only">Loading</span>
    </div>
  )
}
