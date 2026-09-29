import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import {
  formatShortWeekday,
  sameDay,
  type CalendarDay,
} from "@/lib/format/dates"

type Props = {
  days: CalendarDay[]
  selected: CalendarDay
  onSelect: (day: CalendarDay) => void
}

export function DayPicker({ days, selected, onSelect }: Props) {
  return (
    <div role="radiogroup" aria-label="Which day" className="flex gap-[7px]">
      {days.map((day) => {
        const active = sameDay(day, selected)
        return (
          <Button
            key={`${day.month}-${day.day}`}
            type="button"
            role="radio"
            aria-checked={active}
            variant="outline"
            onClick={() => onSelect(day)}
            className={cn(
              "h-auto flex-1 flex-col gap-0.5 rounded-[5px] bg-white py-[9px]",
              active && "border-2 border-primary bg-[#FFF3EC] py-2"
            )}
          >
            <span
              className={cn(
                "font-narrow text-[11.5px] font-bold uppercase",
                active ? "text-primary-deep" : "text-[#8A9093]"
              )}
            >
              {formatShortWeekday(day)}
            </span>
            <span className="font-mono text-[16px] font-semibold">
              {day.day}
            </span>
          </Button>
        )
      })}
    </div>
  )
}
