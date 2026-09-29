import type { ReactNode } from "react"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@workspace/ui/components/field"

import { fieldDescriptionId } from "@/components/form/field-ids"
import type { FieldChromeProps } from "@/components/form/form.types"

type Props = FieldChromeProps & {
  id: string
  children: ReactNode
}

/** Label, helper text and error message around a single input. */
export function FieldChrome({
  id,
  label,
  labelAside,
  hint,
  error,
  children,
}: Props) {
  return (
    <Field className="gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <FieldLabel htmlFor={id} className="text-[13px] leading-[normal]">
          {label}
        </FieldLabel>
        {labelAside}
      </div>

      {children}

      {error ? (
        <FieldError
          id={fieldDescriptionId(id)}
          className="text-[12.5px] leading-normal text-[#8E1913]"
        >
          {error}
        </FieldError>
      ) : hint ? (
        <FieldDescription
          id={fieldDescriptionId(id)}
          className="font-narrow text-[12.5px] leading-[1.55]"
        >
          {hint}
        </FieldDescription>
      ) : null}
    </Field>
  )
}
