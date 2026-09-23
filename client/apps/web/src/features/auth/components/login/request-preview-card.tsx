/** Illustrative sample of what a customer tracks once signed in. */
export function RequestPreviewCard() {
  return (
    <div
      aria-hidden="true"
      className="rounded-[var(--radius-card)] border border-[#F0F1F1]/15 px-5 py-[18px]"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[12.5px] font-semibold text-[#F7F8F8]/90">
          REQ-2481
        </span>
        <span className="rounded-[3px] border border-[#19A2C4]/45 bg-[#19A2C4]/20 px-[9px] py-1 text-[11px] font-bold tracking-[0.08em] text-[#6FD0E8] uppercase">
          On the way
        </span>
      </div>
      <p className="mt-3 text-[15px] font-semibold text-[#F7F8F8]">
        Mostafa K. · arriving 10:00–12:00
      </p>
      <p className="mt-1 text-[13.5px] leading-normal text-[#F0F1F1]/55">
        2 units to check · Maadi, Cairo
      </p>
    </div>
  )
}
