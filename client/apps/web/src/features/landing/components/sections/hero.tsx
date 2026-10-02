import { Button } from "@workspace/ui/components/button"

import { DispatcherMockup } from "@/features/landing/components/mockups/dispatcher/dispatcher-mockup"
import { LandingContainer } from "@/features/landing/components/shared/landing-container"
import { SectionEyebrow } from "@/features/landing/components/shared/section-eyebrow"
import { HERO_STATS } from "@/features/landing/constants/hero.constants"
import { SECTION_IDS } from "@/features/landing/constants/nav.constants"

export function Hero() {
  return (
    <section id={SECTION_IDS.top} className="overflow-hidden bg-ink">
      <LandingContainer className="pt-[30px] pb-[30px] md:pt-14 md:pb-16 lg:pb-0">
        <div className="flex gap-14 lg:justify-between">
          <div className="max-w-[640px]">
            <SectionEyebrow tone="dark" className="mb-[18px] md:mb-6">
              Field service management
            </SectionEyebrow>

            <h1 className="text-[36px] leading-[1.02] font-bold tracking-[-0.026em] text-paper-bright md:text-[48px] md:leading-none lg:text-[56px]">
              Run the whole job.
              <br className="hidden md:block" /> Bill the whole job.
            </h1>

            <p className="mt-4 max-w-[560px] text-[15.5px] leading-[1.56] text-paper/[0.68] md:mt-6 md:text-[16.5px] md:leading-[1.58]">
              Intake, AI triage, conflict-free dispatch, customer-approved
              parts, live stock and no-fix-no-fee invoicing — one system, three
              apps, every change attributed.
            </p>

            <div className="mt-[22px] flex flex-col gap-2.5 md:mt-8 md:flex-row md:items-center md:gap-3">
              <Button asChild size="xl" className="px-[26px] md:h-[50px]">
                <a href={`#${SECTION_IDS.handles}`}>
                  See everything it handles →
                </a>
              </Button>
            </div>
          </div>

          <dl className="hidden w-[300px] shrink-0 self-start border-b border-paper/15 lg:mt-1.5 lg:block">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.value}
                className="border-t border-paper/15 pt-[15px] pb-2.5"
              >
                <dt className="font-heading text-[24px] leading-none font-bold tracking-[-0.02em] text-paper-bright">
                  {stat.value}
                </dt>
                <dd className="mt-1.5 text-[13px] text-paper/55">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-11 hidden h-[455px] lg:block">
          <DispatcherMockup />
        </div>
      </LandingContainer>
    </section>
  )
}
