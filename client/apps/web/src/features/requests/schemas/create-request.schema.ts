import { z } from "zod"

import { PHONE_PATTERN, PHONE_SEPARATORS } from "@/features/auth"
import {
  ADDRESS_DIRECTIONS_SEPARATOR,
  MAX_ADDRESS_LENGTH,
  MAX_DEVICE_BRAND_LENGTH,
  MAX_DEVICE_LABEL_LENGTH,
  MAX_DEVICE_MODEL_LENGTH,
  MAX_DEVICES_PER_REQUEST,
  MAX_DIRECTIONS_LENGTH,
  MAX_ORIGINAL_DESCRIPTION_LENGTH,
} from "@/features/requests/constants/request-validation.constants"

export const requestDeviceSchema = z.object({
  /** Generated once per device card; the API matches analysis by it. */
  clientDeviceId: z.string().min(1),
  label: z
    .string()
    .trim()
    .min(1, "Say where this unit is, like Bedroom.")
    .max(
      MAX_DEVICE_LABEL_LENGTH,
      `Keep it under ${MAX_DEVICE_LABEL_LENGTH} characters.`
    ),
  brand: z
    .string()
    .trim()
    .max(
      MAX_DEVICE_BRAND_LENGTH,
      `Keep it under ${MAX_DEVICE_BRAND_LENGTH} characters.`
    ),
  model: z
    .string()
    .trim()
    .max(
      MAX_DEVICE_MODEL_LENGTH,
      `Keep it under ${MAX_DEVICE_MODEL_LENGTH} characters.`
    ),
  // No .trim(): the description must reach the API exactly as typed.
  originalDescription: z
    .string()
    .max(
      MAX_ORIGINAL_DESCRIPTION_LENGTH,
      `Keep it under ${MAX_ORIGINAL_DESCRIPTION_LENGTH} characters.`
    )
    .refine(
      (value) => value.trim().length > 0,
      "Every unit needs a description — otherwise the technician arrives without knowing what to bring."
    ),
})

export const createRequestSchema = z
  .object({
    address: z
      .string()
      .trim()
      .min(1, "Enter the address where the units are.")
      .max(
        MAX_ADDRESS_LENGTH,
        `Keep it under ${MAX_ADDRESS_LENGTH} characters.`
      ),
    directions: z
      .string()
      .trim()
      .max(
        MAX_DIRECTIONS_LENGTH,
        `Keep it under ${MAX_DIRECTIONS_LENGTH} characters.`
      ),
    contactPhone: z
      .string()
      .trim()
      .min(1, "Enter a phone number the technician can call.")
      .refine(
        (value) => PHONE_PATTERN.test(value.replace(PHONE_SEPARATORS, "")),
        "Use the full number with country code, like +20 100 000 0000."
      ),
    devices: z
      .array(requestDeviceSchema)
      .min(1, "Add at least one unit.")
      .max(
        MAX_DEVICES_PER_REQUEST,
        `A request can cover up to ${MAX_DEVICES_PER_REQUEST} units.`
      ),
  })
  .refine(
    ({ address, directions }) =>
      !directions ||
      address.length +
        ADDRESS_DIRECTIONS_SEPARATOR.length +
        directions.length <=
        MAX_ADDRESS_LENGTH,
    {
      path: ["directions"],
      message: "Shorten the address or these directions a little.",
    }
  )
