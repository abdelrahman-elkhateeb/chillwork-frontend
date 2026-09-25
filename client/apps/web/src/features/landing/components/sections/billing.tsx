import { CapacitorDrawing } from "@/features/landing/components/illustrations/capacitor-drawing"
import { InvoiceCard } from "@/features/landing/components/sections/invoice-card"
import { LandingContainer } from "@/features/landing/components/shared/landing-container"
import { SectionHeader } from "@/features/landing/components/shared/section-header"
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
      <LandingContainer className="py-10 md:py-20">
        <SectionHeader
          tone="dark"
          eyebrow="Part to invoice"
          title="The part he fitted is the line on the bill."
        />

        <div className="mt-6 flex flex-col gap-[18px] md:mt-[52px] lg:flex-row lg:items-center lg:gap-[62px]">
          <div className="flex justify-center lg:w-[400px] lg:shrink-0">
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
