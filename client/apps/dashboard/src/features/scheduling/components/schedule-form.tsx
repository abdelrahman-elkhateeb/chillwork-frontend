import { useMemo, useState } from "react"
import { Button } from "@workspace/ui/components/button"

import { FormAlert } from "@/components/form/form-alert"
import { SubmitButton } from "@/components/form/submit-button"
import { Eyebrow } from "@/components/layout/eyebrow"
import { HatchedNote } from "@/components/layout/hatched-note"
import { hasErrorCode, isApiError } from "@/lib/api/api-error"
import { API_ERROR_CODES } from "@/lib/api/api.constants"
import {
  addDays,
  formatWeekday,
  todayIn,
  zonedTimeToIso,
  type CalendarDay,
} from "@/lib/format/dates"
import type { AdminRequestDetail } from "@/features/requests"
import type { Technician } from "@/features/technicians"
import { DayPicker } from "@/features/scheduling/components/day-picker"
import {
  AlreadyBookedNotice,
  BookedCard,
  NotSchedulableNotice,
} from "@/features/scheduling/components/schedule-outcomes"
import { TechnicianSlots } from "@/features/scheduling/components/technician-slots"
import {
  DAY_SLOTS,
  DAYS_AHEAD,
} from "@/features/scheduling/constants/slots.constants"
import {
  useCreateVisit,
  useTeamAvailability,
} from "@/features/scheduling/hooks/use-scheduling"
import {
  slotState,
  slotWindow,
  type SlotState,
} from "@/features/scheduling/lib/slots"

type Choice = { technicianId: string; slotId: string }

type Clash = { technicianName: string; slotLabel: string }

type Props = {
  request: AdminRequestDetail
  technicians: Technician[]
  timeZone: string
}

export function ScheduleForm({ request, technicians, timeZone }: Props) {
  const days = useMemo(() => {
    const today = todayIn(timeZone)
    return Array.from({ length: DAYS_AHEAD }, (_, index) =>
      addDays(today, index)
    )
  }, [timeZone])

  const [day, setDay] = useState<CalendarDay>(days[0]!)
  const [choice, setChoice] = useState<Choice | null>(null)
  const [clash, setClash] = useState<Clash | null>(null)

  const from = zonedTimeToIso(day, 0, 0, timeZone)
  const to = zonedTimeToIso(addDays(day, 1), 0, 0, timeZone)
  const availability = useTeamAvailability(
    technicians.map((technician) => technician.id),
    from,
    to
  )
  const create = useCreateVisit(request.requestId)

  const unscheduledIds = request.devices
    .filter((device) => device.visitId === null)
    .map((device) => device.clientDeviceId)

  // Slot states per technician for the chosen day.
  const now = new Date()
  const states: (Record<string, SlotState> | null)[] = technicians.map(
    (_, index) => {
      const result = availability[index]
      if (!result?.data) return null
      return Object.fromEntries(
        DAY_SLOTS.map((slot) => [
          slot.id,
          slotState(slotWindow(day, slot, timeZone), result.data, now),
        ])
      )
    }
  )

  if (create.isSuccess) {
    const booked = technicians.find(
      (technician) => technician.id === create.data.technicianId
    )
    return (
      <BookedCard
        visit={create.data}
        technicianName={booked?.name ?? "The technician"}
      />
    )
  }

  if (hasErrorCode(create.error, API_ERROR_CODES.DEVICE_ALREADY_SCHEDULED)) {
    return <AlreadyBookedNotice requestId={request.requestId} />
  }

  if (hasErrorCode(create.error, API_ERROR_CODES.REQUEST_NOT_SCHEDULABLE)) {
    return <NotSchedulableNotice />
  }

  const chosenTechnician = technicians.find(
    (technician) => technician.id === choice?.technicianId
  )
  const chosenSlot = DAY_SLOTS.find((slot) => slot.id === choice?.slotId)

  // "Still free, same day": the first two open windows once a slot went.
  const suggestions = clash
    ? technicians
        .flatMap((technician, index) =>
          DAY_SLOTS.filter((slot) => states[index]?.[slot.id] === "free").map(
            (slot) => ({ technician, slot })
          )
        )
        .slice(0, 2)
    : []

  const book = () => {
    if (!chosenTechnician || !chosenSlot) return
    setClash(null)
    const window = slotWindow(day, chosenSlot, timeZone)
    create.mutate(
      {
        technicianId: chosenTechnician.id,
        startAt: window.startAt,
        endAt: window.endAt,
        deviceIds: unscheduledIds,
        workTypes: ["INSPECTION", "REPAIR"],
      },
      {
        onError: (error) => {
          if (hasErrorCode(error, API_ERROR_CODES.SCHEDULE_CONFLICT)) {
            setClash({
              technicianName: chosenTechnician.name,
              slotLabel: chosenSlot.range,
            })
            setChoice(null)
          }
        },
      }
    )
  }

  const otherError =
    create.isError &&
    !hasErrorCode(create.error, API_ERROR_CODES.SCHEDULE_CONFLICT)

  return (
    <div>
      <Eyebrow className="text-[11.5px] tracking-[0.1em] text-muted-foreground">
        Which day
      </Eyebrow>
      <div className="mt-2">
        <DayPicker
          days={days}
          selected={day}
          onSelect={(next) => {
            setDay(next)
            setChoice(null)
            setClash(null)
          }}
        />
      </div>

      {clash ? (
        <div className="mt-4">
          <FormAlert
            tone="error"
            title={`${clash.technicianName} was booked a moment ago`}
            description={`Someone else took ${formatWeekday(day)} ${clash.slotLabel} while this screen was open. Nothing was saved.`}
          />
          {suggestions.length > 0 ? (
            <>
              <Eyebrow className="mt-3.5 text-[11.5px] tracking-[0.1em] text-muted-foreground">
                Still free, same day
              </Eyebrow>
              <div className="mt-2 flex flex-col gap-[7px]">
                {suggestions.map(({ technician, slot }) => (
                  <Button
                    key={`${technician.id}-${slot.id}`}
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setChoice({ technicianId: technician.id, slotId: slot.id })
                      setClash(null)
                    }}
                    className="h-12 justify-start bg-white px-[13px] text-[13.5px] font-semibold"
                  >
                    {technician.name} · {slot.range}
                  </Button>
                ))}
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      <Eyebrow className="mt-4 text-[11.5px] tracking-[0.1em] text-muted-foreground">
        Who is free, {formatWeekday(day)}
      </Eyebrow>
      <div className="mt-[9px] flex flex-col gap-2.5">
        {technicians.length === 0 ? (
          <HatchedNote title="Nobody to send">
            There are no active technicians. Add one, or wait for an invited
            one to set up their account.
          </HatchedNote>
        ) : (
          technicians.map((technician, index) => {
            const dayStates = states[index] ?? null
            const busy = availability[index]?.data?.busy.length ?? 0
            return (
              <TechnicianSlots
                key={technician.id}
                technician={technician}
                states={dayStates}
                stopsThatDay={busy}
                highlight={index === 0}
                selectedSlotId={
                  choice?.technicianId === technician.id ? choice.slotId : null
                }
                onSelect={(slot) =>
                  setChoice({ technicianId: technician.id, slotId: slot.id })
                }
              />
            )
          })
        )}
      </div>

      {otherError ? (
        <FormAlert
          tone="error"
          title="We couldn't book that"
          description={
            isApiError(create.error) && create.error.fieldErrors?.technicianId
              ? "That technician can't take visits any more. Pick someone else."
              : "Nothing was saved. Try again in a moment."
          }
          className="mt-4"
        />
      ) : null}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#E4E6E6] pt-3.5">
        <div>
          <div className="font-narrow text-[12px] text-muted-foreground">
            You are booking
          </div>
          <div className="mt-0.5 text-[14.5px] font-bold">
            {chosenTechnician && chosenSlot
              ? `${chosenTechnician.name} · ${formatWeekday(day)} ${chosenSlot.range}`
              : "Pick a free slot"}
          </div>
        </div>
        <SubmitButton
          type="button"
          onClick={book}
          disabled={!chosenTechnician || !chosenSlot}
          pending={create.isPending}
          pendingLabel="Booking…"
          className="h-12 w-auto px-[22px]"
        >
          Book it
        </SubmitButton>
      </div>
    </div>
  )
}
