import { LogOutIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { cn } from "@workspace/ui/lib/utils"

import { initials, shortName } from "@/lib/format/names"
import { useLogout, type AuthUser } from "@/features/auth"

const ROLE_LABELS = {
  ADMIN: "Admin",
  TECHNICIAN: "Technician",
  CUSTOMER: "Customer",
} as const

type Props = {
  user: AuthUser
  /** Show the name + role next to the avatar (the sidebar footer). */
  withName?: boolean
  className?: string
}

/** Avatar with sign-out, for the ink sidebar and headers. */
export function StaffUserMenu({ user, withName = false, className }: Props) {
  const logout = useLogout()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          aria-label={`Account menu for ${user.name}`}
          className={cn(
            "h-auto justify-start gap-2.5 rounded-[6px] p-1 text-left hover:bg-paper/10 aria-expanded:bg-paper/10",
            className
          )}
        >
          <Avatar className="size-7 after:hidden">
            <AvatarFallback className="bg-paper/14 text-[11.5px] font-bold text-paper">
              {initials(user.name)}
            </AvatarFallback>
          </Avatar>
          {withName ? (
            <span className="min-w-0">
              <span className="block truncate font-narrow text-[13px] font-normal text-paper">
                {shortName(user.name)}
              </span>
              <span className="block font-narrow text-[11.5px] font-normal text-paper/45">
                {ROLE_LABELS[user.role]}
              </span>
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="text-[13.5px] font-semibold text-foreground">
            {user.name}
          </span>
          <span className="truncate text-[12.5px] font-normal text-muted-foreground">
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={logout.isPending}
          onSelect={() => logout.mutate()}
        >
          <LogOutIcon />
          {logout.isPending ? "Signing out…" : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
