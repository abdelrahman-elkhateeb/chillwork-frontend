import { useSearchParams } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"

import { EmptyState } from "@/components/states/empty-state"
import { ErrorState } from "@/components/states/error-state"
import { CardListSkeleton } from "@/components/states/skeletons"
import { useCurrentUser } from "@/features/auth"
import { StaffUserMenu } from "@/features/shell"
import { VisitCard } from "@/features/visits/components/list/visit-card"
import { PhoneHeader } from "@/features/visits/components/shared/phone-header"
import {
  VISITS_EMPTY,
  VISITS_TABS,
} from "@/features/visits/constants/visit-copy.constants"
import {
  useVisits,
  visitsQueryFor,
  type VisitsTab,
} from "@/features/visits/hooks/use-visits"
import type { VisitListItem } from "@/features/visits/types/visit.types"

function isTab(value: string | null): value is VisitsTab {
  return value === "today" || value === "upcoming" || value === "done"
}

/** The one to feature: the visit he is on, else the next one still to start. */
function featuredVisit(visits: VisitListItem[]) {
  const onSite = visits.find((visit) => visit.status === "IN_PROGRESS")
  if (onSite) return { visit: onSite, label: "Now" }
  const next = visits.find((visit) => visit.status === "SCHEDULED")
  return next ? { visit: next, label: "Next" } : null
}

/** His visits only; the filter is three tabs, not a dropdown — one thumb. */
export function MyVisitsPage() {
  const { user } = useCurrentUser()
  const [params, setParams] = useSearchParams()
  const requested = params.get("tab")
  const tab: VisitsTab = isTab(requested) ? requested : "today"

  // All three counts at once, so the tabs can say "Today 3 · Upcoming 5".
  const today = useVisits(visitsQueryFor("today"))
  const upcoming = useVisits(visitsQueryFor("upcoming"))
  const done = useVisits(visitsQueryFor("done"))
  const queries = { today, upcoming, done }
  const current = queries[tab]

  const visits = current.data?.items ?? []
  const featured = tab === "today" ? featuredVisit(visits) : null
  const rest = featured
    ? visits.filter((visit) => visit.id !== featured.visit.id)
    : visits

  return (
    <>
      <PhoneHeader
        title={
          <h1 className="text-[13px] font-bold text-paper-bright">
            My visits
          </h1>
        }
        aside={user ? <StaffUserMenu user={user} /> : null}
      >
        <Tabs
          value={tab}
          onValueChange={(value) =>
            setParams(value === "today" ? {} : { tab: value }, {
              replace: true,
            })
          }
          className="mt-3.5"
        >
          <TabsList className="h-auto w-full gap-[3px] rounded-[5px] bg-paper/8 p-[3px]">
            {VISITS_TABS.map((item) => {
              const total = queries[item.value].data?.meta.total
              return (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="h-9 rounded-[3px] text-[13px] font-semibold text-paper/60 hover:text-paper data-active:bg-primary data-active:font-bold data-active:text-ink data-active:shadow-none"
                >
                  {item.label}
                  {item.value !== "done" && total !== undefined
                    ? ` ${total}`
                    : ""}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </Tabs>
      </PhoneHeader>

      <div className="flex flex-1 flex-col gap-2.5 px-4 py-3.5">
        {current.isPending ? (
          <CardListSkeleton />
        ) : current.isError ? (
          <ErrorState
            error={current.error}
            onRetry={() => void current.refetch()}
          />
        ) : visits.length === 0 ? (
          <EmptyState {...VISITS_EMPTY[tab]} />
        ) : (
          <>
            {featured ? (
              <VisitCard
                visit={featured.visit}
                featured
                featuredLabel={featured.label}
              />
            ) : null}
            {rest.map((visit) => (
              <VisitCard key={visit.id} visit={visit} showDate={tab !== "today"} />
            ))}
          </>
        )}
      </div>
    </>
  )
}
