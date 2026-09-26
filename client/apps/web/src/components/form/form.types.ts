import type { ComponentProps, ReactNode } from "react"
import type { Button } from "@workspace/ui/components/button"
import type { Input } from "@workspace/ui/components/input"
import type { Textarea } from "@workspace/ui/components/textarea"

export type FormAlertTone = "error" | "info" | "success"

export type FormAlertContent = {
  tone: FormAlertTone
  title: string
  description?: ReactNode
}

export type FieldChromeProps = {
  label: ReactNode
  /** Rendered on the label's row, right-aligned (e.g. a "Forgot password?" link). */
  labelAside?: ReactNode
  /** Helper text under the input; hidden while an error is shown. */
  hint?: ReactNode
  error?: string
}

export type TextFieldProps = ComponentProps<typeof Input> & FieldChromeProps

export type TextareaFieldProps = ComponentProps<typeof Textarea> &
  FieldChromeProps

export type PasswordFieldProps = Omit<TextFieldProps, "type"> & {
  /** Show the Show/Hide toggle. Off for "confirm password" style fields. */
  revealable?: boolean
}

export type SubmitButtonProps = ComponentProps<typeof Button> & {
  pending?: boolean
  pendingLabel?: string
}
