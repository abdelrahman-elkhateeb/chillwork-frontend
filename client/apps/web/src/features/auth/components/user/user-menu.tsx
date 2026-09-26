import { Link } from "react-router-dom"
import { LogOutIcon, PlusIcon, UserIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

import { ROUTES } from "@/config/routes"
import { UserAvatar } from "@/features/auth/components/user/user-avatar"
import { useLogout } from "@/features/auth/hooks/use-logout"
import type { AuthUser } from "@/features/auth/types/auth.types"

/** Avatar button with the signed-in user's shortcuts, for the ink headers. */
export function UserMenu({ user }: { user: AuthUser }) {
  const logout = useLogout()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          aria-label={`Account menu for ${user.name}`}
          className="h-auto gap-2.5 rounded-full p-1 pr-1 hover:bg-paper/10 aria-expanded:bg-paper/10 sm:pl-3"
        >
          <span className="hidden font-narrow text-[13.5px] font-normal text-paper/70 sm:inline">
            {user.name}
          </span>
          <UserAvatar name={user.name} className="size-8" />
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
        <DropdownMenuItem asChild>
          <Link to={ROUTES.account}>
            <UserIcon />
            Your account
          </Link>
        </DropdownMenuItem>
        {user.role === "CUSTOMER" ? (
          <DropdownMenuItem asChild>
            <Link to={ROUTES.newRequest}>
              <PlusIcon />
              Request a service visit
            </Link>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={logout.isPending}
          onSelect={() => logout.mutate()}
        >
          <LogOutIcon />
          {logout.isPending ? "Logging out…" : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
