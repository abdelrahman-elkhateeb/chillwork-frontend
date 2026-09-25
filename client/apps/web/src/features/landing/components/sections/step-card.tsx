import { StepIllustration } from "@/features/landing/components/illustrations/step-illustration"
import type { JobStep } from "@/features/landing/types/landing.types"

type Props = {
  step: JobStep
}

export function StepCard({ step }: Props) {
  return (
    <li className="flex flex-col rounded-[6px] border border-border bg-[#EBEDED] px-[19px] pt-[18px] pb-5">
      <div className="flex items-center justify-between">
        <span className="flex size-7 items-center justify-center rounded-full bg-primary text-[13px] font-bold text-ink">
          {step.n}
        </span>
        <span className="font-mono text-[10.5px] tracking-[0.04em] text-muted-foreground uppercase">
          {step.stage}
        </span>
      </div>

      <div className="mt-3.5 h-[138px] rounded-[4px] border border-secondary bg-card">
        <StepIllustration name={step.illustration} />
      </div>

      <h3 className="mt-4 text-[14px] leading-[normal] font-bold tracking-[-0.01em] text-ink">
        {step.title}
      </h3>
      <p className="mt-2 text-[14px] leading-[1.54] text-muted-foreground">
        {step.body}
      </p>
    </li>
  )
}
