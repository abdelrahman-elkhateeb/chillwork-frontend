import { StepCard } from "@/features/landing/components/sections/step-card"
import { LandingContainer } from "@/features/landing/components/shared/landing-container"
import { SectionHeader } from "@/features/landing/components/shared/section-header"
import {
  SECTION_IDS,
  SECTION_SCROLL_OFFSET,
} from "@/features/landing/constants/nav.constants"
import {
  JOB_STEPS,
  STEPS_SECTION,
} from "@/features/landing/constants/steps.constants"

export function JobSteps() {
  return (
    <section id={SECTION_IDS.steps} className={SECTION_SCROLL_OFFSET}>
      <LandingContainer className="pt-9 pb-9 md:pt-[72px] md:pb-20">
        <SectionHeader
          eyebrow={STEPS_SECTION.eyebrow}
          title={STEPS_SECTION.title}
          aside={STEPS_SECTION.aside}
          titleClassName="lg:max-w-[680px]"
          asideClassName="lg:w-[380px]"
        />

        <ol className="mt-7 grid gap-3 sm:grid-cols-2 md:mt-11 lg:grid-cols-5 lg:gap-[15px]">
          {JOB_STEPS.map((step) => (
            <StepCard key={step.n} step={step} />
          ))}
        </ol>

        <p className="mt-6 flex items-start gap-2.5 font-narrow text-[13px] leading-[1.4] text-muted-foreground">
          <span
            aria-hidden="true"
            className="mt-px size-4 shrink-0 border border-destructive/50 bg-hatch"
          />
          {STEPS_SECTION.hatchLegend}
        </p>
      </LandingContainer>
    </section>
  )
}
