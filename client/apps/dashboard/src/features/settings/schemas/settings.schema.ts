import { z } from "zod"

import { inputToMinor } from "@/lib/format/money"
import { CURRENCIES } from "@/features/settings/types/settings.types"

export const settingsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter the company name.")
    .max(120, "Keep it under 120 characters."),
  phone: z
    .string()
    .trim()
    .max(30, "That is too long for a phone number.")
    .transform((value) => value || null),
  /** Only sent the first time — it locks once saved. */
  currency: z.enum(CURRENCIES, { message: "Pick the currency." }),
  laborFee: z
    .string()
    .trim()
    .min(1, "Enter the labour fee.")
    .refine((value) => inputToMinor(value) !== null, {
      message: "Use a plain amount, e.g. 150 or 150.50.",
    })
    .transform((value) => inputToMinor(value)!),
})

export type SettingsFormInput = z.input<typeof settingsSchema>
export type SettingsFormValues = z.output<typeof settingsSchema>
