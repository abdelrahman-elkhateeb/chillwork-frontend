import { useId, useState } from "react"
import { Input } from "@workspace/ui/components/input"
import { cn } from "@workspace/ui/lib/utils"

import { FieldChrome } from "@/components/form/field-chrome"
import { fieldDescriptionId } from "@/components/form/field-ids"
import type { PasswordFieldProps } from "@/components/form/form.types"

export function PasswordField({
  id,
  label,
  labelAside,
  hint,
  error,
  revealable = true,
  className,
  ...inputProps
}: PasswordFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hasDescription = Boolean(error ?? hint)
  const [visible, setVisible] = useState(false)

  return (
    <FieldChrome
      id={inputId}
      label={label}
      labelAside={labelAside}
      hint={hint}
      error={error}
    >
      <div className="relative">
        <Input
          id={inputId}
          type={visible ? "text" : "password"}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            hasDescription ? fieldDescriptionId(inputId) : undefined
          }
          className={cn(revealable && "pr-[92px]", className)}
          {...inputProps}
        />
        {revealable ? (
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            aria-controls={inputId}
            aria-pressed={visible}
            disabled={inputProps.disabled}
            className="absolute top-1.5 right-1.5 h-[34px] rounded-[4px] bg-secondary px-3 text-[13px] font-semibold text-foreground transition-colors hover:bg-[#D7D9D9] disabled:opacity-50"
          >
            {visible ? "Hide" : "Show"}
          </button>
        ) : null}
      </div>
    </FieldChrome>
  )
}
