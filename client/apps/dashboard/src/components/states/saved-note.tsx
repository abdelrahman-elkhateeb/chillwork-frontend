import { CircleCheckIcon } from "lucide-react"
import { Alert, AlertTitle } from "@workspace/ui/components/alert"
import { cn } from "@workspace/ui/lib/utils"

/** "Saved", without stealing focus. */
export function SavedNote({
  label = "Saved",
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <Alert
      variant="success"
      role="status"
      className={cn("flex items-center gap-2.5", className)}
    >
      <CircleCheckIcon className="size-[17px] text-[#11705A]" />
      <AlertTitle className="text-[13.5px] font-semibold">{label}</AlertTitle>
    </Alert>
  )
}
