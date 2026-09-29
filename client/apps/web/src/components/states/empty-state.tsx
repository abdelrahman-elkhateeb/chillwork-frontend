import type { ReactNode } from "react"
import { InboxIcon } from "lucide-react"

import { StatePanel } from "@/components/states/state-panel"

type Props = {
  /** Names the thing that is missing: "No parts yet", never "No data". */
  title: string
  description?: ReactNode
  /** The action that fills it. */
  action?: ReactNode
  icon?: ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  action,
  icon,
  className,
}: Props) {
  return (
    <StatePanel
      className={className}
      icon={icon ?? <InboxIcon className="size-7" strokeWidth={1.6} />}
      title={title}
      description={description}
      action={action}
    />
  )
}
