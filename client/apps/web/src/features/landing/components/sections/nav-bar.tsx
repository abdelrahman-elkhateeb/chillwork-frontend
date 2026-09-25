import { useState } from "react"
import { Link } from "react-router-dom"
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
          <a
            href={DEMO_HREF}
            className="rounded-[6px] bg-primary px-5 py-[11px] text-[14px] font-semibold text-ink transition-colors hover:bg-[#F06A2C]"
          >
            Book a demo
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="landing-mobile-menu"
          onClick={() => setOpen((current) => !current)}
          className="-mr-3 flex size-11 items-center justify-center md:hidden"
        >
          <MenuIcon open={open} />
        </button>
      </LandingContainer>

      {open ? (
        <div
          id="landing-mobile-menu"
          className="border-t border-paper/10 bg-ink md:hidden"
        >
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
            <a
              href={DEMO_HREF}
              onClick={close}
              className="mt-2 mb-2 flex h-[52px] items-center justify-center rounded-[6px] bg-primary text-[15.5px] font-semibold text-ink"
            >
              Book a demo
            </a>
          </LandingContainer>
        </div>
      ) : null}
    </header>
  )
}
