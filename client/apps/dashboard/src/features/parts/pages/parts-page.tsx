import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Badge } from "@workspace/ui/components/badge"
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
import { formatMoney } from "@/lib/format/money"
import { usePageParams } from "@/lib/use-page-params"
import { StockCell } from "@/features/parts/components/stock-cell"
import { useAdminParts } from "@/features/parts/hooks/use-parts"

const PAGE_SIZE = 20

function AddPartButton() {
  return (
    <Button asChild className="h-10 px-4 text-[13.5px] font-semibold">
      <Link to={ROUTES.newPart}>Add a part</Link>
    </Button>
  )
}

export function PartsPage() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const { search, page, setSearch, setPage } = usePageParams()
  const noneLeftOnly = params.get("stock") === "none"

  const parts = useAdminParts({
    q: search || undefined,
    available: noneLeftOnly ? false : undefined,
    page,
    pageSize: PAGE_SIZE,
  })
  const noneLeft = useAdminParts({ available: false, page: 1, pageSize: 1 })
  const noneLeftCount = noneLeft.data?.meta.total ?? 0
  const items = parts.data?.items ?? []

  const toggleNoneLeft = () => {
    setParams((current) => {
      const updated = new URLSearchParams(current)
      if (noneLeftOnly) updated.delete("stock")
      else updated.set("stock", "none")
      updated.delete("page")
      return updated
    })
  }

  return (
    <div className="mx-auto max-w-[900px]">
      <PageHeader
        title="Parts"
        description="The shelf: what each part costs and how many are left. Stock never goes below zero."
        actions={<AddPartButton />}
      />

      <Card className="mt-5 gap-0 rounded-[8px]">
        <div className="flex flex-wrap items-center gap-2.5 border-b border-[#E4E6E6] px-[18px] py-[13px]">
          <SearchField
            label="Search parts"
            placeholder="Part name"
            value={search}
            onChange={setSearch}
            className="min-w-[200px] flex-1"
          />
          <Button
            type="button"
            variant="outline"
            aria-pressed={noneLeftOnly}
            onClick={toggleNoneLeft}
            className={cn(
              "h-10 border-destructive/40 px-[13px] font-narrow text-[13px] font-bold tracking-[0.05em] text-[#8E1913] uppercase",
              noneLeftOnly ? "bg-destructive/10" : "bg-hatch"
            )}
          >
            None left: {noneLeftCount}
          </Button>
        </div>

        {parts.isPending ? (
          <TableSkeleton />
        ) : parts.isError ? (
          <ErrorState error={parts.error} onRetry={() => void parts.refetch()} />
        ) : items.length === 0 ? (
          search || noneLeftOnly ? (
            <NoMatchState
              query={search || "none left"}
              hint={
                noneLeftOnly
                  ? "Every part matching this is on the shelf."
                  : "Try part of the name."
              }
              onClear={() => {
                setSearch("")
                if (noneLeftOnly) toggleNoneLeft()
              }}
            />
          ) : (
            <EmptyState
              title="No parts yet"
              description="Add the parts your technicians fit, with the price the customer pays."
              action={<AddPartButton />}
            />
          )
        ) : (
          <>
            <Table className={cn(parts.isPlaceholderData && "opacity-60")}>
              <TableHeader>
                <TableRow>
                  <TableHead>Part</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-center">On the shelf</TableHead>
                  <TableHead>
                    <span className="sr-only">Edit</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((part) => {
                  const href = pathTo(ROUTES.part, { partId: part.id })
                  return (
                    <TableRow
                      key={part.id}
                      onClick={() => navigate(href)}
                      className={cn(
                        "cursor-pointer hover:bg-[#F5F6F6]",
                        part.stockQuantity === 1 &&
                          "bg-[#FFF3EC] hover:bg-[#FFEBDF]",
                        !part.isActive && "text-muted-foreground"
                      )}
                    >
                      <TableCell className="font-sans text-[14px] font-semibold whitespace-normal">
                        <span className="inline-flex flex-wrap items-center gap-2">
                          {part.name}
                          {!part.isActive ? (
                            <Badge
                              variant="excluded"
                              className="px-1.5 py-0.5 text-[10.5px]"
                            >
                              Hidden
                            </Badge>
                          ) : null}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-mono text-[13px]">
                        {formatMoney(part.unitPriceMinor, part.currency)}
                      </TableCell>
                      <TableCell className="text-center">
                        <StockCell quantity={part.stockQuantity} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          to={href}
                          onClick={(event) => event.stopPropagation()}
                          className="font-sans text-[12.5px] font-bold text-primary-deep hover:text-primary"
                        >
                          Edit
                        </Link>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            {parts.data ? (
              <Pager
                meta={parts.data.meta}
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
