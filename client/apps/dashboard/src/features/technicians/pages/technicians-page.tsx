import { Link, useNavigate } from "react-router-dom"
import { Button } from "@workspace/ui/components/button"
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
import { usePageParams } from "@/lib/use-page-params"
import { TechnicianStandingBadge } from "@/features/technicians/components/standing-badge"
import { TechnicianAvatar } from "@/features/technicians/components/technician-avatar"
import { useTechnicians } from "@/features/technicians/hooks/use-technicians"
import { technicianStanding } from "@/features/technicians/lib/technician-standing"

const PAGE_SIZE = 20

function AddTechnicianButton() {
  return (
    <Button asChild className="h-10 px-4 text-[13.5px] font-semibold">
      <Link to={ROUTES.newTechnician}>Add a technician</Link>
    </Button>
  )
}

export function TechniciansPage() {
  const navigate = useNavigate()
  const { search, page, setSearch, setPage } = usePageParams()
  const technicians = useTechnicians({
    search: search || undefined,
    page,
    pageSize: PAGE_SIZE,
  })
  const items = technicians.data?.items ?? []

  return (
    <div className="mx-auto max-w-[900px]">
      <PageHeader
        title="Technicians"
        description="Who can be sent out, who is still setting up, and who has stopped."
        actions={<AddTechnicianButton />}
      />

      <Card className="mt-5 gap-0 rounded-[8px]">
        <div className="border-b border-[#E4E6E6] px-[18px] py-3.5">
          <SearchField
            label="Search technicians"
            placeholder="Name or email"
            value={search}
            onChange={setSearch}
          />
        </div>

        {technicians.isPending ? (
          <TableSkeleton />
        ) : technicians.isError ? (
          <ErrorState
            error={technicians.error}
            onRetry={() => void technicians.refetch()}
          />
        ) : items.length === 0 ? (
          search ? (
            <NoMatchState
              query={search}
              hint="Try part of a name or an email address."
              onClear={() => setSearch("")}
            />
          ) : (
            <EmptyState
              title="No technicians yet"
              description="Add the first one and send them the link to set up their account."
              action={<AddTechnicianButton />}
            />
          )
        ) : (
          <>
            <Table
              className={cn(technicians.isPlaceholderData && "opacity-60")}
            >
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Standing</TableHead>
                  <TableHead className="text-center">Open visits</TableHead>
                  <TableHead>
                    <span className="sr-only">Open</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((technician) => {
                  const href = pathTo(ROUTES.technician, {
                    technicianId: technician.id,
                  })
                  return (
                    <TableRow
                      key={technician.id}
                      onClick={() => navigate(href)}
                      className={cn(
                        "cursor-pointer hover:bg-[#F5F6F6]",
                        technician.status === "INVITED" &&
                          "bg-[#FFF3EC] hover:bg-[#FFEBDF]"
                      )}
                    >
                      <TableCell className="py-[13px]">
                        <div className="flex items-center gap-2.5">
                          <TechnicianAvatar
                            name={technician.name}
                            status={technician.status}
                          />
                          <div className="min-w-0">
                            <div className="font-sans text-[14px] font-semibold">
                              {technician.name}
                            </div>
                            <div className="truncate text-[12.5px] text-muted-foreground">
                              {technician.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <TechnicianStandingBadge
                          standing={technicianStanding(technician)}
                        />
                      </TableCell>
                      <TableCell className="text-center font-mono text-[13px]">
                        {technician.activeVisitCount}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          to={href}
                          onClick={(event) => event.stopPropagation()}
                          className="font-sans text-[12.5px] font-bold text-primary-deep hover:text-primary"
                        >
                          Open
                        </Link>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            {technicians.data ? (
              <Pager
                meta={technicians.data.meta}
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
