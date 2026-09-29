/** The catalog view every role gets (no stock count). */
export type CatalogPart = {
  id: string
  name: string
  description: string | null
  unitPriceMinor: number
  currency: string
  inStock: boolean
  isActive: boolean
}

/** The admin view adds the real count. */
export type AdminPart = CatalogPart & {
  stockQuantity: number
}

export type AdminPartsQuery = {
  q?: string
  available?: boolean
  isActive?: boolean
  page?: number
  pageSize?: number
}

export type CreatePartBody = {
  name: string
  description?: string | null
  unitPriceMinor: number
  stockQuantity?: number
  isActive?: boolean
}

export type UpdatePartBody = {
  name?: string
  description?: string | null
  unitPriceMinor?: number
  isActive?: boolean
}

export type StockAdjustmentBody = {
  /** Non-zero; a decrement can never take stock below zero. */
  delta: number
  note?: string
}
