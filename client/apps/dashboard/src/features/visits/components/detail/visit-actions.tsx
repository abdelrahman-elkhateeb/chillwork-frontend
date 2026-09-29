import { Link, useNavigate } from "react-router-dom"
import { Button } from "@workspace/ui/components/button"

import { FormAlert } from "@/components/form/form-alert"
import { SubmitButton } from "@/components/form/submit-button"
import { Eyebrow } from "@/components/layout/eyebrow"
import { STATE_COPY } from "@/components/states/state-copy.constants"
import { ROUTES, pathTo } from "@/config/routes"
import { hasErrorCode } from "@/lib/api/api-error"
import { API_ERROR_CODES } from "@/lib/api/api.constants"
import {
  useCompleteVisit,
  useStartVisit,
} from "@/features/visits/hooks/use-visit-mutations"
import type { VisitDetail } from "@/features/visits/types/visit.types"

type Props = {
  visit: VisitDetail
  /** Units still without an outcome (only known once the visit started). */
  unitsWithoutOutcome: number
}

function DisabledAction({ children }: { children: string }) {
  return (
    <Button
      disabled
      variant="outline"
      className="h-[50px] w-full border-border bg-[#EFF0F0] text-[14.5px] font-semibold text-[#8A9093] disabled:opacity-100"
    >
      {children}
    </Button>
  )
}

/**
 * The buttons come from `allowedActions` — the phone never decides. A
 * disallowed action is greyed, not hidden, so he can see what comes next.
 */
export function VisitActions({ visit, unitsWithoutOutcome }: Props) {
  const navigate = useNavigate()
  const start = useStartVisit(visit.id)
  const complete = useCompleteVisit(visit.id)
  const actions = visit.allowedActions
  const invoiceHref = pathTo(ROUTES.invoice, { visitId: visit.id })

  const failure = start.error ?? complete.error
  const incomplete = hasErrorCode(
    complete.error,
    API_ERROR_CODES.WORK_RESULTS_INCOMPLETE
  )

  return (
    <section className="mt-4">
      <Eyebrow className="tracking-[0.1em]">What you can do now</Eyebrow>

      {failure && !incomplete ? (
        <FormAlert
          tone="error"
          title={
            hasErrorCode(failure, API_ERROR_CODES.VISIT_STATUS_CONFLICT)
              ? "This visit moved on"
              : STATE_COPY.saveFailed.title
          }
          description={
            hasErrorCode(failure, API_ERROR_CODES.VISIT_STATUS_CONFLICT)
              ? "Someone changed it a moment ago. The screen shows where it is now."
              : STATE_COPY.saveFailed.description
          }
          className="mt-2.5"
        />
      ) : null}

      <div className="mt-2.5 flex flex-col gap-2">
        {actions.includes("START_VISIT") ? (
          <SubmitButton
            type="button"
            pending={start.isPending}
            pendingLabel="Starting…"
            onClick={() => start.mutate()}
            className="h-[52px] text-[15px]"
          >
            Start this visit
          </SubmitButton>
        ) : null}

        {visit.status === "IN_PROGRESS" ? (
          <>
            {actions.includes("COMPLETE_VISIT") && unitsWithoutOutcome === 0 ? (
              <SubmitButton
                type="button"
                pending={complete.isPending}
                pendingLabel="Finishing…"
                onClick={() =>
                  complete.mutate(undefined, {
                    onSuccess: () => navigate(invoiceHref),
                  })
                }
                className="h-[52px] text-[15px]"
              >
                Finish the visit
              </SubmitButton>
            ) : (
              <DisabledAction>Finish the visit</DisabledAction>
            )}
            <DisabledAction>Issue the invoice — after finishing</DisabledAction>
            {unitsWithoutOutcome > 0 || incomplete ? (
              <p className="font-narrow text-[12px] leading-[1.45] text-muted-foreground">
                Greyed out because{" "}
                {unitsWithoutOutcome === 1
                  ? "one unit still needs"
                  : `${unitsWithoutOutcome || "some"} units still need`}{" "}
                an outcome.
              </p>
            ) : null}
            <Button
              asChild
              variant="outline"
              className="h-[50px] bg-white text-[14.5px] font-semibold"
            >
              <Link to={invoiceHref}>Check the bill so far</Link>
            </Button>
          </>
        ) : null}

        {visit.status === "COMPLETED" ? (
          <Button asChild className="h-[52px] text-[15px] font-semibold">
            <Link to={invoiceHref}>
              {actions.includes("ISSUE_INVOICE")
                ? "Issue the invoice"
                : "See the invoice"}
            </Link>
          </Button>
        ) : null}

        {visit.status === "CANCELLED" ? (
          <p className="font-narrow text-[13px] text-muted-foreground">
            This visit was cancelled. There is nothing to do on it.
          </p>
        ) : null}
      </div>
    </section>
  )
}
