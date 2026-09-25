import { LandingContainer } from "@/features/landing/components/shared/landing-container"
import { SectionHeader } from "@/features/landing/components/shared/section-header"
import { AnalysisCard } from "@/features/landing/components/triage/analysis-card"
import { CustomerReportCard } from "@/features/landing/components/triage/customer-report-card"
import {
  SECTION_IDS,
  SECTION_SCROLL_OFFSET,
} from "@/features/landing/constants/nav.constants"
import { TRIAGE_SECTION } from "@/features/landing/constants/triage.constants"

/** Customer's words on the left, the reading made from them on the right. */
export function AiTriage() {
  return (
    <section
      id={SECTION_IDS.triage}
      className={`bg-ink ${SECTION_SCROLL_OFFSET}`}
    >
      <LandingContainer className="py-10 md:py-20">
        <SectionHeader
          tone="dark"
          eyebrow={TRIAGE_SECTION.eyebrow}
          title={TRIAGE_SECTION.title}
          aside={TRIAGE_SECTION.aside}
          titleClassName="lg:max-w-[720px]"
          asideClassName="lg:w-[420px]"
        />

        <div className="mt-7 flex flex-col gap-4 md:mt-11 lg:flex-row lg:items-center lg:gap-0">
          <div className="lg:w-[289px] lg:shrink-0">
            <CustomerReportCard />
          </div>

          <div className="flex justify-center lg:w-[77px] lg:shrink-0">
            <svg
              viewBox="0 0 28 12"
              aria-hidden="true"
              fill="none"
              className="h-3 w-7 rotate-90 stroke-primary lg:rotate-0"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 6 H26 M21 1.5 L26 6 L21 10.5" />
            </svg>
          </div>

          <div className="min-w-0 flex-1">
            <AnalysisCard />
          </div>
        </div>
      </LandingContainer>
    </section>
  )
}
