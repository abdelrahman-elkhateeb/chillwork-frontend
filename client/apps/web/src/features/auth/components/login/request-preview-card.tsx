import { Badge } from "@workspace/ui/components/badge"
import { Card, CardTitle } from "@workspace/ui/components/card"

/** Illustrative sample of what a customer tracks once signed in. */
export function RequestPreviewCard() {
  return (
    <Card
      aria-hidden="true"
      className="block border-[#F0F1F1]/15 bg-transparent px-5 py-[18px] text-inherit"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[12.5px] font-semibold text-[#F7F8F8]/90">
          REQ-2481
        </span>
        <Badge
          variant="progress"
          className="bg-[#19A2C4]/20 px-[9px] py-1 font-sans leading-[normal] text-[#6FD0E8]"
        >
          On the way
        </Badge>
      </div>
      <CardTitle asChild className="mt-3 text-[15px] text-[#F7F8F8]">
        <p>Mostafa K. · arriving 10:00–12:00</p>
      </CardTitle>
      <p className="mt-1 text-[13.5px] leading-normal text-[#F0F1F1]/55">
        2 units to check · Maadi, Cairo
      </p>
    </Card>
  )
}
