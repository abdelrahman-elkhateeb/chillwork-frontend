import { Skeleton } from "@workspace/ui/components/skeleton"
import { cn } from "@workspace/ui/lib/utils"

// Rows fade down the page, the way the design draws them.
const ROW_TONES = ["#E4E6E6", "#E9EBEB", "#EDEEEE", "#F2F3F3", "#F2F3F3"]

type TableSkeletonProps = {
  rows?: number
  className?: string
}

/** Rows the shape of the real ones, so nothing jumps when data lands. */
export function TableSkeleton({ rows = 5, className }: TableSkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("px-[18px] pt-3.5 pb-4", className)}
    >
      <div className="flex gap-2.5 border-b border-[#E4E6E6] pb-2.5">
        <Skeleton className="h-[9px] w-16 animate-none bg-[#DCDEDE]" />
        <Skeleton className="h-[9px] flex-1 animate-none bg-[#DCDEDE]" />
        <Skeleton className="h-[9px] w-[54px] animate-none bg-[#DCDEDE]" />
      </div>
      {Array.from({ length: rows }, (_, index) => {
        const tone = ROW_TONES[Math.min(index, ROW_TONES.length - 1)]
        return (
          <div
            key={index}
            className="flex items-center gap-2.5 border-b border-[#EDEEEE] py-[13px] last:border-b-0"
          >
            <Skeleton className="h-3 w-16" style={{ backgroundColor: tone }} />
            <Skeleton className="h-3 flex-1" style={{ backgroundColor: tone }} />
            <Skeleton
              className="h-3 w-[54px]"
              style={{ backgroundColor: tone }}
            />
          </div>
        )
      })}
    </div>
  )
}

/** Same blocks, same sizes as a loaded detail page. */
export function DetailSkeleton({ className }: { className?: string }) {
  return (
    <div role="status" aria-label="Loading" className={cn("p-4", className)}>
      <Skeleton className="h-[11px] w-[108px] bg-[#DCDEDE]" />
      <Skeleton className="mt-3 h-[19px] w-[172px]" />
      <Skeleton className="mt-2.5 h-[11px] w-[130px] bg-[#E9EBEB]" />
      {[0, 1].map((block) => (
        <div
          key={block}
          className={cn(
            "rounded-[5px] border border-[#E4E6E6] p-[13px]",
            block === 0 ? "mt-[18px]" : "mt-2.5"
          )}
        >
          <Skeleton className="h-2.5 w-[84px]" />
          <Skeleton className="mt-2.5 h-2.5 w-full bg-[#EDEEEE]" />
          <Skeleton
            className={cn(
              "mt-[7px] h-2.5 bg-[#EDEEEE]",
              block === 0 ? "w-[72%]" : "w-[58%]"
            )}
          />
        </div>
      ))}
    </div>
  )
}

/** A stack of card-shaped blocks, for the phone lists. */
export function CardListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div role="status" aria-label="Loading" className="flex flex-col gap-2.5">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="rounded-[6px] border border-border bg-card px-[15px] py-[14px]"
        >
          <div className="flex justify-between">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="mt-3 h-4 w-40" />
          <Skeleton className="mt-2 h-3 w-28 bg-[#EDEEEE]" />
        </div>
      ))}
    </div>
  )
}
