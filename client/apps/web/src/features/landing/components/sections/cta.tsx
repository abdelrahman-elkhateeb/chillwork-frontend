import { Button } from "@workspace/ui/components/button"

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
          <h2 className="max-w-[740px] text-[30px] leading-[1.08] font-bold tracking-[-0.028em] text-ink md:text-[42px] md:leading-[1.05]">
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
          <Button asChild size="xl" className="h-[54px] px-0">
            <a href="#book">Book a demo</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="xl"
            className="h-[54px] px-0 text-ink"
          >
            <a href="#contact">Call us instead</a>
          </Button>
          <p className="mt-0.5 text-center text-[12.5px] text-muted-foreground md:mt-1">
            No card, no trial clock.
          </p>
        </div>
      </LandingContainer>
    </section>
  )
}
