import { Link } from "react-router-dom"
import { Badge } from "@workspace/ui/components/badge"
import { Card } from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"

import { ROUTES, pathTo } from "@/config/routes"
import type { AdminPart } from "@/features/parts"

type Props = {
  parts: AdminPart[]
  isLoading: boolean
}

/** Parts a technician cannot fit today. */
export function OutOfStockList({ parts, isLoading }: Props) {
  return (
    <Card className="gap-0 rounded-[6px] px-3.5 pt-1 pb-2">
      {isLoading ? (
        <div className="flex flex-col gap-3 py-3">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-3.5 w-24" />
        </div>
      ) : parts.length === 0 ? (
        <p className="py-3 font-narrow text-[13px] text-muted-foreground">
          Everything in the catalog is on the shelf.
        </p>
      ) : (
        <ul>
          {parts.slice(0, 6).map((part) => (
            <li
              key={part.id}
              className="border-b border-[#EDEEEE] py-3 last:border-b-0"
            >
              <div className="flex items-center justify-between gap-3">
                <Link
                  to={pathTo(ROUTES.part, { partId: part.id })}
                  className="min-w-0 truncate text-[13.5px] font-semibold text-foreground hover:text-primary-deep"
                >
                  {part.name}
                </Link>
                <Badge variant="blocked" className="px-[7px] py-0.5">
                  None
                </Badge>
              </div>
              {part.description ? (
                <div className="mt-1 truncate font-narrow text-[12.5px] text-muted-foreground">
                  {part.description}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
