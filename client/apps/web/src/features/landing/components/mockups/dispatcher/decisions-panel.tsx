import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"
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
          <li key={decision.title}>
            <Alert
              variant={decision.tone === "danger" ? "destructive" : "info"}
              role={undefined}
              className={cn(
                "rounded-none border-secondary bg-card px-3 py-2.5 font-narrow",
                decision.tone === "danger"
                  ? "border-l-destructive"
                  : "border-l-[#1F6FA8]"
              )}
            >
              <AlertTitle className="text-[12.5px]">
                {decision.title}
              </AlertTitle>
              <AlertDescription className="text-[12px] leading-[1.45]">
                {decision.body}
              </AlertDescription>
            </Alert>
          </li>
        ))}
      </ul>
    </div>
  )
}
