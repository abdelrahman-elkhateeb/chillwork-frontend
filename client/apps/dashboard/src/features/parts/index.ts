// Public surface of the parts feature (catalog + stock, FS11).
export { partKeys } from "@/features/parts/api/parts.query-keys"
export {
  useAdminPart,
  useAdminParts,
  WHOLE_SHELF,
} from "@/features/parts/hooks/use-parts"
export { NewPartPage, PartPage } from "@/features/parts/pages/part-page"
export { PartsPage } from "@/features/parts/pages/parts-page"
export type { AdminPart, CatalogPart } from "@/features/parts/types/part.types"
