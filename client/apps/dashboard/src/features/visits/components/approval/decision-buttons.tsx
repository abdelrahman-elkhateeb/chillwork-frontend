import { CheckIcon, XIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

type Answer = "APPROVED" | "REJECTED"

type Props = {
  value: Answer | undefined
  onChange: (value: Answer) => void
  partName: string
  disabled?: boolean
}

/**
 * 50px, and they say Yes and No, not Approve and Decline — the customer is
 * holding someone else's phone in a doorway.
 */
export function DecisionButtons({ value, onChange, partName, disabled }: Props) {
  return (
    <div
      role="radiogroup"
      aria-label={`Fit the ${partName}?`}
      className="mt-[13px] flex gap-2"
    >
      <Button
        type="button"
        role="radio"
        aria-checked={value === "APPROVED"}
        variant="outline"
        disabled={disabled}
        onClick={() => onChange("APPROVED")}
        className={cn(
          "h-[50px] flex-1 bg-white text-[14.5px] font-semibold text-muted-foreground",
          value === "APPROVED" &&
            "border-2 border-[#17876A] bg-[#17876A]/9 font-bold text-[#11705A] hover:bg-[#17876A]/12"
        )}
      >
        {value === "APPROVED" ? <CheckIcon /> : null}
        Yes
      </Button>
      <Button
        type="button"
        role="radio"
        aria-checked={value === "REJECTED"}
        variant="outline"
        disabled={disabled}
        onClick={() => onChange("REJECTED")}
        className={cn(
          "h-[50px] flex-1 bg-white text-[14.5px] font-semibold text-muted-foreground",
          value === "REJECTED" &&
            "border-2 border-destructive bg-destructive/7 font-bold text-[#8E1913] hover:bg-destructive/10"
        )}
      >
        {value === "REJECTED" ? <XIcon /> : null}
        No
      </Button>
    </div>
  )
}
