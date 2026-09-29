export const CURRENCIES = ["EGP", "SAR", "AED", "USD", "EUR"] as const

export type Currency = (typeof CURRENCIES)[number]

export type CompanySettings = {
  name: string
  contact: { phone: string | null; email: string | null }
  timezone: string
  /** `null` until first set — then locked for good. */
  currency: Currency | null
  laborFeeMinor: number | null
}

export type UpdateCompanySettingsBody = {
  name?: string
  contact?: { phone?: string | null; email?: string | null }
  timezone?: string
  currency?: Currency
  laborFeeMinor?: number
}

export type Pricing = {
  currency: Currency
  laborFeeMinor: number
}
