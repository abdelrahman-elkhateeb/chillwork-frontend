import type { Technician } from "@/features/technicians/types/technician.types"

export type TechnicianStanding = {
  label: string
  tone: "success" | "attention" | "excluded"
}

function daysSince(iso: string, now = new Date()): number {
  return Math.max(
    0,
    Math.floor((now.getTime() - new Date(iso).getTime()) / 86_400_000)
  )
}

/** Each standing tells the admin what to do next. */
export function technicianStanding(technician: Technician): TechnicianStanding {
  switch (technician.status) {
    case "ACTIVE":
      return { label: "Working", tone: "success" }
    case "INVITED": {
      const days = daysSince(technician.createdAt)
      const age =
        days === 0 ? "today" : days === 1 ? "1 day" : `${days} days`
      return { label: `Invited · ${age}`, tone: "attention" }
    }
    case "INACTIVE":
      return { label: "Stopped", tone: "excluded" }
  }
}
