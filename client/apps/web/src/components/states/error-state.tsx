import { CloudOffIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

import { STATE_COPY } from "@/components/states/state-copy.constants"
import { StatePanel } from "@/components/states/state-panel"
import { isApiError } from "@/lib/api/api-error"

type Props = {
  error: unknown
  onRetry: () => void
  className?: string
}

/**
 * Blames the system, not the person. The short request id is the only
 * technical thing shown — it is what support asks for.
 */
export function ErrorState({ error, onRetry, className }: Props) {
  const reference = isApiError(error) ? error.requestId?.slice(0, 8) : null

  return (
    <StatePanel
      className={className}
      icon={<CloudOffIcon className="size-7" strokeWidth={1.6} />}
      title={STATE_COPY.error.title}
      description={STATE_COPY.error.description}
      action={
        <Button
          size="lg"
          onClick={onRetry}
          className="h-[46px] px-[22px] text-[14.5px] font-semibold"
        >
          {STATE_COPY.error.retry}
        </Button>
      }
      footer={
        reference ? (
          <div className="mt-3.5 font-mono text-[11px] text-[#8A9093]">
            ref {reference}
          </div>
        ) : null
      }
    />
  )
}
