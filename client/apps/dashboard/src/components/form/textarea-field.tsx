import { useId } from "react"
import { Textarea } from "@workspace/ui/components/textarea"

import { FieldChrome } from "@/components/form/field-chrome"
import { fieldDescriptionId } from "@/components/form/field-ids"
import type { TextareaFieldProps } from "@/components/form/form.types"

export function TextareaField({
  id,
  label,
  labelAside,
  hint,
  error,
  ...textareaProps
}: TextareaFieldProps) {
  const generatedId = useId()
  const textareaId = id ?? generatedId
  const hasDescription = Boolean(error ?? hint)

  return (
    <FieldChrome
      id={textareaId}
      label={label}
      labelAside={labelAside}
      hint={hint}
      error={error}
    >
      <Textarea
        id={textareaId}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          hasDescription ? fieldDescriptionId(textareaId) : undefined
        }
        {...textareaProps}
      />
    </FieldChrome>
  )
}
