import { DispatcherMockup } from "@/features/landing/components/mockups/dispatcher/dispatcher-mockup"
import { LandingContainer } from "@/features/landing/components/shared/landing-container"
import { SectionEyebrow } from "@/features/landing/components/shared/section-eyebrow"
import { HERO_STATS } from "@/features/landing/constants/hero.constants"
import {
  DEMO_HREF,
  SECTION_IDS,
} from "@/features/landing/constants/nav.constants"

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
              Intake, AI triage, conflict-free dispatch, per-device inspection,
              parts and stock, work agreements, service reports and invoicing —
              one system, three apps, every action attributed.
            </p>

            <div className="mt-[22px] flex flex-col gap-2.5 md:mt-8 md:flex-row md:items-center md:gap-3">
              <a
                href={DEMO_HREF}
                className="flex h-[52px] items-center justify-center rounded-[6px] bg-primary px-7 text-[15.5px] font-semibold text-ink transition-colors hover:bg-[#F06A2C] md:h-[50px]"
              >
                Book a demo
              </a>
              <a
                href={`#${SECTION_IDS.handles}`}
                className="flex h-[52px] items-center justify-center rounded-[6px] border border-paper/25 px-[26px] text-[15.5px] font-semibold text-paper/90 transition-colors hover:border-paper/50 hover:text-paper md:h-[50px]"
              >
                See everything it handles →
              </a>
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
