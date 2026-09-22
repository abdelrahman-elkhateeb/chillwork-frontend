import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

const NAV_LINKS = [
  { label: "Why jobs lose money", href: "#leaks" },
  { label: "How it works", href: "#flow" },
  { label: "For your technicians", href: "#field" },
  { label: "Getting paid", href: "#billing" },
]

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2 shrink-0">
      <span className="h-6 w-6 rounded-[3px] bg-primary" aria-hidden="true" />
      <span className="font-heading text-[15px] font-bold tracking-[-0.02em] text-white">
        CHILLWORK
      </span>
    </a>
  )
}

export function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#14181A] text-white">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[13px] text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="h-10 px-3 text-white hover:bg-white/10 hover:text-white"
          >
            <a href="#signin">Sign in</a>
          </Button>
          <Button
            asChild
            size="lg"
            className="h-10 rounded-[6px] px-4 text-[14px] font-semibold"
          >
            <a href="#demo">Book a demo</a>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            asChild
            size="default"
            className="h-10 rounded-[6px] px-3 text-[13px] font-semibold"
          >
            <a href="#demo">Book a demo</a>
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 items-center justify-center rounded-[6px] text-white"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm text-white/80"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#signin"
              onClick={() => setOpen(false)}
              className="font-mono text-sm text-white/80"
            >
              Sign in
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
