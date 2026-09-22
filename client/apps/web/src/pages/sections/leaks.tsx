import { PackageX, RotateCcw, CalendarX } from "lucide-react"

const CARDS = [
  {
    icon: PackageX,
    title: "The part that never reached the invoice",
    body: "A capacitor goes in at the customer's flat and the invoice is written from memory that evening. Do this twice a week and you have paid for a technician's salary out of your own pocket.",
  },
  {
    icon: RotateCcw,
    title: "The second visit you did for free",
    body: "He went out without the right part because nobody read the photos before sending him. Fuel, two hours, and a customer who now thinks you are not sure what you are doing.",
  },
  {
    icon: CalendarX,
    title: "The slot you promised twice",
    body: "Two customers were told ten o'clock. One of them waited all morning and will tell the building about it. The board should have refused the second booking, not warned you afterwards.",
  },
]

export function Leaks() {
  return (
    <section id="leaks" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <h2 className="max-w-[720px] font-heading text-[28px] font-bold leading-[1.05] tracking-[-0.024em] md:text-[40px]">
          You don&apos;t lose the job. You lose the part, the hour and the
          second visit.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="rounded-[8px] border border-border bg-card p-6"
            >
              <card.icon className="size-6 text-primary" strokeWidth={1.75} />
              <h3 className="mt-4 font-heading text-[17px] font-semibold leading-tight tracking-[-0.02em] normal-case">
                {card.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
