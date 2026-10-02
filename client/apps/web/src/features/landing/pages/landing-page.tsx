import { AiTriage } from "@/features/landing/components/sections/ai-triage"
import { Billing } from "@/features/landing/components/sections/billing"
import { Capabilities } from "@/features/landing/components/sections/capabilities"
import { Cta } from "@/features/landing/components/sections/cta"
import { DeviceStrip } from "@/features/landing/components/sections/device-strip"
import { Footer } from "@/features/landing/components/sections/footer"
import { Hero } from "@/features/landing/components/sections/hero"
import { JobSteps } from "@/features/landing/components/sections/job-steps"
import { Leaks } from "@/features/landing/components/sections/leaks"
import { NavBar } from "@/features/landing/components/sections/nav-bar"
import { PhotoFeature } from "@/features/landing/components/sections/photo-feature"
import { ThreeApps } from "@/features/landing/components/sections/three-apps"
import {
  ON_SITE_FEATURE,
  PER_UNIT_FEATURE,
} from "@/features/landing/constants/photos.constants"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main>
        <Hero />
        <DeviceStrip />
        <PhotoFeature content={ON_SITE_FEATURE} />
        <JobSteps />
        <ThreeApps />
        <AiTriage />
        <Capabilities />
        <Billing />
        <Leaks />
        <PhotoFeature
          content={PER_UNIT_FEATURE}
          reverse
          className="bg-surface-sunken"
        />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
