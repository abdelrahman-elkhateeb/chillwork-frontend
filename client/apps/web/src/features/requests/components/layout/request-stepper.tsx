import { Fragment } from "react"
import { CheckIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import {
  REQUEST_COPY,
  REQUEST_STEPS,
} from "@/features/requests/constants/request-copy.constants"
import type { RequestStepIndex } from "@/features/requests/types/request-flow.types"

type Props = {
  /** Every step reads as done once the request is sent. */
  current: RequestStepIndex | "done"
  /** Done steps are links back, except while sending or once sent. */
  onStepSelect?: (step: RequestStepIndex) => void
}

export function RequestStepper({ current, onStepSelect }: Props) {
  const currentIndex = current === "done" ? REQUEST_STEPS.length : current

  return (
    <div className="border-b border-border bg-surface-sunken">
      <div className="mx-auto flex max-w-[1440px] items-center px-4 py-3.5 md:px-12">
        <ol className="flex min-w-0 grow items-center">
          {REQUEST_STEPS.map((step, index) => {
            const isDone = index < currentIndex
            const isCurrent = index === currentIndex
            const canSelect = isDone && onStepSelect !== undefined

            const content = (
              <>
                <span
                  className={cn(
                    "flex size-[26px] shrink-0 items-center justify-center rounded-full text-[12.5px] font-bold",
                    isDone && "bg-[#11705A] text-white",
                    isCurrent && "bg-primary text-ink",
                    !isDone &&
                      !isCurrent &&
                      "border-2 border-line-strong text-[#8A9093]"
                  )}
                >
                  {isDone ? (
                    <CheckIcon className="size-3.5" strokeWidth={3} />
                  ) : (
                    index + 1
                  )}
                </span>
                <span
                  className={cn(
                    "font-narrow text-[14px]",
                    isCurrent ? "font-bold" : "hidden font-semibold sm:inline",
                    isDone && "text-muted-foreground",
                    !isDone && !isCurrent && "text-[#8A9093]"
                  )}
                >
                  {step.title}
                </span>
              </>
            )

            return (
              <Fragment key={step.id}>
                {index > 0 ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mx-2.5 h-0.5 max-w-[120px] grow sm:mx-3.5",
                      index <= currentIndex ? "bg-[#11705A]" : "bg-[#C9CCCC]"
                    )}
                  />
                ) : null}
                <li
                  aria-current={isCurrent ? "step" : undefined}
                  className="flex shrink-0"
                >
                  {canSelect ? (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => onStepSelect(index as RequestStepIndex)}
                      className="h-auto gap-2.5 p-0 hover:bg-transparent hover:underline"
                    >
                      {content}
                    </Button>
                  ) : (
                    <span className="flex items-center gap-2.5">{content}</span>
                  )}
                </li>
              </Fragment>
            )
          })}
        </ol>
        {current === "done" ? null : (
          <span className="ml-4 hidden shrink-0 font-narrow text-[13px] text-muted-foreground md:inline">
            {REQUEST_COPY.savedAsYouType}
          </span>
        )}
      </div>
    </div>
  )
}
