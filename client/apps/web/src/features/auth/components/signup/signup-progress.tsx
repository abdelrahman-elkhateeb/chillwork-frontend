import { Fragment } from "react"
import { cn } from "@workspace/ui/lib/utils"

import {
  CURRENT_SIGNUP_STEP,
  SIGNUP_STEPS,
} from "@/features/auth/constants/signup-steps.constants"

/** Compact horizontal stepper for the mobile header strip. */
export function SignupProgress() {
  return (
    <div aria-hidden="true" className="flex items-center gap-2">
      {SIGNUP_STEPS.map((step, index) => {
        const isDone = index <= CURRENT_SIGNUP_STEP

        return (
          <Fragment key={step.title}>
            {index > 0 ? (
              <span
                className={cn(
                  "h-[3px] grow rounded-[2px]",
                  isDone ? "bg-primary" : "bg-[#F0F1F1]/20"
                )}
              />
            ) : null}
            <span
              className={cn(
                "flex size-[22px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                isDone
                  ? "bg-primary text-[#14181A]"
                  : "border-2 border-[#F0F1F1]/30 text-[#F0F1F1]/50"
              )}
            >
              {index + 1}
            </span>
          </Fragment>
        )
      })}
    </div>
  )
}
