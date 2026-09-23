import { LandingContainer } from "@/features/landing/components/shared/landing-container"
import {
  SECTION_IDS,
  SECTION_SCROLL_OFFSET,
} from "@/features/landing/constants/nav.constants"

export function Cta() {
  return (
    <section id={SECTION_IDS.demo} className={SECTION_SCROLL_OFFSET}>
      <LandingContainer className="flex flex-col gap-[22px] pt-1 pb-9 md:py-20 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
        <div>
          <h2 className="max-w-[740px] text-[30px] leading-[1.08] font-bold tracking-[-0.028em] text-ink md:text-[44px] md:leading-[1.06]">
            Bring us last week&apos;s messiest job.
          </h2>
          <p className="mt-3.5 max-w-[540px] text-[15px] leading-[1.58] text-muted-foreground md:mt-[18px] md:text-[16.5px] md:leading-[1.6]">
            The one with three units, a part nobody wrote down and a customer
            who argued at the end. We will run it through
            <span className="hidden md:inline"> ChillWork</span> in front of you
            <span className="hidden md:inline">
              {" "}
              and you can tell us where it breaks
            </span>
            .
          </p>
        </div>

        <div className="flex w-full flex-col gap-2.5 lg:w-[300px] lg:shrink-0">
          <a
            href="#book"
            className="flex h-[54px] items-center justify-center rounded-[6px] bg-primary text-[15.5px] font-semibold text-ink transition-colors hover:bg-[#F06A2C]"
          >
            Book a demo
          </a>
          <a
            href="#contact"
            className="flex h-[54px] items-center justify-center rounded-[6px] border border-line-strong text-[15.5px] font-semibold text-ink transition-colors hover:bg-secondary"
          >
            Call us instead
          </a>
          <p className="mt-0.5 text-center text-[12.5px] text-muted-foreground md:mt-1">
            No card, no trial clock.
          </p>
        </div>
      </LandingContainer>
    </section>
  )
}
