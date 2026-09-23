import { SiteVisitPhone } from "@/features/landing/components/sections/site-visit-phone"
import { LandingContainer } from "@/features/landing/components/shared/landing-container"
import { SectionEyebrow } from "@/features/landing/components/shared/section-eyebrow"
import { FIELD_POINTS } from "@/features/landing/constants/field.constants"
import {
  SECTION_IDS,
  SECTION_SCROLL_OFFSET,
} from "@/features/landing/constants/nav.constants"

/** Phone mockup left of the copy on desktop; below it on phones. */
export function Field() {
  return (
    <section id={SECTION_IDS.field} className={SECTION_SCROLL_OFFSET}>
      <LandingContainer className="flex flex-col gap-5 py-9 md:gap-12 md:pt-14 md:pb-0 lg:min-h-[560px] lg:flex-row lg:items-center lg:gap-[72px]">
        <div className="order-2 flex justify-center lg:order-1 lg:w-[452px] lg:shrink-0">
          <SiteVisitPhone />
        </div>

        <div className="order-1 min-w-0 flex-1 lg:order-2">
          <SectionEyebrow className="mb-3.5 md:mb-5">On site</SectionEyebrow>
          <h3 className="max-w-[580px] text-[26px] leading-[1.12] font-bold tracking-[-0.026em] text-ink md:text-[34px] md:leading-[1.1]">
            Built for a phone, one hand, and the sun.
          </h3>
          <p className="mt-3.5 max-w-[570px] text-[15px] leading-[1.58] text-muted-foreground md:mt-[18px] md:text-[16px] md:leading-[1.6]">
            <span className="md:hidden">
              Your technician is on a balcony with a screwdriver in the other
              hand. Big buttons, strong contrast, every unit saved on its own.
            </span>
            <span className="hidden md:inline">
              Your technician is standing on a balcony with a screwdriver in the
              other hand. Big buttons, strong contrast, and every unit saved on
              its own — so a two-hour visit is never one long form he loses at
              the end.
            </span>
          </p>

          <ul className="mt-7 hidden gap-9 md:flex">
            {FIELD_POINTS.map((point) => (
              <li
                key={point.title}
                className="max-w-[240px] border-t-2 border-ink pt-3.5"
              >
                <p className="text-[15px] font-semibold text-ink">
                  {point.title}
                </p>
                <p className="mt-1.5 text-[14.5px] leading-[1.55] text-muted-foreground">
                  {point.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </LandingContainer>
    </section>
  )
}
