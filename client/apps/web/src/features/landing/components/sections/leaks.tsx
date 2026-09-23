import { LeakIcon } from "@/features/landing/components/illustrations/leak-icon"
import { LandingContainer } from "@/features/landing/components/shared/landing-container"
import { SectionEyebrow } from "@/features/landing/components/shared/section-eyebrow"
import { LEAK_CARDS } from "@/features/landing/constants/leaks.constants"
import {
  SECTION_IDS,
  SECTION_SCROLL_OFFSET,
} from "@/features/landing/constants/nav.constants"

export function Leaks() {
  return (
    <section id={SECTION_IDS.leaks} className={SECTION_SCROLL_OFFSET}>
      <LandingContainer className="pt-9 pb-[34px] md:pt-20 md:pb-[76px]">
        <div className="max-w-[900px]">
          <SectionEyebrow className="mb-4 md:mb-[22px]">
            Where jobs lose money
          </SectionEyebrow>
          <h2 className="text-[28px] leading-[1.1] font-bold tracking-[-0.026em] text-ink md:text-[44px] md:leading-[1.08]">
            You don&apos;t lose the job.
            <br className="hidden md:block" /> You lose the part, the hour and
            the second visit.
          </h2>
        </div>

        <ul className="mt-[26px] flex flex-col gap-3 md:mt-14 lg:flex-row lg:gap-6">
          {LEAK_CARDS.map((card) => (
            <li
              key={card.title}
              className="flex-1 rounded-[var(--radius-card)] border border-border bg-card px-[18px] pt-5 pb-[22px] md:px-[26px] md:pt-7 md:pb-[30px]"
            >
              <LeakIcon name={card.icon} />
              <h3 className="mt-3.5 text-[17px] leading-[normal] font-bold tracking-[-0.014em] text-ink md:mt-5 md:text-[19px]">
                {card.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-[1.6] text-muted-foreground md:mt-3 md:text-[15px]">
                <span className="md:hidden">{card.mobileBody}</span>
                <span className="hidden md:inline">{card.body}</span>
              </p>
            </li>
          ))}
        </ul>
      </LandingContainer>
    </section>
  )
}
