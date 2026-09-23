import { DayBoard } from "@/features/landing/components/sections/day-board"
import { LandingContainer } from "@/features/landing/components/shared/landing-container"
import { SectionEyebrow } from "@/features/landing/components/shared/section-eyebrow"
import { DISPATCH_POINTS } from "@/features/landing/constants/dispatch.constants"
import {
  SECTION_IDS,
  SECTION_SCROLL_OFFSET,
} from "@/features/landing/constants/nav.constants"

/** Desktop-and-tablet only — the phone design leaves the day board out. */
export function Dispatch() {
  return (
    <section
      id={SECTION_IDS.dispatch}
      className={`hidden md:block ${SECTION_SCROLL_OFFSET}`}
    >
      <LandingContainer className="flex flex-col gap-12 pt-[76px] lg:min-h-[500px] lg:flex-row lg:items-center lg:gap-[72px]">
        <div className="lg:w-[452px] lg:shrink-0">
          <SectionEyebrow className="mb-5">The day board</SectionEyebrow>
          <h3 className="text-[34px] leading-[1.1] font-bold tracking-[-0.026em] text-ink">
            It says no before you promise.
          </h3>
          <p className="mt-[18px] text-[16px] leading-[1.6] text-muted-foreground">
            You can see every technician&apos;s day at once and move work around
            until the van actually starts. After that it locks, so nobody
            quietly changes a visit that is already underway.
          </p>
          <ul className="mt-6 border-b border-border">
            {DISPATCH_POINTS.map((point) => (
              <li
                key={point}
                className="border-t border-border py-3 text-[15px] leading-normal text-ink"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 flex-1">
          <DayBoard />
        </div>
      </LandingContainer>
    </section>
  )
}
