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
import { ThreeApps } from "@/features/landing/components/sections/three-apps"
import { PhotoBand } from "@/features/landing/components/shared/photo-band"
import {
  PHOTO_CLOSE_UP,
  PHOTO_ON_SITE,
} from "@/features/landing/constants/photos.constants"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main>
        <Hero />
        <PhotoBand
          photo={PHOTO_ON_SITE}
          heightClassName="h-[300px] md:h-[420px]"
        />
        <DeviceStrip />
        <JobSteps />
        <ThreeApps />
        <AiTriage />
        <Capabilities />
        <Billing />
        <Leaks />
        <PhotoBand
          photo={PHOTO_CLOSE_UP}
          heightClassName="h-[260px] md:h-[360px]"
        />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
