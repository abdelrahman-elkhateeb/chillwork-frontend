const CALLOUTS = [
  {
    tag: "A",
    title: "He scans it in",
    body: "Picked from your own parts catalog, at your own price. Not typed, not guessed.",
  },
  {
    tag: "B",
    title: "Stock comes down",
    body: "One less on the shelf, the moment he fits it. You find out you are low before a customer does.",
  },
]

export function Billing() {
  return (
    <section id="billing" className="bg-[#14181A] py-16 text-white md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <p className="font-mono text-[13px] font-medium uppercase tracking-[-0.02em] text-primary">
          Part to invoice
        </p>
        <h2 className="mt-3 max-w-[620px] font-heading text-[28px] font-bold leading-[1.05] tracking-[-0.024em] md:text-[40px]">
          The part he fitted is the line on the bill.
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-start">
          <div className="flex flex-col gap-8">
            {CALLOUTS.map((c) => (
              <div key={c.tag} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] border border-white/20 font-mono text-[14px] font-semibold text-primary">
                  {c.tag}
                </span>
                <div>
                  <h3 className="font-heading text-[17px] font-semibold leading-tight tracking-[-0.02em] normal-case">
                    {c.title}
                  </h3>
                  <p className="mt-2 max-w-[380px] text-[14px] leading-relaxed text-white/65">
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[8px] border border-white/10 bg-card p-6 text-card-foreground">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[12px] text-muted-foreground">
                Invoice #4021
              </span>
              <span
                className="rounded-[3px] px-2 py-1 font-mono text-[11px] font-semibold uppercase text-white"
                style={{ backgroundColor: "var(--status-done)" }}
              >
                Paid
              </span>
            </div>

            <ul className="mt-5 flex flex-col gap-4 border-t border-border pt-5">
              <li className="flex items-center justify-between text-[14px]">
                <span>Call-out and labour</span>
                <span className="font-mono">[AMOUNT]</span>
              </li>
              <li className="flex items-center justify-between text-[14px]">
                <span>
                  Start capacitor CAP-45/5 — Bedroom unit
                  <span className="block text-[12px] text-muted-foreground">
                    1 × catalog price
                  </span>
                </span>
                <span className="font-mono">[AMOUNT]</span>
              </li>
              <li className="flex items-center justify-between text-[14px] text-muted-foreground line-through decoration-muted-foreground/60">
                <span>
                  Living room unit — drain
                  <span className="block text-[12px] no-underline">
                    Not finished today — off the bill, back on the list
                  </span>
                </span>
                <span className="font-mono">[AMOUNT]</span>
              </li>
            </ul>

            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <span className="font-heading text-[14px] font-semibold normal-case">
                Total
              </span>
              <span className="font-mono text-[16px] font-semibold">
                [AMOUNT]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
