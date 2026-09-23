import { useId } from "react"
import { Input } from "@workspace/ui/components/input"

import { FieldChrome } from "@/components/form/field-chrome"
import { fieldDescriptionId } from "@/components/form/field-ids"
import type { TextFieldProps } from "@/components/form/form.types"

export function TextField({
  id,
  label,
  labelAside,
  hint,
  error,
  ...inputProps
}: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hasDescription = Boolean(error ?? hint)

  return (
    <FieldChrome
      id={inputId}
      label={label}
      labelAside={labelAside}
      hint={hint}
      error={error}
    >
      <Input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          hasDescription ? fieldDescriptionId(inputId) : undefined
        }
        {...inputProps}
      />
    </FieldChrome>
  )
}
