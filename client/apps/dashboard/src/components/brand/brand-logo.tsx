import { Link } from "react-router-dom"
import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"

import { ROUTES } from "@/config/routes"

export function BrandMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" aria-hidden="true">
      <rect
        x="0.5"
        y="0.5"
        width="25"
        height="25"
        rx="3"
        className="fill-primary"
      />
      <rect x="5" y="7" width="16" height="2.6" rx="0.6" fill="#14181A" />
      <rect
        x="5"
        y="11.7"
        width="16"
        height="2.6"
        rx="0.6"
        fill="#14181A"
        opacity="0.72"
      />
      <rect
        x="5"
        y="16.4"
        width="16"
        height="2.6"
        rx="0.6"
        fill="#14181A"
        opacity="0.44"
      />
    </svg>
  )
}

type Props = {
  size?: "sm" | "md"
  /** The orange "Dashboard" tag next to the wordmark (auth screens). */
  withTag?: boolean
  className?: string
}

const SIZES = {
  sm: { mark: 22, text: "text-[14px]" },
  md: { mark: 25, text: "text-[16px]" },
}

/** Logo + wordmark, linking to the dashboard root. Sits on ink. */
export function BrandLogo({ size = "md", withTag = false, className }: Props) {
  const { mark, text } = SIZES[size]

  return (
    <Link
      to={ROUTES.root}
      className={cn(
        "inline-flex items-center gap-[11px] text-[#F0F1F1] hover:text-white",
        className
      )}
    >
      <BrandMark size={mark} />
      <span
        className={cn(
          "font-heading font-bold tracking-[-0.01em] uppercase",
          text
        )}
      >
        ChillWork
      </span>
      {withTag ? (
        <Badge
          variant="outline"
          className="ml-1 border-primary/50 bg-transparent px-2 py-[3px] text-[11px] tracking-[0.12em] text-primary"
        >
          Dashboard
        </Badge>
      ) : null}
    </Link>
  )
}
