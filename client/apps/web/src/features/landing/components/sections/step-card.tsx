import { Badge } from "@workspace/ui/components/badge"
import { Card, CardDescription, CardTitle } from "@workspace/ui/components/card"

import { StepIllustration } from "@/features/landing/components/illustrations/step-illustration"
import type { JobStep } from "@/features/landing/types/landing.types"

type Props = {
  step: JobStep
}

export function StepCard({ step }: Props) {
  return (
    <Card
      asChild
      className="rounded-[6px] bg-[#EBEDED] px-[19px] pt-[18px] pb-5"
    >
      <li>
        <div className="flex items-center justify-between">
          <Badge className="size-7 justify-center rounded-full p-0 font-sans text-[13px] leading-[normal] tracking-normal text-ink normal-case">
            {step.n}
          </Badge>
          <span className="font-mono text-[10.5px] tracking-[0.04em] text-muted-foreground uppercase">
            {step.stage}
          </span>
        </div>

        <div className="mt-3.5 h-[138px] rounded-[4px] border border-secondary bg-card">
          <StepIllustration name={step.illustration} />
        </div>

        <CardTitle
          asChild
          className="mt-4 leading-[normal] font-bold tracking-[-0.01em]"
        >
          <h3>{step.title}</h3>
        </CardTitle>
        <CardDescription asChild className="mt-2 text-[14px] leading-[1.54]">
          <p>{step.body}</p>
        </CardDescription>
      </li>
    </Card>
  )
}
