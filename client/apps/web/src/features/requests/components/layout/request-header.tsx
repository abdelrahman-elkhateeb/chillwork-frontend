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
          <span
            aria-hidden="true"
            className="flex size-7 items-center justify-center rounded-full bg-paper/14 text-[12px] font-bold text-paper"
          >
            {initials(userName)}
          </span>
        </div>
      </div>
    </header>
  )
}
