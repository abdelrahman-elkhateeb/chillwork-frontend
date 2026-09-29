import { Link } from "react-router-dom"
import { SearchXIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

import { STATE_COPY } from "@/components/states/state-copy.constants"
import { StatePanel } from "@/components/states/state-panel"

type Props = {
  /** "No such request", "No such visit"… */
  title: string
  backTo: string
  backLabel: string
  className?: string
}

/**
 * The same wording whether it is gone or was someone else's — "you can't
 * see this" would confirm it exists.
 */
export function NotFoundState({ title, backTo, backLabel, className }: Props) {
  return (
    <StatePanel
      className={className}
      icon={<SearchXIcon className="size-7" strokeWidth={1.6} />}
      title={title}
      description={STATE_COPY.notFound.description}
      action={
        <Button
          asChild
          variant="outline"
          size="lg"
          className="h-[46px] bg-white px-[22px] text-[14.5px] font-semibold"
        >
          <Link to={backTo}>{backLabel}</Link>
        </Button>
      }
    />
  )
}
