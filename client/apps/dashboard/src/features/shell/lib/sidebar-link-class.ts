import { cn } from "@workspace/ui/lib/utils"

/** A link in the ink sidebar: orange left rule on the active one. */
export function sidebarLinkClass(
  isActive: boolean,
  className?: string | false
) {
  return cn(
    "flex items-center justify-between rounded-[4px] border-l-2 border-transparent px-[11px] py-[9px] text-[13px] text-paper/62 transition-colors hover:bg-paper/6 hover:text-paper",
    className,
    isActive &&
      "border-l-primary bg-primary/16 font-semibold text-paper-bright hover:bg-primary/16"
  )
}
