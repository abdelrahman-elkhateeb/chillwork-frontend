import type { FlowStep } from "@/features/landing/types/landing.types"

export const FLOW_STEPS: readonly FlowStep[] = [
  {
    n: "01",
    title: "The call comes in",
    body: "The customer says what is wrong and sends photos. One call can cover the three units in the flat, not just the noisy one.",
    mobileBody:
      "The customer says what is wrong and sends photos. One call can cover all three units in the flat.",
  },
  {
    n: "02",
    title: "You know before you go",
    body: "The photos and the description are read the moment they arrive, with the likely fault and the parts that job usually needs. Your van leaves loaded.",
    mobileBody:
      "The photos are read the moment they arrive, with the likely fault and the parts that job usually needs. The van leaves loaded.",
  },
  {
    n: "03",
    title: "The right man, a slot that is free",
    mobileTitle: "A slot that is free",
    body: "You assign the visit and the board checks his day first. A clashing slot is refused outright, so nobody waits at home for a van that was never coming.",
    mobileBody:
      "The board checks his day first. A clashing slot is refused outright, so nobody waits for a van that was never coming.",
  },
  {
    n: "04",
    title: "Agreed at the door",
    body: "He checks each unit, the price is shown before a single screw comes out, and the customer says yes. No argument at the end, because there is nothing new at the end.",
    mobileBody:
      "The price is shown before a screw comes out. No argument at the end, because nothing is new at the end.",
  },
  {
    n: "05",
    title: "Paid before he leaves",
    body: "The report is done on the spot and the invoice builds itself from the units he actually fixed. The one he could not finish becomes a follow-up, not a forgotten job.",
    mobileBody:
      "The invoice builds itself from the units he actually fixed. The one he could not finish becomes a follow-up, not a forgotten job.",
  },
]
