import { Link, useNavigate } from "react-router-dom"
import { Card } from "@workspace/ui/components/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { cn } from "@workspace/ui/lib/utils"

import { SearchField } from "@/components/form/search-field"
import { PageHeader } from "@/components/layout/page-header"
import { EmptyState } from "@/components/states/empty-state"
import { ErrorState } from "@/components/states/error-state"
import { NoMatchState } from "@/components/states/no-match-state"
import { Pager } from "@/components/states/pager"
import { TableSkeleton } from "@/components/states/skeletons"
import { ROUTES, pathTo } from "@/config/routes"
import { formatCameIn } from "@/lib/format/dates"
import { usePageParams } from "@/lib/use-page-params"
import { StandingBadge } from "@/features/requests/components/standing-badge"
import { useAdminRequests } from "@/features/requests/hooks/use-admin-requests"
import { listStanding } from "@/features/requests/lib/request-standing"

const PAGE_SIZE = 20

export function AdminRequestsPage() {
  const navigate = useNavigate()
  const { search, page, setSearch, setPage } = usePageParams()
  const requests = useAdminRequests({
    search: search || undefined,
    page,
    pageSize: PAGE_SIZE,
  })

  const items = requests.data?.items ?? []

  return (
    <div className="mx-auto max-w-[1180px]">
      <PageHeader
        title="Requests"
        description="Every request that came in, newest first."
      />

      <Card className="mt-5 gap-0 rounded-[8px]">
        <div className="border-b border-[#E4E6E6] px-[18px] py-3.5">
          <SearchField
            label="Search requests"
            placeholder="Name, phone or request number"
            value={search}
            onChange={setSearch}
          />
        </div>

        {requests.isPending ? (
          <TableSkeleton />
        ) : requests.isError ? (
          <ErrorState
            error={requests.error}
            onRetry={() => void requests.refetch()}
          />
        ) : items.length === 0 ? (
          search ? (
            <NoMatchState
              query={search}
              hint="Try part of a name, a phone number, or the start of the request number."
              onClear={() => setSearch("")}
            />
          ) : (
            <EmptyState
              title="No requests yet"
              description="When a customer reports a fault it shows up here with its number."
            />
          )
        ) : (
          <>
            <Table
              className={cn(requests.isPlaceholderData && "opacity-60")}
            >
              <TableHeader>
                <TableRow>
                  <TableHead>Request</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden lg:table-cell">Where</TableHead>
                  <TableHead className="text-center">Units</TableHead>
                  <TableHead>Where it stands</TableHead>
                  <TableHead className="hidden text-right md:table-cell">
                    Came in
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((request) => {
                  const standing = listStanding(request)
                  const href = pathTo(ROUTES.request, {
                    requestId: request.requestId,
                  })
                  return (
                    <TableRow
                      key={request.requestId}
                      onClick={() => navigate(href)}
                      className={cn(
                        "cursor-pointer hover:bg-[#F5F6F6]",
                        standing.tone === "attention" &&
                          "bg-[#FFF3EC] hover:bg-[#FFEBDF]"
                      )}
                    >
                      <TableCell>
                        <Link
                          to={href}
                          onClick={(event) => event.stopPropagation()}
                          className="font-mono text-[13px] font-semibold text-foreground hover:text-primary-deep"
                        >
                          {request.reference}
                        </Link>
                      </TableCell>
                      <TableCell className="font-sans text-[14px] font-semibold">
                        {request.customer.name}
                      </TableCell>
                      <TableCell className="hidden max-w-[220px] truncate text-muted-foreground lg:table-cell">
                        {request.address}
                      </TableCell>
                      <TableCell className="text-center font-mono text-[13px]">
                        {request.deviceCount}
                      </TableCell>
                      <TableCell>
                        <StandingBadge standing={standing} />
                      </TableCell>
                      <TableCell className="hidden text-right text-[13px] text-muted-foreground md:table-cell">
                        {formatCameIn(request.createdAt)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            {requests.data ? (
              <Pager
                meta={requests.data.meta}
                onPageChange={setPage}
                className="border-t border-[#E4E6E6]"
              />
            ) : null}
          </>
        )}
      </Card>
    </div>
  )
}
