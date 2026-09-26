import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { cn } from "@workspace/ui/lib/utils"

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

type Props = {
  name: string
  className?: string
}

/** The signed-in user's initials, for the dark (ink) headers. */
export function UserAvatar({ name, className }: Props) {
  return (
    <Avatar className={cn("size-7 after:hidden", className)}>
      <AvatarFallback className="bg-paper/14 text-[12px] font-bold text-paper">
        {initials(name)}
      </AvatarFallback>
    </Avatar>
  )
}
