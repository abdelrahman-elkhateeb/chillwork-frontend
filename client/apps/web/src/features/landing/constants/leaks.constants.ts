import type { LeakCard } from "@/features/landing/types/landing.types"

export const LEAK_CARDS: readonly LeakCard[] = [
  {
    icon: "missing-part",
    title: "The part that never reached the invoice",
    body: "A capacitor goes in at the flat and the invoice is written from memory that evening. Twice a week is a salary out of your own pocket.",
    mobileBody:
      "A capacitor goes in at the flat and the bill is written from memory that evening. Twice a week is a salary out of your pocket.",
  },
  {
    icon: "second-visit",
    title: "The second visit you did for free",
    body: "He went out without the right part because nobody read the photos before sending him. Fuel, two hours, and a customer who now doubts you.",
    mobileBody:
      "He went out without the right part because nobody read the photos first. Fuel, two hours, and a customer who now doubts you.",
  },
  {
    icon: "double-booking",
    title: "The slot you promised twice",
    body: "Two customers were told ten o'clock. One waited all morning and will tell the building. The board should have refused the second booking.",
    mobileBody:
      "Two customers were told ten o'clock. The board should have refused the second booking, not warned you after.",
  },
]
