import { Billing } from "@/features/landing/components/sections/billing"
import { Cta } from "@/features/landing/components/sections/cta"
import { DeviceStrip } from "@/features/landing/components/sections/device-strip"
import { Dispatch } from "@/features/landing/components/sections/dispatch"
import { Field } from "@/features/landing/components/sections/field"
import { Flow } from "@/features/landing/components/sections/flow"
import { Footer } from "@/features/landing/components/sections/footer"
import { Hero } from "@/features/landing/components/sections/hero"
import { Leaks } from "@/features/landing/components/sections/leaks"
import { NavBar } from "@/features/landing/components/sections/nav-bar"
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
          heightClassName="h-[300px] md:h-[460px]"
        />
        <DeviceStrip />
        <Leaks />
        <Flow />
        <Billing />
        <Dispatch />
        <Field />
        <PhotoBand
          photo={PHOTO_CLOSE_UP}
          heightClassName="h-[380px]"
          className="mt-16 hidden md:block"
        />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
