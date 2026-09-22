import { NavBar } from "@/pages/sections/nav-bar"
import { Hero } from "@/pages/sections/hero"
import { PhotoBand } from "@/pages/sections/photo-band"
import { DeviceStrip } from "@/pages/sections/device-strip"
import { Leaks } from "@/pages/sections/leaks"
import { Flow } from "@/pages/sections/flow"
import { Billing } from "@/pages/sections/billing"
import { Dispatch } from "@/pages/sections/dispatch"
import { Field } from "@/pages/sections/field"
import { Cta } from "@/pages/sections/cta"
import { Footer } from "@/pages/sections/footer"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <Hero />
      <PhotoBand
        src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80"
        alt="Technician on a balcony repairing an outdoor AC unit"
        heightClassName="h-[320px] md:h-[460px]"
      />
      <DeviceStrip />
      <Leaks />
      <Flow />
      <Billing />
      <Dispatch />
      <Field />
      <PhotoBand
        src="https://images.unsplash.com/photo-1621905252472-943afaa20e20?auto=format&fit=crop&w=1600&q=80"
        alt="Close-up of hands using a multimeter to test an AC unit"
        heightClassName="h-[260px] md:h-[380px]"
      />
      <Cta />
      <Footer />
    </div>
  )
}
