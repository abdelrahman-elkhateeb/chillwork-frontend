import type { AdminPartsQuery } from "@/features/parts/types/part.types"

export const partKeys = {
  all: ["parts"] as const,
  lists: () => [...partKeys.all, "list"] as const,
  list: (query: AdminPartsQuery) => [...partKeys.lists(), query] as const,
}
