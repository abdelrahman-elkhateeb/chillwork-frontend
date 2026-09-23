import type { LandingPhoto } from "@/features/landing/types/landing.types"

// TODO(swap-photo): temporary stock photos until the real shoot. Brief from
// the design: real site, real dust — hands and machines, no studio benches.
export const PHOTO_ON_SITE: LandingPhoto = {
  src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80",
  alt: "Technician on a balcony repairing an open outdoor AC unit",
}

export const PHOTO_CLOSE_UP: LandingPhoto = {
  src: "https://images.unsplash.com/photo-1621905252472-943afaa20e20?auto=format&fit=crop&w=1600&q=80",
  alt: "Close-up of hands testing an AC unit with a multimeter",
  focus: "center 80%",
}
