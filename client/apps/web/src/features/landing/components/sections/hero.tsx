import { HeroDrawing } from "@/features/landing/components/illustrations/hero-drawing"
import { LandingContainer } from "@/features/landing/components/shared/landing-container"
import { SectionEyebrow } from "@/features/landing/components/shared/section-eyebrow"
import { HERO_STEPS } from "@/features/landing/constants/hero.constants"
import {
  DEMO_HREF,
  SECTION_IDS,
} from "@/features/landing/constants/nav.constants"

export function Hero() {
  return (
    <section id={SECTION_IDS.top} className="bg-ink">
      <LandingContainer className="flex gap-14 pt-[30px] pb-[30px] md:pt-16 md:pb-16 lg:min-h-[648px] lg:pb-0">
        <div className="w-full lg:w-[610px] lg:shrink-0 lg:pt-4">
          <SectionEyebrow tone="dark" className="mb-[18px] md:mb-[26px]">
            <span className="md:hidden">AC &amp; appliance service</span>
            <span className="hidden md:inline">
              For AC &amp; appliance service companies
            </span>
          </SectionEyebrow>

          <h1 className="text-[36px] leading-[1.02] font-bold tracking-[-0.026em] text-paper-bright md:text-[52px] md:leading-[0.99] lg:text-[62px]">
            Run the whole job.
            <br className="hidden md:block" /> Bill the whole job.
          </h1>

          <p className="mt-4 max-w-[520px] text-[15.5px] leading-[1.56] text-paper/[0.68] md:mt-[26px] md:text-[17.5px] md:leading-[1.58]">
            <span className="hidden md:inline">
              ChillWork takes a call from the customer&apos;s photo all the way
              to money in your account.{" "}
            </span>
            The part your technician fitted this morning is on the invoice this
            afternoon — not remembered, not argued about, not lost.
          </p>

          <div className="mt-[22px] flex flex-col gap-2.5 md:mt-[34px] md:flex-row md:items-center md:gap-3">
            <a
              href={DEMO_HREF}
              className="flex h-[52px] items-center justify-center rounded-[6px] bg-primary px-7 text-[15.5px] font-semibold text-ink transition-colors hover:bg-[#F06A2C] md:h-auto md:py-[15px]"
            >
              Book a demo
            </a>
            <a
              href={`#${SECTION_IDS.leaks}`}
              className="flex h-[52px] items-center justify-center rounded-[6px] border border-paper/25 px-[26px] text-[15.5px] font-semibold text-paper/90 transition-colors hover:border-paper/50 hover:text-paper md:h-auto md:py-[14px]"
            >
              Where jobs lose money →
            </a>
          </div>

          <ol className="mt-11 hidden gap-8 border-t border-paper/15 pt-6 md:flex">
            {HERO_STEPS.map((step) => (
              <li key={step.n} className="max-w-[150px]">
                <span className="block text-[12px] font-bold tracking-[0.1em] text-primary uppercase">
                  {step.n}
                </span>
                <span className="mt-[7px] block text-[13.5px] leading-[1.45] text-paper/[0.76]">
                  {step.text}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="hidden flex-1 items-start justify-center pt-1 lg:flex">
          <HeroDrawing />
        </div>
      </LandingContainer>
    </section>
  )
}
