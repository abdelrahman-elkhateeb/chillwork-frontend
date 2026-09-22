import { Button } from "@workspace/ui/components/button"

const STEPS = [
  { n: "01", text: "Customer sends the fault with photos" },
  { n: "02", text: "Your technician checks every unit on site" },
  { n: "03", text: "Parts he used become the invoice" },
  { n: "04", text: "Paid before he leaves the flat" },
]

function AcLineArt() {
  return (
    <svg
      viewBox="0 0 420 420"
      fill="none"
      className="h-auto w-full max-w-[420px]"
      role="img"
      aria-label="Line drawing of a split air conditioning unit, indoor and outdoor"
    >
      {/* indoor unit */}
      <rect
        x="40"
        y="60"
        width="220"
        height="56"
        rx="10"
        stroke="#EA5B1B"
        strokeWidth="1.5"
      />
      <line x1="60" y1="88" x2="240" y2="88" stroke="#EA5B1B" strokeWidth="1" opacity="0.5" />
      <circle cx="250" cy="72" r="3" fill="#19A2C4" />

      {/* line set */}
      <path
        d="M260 100 C 300 100, 300 160, 300 200 S 300 300, 340 300"
        stroke="#5F6568"
        strokeWidth="1.25"
        strokeDasharray="4 4"
      />

      {/* outdoor unit */}
      <rect
        x="300"
        y="260"
        width="90"
        height="90"
        rx="8"
        stroke="#EA5B1B"
        strokeWidth="1.5"
      />
      <circle cx="345" cy="305" r="28" stroke="#EA5B1B" strokeWidth="1.25" />
      <circle cx="345" cy="305" r="3" fill="#EA5B1B" />
      <line x1="345" y1="277" x2="345" y2="333" stroke="#EA5B1B" strokeWidth="1" opacity="0.4" />
      <line x1="317" y1="305" x2="373" y2="305" stroke="#EA5B1B" strokeWidth="1" opacity="0.4" />

      {/* wall */}
      <line x1="20" y1="340" x2="400" y2="340" stroke="#D7D9D9" strokeWidth="1.5" />
      <line x1="20" y1="40" x2="20" y2="340" stroke="#D7D9D9" strokeWidth="1.5" />
    </svg>
  )
}

export function Hero() {
  return (
    <section className="bg-[#14181A] text-white">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-16 md:min-h-[648px] md:grid-cols-2 md:items-center md:px-8 md:py-0">
        <div className="flex flex-col gap-6">
          <p className="font-mono text-[13px] font-medium uppercase tracking-[-0.02em] text-primary">
            For AC &amp; appliance service companies
          </p>
          <h1 className="font-heading text-[40px] font-bold leading-[1.02] tracking-[-0.028em] md:text-[64px]">
            Run the whole job.
            <br />
            Bill the whole job.
          </h1>
          <p className="max-w-[480px] text-[16px] leading-relaxed text-white/70 md:text-[17px]">
            ChillWork takes a call from the customer&apos;s photo all the way to
            money in your account. The part your technician fitted this
            morning is on the invoice this afternoon — not remembered, not
            argued about, not lost.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-[6px] px-6 text-[15px] font-semibold md:h-[54px] md:text-base"
            >
              <a href="#demo">Book a demo</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-[6px] border-white/25 bg-transparent px-6 text-[15px] font-semibold text-white hover:bg-white/10 hover:text-white md:h-[54px] md:text-base"
            >
              <a href="#leaks">Where jobs lose money →</a>
            </Button>
          </div>

          <ol className="mt-4 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
            {STEPS.map((step) => (
              <li key={step.n} className="flex items-start gap-3">
                <span className="font-mono text-[13px] font-semibold text-primary">
                  {step.n}
                </span>
                <span className="text-[14px] leading-snug text-white/70">
                  {step.text}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="hidden items-center justify-center md:flex">
          <AcLineArt />
        </div>
      </div>
    </section>
  )
}
