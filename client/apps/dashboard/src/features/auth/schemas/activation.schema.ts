import { z } from "zod"

/** Mirrors the API's rule for activation (8+ characters). */
export const PASSWORD_MIN_LENGTH = 8

export const activationSchema = z
  .object({
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `Use at least ${PASSWORD_MIN_LENGTH} characters.`
      ),
    confirm: z.string().min(1, "Type the password again."),
  })
  .refine((values) => values.password === values.confirm, {
    path: ["confirm"],
    message: "The two passwords don't match.",
  })

export type ActivationFormValues = z.infer<typeof activationSchema>
