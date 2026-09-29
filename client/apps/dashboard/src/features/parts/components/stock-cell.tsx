import { Badge } from "@workspace/ui/components/badge"

/**
 * Zero is not a number here, it is a hatched word — the same mark the
 * technician sees when he tries to pick the part.
 */
export function StockCell({ quantity }: { quantity: number }) {
  if (quantity === 0) {
    return (
      <Badge variant="blocked" className="px-[9px] py-[3px] tracking-[0.05em]">
        None
      </Badge>
    )
  }

  if (quantity === 1) {
    return (
      <span className="inline-flex items-baseline gap-1.5">
        <span className="font-mono text-[14px] font-semibold text-primary-deep">
          1
        </span>
        <span className="font-narrow text-[11.5px] font-bold text-primary-deep uppercase">
          last one
        </span>
      </span>
    )
  }

  return <span className="font-mono text-[14px] font-semibold">{quantity}</span>
}
