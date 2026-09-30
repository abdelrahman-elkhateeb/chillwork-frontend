/**
 * How wide a technician screen may grow from `md` up. On a phone every
 * screen is the full width; the header and body of a screen share one of
 * these so their edges line up.
 *
 * - `narrow` — one card at a time: forms, the customer's approval, the bill.
 * - `wide` — lists and the visit itself, which go to two columns.
 */
export const SCREEN_WIDTH = {
  narrow: "md:max-w-[704px]",
  wide: "md:max-w-[1184px]",
} as const

export type ScreenWidth = keyof typeof SCREEN_WIDTH

export const SCREEN_GUTTER = "mx-auto w-full px-4 md:px-8"
