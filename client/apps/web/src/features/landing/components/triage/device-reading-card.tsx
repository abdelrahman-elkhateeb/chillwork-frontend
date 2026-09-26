import { Card, CardTitle } from "@workspace/ui/components/card"

import { PartChip } from "@/features/landing/components/mockups/part-chip"
import type { DeviceReading } from "@/features/landing/types/mockup.types"

type Props = {
  reading: DeviceReading
}

/** The likely fault for one unit, with its parts checked against stock. */
export function DeviceReadingCard({ reading }: Props) {
  return (
    <Card className="block rounded-[4px] border-l-[3px] border-secondary border-l-primary px-[15px] py-3.5">
      <div className="flex items-baseline justify-between gap-3">
        <CardTitle asChild className="text-[13.5px]">
          <p>
            {reading.id} — {reading.name}
          </p>
        </CardTitle>
        <span className="shrink-0 font-mono text-[11.5px] text-muted-foreground">
          {reading.model}
        </span>
      </div>
      <p className="mt-2 text-[13.5px] leading-[1.55] text-ink">
        {reading.finding.lead} <strong>{reading.finding.emphasis}</strong>{" "}
        {reading.finding.rest}
      </p>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {reading.parts.map((part) => (
          <PartChip key={part.code} {...part} />
        ))}
      </div>
    </Card>
  )
}
