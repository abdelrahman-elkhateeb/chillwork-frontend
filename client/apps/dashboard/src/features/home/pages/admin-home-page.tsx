import { Link } from "react-router-dom"

import { PageHeader } from "@/components/layout/page-header"
import { SectionLabel } from "@/components/layout/section-label"
import { ErrorState } from "@/components/states/error-state"
import { ROUTES } from "@/config/routes"
import { formatLongDay } from "@/lib/format/dates"
import { useAdminCounts } from "@/features/shell"
import { OutOfStockList } from "@/features/home/components/out-of-stock-list"
import { StatCard } from "@/features/home/components/stat-card"
import { WaitingRequestsTable } from "@/features/home/components/waiting-requests-table"
import { waitingSummary } from "@/features/home/lib/waiting-summary"

/** Only three numbers, and all three come from data the API returns. */
export function AdminHomePage() {
  const counts = useAdminCounts()
  const now = new Date()
  const today = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  }

  if (counts.requests.isError) {
    return (
      <ErrorState
        error={counts.requests.error}
        onRetry={() => void counts.requests.refetch()}
      />
    )
  }

  return (
    <div className="mx-auto max-w-[1180px]">
      <PageHeader
        title={formatLongDay(today)}
        description={waitingSummary(counts.waitingCount)}
      />

      <div className="mt-5 flex flex-col gap-4 sm:flex-row">
        <StatCard
          tone="ink"
          label="Waiting for a visit"
          value={counts.waitingCount}
          caption={
            counts.waitingIsPartial
              ? "among the newest 100 requests"
              : "requests with at least one unscheduled unit"
          }
        />
        <StatCard
          label="Technicians"
          value={counts.activeTechnicianCount}
          aside={
            counts.invitedTechnicianCount > 0 ? (
              <span className="font-narrow text-[15px] font-bold text-primary-deep">
                +{counts.invitedTechnicianCount} invited
              </span>
            ) : null
          }
          caption="active · invited but not yet set up"
        />
        <StatCard
          tone="danger"
          label="Out of stock"
          value={counts.outOfStockCount}
          caption="parts a technician cannot fit today"
        />
      </div>

      <div className="mt-[26px] flex flex-col gap-5 lg:flex-row">
        <section className="min-w-0 flex-1">
          <SectionLabel
            aside={
              <Link
                to={ROUTES.requests}
                className="text-primary-deep hover:text-primary"
              >
                All requests →
              </Link>
            }
          >
            Waiting for a visit
          </SectionLabel>
          <WaitingRequestsTable
            requests={counts.waitingRequests.slice(0, 8)}
            isLoading={counts.requests.isPending}
          />
        </section>

        <section className="w-full shrink-0 lg:w-[282px]">
          <SectionLabel
            aside={
              <Link
                to={ROUTES.parts}
                className="text-primary-deep hover:text-primary"
              >
                Parts →
              </Link>
            }
          >
            Out of stock
          </SectionLabel>
          <OutOfStockList
            parts={counts.outOfStock.data?.items ?? []}
            isLoading={counts.outOfStock.isPending}
          />
        </section>
      </div>
    </div>
  )
}
