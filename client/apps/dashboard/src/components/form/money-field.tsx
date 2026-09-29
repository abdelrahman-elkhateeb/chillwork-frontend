import { useId } from "react"
import { Input } from "@workspace/ui/components/input"

import { FieldChrome } from "@/components/form/field-chrome"
import { fieldDescriptionId } from "@/components/form/field-ids"
import type { TextFieldProps } from "@/components/form/form.types"

type Props = Omit<TextFieldProps, "type"> & {
  currency: string | null
}

/** An amount with the company currency pinned to its left ("EGP | 150.00"). */
export function MoneyField({
  id,
  label,
  labelAside,
  hint,
  error,
  currency,
  ...inputProps
}: Props) {
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
      <div className="flex items-stretch">
        <span className="flex items-center rounded-l-[5px] border border-r-0 border-line-strong bg-surface-sunken px-3 font-mono text-[13px] text-muted-foreground">
          {currency ?? "—"}
        </span>
        <Input
          id={inputId}
          inputMode="decimal"
          autoComplete="off"
          aria-invalid={error ? true : undefined}
          aria-describedby={
            hasDescription ? fieldDescriptionId(inputId) : undefined
          }
          className="h-[42px] rounded-l-none bg-white font-mono text-[14px]"
          {...inputProps}
        />
      </div>
    </FieldChrome>
  )
}
