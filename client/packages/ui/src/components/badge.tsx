import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

/** Small bordered uppercase status label — the product's status vocabulary. */
const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center gap-1 overflow-hidden rounded-[3px] border px-[7px] py-[5px] font-narrow text-[11px] leading-none font-bold tracking-[0.08em] whitespace-nowrap uppercase transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        outline: "border-line-strong text-foreground",
        info: "border-[#1F6FA8]/35 bg-[#1F6FA8]/10 text-[#17557E]",
        progress: "border-[#19A2C4]/45 bg-[#19A2C4]/10 text-[#145A75]",
        success: "border-[#17876A]/35 bg-[#17876A]/10 text-[#11705A]",
        destructive:
          "border-destructive/35 bg-destructive/[0.07] text-[#8E1913]",
        /** Blocked or excluded — the hatched red mark. */
        blocked: "border-destructive/40 bg-hatch text-[#8E1913]",
        /** The one status that is the viewer's job to clear — orange. */
        attention: "border-primary/40 bg-primary/13 text-primary-deep",
        /** Out of play but not an error (cancelled, stopped) — grey hatch. */
        excluded: "border-line-strong bg-hatch-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
