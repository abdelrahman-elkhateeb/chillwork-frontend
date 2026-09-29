import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your work email.")
    .pipe(z.email("That doesn't look like an email address.")),
  password: z.string().min(1, "Enter your password."),
})

export type LoginFormValues = z.infer<typeof loginSchema>
