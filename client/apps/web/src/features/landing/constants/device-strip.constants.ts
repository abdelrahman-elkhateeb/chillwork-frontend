import type { Device } from "@/features/landing/types/landing.types"

export const DEVICES: readonly Device[] = [
  { label: "Split & window AC" },
  { label: "Chillers" },
  { label: "Commercial refrigeration", mobileLabel: "Refrigeration" },
  { label: "Washers & dryers" },
  { label: "Water heaters" },
  { label: "Ovens & hobs" },
]

/** How many devices fit the strip on a phone. */
export const DEVICES_ON_MOBILE = 3
