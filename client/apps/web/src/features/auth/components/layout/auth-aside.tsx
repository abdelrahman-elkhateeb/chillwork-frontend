import type { ReactNode } from "react"

import { BrandLogo } from "@/components/brand/brand-logo"
import { AuthAsideDrawing } from "@/features/auth/components/layout/auth-aside-drawing"
import type { AuthAsideDrawingVariant } from "@/features/auth/types/auth-layout.types"

type Props = {
  title: string
  description: string
  /** Extra content right under the intro (e.g. the signup steps). */
  children?: ReactNode
  /** Content centred between the intro and the footer (e.g. a preview card). */
  middle?: ReactNode
  footer: ReactNode
  drawing: AuthAsideDrawingVariant
}

/** Content of the dark desktop side panel shared by login and signup. */
export function AuthAside({
  title,
  description,
  children,
  middle,
  footer,
  drawing,
}: Props) {
  return (
    <>
      <div className="relative z-10">
        <BrandLogo />

        <h2 className="mt-14 text-[34px] leading-[1.1] font-bold tracking-[-0.026em] text-[#F7F8F8]">
          {title}
        </h2>
        <p className="mt-4 max-w-[390px] text-[15.5px] leading-[1.58] text-[#F0F1F1]/60">
          {description}
        </p>

        {children}
      </div>

      {middle ? <div className="relative z-10">{middle}</div> : null}

      <div className="relative z-10 text-sm text-[#F0F1F1]/50">{footer}</div>

      <AuthAsideDrawing variant={drawing} />
    </>
  )
}
