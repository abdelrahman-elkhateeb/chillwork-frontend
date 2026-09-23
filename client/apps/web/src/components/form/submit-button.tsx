import { Button } from "@workspace/ui/components/button"
import { Spinner } from "@workspace/ui/components/spinner"
import { cn } from "@workspace/ui/lib/utils"

import type { SubmitButtonProps } from "@/components/form/form.types"

/**
 * Full-width primary submit button. While pending it keeps its size, locks,
 * and says what is happening instead of just greying out.
 */
export function SubmitButton({
  pending = false,
  pendingLabel,
  disabled,
  className,
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={disabled || pending}
      aria-busy={pending || undefined}
      className={cn(
        "h-[50px] w-full rounded-[var(--radius-control)] text-[15.5px] font-semibold hover:bg-[#F06A2C]",
        pending && "disabled:bg-[#F4A576] disabled:opacity-100",
        !pending && "disabled:bg-[#DCDEDE] disabled:text-[#9EA4A6]",
        className
      )}
      {...props}
    >
      {pending ? (
        <>
          <Spinner />
          {pendingLabel ?? children}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
