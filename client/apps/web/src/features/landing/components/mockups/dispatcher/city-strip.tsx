import { cn } from "@workspace/ui/lib/utils"

import {
  CITY_PINS,
  DISPATCHER_MOCKUP,
} from "@/features/landing/constants/dispatcher-mockup.constants"
import type { CityPinTone } from "@/features/landing/types/mockup.types"

const PIN_CLASSES: Record<CityPinTone, { ring: string; dot: string }> = {
  idle: { ring: "bg-ink", dot: "bg-white" },
  active: { ring: "bg-primary", dot: "bg-ink" },
  danger: { ring: "bg-destructive", dot: "bg-white" },
}

const GRID_COLUMNS = [15, 32, 50.5, 67, 83.5]
const GRID_ROWS = [26, 54, 80]

/** Schematic map of today's visits across the city. */
export function CityStrip() {
  const { city } = DISPATCHER_MOCKUP

  return (
    <div className="min-w-0 flex-1 px-[18px] pt-3.5">
      <p className="text-[11px] font-bold tracking-[0.12em] text-muted-foreground uppercase">
        {city.label}
      </p>

      <div className="relative mt-2.5 h-[91px] overflow-hidden bg-[#E4E6E6]">
        {GRID_COLUMNS.map((x) => (
          <span
            key={`c${x}`}
            className="absolute inset-y-0 w-px bg-[#F4F5F5]"
            style={{ left: `${x}%` }}
          />
        ))}
        {GRID_ROWS.map((y) => (
          <span
            key={`r${y}`}
            className="absolute inset-x-0 h-px bg-[#F4F5F5]"
            style={{ top: `${y}%` }}
          />
        ))}

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d="M0 42 C 18 40, 30 44, 48 50 S 78 42, 88 40 S 97 42, 100 46"
            fill="none"
            stroke="#C4C8C8"
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {CITY_PINS.map((pin) => (
          <span
            key={`${pin.x}-${pin.y}`}
            className={cn(
              "absolute flex size-[18px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full",
              PIN_CLASSES[pin.tone].ring
            )}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <span
              className={cn(
                "size-[6px] rounded-full",
                PIN_CLASSES[pin.tone].dot
              )}
            />
          </span>
        ))}
      </div>

      <ul className="mt-2.5 flex gap-[18px] font-narrow text-[11.5px] text-muted-foreground">
        {city.districts.map((district) => (
          <li key={district}>{district}</li>
        ))}
      </ul>
    </div>
  )
}
