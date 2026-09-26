import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"

import type {
  FormAlertContent,
  FormAlertTone,
} from "@/components/form/form.types"

const TONE_VARIANTS = {
  error: "destructive",
  info: "info",
  success: "success",
} as const satisfies Record<FormAlertTone, string>

type Props = FormAlertContent & {
  className?: string
}

export function FormAlert({ tone, title, description, className }: Props) {
  return (
    <Alert
      variant={TONE_VARIANTS[tone]}
      role={tone === "error" ? "alert" : "status"}
      className={className}
    >
      <AlertTitle>{title}</AlertTitle>
      {description ? <AlertDescription>{description}</AlertDescription> : null}
    </Alert>
  )
}
