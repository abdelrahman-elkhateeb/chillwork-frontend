const STEPS = [
  {
    n: "01",
    title: "The call comes in",
    body: "The customer says what is wrong and sends photos. One call can cover the three units in the flat, not just the noisy one.",
  },
  {
    n: "02",
    title: "You know before you go",
    body: "The photos and the description are read the moment they arrive, with the likely fault and the parts that job usually needs. Your van leaves loaded.",
  },
  {
    n: "03",
    title: "The right man, a slot that is free",
    body: "You assign the visit and the board checks his day first. A clashing slot is refused outright, so nobody waits at home for a van that was never coming.",
  },
  {
    n: "04",
    title: "Agreed at the door",
    body: "He checks each unit, the price is shown before a single screw comes out, and the customer says yes. No argument at the end, because there is nothing new at the end.",
  },
  {
    n: "05",
    title: "Paid before he leaves",
    body: "The report is done on the spot and the invoice builds itself from the units he actually fixed. The one he could not finish becomes a follow-up, not a forgotten job.",
  },
]

export function Flow() {
  return (
    <section id="flow" className="bg-muted/40 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <h2 className="max-w-[600px] font-heading text-[28px] font-bold leading-[1.05] tracking-[-0.024em] md:text-[40px]">
          How a job runs
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-5 md:gap-6">
          {STEPS.map((step) => (
            <div key={step.n} className="flex flex-col gap-3">
              <span className="font-mono text-[13px] font-semibold text-primary">
                {step.n}
              </span>
              <h3 className="font-heading text-[16px] font-semibold leading-tight tracking-[-0.02em] normal-case">
                {step.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
