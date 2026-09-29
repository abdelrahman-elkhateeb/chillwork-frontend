import { Eyebrow } from "@/components/layout/eyebrow"
import type { AdminRequestDevice } from "@/features/requests/types/request.types"

type Props = {
  device: AdminRequestDevice
  index: number
}

function unitTitle(device: AdminRequestDevice): string {
  const equipment = [device.brand, device.model].filter(Boolean).join(" ")
  return equipment ? `${device.label} — ${equipment}` : device.label
}

/**
 * The customer's words and the reading never merge: two columns, so the
 * dispatcher sees what was said next to what the machine made of it — and
 * can disagree with it. A missing reading is hatched, never a gate.
 */
export function RequestUnitCard({ device, index }: Props) {
  const analysis = device.aiAnalysis.analysis

  return (
    <div className="overflow-hidden rounded-[6px] border border-border">
      <div className="flex items-center justify-between gap-3 border-b border-[#E4E6E6] bg-[#F2F3F3] px-[13px] py-2.5">
        <span className="text-[13.5px] font-bold">
          {index + 1} · {unitTitle(device)}
        </span>
        <span className="font-mono text-[11.5px] text-muted-foreground">
          {device.clientDeviceId}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 border-b border-[#E4E6E6] px-[13px] py-3 sm:border-r sm:border-b-0">
          <Eyebrow className="text-muted-foreground">In their words</Eyebrow>
          <p className="mt-[5px] text-[13.5px] leading-[1.5] whitespace-pre-line">
            “{device.originalDescription}”
          </p>
        </div>

        {analysis ? (
          <div className="flex-1 bg-accent/6 px-[13px] py-3">
            <Eyebrow className="text-[#145A75]">AI reading</Eyebrow>
            <p className="mt-[5px] text-[13.5px] font-semibold">
              {analysis.summary}
            </p>
            {analysis.possibleCauses.length > 0 ? (
              <ul className="mt-1.5 list-disc pl-4 font-narrow text-[12.5px] leading-[1.5] text-muted-foreground">
                {analysis.possibleCauses.map((cause) => (
                  <li key={cause}>{cause}</li>
                ))}
              </ul>
            ) : null}
            {analysis.inspectionQuestions.length > 0 ? (
              <>
                <Eyebrow className="mt-2.5 text-muted-foreground">
                  Ask on site
                </Eyebrow>
                <ul className="mt-1 list-disc pl-4 font-narrow text-[12.5px] leading-[1.5] text-muted-foreground">
                  {analysis.inspectionQuestions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        ) : (
          <div className="flex-1 bg-hatch-muted px-[13px] py-3">
            <Eyebrow className="text-muted-foreground">AI reading</Eyebrow>
            <p className="mt-[5px] text-[13.5px] font-semibold">
              Not available for this unit
            </p>
            <p className="mt-[3px] font-narrow text-[12.5px] leading-[1.5] text-muted-foreground">
              Schedule it from the customer's description as normal.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
