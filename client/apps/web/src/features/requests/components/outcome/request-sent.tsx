import { Link } from "react-router-dom"
import { CheckIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

import { ROUTES } from "@/config/routes"
import { REQUEST_COPY } from "@/features/requests/constants/request-copy.constants"
import type { CreatedServiceRequest } from "@/features/requests/types/request.types"

const COPY = REQUEST_COPY.sent

type Props = {
  request: CreatedServiceRequest
  firstName: string
}

/** The reference is the deliverable — never a bare "Success" page. */
export function RequestSent({ request, firstName }: Props) {
  return (
    <div className="mx-auto max-w-[560px]" role="status">
      <div className="flex items-center gap-[11px]">
        <span className="flex size-[30px] items-center justify-center rounded-full bg-[#11705A] text-white">
          <CheckIcon className="size-4" strokeWidth={3} />
        </span>
        <h1 className="font-sans text-[15.5px] font-semibold tracking-normal normal-case">
          We have it, {firstName}
        </h1>
      </div>

      <div className="mt-[18px] rounded-[6px] bg-ink px-[18px] py-4">
        <div className="font-narrow text-[11.5px] font-bold tracking-[0.1em] text-paper/45 uppercase">
          {COPY.eyebrow}
        </div>
        <div className="mt-1.5 font-mono text-[30px] font-semibold tracking-[-0.01em] text-paper-bright">
          {request.reference}
        </div>
        <div className="mt-[5px] font-narrow text-[12.5px] text-paper/55">
          {COPY.quote}
        </div>
      </div>

      <div className="mt-4">
        <div className="font-narrow text-[11.5px] font-bold tracking-[0.1em] text-muted-foreground uppercase">
          {COPY.nextTitle}
        </div>
        <p className="mt-2 font-narrow text-[13.5px] leading-[1.5] text-foreground">
          {COPY.nextBody}
        </p>
      </div>

      <Button
        asChild
        className="mt-[18px] h-[46px] w-full rounded-[var(--radius-control)] text-[14.5px] font-semibold"
      >
        <Link to={ROUTES.account}>{COPY.done}</Link>
      </Button>
    </div>
  )
}
