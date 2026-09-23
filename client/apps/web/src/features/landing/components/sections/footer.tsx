import { Link } from "react-router-dom"

import { BrandMark } from "@/components/brand/brand-logo"
import { LandingContainer } from "@/features/landing/components/shared/landing-container"
import {
  FOOTER_COLUMNS,
  FOOTER_TAGLINE,
} from "@/features/landing/constants/footer.constants"
import type { NavLink } from "@/features/landing/types/landing.types"

function FooterLink({ link }: { link: NavLink }) {
  const className =
    "text-[13.5px] text-paper/[0.82] transition-colors hover:text-paper md:text-[14px]"

  return link.href.startsWith("/") ? (
    <Link to={link.href} className={className}>
      {link.label}
    </Link>
  ) : (
    <a href={link.href} className={className}>
      {link.label}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="bg-ink">
      <LandingContainer className="flex flex-col gap-[18px] pt-7 pb-8 md:flex-row md:items-start md:justify-between md:gap-10 md:pt-[46px] md:pb-12">
        <div>
          <div className="flex items-center gap-2.5 md:gap-[11px]">
            <BrandMark size={23} />
            <span className="font-heading text-[14px] font-bold text-paper-bright uppercase md:text-[15px]">
              ChillWork
            </span>
          </div>
          <p className="mt-2.5 max-w-[290px] text-[13px] leading-[1.55] text-paper/50 md:mt-3 md:text-[13.5px]">
            {FOOTER_TAGLINE}
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-5 gap-y-2.5 md:gap-[68px]"
        >
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading} className="contents md:block">
              <p className="mb-[13px] hidden text-[11.5px] font-bold tracking-[0.12em] text-paper/[0.42] uppercase md:block">
                {column.heading}
              </p>
              <ul className="contents md:flex md:flex-col md:gap-[9px]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </LandingContainer>
    </footer>
  )
}
