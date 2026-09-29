import { httpClient } from "@/lib/api/http-client"
import type {
  CompanySettings,
  Pricing,
  UpdateCompanySettingsBody,
} from "@/features/settings/types/settings.types"

export const settingsKeys = {
  all: ["company-settings"] as const,
  settings: () => [...settingsKeys.all, "settings"] as const,
  pricing: () => [...settingsKeys.all, "pricing"] as const,
}

export const settingsApi = {
  get: (signal?: AbortSignal) =>
    httpClient.get<CompanySettings>("/admin/company-settings", { signal }),

  update: (body: UpdateCompanySettingsBody) =>
    httpClient.patch<CompanySettings>("/admin/company-settings", body),

  /** Currency + labor fee, readable by every role. */
  pricing: (signal?: AbortSignal) =>
    httpClient.get<Pricing>("/catalog/pricing", { signal }),
}
