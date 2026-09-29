import { Link } from "react-router-dom"
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

import { EmptyState } from "@/components/states/empty-state"
import { TableSkeleton } from "@/components/states/skeletons"
import { ROUTES, pathTo } from "@/config/routes"
import type { AdminRequestListItem } from "@/features/requests"

type Props = {
  requests: AdminRequestListItem[]
  isLoading: boolean
}

/** "Unscheduled" counts units, not requests — "1 of 3" still needs two. */
export function WaitingRequestsTable({ requests, isLoading }: Props) {
  return (
    <Card className="gap-0 rounded-[6px]">
      {isLoading ? (
        <TableSkeleton rows={4} />
      ) : requests.length === 0 ? (
        <EmptyState
          title="Nothing is waiting"
          description="Every unit on every request has a visit booked."
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Request</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden lg:table-cell">Where</TableHead>
              <TableHead className="w-[110px]">Unscheduled</TableHead>
              <TableHead className="w-[130px]">
                <span className="sr-only">Action</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.requestId}>
                <TableCell className="font-mono text-[12px] font-semibold">
                  <Link
                    to={pathTo(ROUTES.request, {
                      requestId: request.requestId,
                    })}
                    className="text-foreground hover:text-primary-deep"
                  >
                    {request.reference}
                  </Link>
                </TableCell>
                <TableCell className="font-semibold">
                  {request.customer.name}
                </TableCell>
                <TableCell className="hidden max-w-[220px] truncate text-muted-foreground lg:table-cell">
                  {request.address}
                </TableCell>
                <TableCell className="font-mono text-[12.5px] font-semibold text-[#8E1913]">
                  {request.unscheduledDeviceCount} of {request.deviceCount}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    asChild
                    className="h-[34px] px-[13px] font-sans text-[13px] font-semibold"
                  >
                    <Link
                      to={pathTo(ROUTES.scheduleVisit, {
                        requestId: request.requestId,
                      })}
                    >
                      Schedule visit
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  )
}
