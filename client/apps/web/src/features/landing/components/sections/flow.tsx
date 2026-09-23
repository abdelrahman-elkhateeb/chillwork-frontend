import { LandingContainer } from "@/features/landing/components/shared/landing-container"
import { SectionEyebrow } from "@/features/landing/components/shared/section-eyebrow"
import { FLOW_STEPS } from "@/features/landing/constants/flow.constants"
import {
  SECTION_IDS,
  SECTION_SCROLL_OFFSET,
} from "@/features/landing/constants/nav.constants"

/**
 * Five steps: a ruled vertical list on phones, five ruled columns on
 * desktop — both hang off a heavy ink rule, like a spec sheet.
 */
export function Flow() {
  return (
    <section id={SECTION_IDS.flow} className={SECTION_SCROLL_OFFSET}>
      <LandingContainer className="pt-1 pb-9 md:pt-2 md:pb-[82px]">
        <SectionEyebrow className="mb-4 md:mb-[30px]">
          How a job runs
        </SectionEyebrow>

        <ol className="border-y-2 border-ink lg:flex lg:border-b-0">
          {FLOW_STEPS.map((step) => (
            <li
              key={step.n}
              className="border-b border-border py-4 last:border-b-0 lg:flex-1 lg:border-r lg:border-b-0 lg:px-[26px] lg:pt-[26px] lg:pb-[30px] lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
            >
              <span className="block font-heading text-[24px] font-bold tracking-[-0.02em] text-primary md:text-[30px]">
                {step.n}
              </span>
              <h3 className="mt-[9px] text-[15px] leading-[normal] font-bold tracking-[-0.012em] text-ink md:mt-3 md:text-[16px]">
                {step.mobileTitle ? (
                  <>
                    <span className="md:hidden">{step.mobileTitle}</span>
                    <span className="hidden md:inline">{step.title}</span>
                  </>
                ) : (
                  step.title
                )}
              </h3>
              <p className="mt-1.5 text-[14.5px] leading-[1.6] text-muted-foreground md:mt-[9px]">
                <span className="md:hidden">{step.mobileBody}</span>
                <span className="hidden md:inline">{step.body}</span>
              </p>
            </li>
          ))}
        </ol>
      </LandingContainer>
    </section>
  )
}
