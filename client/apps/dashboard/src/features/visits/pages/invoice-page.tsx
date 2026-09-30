import { useParams } from "react-router-dom"

import { FormAlert } from "@/components/form/form-alert"
import { SubmitButton } from "@/components/form/submit-button"
import { HatchedNote } from "@/components/layout/hatched-note"
import { ErrorState } from "@/components/states/error-state"
import { CardListSkeleton } from "@/components/states/skeletons"
import { STATE_COPY } from "@/components/states/state-copy.constants"
import { ROUTES, pathTo } from "@/config/routes"
import { hasErrorCode, isNotFoundError } from "@/lib/api/api-error"
import { API_ERROR_CODES } from "@/lib/api/api.constants"
import { formatDate } from "@/lib/format/dates"
import { BillCard } from "@/features/visits/components/invoice/bill-card"
import { IssuedInvoice } from "@/features/visits/components/invoice/issued-invoice"
import { ScreenBody } from "@/features/visits/components/shared/screen-body"
import { ScreenHeader } from "@/features/visits/components/shared/screen-header"
import { VisitNotFound } from "@/features/visits/components/shared/visit-not-found"
import { useIssueInvoice } from "@/features/visits/hooks/use-visit-mutations"
import {
  useInvoicePreview,
  useIssuedInvoice,
  useVisit,
} from "@/features/visits/hooks/use-visits"

/** `/visits/:visitId/invoice` — finish the visit, then invoice it. */
export function InvoicePage() {
  const { visitId = "" } = useParams()
  const visit = useVisit(visitId)
  const status = visit.data?.status
  const finished = status === "COMPLETED"
  const issued = useIssuedInvoice(visitId, finished)
  const noInvoiceYet = finished && isNotFoundError(issued.error)
  const preview = useInvoicePreview(
    visitId,
    status === "IN_PROGRESS" || noInvoiceYet
  )
  const issue = useIssueInvoice(visitId)
  const backTo = pathTo(ROUTES.visit, { visitId })

  const header = (title: string) => (
    <ScreenHeader
      backTo={backTo}
      title={
        <h1 className="text-center font-narrow text-[13px] font-bold tracking-normal text-paper-bright normal-case">
          {title}
        </h1>
      }
      aside={
        <span className="font-mono text-[11.5px] text-paper/50">
          {visit.data?.requestReference}
        </span>
      }
    />
  )

  if (visit.isError) {
    return (
      <>
        {header(" ")}
        {isNotFoundError(visit.error) ? (
          <VisitNotFound />
        ) : (
          <ErrorState
            error={visit.error}
            onRetry={() => void visit.refetch()}
          />
        )}
      </>
    )
  }

  const invoice = issue.data ?? issued.data
  if (invoice) {
    return (
      <>
        {header("Invoice issued")}
        <ScreenBody className="py-[22px]">
          <IssuedInvoice invoice={invoice} />
        </ScreenBody>
      </>
    )
  }

  const loading =
    visit.isPending ||
    (finished && issued.isPending) ||
    ((status === "IN_PROGRESS" || noInvoiceYet) && preview.isPending)

  if (loading) {
    return (
      <>
        {header("Check the bill")}
        <ScreenBody className="py-4">
          <CardListSkeleton count={2} />
        </ScreenBody>
      </>
    )
  }

  const data = visit.data!
  const failure =
    (issued.isError && !noInvoiceYet ? issued.error : null) ?? preview.error

  if (status === "SCHEDULED" || status === "CANCELLED") {
    return (
      <>
        {header("Check the bill")}
        <ScreenBody className="py-4">
          <HatchedNote title="Nothing to bill yet">
            The bill is worked out once the visit has started and each unit has
            an outcome.
          </HatchedNote>
        </ScreenBody>
      </>
    )
  }

  if (failure || !preview.data) {
    return (
      <>
        {header("Check the bill")}
        <ErrorState
          error={failure}
          onRetry={() => {
            void issued.refetch()
            void preview.refetch()
          }}
        />
      </>
    )
  }

  const canIssue = data.allowedActions.includes("ISSUE_INVOICE")

  return (
    <>
      {header(finished ? "Check the bill" : "The bill so far")}
      <ScreenBody className="py-[15px] md:py-5">
        <div className="text-[15px] font-bold">{data.customer.name}</div>
        <div className="mt-0.5 font-narrow text-[12.5px] text-muted-foreground">
          {data.address} · {formatDate(data.startAt, data.timezone)}
        </div>

        <div className="mt-3.5">
          <BillCard bill={preview.data} />
        </div>

        <div className="mt-3 rounded-[4px] border border-l-[3px] border-border border-l-primary bg-surface-sunken px-[13px] py-[11px] font-narrow text-[12.5px] leading-[1.5] text-muted-foreground">
          Labour is charged once per unit you fixed — not once for the visit. A
          unit you could not fix carries nothing at all.
        </div>

        {issue.isError ? (
          <FormAlert
            tone="error"
            {...(hasErrorCode(issue.error, API_ERROR_CODES.INSUFFICIENT_STOCK)
              ? {
                  title: "A part ran out meanwhile",
                  description:
                    "The shelf no longer has enough of a part on this bill. Nothing was issued and no stock was taken — call the office.",
                }
              : hasErrorCode(
                    issue.error,
                    API_ERROR_CODES.INVOICE_ALREADY_ISSUED
                  )
                ? {
                    title: "This visit is already invoiced",
                    description: "Someone issued it a moment ago.",
                  }
                : STATE_COPY.saveFailed)}
            className="mt-3.5"
          />
        ) : null}

        {finished ? (
          <>
            <SubmitButton
              type="button"
              disabled={!canIssue}
              pending={issue.isPending}
              pendingLabel="Issuing…"
              onClick={() => issue.mutate()}
              className="mt-3.5 h-[54px] text-[15px]"
            >
              Issue this invoice
            </SubmitButton>
            <p className="mt-2.5 text-center font-narrow text-[12px] text-muted-foreground">
              You cannot edit these numbers. If they are wrong, the outcome was
              wrong.
            </p>
          </>
        ) : (
          <p className="mt-3.5 text-center font-narrow text-[12.5px] text-muted-foreground">
            Finish the visit first — the invoice is issued against a finished
            visit, never one still running.
          </p>
        )}
      </ScreenBody>
    </>
  )
}
