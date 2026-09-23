import { z } from "zod"

import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  PHONE_PATTERN,
  PHONE_SEPARATORS,
} from "@/features/auth/constants/auth-validation.constants"

export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(NAME_MIN_LENGTH, "Enter your full name.")
      .max(NAME_MAX_LENGTH, `Keep it under ${NAME_MAX_LENGTH} characters.`),
    email: z
      .string()
      .trim()
      .min(1, "Enter your email.")
      .pipe(z.email("That doesn't look like an email address.")),
    phone: z
      .string()
      .trim()
      .min(1, "Enter a phone number the technician can call.")
      .refine(
        (value) => PHONE_PATTERN.test(value.replace(PHONE_SEPARATORS, "")),
        "Use the full number with country code, like +20 100 000 0000."
      ),
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `Use at least ${PASSWORD_MIN_LENGTH} characters.`
      ),
    confirmPassword: z.string().min(1, "Type the password again."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "The two passwords don't match.",
  })
