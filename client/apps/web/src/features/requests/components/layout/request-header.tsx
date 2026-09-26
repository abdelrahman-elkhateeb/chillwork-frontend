import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"

import { BrandLogo } from "@/components/brand/brand-logo"

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

export function RequestHeader({ userName }: { userName: string }) {
  return (
    <header className="bg-ink">
      <div className="mx-auto flex h-[62px] max-w-[1440px] items-center justify-between px-4 md:px-12">
        <BrandLogo size="sm" />
        <div className="flex items-center gap-[18px]">
          <span className="hidden font-narrow text-[13.5px] text-paper/60 sm:inline">
            {userName}
          </span>
          <Avatar className="size-7 after:hidden">
            <AvatarFallback className="bg-paper/14 text-[12px] font-bold text-paper">
              {initials(userName)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
