import type { ReactNode } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@workspace/ui/components/card"

import type { AppRole } from "@/features/landing/types/landing.types"

type Props = {
  app: AppRole
  /** Illustrative screen from that app. */
  preview: ReactNode
}

export function AppCard({ app, preview }: Props) {
  return (
    <Card asChild className="rounded-[6px]">
      <li>
        <CardContent className="pt-[18px] pb-4">
          <p className="text-[11.5px] font-bold tracking-[0.14em] text-primary-deep uppercase">
            {app.role}
          </p>
          <CardTitle
            asChild
            className="mt-1.5 text-[17px] leading-[normal] font-bold tracking-[-0.012em]"
          >
            <h3>{app.title}</h3>
          </CardTitle>
        </CardContent>

        <CardContent
          aria-hidden="true"
          className="flex flex-1 flex-col justify-start bg-surface-sunken p-5 lg:h-[268px] lg:flex-none"
        >
          {preview}
        </CardContent>

        <CardContent className="py-[18px]">
          <CardDescription asChild>
            <p>{app.summary}</p>
          </CardDescription>
        </CardContent>
      </li>
    </Card>
  )
}
