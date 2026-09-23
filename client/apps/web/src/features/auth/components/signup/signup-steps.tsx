import { cn } from "@workspace/ui/lib/utils"

import {
  CURRENT_SIGNUP_STEP,
  SIGNUP_STEPS,
} from "@/features/auth/constants/signup-steps.constants"

/** Vertical stepper on the desktop side panel. */
export function SignupSteps() {
  return (
    <ol className="mt-[46px]">
      {SIGNUP_STEPS.map((step, index) => {
        const isCurrent = index === CURRENT_SIGNUP_STEP
        const isLast = index === SIGNUP_STEPS.length - 1

        return (
          <li
            key={step.title}
            aria-current={isCurrent ? "step" : undefined}
            className="flex gap-[18px]"
          >
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex size-[30px] items-center justify-center rounded-full text-[13px] font-bold",
                  isCurrent
                    ? "bg-primary text-[#14181A]"
                    : "border-2 border-[#F0F1F1]/30 text-[#F0F1F1]/50"
                )}
              >
                {index + 1}
              </span>
              {isLast ? null : (
                <span className="mt-1.5 w-0.5 grow bg-[#F0F1F1]/20" />
              )}
            </div>

            <div className={isLast ? undefined : "pb-[26px]"}>
              <p
                className={cn(
                  "text-base font-semibold",
                  isCurrent ? "text-[#F7F8F8]" : "text-[#F0F1F1]/70"
                )}
              >
                {step.title}
              </p>
              <p
                className={cn(
                  "mt-1 text-sm leading-normal",
                  isCurrent ? "text-[#F0F1F1]/55" : "text-[#F0F1F1]/45"
                )}
              >
                {step.description}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
