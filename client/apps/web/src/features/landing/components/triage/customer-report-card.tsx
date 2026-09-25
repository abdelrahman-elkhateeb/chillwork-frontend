import { CUSTOMER_REPORT } from "@/features/landing/constants/triage.constants"

function PhotoTile() {
  return (
    <span className="flex h-[50px] items-center justify-center rounded-[4px] border border-paper/20">
      <svg
        viewBox="0 0 18 13"
        aria-hidden="true"
        fill="none"
        className="h-[13px] w-[18px] stroke-paper/45"
        strokeWidth="1.3"
      >
        <rect x="0.65" y="2.15" width="16.7" height="10.2" rx="1" />
        <circle cx="9" cy="7.25" r="3" />
        <path d="M6 2.15 l1 -1.5 h4 l1 1.5" />
      </svg>
    </span>
  )
}

/** What the customer actually said and sent, kept verbatim. */
export function CustomerReportCard() {
  return (
    <div className="rounded-[8px] border border-paper/15 p-5">
      <p className="text-[11.5px] font-bold tracking-[0.14em] text-paper/50 uppercase">
        {CUSTOMER_REPORT.label}
      </p>
      <blockquote className="mt-3 text-[14.5px] leading-[1.6] text-paper/85">
        {CUSTOMER_REPORT.quote}
      </blockquote>

      <div className="mt-4 grid grid-cols-4 gap-1.5">
        {Array.from({ length: CUSTOMER_REPORT.photoCount }, (_, index) => (
          <PhotoTile key={index} />
        ))}
      </div>
      <p className="mt-2.5 text-[12.5px] text-paper/45">
        {CUSTOMER_REPORT.photoNote}
      </p>

      <div className="mt-4 border-t border-paper/12 pt-4">
        <p className="text-[11.5px] font-bold tracking-[0.14em] text-paper/50 uppercase">
          {CUSTOMER_REPORT.fallbackLabel}
        </p>
        <p className="mt-2 text-[13.5px] leading-[1.55] text-paper/65">
          {CUSTOMER_REPORT.fallback}
        </p>
      </div>
    </div>
  )
}
