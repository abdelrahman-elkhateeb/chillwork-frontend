import { z } from "zod"

import { inputToMinor } from "@/lib/format/money"

const amount = z
  .string()
  .trim()
  .min(1, "Enter the price.")
  .refine((value) => inputToMinor(value) !== null, {
    message: "Use a plain amount, e.g. 450 or 450.50.",
  })
  .transform((value) => inputToMinor(value)!)

export const partSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Give the part a name.")
    .max(120, "Keep it under 120 characters."),
  description: z
    .string()
    .trim()
    .max(500, "Keep it under 500 characters.")
    .transform((value) => value || null),
  price: amount,
  /** Only on "add": stock after that only moves through a stock move. */
  startingStock: z
    .string()
    .trim()
    .refine((value) => value === "" || /^\d+$/.test(value), {
      message: "A whole number, 0 or more.",
    })
    .transform((value) => (value === "" ? 0 : Number(value))),
})

export type PartFormInput = z.input<typeof partSchema>
export type PartFormValues = z.output<typeof partSchema>
