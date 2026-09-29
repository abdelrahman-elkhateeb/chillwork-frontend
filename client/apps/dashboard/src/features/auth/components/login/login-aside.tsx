import { cn } from "@workspace/ui/lib/utils"

import { BrandLogo } from "@/components/brand/brand-logo"
import { CUSTOMER_SITE_URL } from "@/config/routes"
import { LOGIN_COPY } from "@/features/auth/constants/auth-copy.constants"
import { DAY_BOARD } from "@/features/auth/constants/day-board.constants"

export function LoginAside() {
  return (
    <>
      <div>
        <BrandLogo withTag />
        <h2 className="mt-[52px] text-[32px] leading-[1.1] font-bold tracking-[-0.026em] text-paper-bright">
          {LOGIN_COPY.asideTitle}
        </h2>
        <p className="mt-4 max-w-[390px] text-[15.5px] leading-[1.58] text-paper/62">
          {LOGIN_COPY.asideBody}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="rounded-[8px] border border-paper/16 px-5 pt-[18px] pb-4"
      >
        <div className="mb-3.5 text-[13px] font-semibold text-paper-bright/85">
          {DAY_BOARD.day}
        </div>
        {DAY_BOARD.rows.map((row) => (
          <div
            key={row.name}
            className="flex items-center gap-3 pb-[11px] last:pb-0"
          >
            <span className="w-[74px] text-[12.5px] text-paper/60">
              {row.name}
            </span>
            <div className="flex flex-1 gap-1">
              {row.blocks.map(([kind, grow], index) => (
                <span
                  key={index}
                  style={{ flexGrow: grow }}
                  className={cn(
                    "h-[18px] rounded-[3px]",
                    kind === "busy" ? "bg-primary" : "bg-paper/12"
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-[14px] leading-[1.5] text-paper/48">
        {LOGIN_COPY.asideFooter}{" "}
        <a
          href={`${CUSTOMER_SITE_URL}/login`}
          className="font-semibold text-primary hover:text-[#F4A576]"
        >
          {LOGIN_COPY.asideFooterLink}
        </a>
      </div>
    </>
  )
}
