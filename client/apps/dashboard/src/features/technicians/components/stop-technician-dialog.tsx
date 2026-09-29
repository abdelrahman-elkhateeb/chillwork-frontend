import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import { Button } from "@workspace/ui/components/button"

import { firstName } from "@/lib/format/names"
import type { Technician } from "@/features/technicians/types/technician.types"

type Props = {
  technician: Technician
  pending: boolean
  onConfirm: () => void
}

/** Stopping someone is destructive, so it asks — and says what it leaves behind. */
export function StopTechnicianDialog({ technician, pending, onConfirm }: Props) {
  const name = firstName(technician.name)
  const open = technician.activeVisitCount

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          disabled={pending}
          className="h-11 w-full border-destructive/45 bg-white text-[14px] font-semibold text-[#8E1913] hover:bg-destructive/5"
        >
          {pending ? "Stopping…" : `Stop ${name} from working`}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Stop {name} from working?</AlertDialogTitle>
          <AlertDialogDescription>
            They are signed out at once and cannot sign back in. Their
            finished work and invoices stay exactly as they are.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {open > 0 ? (
          <div className="overflow-hidden rounded-[5px] border border-destructive/40">
            <div className="border-b border-destructive/28 bg-destructive/7 px-3 py-[9px] text-[12.5px] font-bold text-[#8E1913]">
              {open === 1
                ? "1 visit is not finished"
                : `${open} visits are not finished`}
            </div>
            <p className="px-3 py-2.5 font-narrow text-[13px] leading-[1.5] text-muted-foreground">
              They stay booked in {name}'s name, and nobody else can open
              them until they are reassigned — reassigning is not built yet.
            </p>
          </div>
        ) : null}

        <AlertDialogFooter>
          <AlertDialogCancel className="h-[46px] flex-1 bg-white text-[14px] font-semibold">
            Leave {name} working
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="h-[46px] flex-1 bg-destructive text-[14px] font-semibold text-white hover:bg-[#9A1B16]"
          >
            Stop anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
