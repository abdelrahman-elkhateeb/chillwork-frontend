import { Card, CardDescription, CardTitle } from "@workspace/ui/components/card"

import { LeakIcon } from "@/features/landing/components/illustrations/leak-icon"
import { LandingContainer } from "@/features/landing/components/shared/landing-container"
import { SectionHeader } from "@/features/landing/components/shared/section-header"
import { LEAK_CARDS } from "@/features/landing/constants/leaks.constants"
import {
  SECTION_IDS,
  SECTION_SCROLL_OFFSET,
} from "@/features/landing/constants/nav.constants"

export function Leaks() {
  return (
    <section id={SECTION_IDS.leaks} className={SECTION_SCROLL_OFFSET}>
      <LandingContainer className="pt-10 pb-10 md:pt-20 md:pb-[72px]">
        <SectionHeader
          eyebrow="Where jobs lose money"
          title="You don't lose the job. You lose the part, the hour and the second visit."
          titleClassName="lg:max-w-[820px]"
        />

        <ul className="mt-7 flex flex-col gap-3 md:mt-12 lg:flex-row lg:gap-6">
          {LEAK_CARDS.map((card) => (
            <Card
              key={card.title}
              asChild
              className="block flex-1 px-[18px] pt-5 pb-[22px] md:px-6 md:pt-[26px] md:pb-7"
            >
              <li>
                <LeakIcon name={card.icon} />
                <CardTitle
                  asChild
                  className="mt-3.5 text-[17px] leading-[normal] font-bold tracking-[-0.014em] normal-case md:mt-5 md:text-[17.5px]"
                >
                  <h3>{card.title}</h3>
                </CardTitle>
                <CardDescription
                  asChild
                  className="mt-2.5 text-[14.5px] leading-[1.62] md:mt-3"
                >
                  <p>
                    <span className="md:hidden">{card.mobileBody}</span>
                    <span className="hidden md:inline">{card.body}</span>
                  </p>
                </CardDescription>
              </li>
            </Card>
          ))}
        </ul>
      </LandingContainer>
    </section>
  )
}
