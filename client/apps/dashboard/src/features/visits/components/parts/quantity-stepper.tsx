import { MinusIcon, PlusIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

type Props = {
  value: number
  onChange: (value: number) => void
  max?: number
  invalid?: boolean
  disabled?: boolean
  label: string
}

/** − 1 + with 40px targets; going below 1 removes the pick. */
export function QuantityStepper({
  value,
  onChange,
  max = 100,
  invalid = false,
  disabled = false,
  label,
}: Props) {
  return (
    <div className="flex shrink-0 items-center" role="group" aria-label={label}>
      <Button
        type="button"
        variant="outline"
        aria-label="One fewer"
        disabled={disabled}
        onClick={() => onChange(value - 1)}
        className="size-10 rounded-l-[5px] rounded-r-none border-r-0 bg-white"
      >
        <MinusIcon />
      </Button>
      <span
        aria-live="polite"
        className={cn(
          "flex size-10 items-center justify-center border border-line-strong bg-white font-mono text-[14px] font-semibold",
          invalid && "border-[1.5px] border-destructive"
        )}
      >
        {value}
      </span>
      <Button
        type="button"
        variant="outline"
        aria-label="One more"
        disabled={disabled || value >= max}
        onClick={() => onChange(value + 1)}
        className="size-10 rounded-l-none rounded-r-[5px] border-l-0 bg-white disabled:bg-[#EFF0F0]"
      >
        <PlusIcon />
      </Button>
    </div>
  )
}
