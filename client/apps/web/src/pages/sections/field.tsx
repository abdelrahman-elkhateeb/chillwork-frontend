import { Button } from "@workspace/ui/components/button"

const POINTS = [
  {
    title: "Nothing is lost",
    body: "Each unit is saved as he finishes it, not at the end.",
  },
  {
    title: "The price is agreed first",
    body: "The customer sees the total before the work starts, so nobody argues at the door.",
  },
]

const UNITS = [
  {
    name: "Bedroom — Carrier 1.5T",
    status: "Done",
    color: "var(--status-done)",
    note: "Capacitor out of range — replaced",
  },
  {
    name: "Living room — Sharp 1T",
    status: "Checking",
    color: "var(--status-checking)",
    note: "Drain blocked — opening the pan",
  },
]

export function Field() {
  return (
    <section id="field" className="bg-muted/40 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-mono text-[13px] font-medium uppercase tracking-[-0.02em] text-primary">
              On site
            </p>
            <h3 className="mt-3 font-heading text-[26px] font-bold leading-[1.05] tracking-[-0.024em] md:text-[34px]">
              Built for a phone, one hand, and the sun.
            </h3>
            <p className="mt-4 max-w-[440px] text-[15px] leading-relaxed text-muted-foreground">
              Your technician is standing on a balcony with a screwdriver in
              the other hand. Big buttons, strong contrast, and every unit
              saved on its own — so a two-hour visit is never one long form
              he loses at the end.
            </p>

            <div className="mt-6 flex flex-col gap-5">
              {POINTS.map((p) => (
                <div key={p.title}>
                  <h4 className="font-heading text-[15px] font-semibold tracking-[-0.02em] normal-case">
                    {p.title}
                  </h4>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[340px] rounded-[8px] border border-border bg-card p-4 shadow-sm">
            <p className="font-mono text-[11px] text-muted-foreground">
              Today, 10:18 · Nadia Farouk — Maadi · 2 units to check
            </p>

            <div className="mt-4 flex flex-col gap-3">
              {UNITS.map((u) => (
                <div
                  key={u.name}
                  className="rounded-[6px] border border-border p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium">{u.name}</span>
                    <span
                      className="rounded-[3px] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-white"
                      style={{ backgroundColor: u.color }}
                    >
                      {u.status}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12px] text-muted-foreground">
                    {u.note}
                  </p>
                </div>
              ))}
            </div>

            <Button className="mt-4 h-11 w-full rounded-[6px] text-[14px] font-semibold">
              Show the customer the price
            </Button>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              He agrees before anything is opened
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
