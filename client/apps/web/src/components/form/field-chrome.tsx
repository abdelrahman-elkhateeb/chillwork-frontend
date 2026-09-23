import type { ReactNode } from "react"
import { Label } from "@workspace/ui/components/label"

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
  const message = error ?? hint

  return (
    <div>
      <div className="mb-[7px] flex items-baseline justify-between gap-3">
        <Label htmlFor={id}>{label}</Label>
        {labelAside}
      </div>

      {children}

      {message ? (
        <p
          id={fieldDescriptionId(id)}
          role={error ? "alert" : undefined}
          className={
            error
              ? "mt-[7px] text-[12.5px] leading-normal text-[#8E1913]"
              : "mt-[7px] text-[12.5px] leading-normal text-muted-foreground"
          }
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}
