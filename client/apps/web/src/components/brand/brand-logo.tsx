import { Link } from "react-router-dom"
import { cn } from "@workspace/ui/lib/utils"

import { ROUTES } from "@/config/routes"

type Props = {
  size?: "sm" | "md"
  className?: string
}

const SIZES = {
  sm: { mark: 22, text: "text-[14px]" },
  md: { mark: 27, text: "text-[17px]" },
}

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

/** Logo + wordmark, linking home. Sits on the dark ink background. */
export function BrandLogo({ size = "md", className }: Props) {
  const { mark, text } = SIZES[size]

  return (
    <Link
      to={ROUTES.home}
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
    </Link>
  )
}
