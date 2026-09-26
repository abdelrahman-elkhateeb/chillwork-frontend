import * as React from "react"
import { cn } from "cn"
import { Slot } from "radix-ui"

type WithAsChild<T> = T & { asChild?: boolean }

function Card({
  className,
  asChild = false,
  ...props
}: WithAsChild<React.ComponentProps<"div">>) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="card"
      className={cn(
        "group/card flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-card text-card-foreground",
        className
      )}
      {...props}
    />
  )
}

/** The design's sunken header bar: mono id / title on the left, meta right. */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-border bg-surface-sunken px-5 py-3.5",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({
  className,
  asChild = false,
  ...props
}: WithAsChild<React.ComponentProps<"div">>) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="card-title"
      className={cn("text-[14px] font-semibold text-ink", className)}
      {...props}
    />
  )
}

function CardDescription({
  className,
  asChild = false,
  ...props
}: WithAsChild<React.ComponentProps<"div">>) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="card-description"
      className={cn(
        "text-[13.5px] leading-[1.55] text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("shrink-0 self-start", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-5", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center border-t border-secondary bg-[#EDEFEF] px-5 py-3.5",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
