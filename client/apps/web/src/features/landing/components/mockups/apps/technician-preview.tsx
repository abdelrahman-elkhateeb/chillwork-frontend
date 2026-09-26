import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { TECHNICIAN_PREVIEW } from "@/features/landing/constants/apps.constants"

function CheckMark({ done }: { done: boolean }) {
  return done ? (
    <svg viewBox="0 0 12 12" aria-hidden="true" className="size-3 shrink-0">
      <circle cx="6" cy="6" r="6" fill="#17876A" />
      <path
        d="M3.3 6.2 L5.2 8 L8.7 4.3"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <span className="size-3 shrink-0 rounded-full border-[1.5px] border-[#C0C4C4]" />
  )
}

/** The technician's phone: one device's checklist, saved check by check. */
export function TechnicianPreview() {
  const { totalChecks, completed } = TECHNICIAN_PREVIEW

  return (
    <div className="mx-auto w-[208px] rounded-[16px] bg-ink p-1.5">
      <div className="overflow-hidden rounded-[11px] bg-card">
        <div className="border-b border-secondary px-[11px] pt-2.5 pb-[9px]">
          <p className="font-mono text-[15px] font-semibold text-ink">
            {TECHNICIAN_PREVIEW.visit}
          </p>
          <p className="mt-0.5 font-narrow text-[11.5px] text-muted-foreground">
            {TECHNICIAN_PREVIEW.customer}
          </p>
        </div>

        <div className="px-[11px] pt-2.5 pb-3">
          <div className="flex items-center justify-between">
            <span className="font-narrow text-[11.5px] font-bold tracking-[0.04em] text-muted-foreground uppercase">
              {TECHNICIAN_PREVIEW.checklist}
            </span>
            <span className="font-mono text-[11px] font-bold text-ink">
              {completed} of {totalChecks}
            </span>
          </div>

          <div className="mt-1.5 flex gap-[2px]">
            {Array.from({ length: totalChecks }, (_, index) => (
              <span
                key={index}
                className={cn(
                  "h-[4px] flex-1",
                  index < completed ? "bg-primary" : "bg-[#DCDEDE]"
                )}
              />
            ))}
          </div>

          <ul className="mt-2.5 flex flex-col gap-[7px] font-narrow text-[11.5px]">
            {TECHNICIAN_PREVIEW.checks.map((check) => (
              <li key={check.label} className="flex items-center gap-2">
                <CheckMark done={check.done} />
                <span
                  className={check.done ? "text-ink" : "text-muted-foreground"}
                >
                  {check.label}
                </span>
              </li>
            ))}
          </ul>

          <Button
            asChild
            className="pointer-events-none mt-2.5 flex h-8 rounded-[4px] text-[11.5px] font-semibold text-ink"
          >
            <span>{TECHNICIAN_PREVIEW.action}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
