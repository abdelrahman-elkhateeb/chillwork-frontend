import { LandingContainer } from "@/features/landing/components/shared/landing-container"
import { SectionHeader } from "@/features/landing/components/shared/section-header"
import {
  CAPABILITIES,
  CAPABILITIES_SECTION,
} from "@/features/landing/constants/capabilities.constants"
import {
  SECTION_IDS,
  SECTION_SCROLL_OFFSET,
} from "@/features/landing/constants/nav.constants"

/**
 * Ruled grid of the rules the system enforces. Every cell has the same
 * padding and right/bottom rules; the list overhangs its clipped wrapper by
 * one gutter each side, so the outer rules and padding fall outside and the
 * text lines up with the page edge at 1, 2 or 4 columns alike.
 */
export function Capabilities() {
  return (
    <section id={SECTION_IDS.handles} className={SECTION_SCROLL_OFFSET}>
      <LandingContainer className="py-10 md:pt-20 md:pb-[77px]">
        <SectionHeader
          eyebrow={CAPABILITIES_SECTION.eyebrow}
          title={CAPABILITIES_SECTION.title}
          aside={CAPABILITIES_SECTION.aside}
          titleClassName="lg:max-w-[640px]"
        />

        <div className="mt-7 overflow-hidden border-t-2 border-ink md:mt-11">
          <ul className="-mx-6 grid md:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((capability) => (
              <li
                key={capability.title}
                className="border-r border-b border-border px-6 py-4 md:pt-[21px] md:pb-[22px]"
              >
                <h3 className="font-sans text-[14.5px] leading-[normal] font-semibold tracking-normal text-ink normal-case">
                  {capability.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-[1.55] text-muted-foreground">
                  {capability.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </LandingContainer>
    </section>
  )
}
