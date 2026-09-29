import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import type { PageMeta } from "@/lib/api/api.types"

type Props = {
  meta: PageMeta
  onPageChange: (page: number) => void
  className?: string
}

/** "1–20 of 64" with Back / Next — under every table. */
export function Pager({ meta, onPageChange, className }: Props) {
  const { page, pageSize, total } = meta
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)
  const hasPrevious = page > 1
  const hasNext = to < total

  return (
    <div
      className={cn(
        "flex items-center justify-between px-[18px] py-[11px]",
        className
      )}
    >
      <span className="font-narrow text-[12.5px] text-muted-foreground">
        {from}–{to} of {total}
      </span>
      <div className="flex gap-1.5">
        <Button
          variant="outline"
          disabled={!hasPrevious}
          onClick={() => onPageChange(page - 1)}
          className="h-[34px] bg-white px-[13px] text-[13px] font-semibold disabled:border-border disabled:bg-[#EFF0F0] disabled:text-[#9EA4A6] disabled:opacity-100"
        >
          Back
        </Button>
        <Button
          variant="outline"
          disabled={!hasNext}
          onClick={() => onPageChange(page + 1)}
          className="h-[34px] bg-white px-[13px] text-[13px] font-semibold disabled:border-border disabled:bg-[#EFF0F0] disabled:text-[#9EA4A6] disabled:opacity-100"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
