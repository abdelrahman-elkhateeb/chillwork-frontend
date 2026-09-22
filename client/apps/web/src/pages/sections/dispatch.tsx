type Block = { label: string; kind: "scheduled" | "blocked" | "free" }

type Row = { name: string; blocks: Block[] }

const ROWS: Row[] = [
  {
    name: "Mostafa K.",
    blocks: [
      { label: "09:00 Maadi", kind: "scheduled" },
      { label: "11:30 Zamalek", kind: "scheduled" },
      { label: "14:00 Nasr City", kind: "scheduled" },
    ],
  },
  {
    name: "Hana S.",
    blocks: [
      { label: "09:30 Heliopolis", kind: "scheduled" },
      { label: "He is already out — blocked", kind: "blocked" },
    ],
  },
  {
    name: "Tarek A.",
    blocks: [
      { label: "10:00 Dokki", kind: "scheduled" },
      { label: "13:00 Mohandessin", kind: "scheduled" },
    ],
  },
  {
    name: "Youssef M.",
    blocks: [{ label: "Free all day", kind: "free" }],
  },
]

const KIND_STYLE: Record<Block["kind"], string> = {
  scheduled: "text-white",
  blocked: "text-white",
  free: "border border-dashed border-white/25 bg-transparent text-white/60",
}

const KIND_COLOR: Record<Block["kind"], string | undefined> = {
  scheduled: "var(--status-scheduled)",
  blocked: "var(--status-blocked)",
  free: undefined,
}

const BULLETS = [
  "A clashing slot is refused, not flagged",
  "Move a job to another man without losing its history",
  "You can always see who changed what, and when",
]

export function Dispatch() {
  return (
    <section id="dispatch" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-mono text-[13px] font-medium uppercase tracking-[-0.02em] text-primary">
              The day board
            </p>
            <h3 className="mt-3 font-heading text-[26px] font-bold leading-[1.05] tracking-[-0.024em] md:text-[34px]">
              It says no before you promise.
            </h3>
            <p className="mt-4 max-w-[440px] text-[15px] leading-relaxed text-muted-foreground">
              You can see every technician&apos;s day at once and move work
              around until the van actually starts. After that it locks, so
              nobody quietly changes a visit that is already underway.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[14px]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full rounded-[8px] border border-border bg-[#14181A] p-5 text-white md:p-6">
            <p className="font-mono text-[12px] text-white/60">
              Thursday 12 March · 4 technicians out
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {ROWS.map((row) => (
                <div key={row.name} className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                  <span className="w-24 shrink-0 text-[13px] text-white/70">
                    {row.name}
                  </span>
                  <div className="flex flex-1 flex-wrap gap-1.5">
                    {row.blocks.map((block, i) => (
                      <span
                        key={i}
                        className={`rounded-[3px] px-2 py-1.5 font-mono text-[11px] ${KIND_STYLE[block.kind]}`}
                        style={{ backgroundColor: KIND_COLOR[block.kind] }}
                      >
                        {block.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
