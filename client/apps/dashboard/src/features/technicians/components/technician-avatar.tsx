import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { cn } from "@workspace/ui/lib/utils"

import { initials } from "@/lib/format/names"
import type { TechnicianStatus } from "@/features/technicians/types/technician.types"

type Props = {
  name: string
  status: TechnicianStatus
  size?: "sm" | "lg"
}

/** Solid when working, a dashed outline while they haven't set up yet. */
export function TechnicianAvatar({ name, status, size = "sm" }: Props) {
  return (
    <Avatar
      className={cn(
        "after:hidden",
        size === "sm" ? "size-[30px]" : "size-11"
      )}
    >
      <AvatarFallback
        className={cn(
          "font-bold",
          size === "sm" ? "text-[11.5px]" : "text-[15px]",
          status === "ACTIVE" && "bg-ink text-paper-bright",
          status === "INACTIVE" && "bg-muted-foreground text-paper-bright",
          status === "INVITED" &&
            "border-[1.5px] border-dashed border-line-strong bg-transparent text-[#8A9093]"
        )}
      >
        {initials(name)}
      </AvatarFallback>
    </Avatar>
  )
}
