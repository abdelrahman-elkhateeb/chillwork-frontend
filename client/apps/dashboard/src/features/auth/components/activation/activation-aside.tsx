import { CheckIcon } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

import { BrandLogo } from "@/components/brand/brand-logo"
import { ACTIVATION_COPY } from "@/features/auth/constants/auth-copy.constants"

const STEPS = [
  {
    title: ACTIVATION_COPY.stepCreated,
    detail: ACTIVATION_COPY.stepCreatedDetail,
    state: "done",
  },
  {
    title: ACTIVATION_COPY.stepPassword,
    detail: ACTIVATION_COPY.stepPasswordDetail,
    state: "current",
  },
  { title: ACTIVATION_COPY.stepSignIn, detail: null, state: "next" },
] as const

export function ActivationAside() {
  return (
    <>
      <div>
        <BrandLogo withTag />
        <h2 className="mt-11 text-[30px] leading-[1.12] font-bold tracking-[-0.026em] text-paper-bright">
          {ACTIVATION_COPY.asideTitle}
        </h2>
        <p className="mt-3.5 max-w-[360px] text-[15px] leading-[1.58] text-paper/62">
          {ACTIVATION_COPY.asideBody}
        </p>

        <ol className="mt-9">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "flex size-[26px] shrink-0 items-center justify-center rounded-full text-[12px] font-bold",
                    step.state === "done" && "bg-[#11705A] text-white",
                    step.state === "current" && "bg-primary text-ink",
                    step.state === "next" &&
                      "border-2 border-paper/28 text-paper/50"
                  )}
                >
                  {step.state === "done" ? (
                    <CheckIcon className="size-[13px]" strokeWidth={3} />
                  ) : (
                    index + 1
                  )}
                </span>
                {index < STEPS.length - 1 ? (
                  <span className="mt-[5px] w-0.5 flex-1 bg-paper/18" />
                ) : null}
              </div>
              <div className={cn(index < STEPS.length - 1 && "pb-5")}>
                <div
                  className={cn(
                    "text-[15px] font-semibold",
                    step.state === "current"
                      ? "text-paper-bright"
                      : "text-paper/72"
                  )}
                >
                  {step.title}
                </div>
                {step.detail ? (
                  <div className="mt-[3px] font-narrow text-[13.5px] text-paper/45">
                    {step.detail}
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="font-narrow text-[13px] text-paper/45">
        {ACTIVATION_COPY.asideFooter}
      </div>
    </>
  )
}
