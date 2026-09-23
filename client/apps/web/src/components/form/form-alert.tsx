import { cn } from "@workspace/ui/lib/utils"

import type {
  FormAlertContent,
  FormAlertTone,
} from "@/components/form/form.types"

const TONE_CLASSES: Record<FormAlertTone, { box: string; title: string }> = {
  error: {
    box: "border-[rgba(179,32,26,0.32)] border-l-[#B3201A] bg-[rgba(179,32,26,0.07)]",
    title: "text-[#8E1913]",
  },
  info: {
    box: "border-[rgba(31,111,168,0.34)] border-l-[#1F6FA8] bg-[rgba(31,111,168,0.09)]",
    title: "text-[#17557E]",
  },
  success: {
    box: "border-[rgba(23,135,106,0.36)] border-l-[#17876A] bg-[rgba(23,135,106,0.1)]",
    title: "text-[#11705A]",
  },
}

type Props = FormAlertContent & {
  className?: string
}

export function FormAlert({ tone, title, description, className }: Props) {
  const classes = TONE_CLASSES[tone]

  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "rounded-[4px] border border-l-[3px] px-[13px] py-3",
        classes.box,
        className
      )}
    >
      <p className={cn("text-[13.5px] font-semibold", classes.title)}>
        {title}
      </p>
      {description ? (
        <div className="mt-1 text-[13px] leading-normal text-muted-foreground">
          {description}
        </div>
      ) : null}
    </div>
  )
}
