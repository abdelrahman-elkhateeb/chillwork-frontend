import { Link, useLocation, useSearchParams } from "react-router-dom"
import { Button } from "@workspace/ui/components/button"

import { FormAlert } from "@/components/form/form-alert"
import { EmptyState } from "@/components/states/empty-state"
import { ErrorState } from "@/components/states/error-state"
import { Pager } from "@/components/states/pager"
import { CardListSkeleton } from "@/components/states/skeletons"
import { ROUTES } from "@/config/routes"
import type { AuthUser } from "@/features/auth"
import { CustomerFrame } from "@/features/requests/components/layout/customer-frame"
import { LiveRequestCard } from "@/features/requests/components/my-requests/live-request-card"
import { RequestRow } from "@/features/requests/components/my-requests/request-row"
import { MY_REQUESTS_COPY } from "@/features/requests/constants/my-requests-copy.constants"
import { useMyRequests } from "@/features/requests/hooks/use-my-requests"
import {
  firstName,
  greeting,
  isLive,
  runningLine,
} from "@/features/requests/lib/request-display"
import type { MyRequestsLocationState } from "@/features/requests/types/customer-request.types"

const COPY = MY_REQUESTS_COPY.list

/** `/requests` — her side: every request, today's one first. */
export function MyRequestsPage() {
  return <CustomerFrame>{(user) => <MyRequests user={user} />}</CustomerFrame>
}

function ReportFaultButton() {
  return (
    <Button
      asChild
      className="h-[46px] rounded-[var(--radius-control)] px-5 text-[14.5px] font-semibold"
    >
      <Link to={ROUTES.newRequest}>{COPY.reportFault}</Link>
    </Button>
  )
}

function MyRequests({ user }: { user: AuthUser }) {
  const [params, setParams] = useSearchParams()
  const page = Math.max(1, Number(params.get("page")) || 1)
  const requests = useMyRequests(page)
  const location = useLocation()
  const { welcome } = (location.state ?? {}) as MyRequestsLocationState

  const setPage = (next: number) => {
    setParams(next > 1 ? { page: String(next) } : {})
    window.scrollTo({ top: 0 })
  }

  const items = requests.data?.items ?? []
  // Only the newest running request gets the card; on later pages it's
  // already been shown.
  const live = page === 1 ? items.find(isLive) : undefined
  const rest = items.filter((item) => item !== live)

  return (
    <main className="mx-auto max-w-[660px] px-4 py-8 pb-16">
      {welcome ? (
        <FormAlert
          tone="success"
          title={COPY.welcomeTitle(firstName(user.name))}
          description={COPY.welcomeBody}
          className="mb-6"
        />
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-[19px] font-bold tracking-normal normal-case">
            {greeting()}, {firstName(user.name)}
          </h1>
          <p className="mt-0.5 font-narrow text-[13.5px] text-muted-foreground">
            {requests.data && items.length > 0
              ? runningLine(items)
              : COPY.title}
          </p>
        </div>
        <ReportFaultButton />
      </div>

      <section aria-label={COPY.title} className="mt-6">
        {requests.isPending ? (
          <CardListSkeleton count={4} />
        ) : requests.isError ? (
          <ErrorState
            error={requests.error}
            onRetry={() => void requests.refetch()}
            className="rounded-[7px] border border-border bg-card"
          />
        ) : items.length === 0 ? (
          <EmptyState
            title={COPY.emptyTitle}
            description={COPY.emptyBody}
            action={<ReportFaultButton />}
            className="rounded-[7px] border border-border bg-card"
          />
        ) : (
          <>
            <ul className="flex flex-col gap-2.5">
              {live ? <LiveRequestCard request={live} /> : null}
              {rest.map((request) => (
                <RequestRow key={request.requestId} request={request} />
              ))}
            </ul>
            <Pager
              meta={requests.data.meta}
              onPageChange={setPage}
              className="mt-3.5 border-t border-[#E4E6E6] px-0 pt-3"
            />
          </>
        )}
      </section>
    </main>
  )
}
