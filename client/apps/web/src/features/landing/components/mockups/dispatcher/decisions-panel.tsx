import { cn } from "@workspace/ui/lib/utils"

import {
  DECISIONS,
  DISPATCHER_MOCKUP,
} from "@/features/landing/constants/dispatcher-mockup.constants"

export function DecisionsPanel() {
  return (
    <div className="w-[268px] shrink-0 border-l border-border bg-[#EEF0F0] px-4 pt-4">
      <p className="text-[11px] font-bold tracking-[0.12em] text-muted-foreground uppercase">
        {DISPATCHER_MOCKUP.decisionsLabel}
      </p>

      <ul className="mt-2.5 flex flex-col gap-2">
        {DECISIONS.map((decision) => (
          <li
            key={decision.title}
            className={cn(
              "border border-l-[3px] border-secondary bg-card px-3 py-2.5 font-narrow",
              decision.tone === "danger"
                ? "border-l-destructive"
                : "border-l-[#1F6FA8]"
            )}
          >
            <p
              className={cn(
                "text-[12.5px] font-semibold",
                decision.tone === "danger" ? "text-[#8E1913]" : "text-[#17557E]"
              )}
            >
              {decision.title}
            </p>
            <p className="mt-1 text-[12px] leading-[1.45] text-muted-foreground">
              {decision.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
