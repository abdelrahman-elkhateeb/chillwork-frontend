import { useState, type ReactNode } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"

import { FormAlert } from "@/components/form/form-alert"
import { Eyebrow } from "@/components/layout/eyebrow"
import { DetailSkeleton } from "@/components/states/skeletons"
import { ErrorState } from "@/components/states/error-state"
import { NotFoundState } from "@/components/states/not-found-state"
import { STATE_COPY } from "@/components/states/state-copy.constants"
import { ROUTES } from "@/config/routes"
import { firstName } from "@/lib/format/names"
import { ActivationLinkCard } from "@/features/technicians/components/activation-link-card"
import { EditTechnicianForm } from "@/features/technicians/components/edit-technician-form"
import { TechnicianStandingBadge } from "@/features/technicians/components/standing-badge"
import { StopTechnicianDialog } from "@/features/technicians/components/stop-technician-dialog"
import { TechnicianAvatar } from "@/features/technicians/components/technician-avatar"
import {
  useReissueInvitation,
  useUpdateTechnician,
} from "@/features/technicians/hooks/use-technician-mutations"
import { useTechnician } from "@/features/technicians/hooks/use-technicians"
import { technicianStanding } from "@/features/technicians/lib/technician-standing"

function ActionCard({
  title,
  body,
  children,
}: {
  title: string
  body: string
  children: ReactNode
}) {
  return (
    <div className="rounded-[6px] border border-border px-3.5 py-[13px]">
      <div className="text-[13.5px] font-bold">{title}</div>
      <p className="mt-1 font-narrow text-[12.5px] leading-[1.5] text-muted-foreground">
        {body}
      </p>
      <div className="mt-[11px]">{children}</div>
    </div>
  )
}

export function TechnicianPage() {
  const { technicianId = "" } = useParams()
  const { technician, ...query } = useTechnician(technicianId)
  const update = useUpdateTechnician(technicianId)
  const reissue = useReissueInvitation(technicianId)
  const [editing, setEditing] = useState(false)

  if (query.isPending) {
    return (
      <Card className="mx-auto max-w-[620px] rounded-[8px]">
        <DetailSkeleton />
      </Card>
    )
  }

  if (query.isError) {
    return (
      <ErrorState error={query.error} onRetry={() => void query.refetch()} />
    )
  }

  if (!technician) {
    return (
      <NotFoundState
        title="No such technician"
        backTo={ROUTES.technicians}
        backLabel="Back to technicians"
      />
    )
  }

  const name = firstName(technician.name)

  return (
    <div className="mx-auto flex max-w-[620px] flex-col gap-3">
      <Link
        to={ROUTES.technicians}
        className="font-narrow text-[13px] font-bold text-primary-deep hover:text-primary"
      >
        ← Technicians
      </Link>

      <Card className="gap-0 rounded-[8px]">
        <div className="flex flex-wrap items-center gap-3 border-b border-[#E4E6E6] px-[18px] py-4">
          <TechnicianAvatar
            name={technician.name}
            status={technician.status}
            size="lg"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="font-sans text-[17px] font-bold tracking-normal normal-case">
                {technician.name}
              </h1>
              <TechnicianStandingBadge
                standing={technicianStanding(technician)}
              />
            </div>
            <div className="mt-0.5 font-narrow text-[13px] break-all text-muted-foreground">
              {technician.email} · {technician.phone}
            </div>
          </div>
          {!editing ? (
            <Button
              variant="outline"
              onClick={() => setEditing(true)}
              className="h-10 bg-white px-4 text-[13.5px] font-semibold"
            >
              Edit details
            </Button>
          ) : null}
        </div>

        {editing ? (
          <EditTechnicianForm
            technician={technician}
            onDone={() => setEditing(false)}
          />
        ) : (
          <div className="px-[18px] py-[15px]">
            <Eyebrow className="text-[11.5px] tracking-[0.1em] text-muted-foreground">
              Open visits
            </Eyebrow>
            <p className="mt-1.5 text-[14px]">
              {technician.activeVisitCount === 0
                ? "Nothing booked or in progress."
                : `${technician.activeVisitCount} booked or in progress.`}
            </p>

            {update.isError ? (
              <FormAlert
                tone="error"
                {...STATE_COPY.saveFailed}
                className="mt-4"
              />
            ) : null}

            <div className="mt-4 flex flex-col gap-3.5">
              {technician.status === "ACTIVE" ? (
                <StopTechnicianDialog
                  technician={technician}
                  pending={update.isPending}
                  onConfirm={() => update.mutate({ isActive: false })}
                />
              ) : null}

              {technician.status === "INACTIVE" ? (
                <ActionCard
                  title="Starting them again"
                  body="One button, no confirm. Their old password still works and their account comes back as it was — with no visits on it."
                >
                  <Button
                    variant="outline"
                    disabled={update.isPending}
                    onClick={() => update.mutate({ isActive: true })}
                    className="h-[42px] w-full bg-white text-[13.5px] font-semibold"
                  >
                    {update.isPending
                      ? "Starting…"
                      : `Let ${name} work again`}
                  </Button>
                </ActionCard>
              ) : null}

              {technician.status === "INVITED" ? (
                reissue.isSuccess ? (
                  <ActivationLinkCard
                    title="A fresh link is ready"
                    invitation={reissue.data}
                  />
                ) : (
                  <ActionCard
                    title="A fresh link"
                    body="For an expired or lost link. Making a new one kills the old one on the spot, even if somebody still has it."
                  >
                    <Button
                      variant="outline"
                      disabled={reissue.isPending}
                      onClick={() => reissue.mutate()}
                      className="h-[42px] w-full bg-white text-[13.5px] font-semibold"
                    >
                      {reissue.isPending ? "Making…" : "Make a new link"}
                    </Button>
                    {reissue.isError ? (
                      <FormAlert
                        tone="error"
                        {...STATE_COPY.saveFailed}
                        className="mt-3"
                      />
                    ) : null}
                  </ActionCard>
                )
              ) : null}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
