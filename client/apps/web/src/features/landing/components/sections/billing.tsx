import { CapacitorDrawing } from "@/features/landing/components/illustrations/capacitor-drawing"
import { InvoiceCard } from "@/features/landing/components/sections/invoice-card"
import { LandingContainer } from "@/features/landing/components/shared/landing-container"
import { SectionEyebrow } from "@/features/landing/components/shared/section-eyebrow"
import { BILLING_CALLOUTS } from "@/features/landing/constants/billing.constants"
import {
  SECTION_IDS,
  SECTION_SCROLL_OFFSET,
} from "@/features/landing/constants/nav.constants"

export function Billing() {
  return (
    <section
      id={SECTION_IDS.billing}
      className={`bg-ink ${SECTION_SCROLL_OFFSET}`}
    >
      <LandingContainer className="pt-9 pb-10 md:pt-[76px] md:pb-20">
        <SectionEyebrow tone="dark" className="mb-4 md:mb-[22px]">
          Part to invoice
        </SectionEyebrow>
        <h2 className="max-w-[760px] text-[28px] leading-[1.1] font-bold tracking-[-0.026em] text-paper-bright md:text-[42px] md:leading-[1.08]">
          The part he fitted is the line on the bill.
        </h2>

        <div className="mt-6 flex flex-col gap-[18px] md:mt-[52px] lg:flex-row lg:items-center lg:gap-[70px]">
          <div className="flex justify-center lg:w-[440px] lg:shrink-0">
            <CapacitorDrawing />
          </div>

          <div className="min-w-0 flex-1">
            <ul className="mb-8 hidden gap-10 md:flex">
              {BILLING_CALLOUTS.map((callout) => (
                <li key={callout.title} className="max-w-[250px]">
                  <p className="text-[13px] font-bold tracking-[0.1em] text-primary uppercase">
                    {callout.title}
                  </p>
                  <p className="mt-2 text-[14.5px] leading-[1.55] text-paper/70">
                    {callout.body}
                  </p>
                </li>
              ))}
            </ul>

            <InvoiceCard />
          </div>
        </div>
      </LandingContainer>
    </section>
  )
}
