import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@workspace/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import { cn } from "@workspace/ui/lib/utils"

import { BrandMark } from "@/components/brand/brand-logo"
import { ROUTES } from "@/config/routes"
import { LandingContainer } from "@/features/landing/components/shared/landing-container"
import {
  DEMO_HREF,
  NAV_LINKS,
  SECTION_IDS,
} from "@/features/landing/constants/nav.constants"

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="flex flex-col items-end justify-center gap-[5px]"
    >
      <span
        className={cn(
          "block h-0.5 w-5 bg-paper transition-transform",
          open && "translate-y-[3.5px] rotate-45"
        )}
      />
      <span
        className={cn(
          "block h-0.5 bg-primary transition-all",
          open ? "w-5 -translate-y-[3.5px] -rotate-45" : "w-[13px]"
        )}
      />
    </span>
  )
}

export function NavBar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen} asChild>
      <header className="sticky top-0 z-50 border-b border-paper/10 bg-ink">
        <LandingContainer className="flex h-[58px] items-center justify-between md:h-[74px]">
          <a
            href={`#${SECTION_IDS.top}`}
            className="flex items-center gap-[9px] text-paper md:gap-[11px]"
          >
            <span className="md:hidden">
              <BrandMark size={24} />
            </span>
            <span className="hidden md:block">
              <BrandMark size={27} />
            </span>
            <span className="font-heading text-[15px] font-bold tracking-[-0.01em] uppercase md:text-[17px]">
              ChillWork
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[14px] font-medium text-paper/80 transition-colors hover:text-paper"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3.5 md:flex">
            <Link
              to={ROUTES.login}
              className="px-0.5 py-[9px] text-[14px] font-medium text-paper/70 transition-colors hover:text-paper"
            >
              Sign in
            </Link>
            <Button
              asChild
              size="lg"
              className="h-auto px-5 py-[11px] text-[14px] font-semibold"
            >
              <a href={DEMO_HREF}>Book a demo</a>
            </Button>
          </div>

          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={open ? "Close menu" : "Open menu"}
              className="-mr-3 size-11 hover:bg-transparent aria-expanded:bg-transparent md:hidden"
            >
              <MenuIcon open={open} />
            </Button>
          </CollapsibleTrigger>
        </LandingContainer>

        <CollapsibleContent className="border-t border-paper/10 bg-ink md:hidden">
          <LandingContainer className="flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="border-b border-paper/10 py-3.5 text-[15px] font-medium text-paper/80"
              >
                {link.label}
              </a>
            ))}
            <Link
              to={ROUTES.login}
              onClick={close}
              className="py-3.5 text-[15px] font-medium text-paper/80"
            >
              Sign in
            </Link>
            <Button asChild size="xl" className="my-2">
              <a href={DEMO_HREF} onClick={close}>
                Book a demo
              </a>
            </Button>
          </LandingContainer>
        </CollapsibleContent>
      </header>
    </Collapsible>
  )
}
