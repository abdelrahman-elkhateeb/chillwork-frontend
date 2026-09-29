import { useState, type ReactNode } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "@workspace/ui/components/button"
import { Card, CardHeader, CardTitle } from "@workspace/ui/components/card"

import { FormAlert } from "@/components/form/form-alert"
import { DetailSkeleton } from "@/components/states/skeletons"
import { ErrorState } from "@/components/states/error-state"
import { NotFoundState } from "@/components/states/not-found-state"
import { ROUTES, pathTo } from "@/config/routes"
import { hasErrorCode } from "@/lib/api/api-error"
import { API_ERROR_CODES } from "@/lib/api/api.constants"
import { useCompanySettings } from "@/features/settings"
import { PartForm } from "@/features/parts/components/part-form"
import { StockMoveCard } from "@/features/parts/components/stock-move-card"
import {
  useAdminPart,
  useCreatePart,
  useUpdatePart,
} from "@/features/parts/hooks/use-parts"
import type { AdminPart } from "@/features/parts/types/part.types"

function BackLink() {
  return (
    <Link
      to={ROUTES.parts}
      className="font-narrow text-[13px] font-bold text-primary-deep hover:text-primary"
    >
      ← Parts
    </Link>
  )
}

function FormCard({
  title,
  aside,
  children,
}: {
  title: string
  aside?: string
  children: ReactNode
}) {
  return (
    <Card className="gap-0 rounded-[8px]">
      <CardHeader className="px-4 py-[13px]">
        <CardTitle className="font-heading text-[13px] font-bold tracking-[-0.01em] uppercase">
          {title}
        </CardTitle>
        {aside ? (
          <span className="font-mono text-[11px] text-[#8A9093]">{aside}</span>
        ) : null}
      </CardHeader>
      {children}
    </Card>
  )
}

function BillingNotSetUp() {
  return (
    <FormAlert
      tone="info"
      title="Set the currency first"
      description={
        <>
          Parts are priced in the company currency, which isn't set yet.{" "}
          <Link to={ROUTES.settings} className="font-semibold underline">
            Open company settings
          </Link>
        </>
      }
    />
  )
}

/** `/parts/new` */
export function NewPartPage() {
  const navigate = useNavigate()
  const settings = useCompanySettings()
  const create = useCreatePart()
  const currency = settings.data?.currency ?? null

  return (
    <div className="mx-auto flex max-w-[480px] flex-col gap-3">
      <BackLink />
      {settings.data && !currency ? <BillingNotSetUp /> : null}
      <FormCard title="Add a part">
        <PartForm
          currency={currency}
          pending={create.isPending}
          error={create.error}
          onSubmit={(values) =>
            create.mutateAsync(
              {
                name: values.name,
                description: values.description,
                unitPriceMinor: values.price,
                stockQuantity: values.startingStock,
              },
              {
                onSuccess: (part) =>
                  navigate(pathTo(ROUTES.part, { partId: part.id }), {
                    replace: true,
                  }),
              }
            )
          }
        />
      </FormCard>
    </div>
  )
}

function EditPart({ part }: { part: AdminPart }) {
  const update = useUpdatePart(part.id)
  const [movingStock, setMovingStock] = useState(false)
  const billingMissing = hasErrorCode(
    update.error,
    API_ERROR_CODES.BILLING_NOT_CONFIGURED
  )

  return (
    <div className="mx-auto grid max-w-[980px] gap-5 lg:grid-cols-[440px_1fr] lg:items-start">
      <div className="flex flex-col gap-3 lg:col-span-2">
        <BackLink />
        {billingMissing ? <BillingNotSetUp /> : null}
      </div>

      <FormCard title="Edit a part">
        <PartForm
          key={part.id}
          part={part}
          currency={part.currency}
          pending={update.isPending}
          error={update.error}
          saved={update.isSuccess}
          onSubmit={(values) =>
            update.mutateAsync({
              name: values.name,
              description: values.description,
              unitPriceMinor: values.price,
            })
          }
          shelf={
            <div className="mt-4 rounded-[5px] border border-border bg-[#F2F3F3] px-[13px] py-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold">On the shelf</span>
                <span className="font-mono text-[18px] font-semibold">
                  {part.stockQuantity}
                </span>
              </div>
              <p className="mt-1 font-narrow text-[12.5px] leading-[1.5] text-muted-foreground">
                Not editable on this form. Stock is moved, never typed over —
                so there is always a reason attached to every change.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => setMovingStock(true)}
                className="mt-2.5 h-10 w-full bg-white text-[13.5px] font-semibold lg:hidden"
              >
                Adjust the stock
              </Button>
            </div>
          }
        />
        <div className="border-t border-[#E4E6E6] px-4 py-3">
          <Button
            type="button"
            variant="ghost"
            disabled={update.isPending}
            onClick={() => update.mutate({ isActive: !part.isActive })}
            className="h-9 px-2 text-[13px] font-semibold text-muted-foreground"
          >
            {part.isActive
              ? "Hide it from technicians (parts are never deleted)"
              : "Show it to technicians again"}
          </Button>
        </div>
      </FormCard>

      <div className={movingStock ? "block" : "hidden lg:block"}>
        <StockMoveCard part={part} />
      </div>
    </div>
  )
}

/** `/parts/:partId` */
export function PartPage() {
  const { partId = "" } = useParams()
  const { part, ...query } = useAdminPart(partId)

  if (query.isPending) {
    return (
      <Card className="mx-auto max-w-[480px] rounded-[8px]">
        <DetailSkeleton />
      </Card>
    )
  }

  if (query.isError) {
    return (
      <ErrorState error={query.error} onRetry={() => void query.refetch()} />
    )
  }

  if (!part) {
    return (
      <NotFoundState
        title="No such part"
        backTo={ROUTES.parts}
        backLabel="Back to parts"
      />
    )
  }

  return <EditPart part={part} />
}
