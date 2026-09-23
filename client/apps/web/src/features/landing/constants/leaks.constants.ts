import type { LeakCard } from "@/features/landing/types/landing.types"

export const LEAK_CARDS: readonly LeakCard[] = [
  {
    icon: "missing-part",
    title: "The part that never reached the invoice",
    body: "A capacitor goes in at the customer's flat and the invoice is written from memory that evening. Do this twice a week and you have paid for a technician's salary out of your own pocket.",
    mobileBody:
      "A capacitor goes in at the flat and the bill is written from memory that evening. Twice a week is a salary out of your pocket.",
  },
  {
    icon: "second-visit",
    title: "The second visit you did for free",
    body: "He went out without the right part because nobody read the photos before sending him. Fuel, two hours, and a customer who now thinks you are not sure what you are doing.",
    mobileBody:
      "He went out without the right part because nobody read the photos first. Fuel, two hours, and a customer who now doubts you.",
  },
  {
    icon: "double-booking",
    title: "The slot you promised twice",
    body: "Two customers were told ten o'clock. One of them waited all morning and will tell the building about it. The board should have refused the second booking, not warned you afterwards.",
    mobileBody:
      "Two customers were told ten o'clock. The board should have refused the second booking, not warned you after.",
  },
]
