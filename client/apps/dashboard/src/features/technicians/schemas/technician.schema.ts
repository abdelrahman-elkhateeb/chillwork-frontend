import { z } from "zod"

/** Mirrors the API's rules (same as customer registration). */
const NAME_MIN = 2
const NAME_MAX = 100
/** Optional "+", 7–15 digits, no leading zero — after stripping separators. */
const PHONE_PATTERN = /^\+?[1-9]\d{6,14}$/
const PHONE_SEPARATORS = /[\s\-()]/g

const name = z
  .string()
  .trim()
  .min(NAME_MIN, "Enter their full name.")
  .max(NAME_MAX, `Keep it under ${NAME_MAX} characters.`)

const phone = z
  .string()
  .trim()
  .min(1, "Enter a phone number.")
  .transform((value) => value.replace(PHONE_SEPARATORS, ""))
  .refine((value) => PHONE_PATTERN.test(value), {
    message: "Use the full number, e.g. +20 100 000 0000.",
  })

export const createTechnicianSchema = z.object({
  name,
  email: z
    .string()
    .trim()
    .min(1, "Enter their work email.")
    .pipe(z.email("That doesn't look like an email address.")),
  phone,
})

export const editTechnicianSchema = z.object({ name, phone })

export type CreateTechnicianInput = z.input<typeof createTechnicianSchema>
export type CreateTechnicianValues = z.output<typeof createTechnicianSchema>
export type EditTechnicianInput = z.input<typeof editTechnicianSchema>
export type EditTechnicianValues = z.output<typeof editTechnicianSchema>
