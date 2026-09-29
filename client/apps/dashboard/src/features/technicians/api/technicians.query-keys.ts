import type { TechniciansQuery } from "@/features/technicians/types/technician.types"

export const technicianKeys = {
  all: ["technicians"] as const,
  lists: () => [...technicianKeys.all, "list"] as const,
  list: (query: TechniciansQuery) =>
    [...technicianKeys.lists(), query] as const,
}
