import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { SearchIcon } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { cn } from "@workspace/ui/lib/utils"

import { FormAlert } from "@/components/form/form-alert"
import { SubmitButton } from "@/components/form/submit-button"
import { Eyebrow } from "@/components/layout/eyebrow"
import { HatchedNote } from "@/components/layout/hatched-note"
import { ErrorState } from "@/components/states/error-state"
import { CardListSkeleton } from "@/components/states/skeletons"
import { STATE_COPY } from "@/components/states/state-copy.constants"
import { ROUTES, pathTo } from "@/config/routes"
import { hasErrorCode, isNotFoundError } from "@/lib/api/api-error"
import { API_ERROR_CODES } from "@/lib/api/api.constants"
import { formatMoney } from "@/lib/format/money"
import type { CatalogPart } from "@/features/parts"
import { usePricing } from "@/features/settings"
import { unitName } from "@/features/visits/lib/unit-name"
import { QuantityStepper } from "@/features/visits/components/parts/quantity-stepper"
import { ScreenBody } from "@/features/visits/components/shared/screen-body"
import { ScreenHeader } from "@/features/visits/components/shared/screen-header"
import { UnitTotals } from "@/features/visits/components/shared/unit-totals"
import { VisitNotFound } from "@/features/visits/components/shared/visit-not-found"
import { useSetDeviceParts } from "@/features/visits/hooks/use-visit-mutations"
import {
  useCatalogParts,
  useVisit,
  useVisitParts,
} from "@/features/visits/hooks/use-visits"
import { stockErrorsByPart } from "@/features/visits/lib/stock-errors"
import type {
  DeviceParts,
  VisitDetailDevice,
} from "@/features/visits/types/visit.types"

type Pick = {
  partId: string
  name: string
  unitPriceMinor: number
  quantity: number
}

/** Open picks are the ones not yet decided (PROPOSED, or legacy items). */
function openPicks(parts: DeviceParts | undefined): Pick[] {
  return (parts?.items ?? [])
    .filter((item) => item.decision === "PROPOSED" || item.decision === null)
    .map((item) => ({
      partId: item.partId,
      name: item.name,
      unitPriceMinor: item.unitPriceMinor,
      quantity: item.quantity,
    }))
}

type EditorProps = {
  visitId: string
  device: VisitDetailDevice
  parts: DeviceParts | undefined
}

function PartsEditor({ visitId, device, parts }: EditorProps) {
  const navigate = useNavigate()
  const [picks, setPicks] = useState<Pick[]>(() => openPicks(parts))
  const [search, setSearch] = useState("")
  const [sentIds, setSentIds] = useState<string[]>([])
  const catalog = useCatalogParts(search.trim())
  const pricing = usePricing()
  const save = useSetDeviceParts(visitId, device.clientDeviceId)

  const decided = (parts?.items ?? []).filter(
    (item) => item.decision === "APPROVED" || item.decision === "REJECTED"
  )
  const approvedMinor = decided
    .filter((item) => item.decision === "APPROVED")
    .reduce((sum, item) => sum + item.lineTotalMinor, 0)
  const pickedMinor = picks.reduce(
    (sum, pick) => sum + pick.unitPriceMinor * pick.quantity,
    0
  )
  const stockErrors = stockErrorsByPart(save.error, sentIds)
  const conflict = hasErrorCode(save.error, API_ERROR_CODES.VERSION_CONFLICT)

  const setQuantity = (partId: string, quantity: number) => {
    setPicks((current) =>
      quantity < 1
        ? current.filter((pick) => pick.partId !== partId)
        : current.map((pick) =>
            pick.partId === partId ? { ...pick, quantity } : pick
          )
    )
  }

  const add = (part: CatalogPart) => {
    setPicks((current) =>
      current.some((pick) => pick.partId === part.id)
        ? current
        : [
            ...current,
            {
              partId: part.id,
              name: part.name,
              unitPriceMinor: part.unitPriceMinor,
              quantity: 1,
            },
          ]
    )
  }

  const submit = () => {
    const items = picks.map(({ partId, quantity }) => ({ partId, quantity }))
    setSentIds(items.map((item) => item.partId))
    save.mutate(
      { items, version: parts?.version ?? 0 },
      {
        onSuccess: (saved) => {
          const waiting = saved.items.some(
            (item) => item.decision === "PROPOSED"
          )
          const params = { visitId, deviceId: device.clientDeviceId }
          navigate(
            waiting
              ? pathTo(ROUTES.approveParts, params)
              : pathTo(ROUTES.visit, { visitId })
          )
        },
      }
    )
  }

  // Someone else saved this unit's parts meanwhile: start again from
  // theirs (the query has already refetched them).
  const reloadSaved = () => {
    setPicks(openPicks(parts))
    save.reset()
  }

  const catalogItems = (catalog.data?.items ?? []).filter(
    (part) => !picks.some((pick) => pick.partId === part.id)
  )
  const currency =
    pricing.data?.currency ?? catalog.data?.items[0]?.currency ?? null

  return (
    <>
      <ScreenHeader
        backTo={pathTo(ROUTES.visit, { visitId })}
        width="wide"
        title={
          <h1 className="text-center font-narrow text-[13px] font-bold tracking-normal text-paper-bright normal-case">
            {unitName(device)}
          </h1>
        }
        aside={
          <span className="font-mono text-[11.5px] text-paper/50">
            {device.clientDeviceId}
          </span>
        }
      >
        {/* From `lg` it sits over the catalog column it searches. */}
        <div className="relative mt-3 lg:ml-auto lg:w-[calc(50%-12px)]">
          <SearchIcon
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-paper/50"
          />
          <Input
            type="search"
            aria-label="Search the catalog"
            placeholder="Search the catalog"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-11 rounded-[5px] border-transparent bg-paper/10 pl-9 font-narrow text-[13.5px] text-paper placeholder:text-paper/50 focus-visible:bg-paper/14"
          />
        </div>
      </ScreenHeader>

      {/*
        One column on a phone: picked, catalog, totals. From `lg` the picked
        parts and the totals stack on the left and the catalog runs down the
        right, so adding a part never scrolls the button away.
      */}
      <ScreenBody
        width="wide"
        className="flex flex-col gap-[9px] py-[13px] md:py-5 lg:grid lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-6"
      >
        <div className="flex flex-col gap-[9px] lg:col-start-1 lg:row-start-1">
          {conflict ? (
            <div className="flex flex-col gap-2">
              <FormAlert
                tone="info"
                title="These parts changed meanwhile"
                description="Someone saved this unit's parts a moment ago. Nothing of yours was saved."
              />
              <Button
                type="button"
                variant="outline"
                onClick={reloadSaved}
                className="h-11 bg-white text-[14px] font-semibold"
              >
                Start from the saved list
              </Button>
            </div>
          ) : save.isError && Object.keys(stockErrors).length === 0 ? (
            <FormAlert tone="error" {...STATE_COPY.saveFailed} />
          ) : null}

          {picks.length > 0 ? (
            <Eyebrow>Picked for this unit</Eyebrow>
          ) : decided.length === 0 ? (
            // On a phone the catalog is right underneath; beside it, the
            // empty column needs to say what goes there.
            <div className="hidden lg:block">
              <Eyebrow>Picked for this unit</Eyebrow>
              <p className="mt-[9px] rounded-[6px] border border-dashed border-line-strong px-[13px] py-3 font-narrow text-[13px] text-muted-foreground">
                Nothing picked yet. Add parts from the catalog.
              </p>
            </div>
          ) : null}
          {picks.map((pick) => {
            const stockError = stockErrors[pick.partId]
            return (
              <Card
                key={pick.partId}
                className={cn(
                  "gap-0 rounded-[6px] px-[13px] py-3",
                  stockError && "border-[#C9A24A]"
                )}
              >
                <div className="flex items-start justify-between gap-2.5">
                  <div className="min-w-0">
                    <div className="text-[14px] font-semibold">{pick.name}</div>
                    <div className="mt-0.5 font-mono text-[11.5px] text-muted-foreground">
                      {formatMoney(pick.unitPriceMinor, currency)} each
                    </div>
                  </div>
                  <QuantityStepper
                    label={`How many ${pick.name}`}
                    value={pick.quantity}
                    invalid={Boolean(stockError)}
                    onChange={(quantity) => setQuantity(pick.partId, quantity)}
                  />
                </div>
                {stockError ? (
                  <HatchedNote tone="red" title={stockError} className="mt-2.5">
                    Take fewer, or call the office.
                  </HatchedNote>
                ) : (
                  <div className="mt-2.5 flex justify-end border-t border-[#E4E6E6] pt-[9px] font-mono text-[13px] font-semibold">
                    {formatMoney(pick.unitPriceMinor * pick.quantity, currency)}
                  </div>
                )}
              </Card>
            )
          })}

          {decided.length > 0 ? (
            <>
              <Eyebrow className={cn(picks.length > 0 && "mt-2")}>
                Already answered
              </Eyebrow>
              {decided.map((item) => (
                <div
                  key={item.proposalId ?? item.partId}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-[6px] border px-[13px] py-2.5",
                    item.decision === "APPROVED"
                      ? "border-l-[3px] border-[#17876A]/40 border-l-[#17876A] bg-card"
                      : "border-destructive/35 bg-hatch"
                  )}
                >
                  <div className="min-w-0">
                    <div className="truncate text-[13.5px] font-semibold">
                      {item.name}
                    </div>
                    <div className="font-mono text-[11.5px] text-muted-foreground">
                      × {item.quantity}
                    </div>
                  </div>
                  <Badge
                    variant={
                      item.decision === "APPROVED" ? "success" : "blocked"
                    }
                    className="px-[7px] py-0.5"
                  >
                    {item.decision === "APPROVED" ? "Approved" : "Refused"}
                  </Badge>
                </div>
              ))}
            </>
          ) : null}
        </div>

        <div className="flex flex-col gap-[9px] lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <Eyebrow className="mt-2 lg:mt-0">
            {search.trim() ? "Matching parts" : "From the catalog"}
          </Eyebrow>
          {catalog.isPending ? (
            <CardListSkeleton count={2} />
          ) : catalogItems.length === 0 ? (
            <p className="font-narrow text-[13px] text-muted-foreground">
              {search.trim()
                ? `Nothing in the catalog matches “${search.trim()}”.`
                : "Nothing else in the catalog."}
            </p>
          ) : (
            catalogItems.map((part) => (
              <Card
                key={part.id}
                className={cn(
                  "flex-row items-center justify-between gap-3 rounded-[6px] px-[13px] py-2.5",
                  !part.inStock && "opacity-75"
                )}
              >
                <div className="min-w-0">
                  <div className="truncate text-[14px] font-semibold">
                    {part.name}
                  </div>
                  <div className="font-mono text-[11.5px] text-muted-foreground">
                    {formatMoney(part.unitPriceMinor, part.currency)} each
                  </div>
                </div>
                {part.inStock ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => add(part)}
                    className="h-10 bg-white px-4 text-[13.5px] font-semibold"
                  >
                    Add
                  </Button>
                ) : (
                  <Badge variant="blocked" className="px-[9px] py-1">
                    None
                  </Badge>
                )}
              </Card>
            ))
          )}
        </div>

        <div className="flex flex-col gap-[9px] lg:col-start-1 lg:row-start-2">
          <div className="mt-3">
            <UnitTotals
              partsLabel="Parts for this unit"
              partsMinor={approvedMinor + pickedMinor}
              laborLabel="Plus labour, if it is fixed"
              laborFeeMinor={pricing.data?.laborFeeMinor ?? null}
              currency={currency}
            />
          </div>

          <SubmitButton
            type="button"
            onClick={submit}
            pending={save.isPending}
            pendingLabel="Saving…"
            className="mt-1 h-[52px] text-[15px]"
          >
            {picks.length > 0
              ? "Show the customer these prices"
              : "Save — no parts"}
          </SubmitButton>
          <p className="text-center font-narrow text-[12px] leading-[1.45] text-muted-foreground">
            The customer approves each part before anything is fitted. Stock
            moves when the invoice is issued.
          </p>
        </div>
      </ScreenBody>
    </>
  )
}

/** `/visits/:visitId/units/:deviceId/parts` */
export function DevicePartsPage() {
  const { visitId = "", deviceId = "" } = useParams()
  const visit = useVisit(visitId)
  const parts = useVisitParts(visitId)

  if (visit.isPending || parts.isPending) {
    return (
      <>
        <ScreenHeader
          backTo={pathTo(ROUTES.visit, { visitId })}
          title=" "
          width="wide"
        />
        <ScreenBody width="wide" className="py-4">
          <CardListSkeleton count={2} />
        </ScreenBody>
      </>
    )
  }

  const device = visit.data?.devices.find(
    (item) => item.clientDeviceId === deviceId
  )

  if (isNotFoundError(visit.error) || (visit.data && !device)) {
    return (
      <>
        <ScreenHeader backTo={ROUTES.visits} title=" " width="wide" />
        <VisitNotFound />
      </>
    )
  }

  if (visit.isError || parts.isError || !device) {
    return (
      <>
        <ScreenHeader
          backTo={pathTo(ROUTES.visit, { visitId })}
          title=" "
          width="wide"
        />
        <ErrorState
          error={visit.error ?? parts.error}
          onRetry={() => {
            void visit.refetch()
            void parts.refetch()
          }}
        />
      </>
    )
  }

  if (!visit.data.allowedActions.includes("SELECT_PARTS")) {
    return (
      <>
        <ScreenHeader backTo={pathTo(ROUTES.visit, { visitId })} title=" " />
        <ScreenBody className="py-4">
          <HatchedNote title="Parts can't be changed now">
            Parts are picked while the visit is on site, and until the invoice
            is issued.
          </HatchedNote>
        </ScreenBody>
      </>
    )
  }

  return (
    <PartsEditor
      key={deviceId}
      visitId={visitId}
      device={device}
      parts={parts.data.devices.find((d) => d.clientDeviceId === deviceId)}
    />
  )
}
