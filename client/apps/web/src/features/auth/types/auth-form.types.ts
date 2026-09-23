import type { z } from "zod"

import type { loginSchema } from "@/features/auth/schemas/login.schema"
import type { signupSchema } from "@/features/auth/schemas/signup.schema"

export type LoginFormValues = z.infer<typeof loginSchema>

export type SignupFormValues = z.infer<typeof signupSchema>

/** Shape of `location.state` the login page accepts. */
export type LoginLocationState = {
  /** Where to go after signing in (set by the auth guard). */
  from?: string
  /** Pre-fills the email field, e.g. after a signup whose auto-login failed. */
  email?: string
  justRegistered?: boolean
}
