import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { DeviceReadingCard } from "@/features/landing/components/triage/device-reading-card"
import { TRIAGE_ANALYSIS } from "@/features/landing/constants/triage.constants"

/** The AI reading attached to a request before it is stored. */
export function AnalysisCard() {
  return (
    <Card className="block border-0">
      <CardHeader>
        <CardTitle asChild>
          <p>{TRIAGE_ANALYSIS.title}</p>
        </CardTitle>
        <p className="font-narrow text-[12px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
          {TRIAGE_ANALYSIS.timing}
        </p>
      </CardHeader>

      <CardContent className="p-5">
        <div className="grid gap-4 md:grid-cols-2">
          {TRIAGE_ANALYSIS.devices.map((reading) => (
            <DeviceReadingCard key={reading.id} reading={reading} />
          ))}
        </div>

        <dl className="mt-4 grid gap-2.5 border-t border-secondary pt-4 sm:grid-cols-3">
          {TRIAGE_ANALYSIS.facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-[4px] bg-surface-sunken px-[13px] py-3"
            >
              <dt className="font-narrow text-[11.5px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
                {fact.label}
              </dt>
              <dd className="mt-1 text-[13.5px] font-semibold text-ink">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>

      <CardFooter className="text-[13px] text-muted-foreground">
        {TRIAGE_ANALYSIS.disclaimer}
      </CardFooter>
    </Card>
  )
}
