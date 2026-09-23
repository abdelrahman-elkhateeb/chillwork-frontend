import type { FormAlertContent } from "@/components/form/form.types"

/** Copy from the "Auth — States" design board. */
export const AUTH_ALERTS = {
  invalidCredentials: {
    tone: "error",
    title: "We couldn't sign you in",
    description: "Check the email and password and try again.",
  },
  rateLimited: {
    tone: "info",
    title: "Locked for a moment",
    description: "Too many attempts. Wait a few minutes and try again.",
  },
  signupUnavailable: {
    tone: "error",
    title: "Sign up is paused",
    description: "We can't create new accounts right now. Try again later.",
  },
  network: {
    tone: "error",
    title: "Can't reach ChillWork",
    description: "Check your connection and try again.",
  },
  generic: {
    tone: "error",
    title: "Something went wrong",
    description: "Please try again in a moment.",
  },
  justRegistered: {
    tone: "success",
    title: "Your account is ready",
    description: "Log in with the password you just set.",
  },
} as const satisfies Record<string, FormAlertContent>

export const EMAIL_TAKEN_MESSAGE = "There is already an account on this email."
