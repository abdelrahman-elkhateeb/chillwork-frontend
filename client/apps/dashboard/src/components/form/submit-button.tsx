import { Button } from "@workspace/ui/components/button"
import { Spinner } from "@workspace/ui/components/spinner"
import { cn } from "@workspace/ui/lib/utils"

import type { SubmitButtonProps } from "@/components/form/form.types"

/**
 * Full-width primary button. While pending it keeps its size, locks, and
 * says what is happening instead of just greying out.
 */
export function SubmitButton({
  pending = false,
  pendingLabel,
  disabled,
  className,
  children,
  type = "submit",
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type={type}
      disabled={disabled || pending}
      aria-busy={pending || undefined}
      className={cn(
        "h-12 w-full rounded-[var(--radius-control)] border border-transparent bg-clip-padding text-[14.5px] font-semibold hover:bg-[#F06A2C]",
        pending && "disabled:bg-[#F4A576] disabled:opacity-100",
        !pending && "disabled:bg-[#EFF0F0] disabled:text-[#9EA4A6]",
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
