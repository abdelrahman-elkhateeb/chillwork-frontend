import type { ReactNode } from "react"

import { CustomerPreview } from "@/features/landing/components/mockups/apps/customer-preview"
import { DispatcherPreview } from "@/features/landing/components/mockups/apps/dispatcher-preview"
import { TechnicianPreview } from "@/features/landing/components/mockups/apps/technician-preview"
import { AppCard } from "@/features/landing/components/sections/app-card"
import { LandingContainer } from "@/features/landing/components/shared/landing-container"
import { SectionHeader } from "@/features/landing/components/shared/section-header"
import {
  APP_ROLES,
  APPS_SECTION,
} from "@/features/landing/constants/apps.constants"
import {
  SECTION_IDS,
  SECTION_SCROLL_OFFSET,
} from "@/features/landing/constants/nav.constants"
import type { AppRoleId } from "@/features/landing/types/landing.types"

const PREVIEWS: Record<AppRoleId, ReactNode> = {
  customer: <CustomerPreview />,
  dispatcher: <DispatcherPreview />,
  technician: <TechnicianPreview />,
}

export function ThreeApps() {
  return (
    <section id={SECTION_IDS.apps} className={SECTION_SCROLL_OFFSET}>
      <LandingContainer className="pb-10 md:pb-[72px]">
        <SectionHeader
          eyebrow={APPS_SECTION.eyebrow}
          title={APPS_SECTION.title}
          aside={APPS_SECTION.aside}
          titleClassName="lg:max-w-[720px]"
        />

        <ul className="mt-7 grid gap-3 md:mt-11 lg:grid-cols-3 lg:gap-[23px]">
          {APP_ROLES.map((app) => (
            <AppCard key={app.id} app={app} preview={PREVIEWS[app.id]} />
          ))}
        </ul>
      </LandingContainer>
    </section>
  )
}
