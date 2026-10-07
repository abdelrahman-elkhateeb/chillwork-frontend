import type { FormAlertContent } from "@/components/form/form.types"

/** Copy from the "Staff log in" and "Technician activation" boards. */
export const LOGIN_COPY = {
  title: "Staff sign in",
  description: "For dispatchers, admins and technicians.",
  submit: "Sign in",
  pending: "Signing in…",
  noAccountTitle: "No account?",
  noAccountBody:
    "Staff accounts are created by your admin, not signed up for. Ask them to add you and activate the account.",
  customerPrompt: "Are you a customer?",
  customerLink: "Sign in on the main site →",
  asideTitle: "Today's board is waiting.",
  asideBody: "Dispatchers see the whole day. Technicians see their own.",
  asideFooter: "Customers don't sign in here.",
  asideFooterLink: "Customer login →",
  demoTitle: "Demo accounts — try it yourself",
  demoAccounts: [
    { role: "Admin", email: "admin@chillwork.test" },
    { role: "Technician", email: "tech@chillwork.test" },
  ],
  demoPassword: "jO8Uogyq_o3Wzz0R",
} as const

export const ACTIVATION_COPY = {
  asideTitle: "You've been added to the team.",
  asideBody: "Set a password and your visits start showing up on your phone.",
  stepCreated: "Your account was created",
  stepCreatedDetail: "By your office",
  stepPassword: "Set your password",
  stepPasswordDetail: "Only you will know it — the office cannot see it.",
  stepSignIn: "Sign in and see your day",
  asideFooter: "Not you? Close this page and tell whoever sent it.",
  title: "Set your password",
  submit: "Activate and sign in",
  pending: "Activating…",
  onceNote: "This link works once. After that it is dead.",
  goToSignIn: "Go to sign in",
} as const

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
  signedOutCustomer: {
    tone: "info",
    title: "This is the staff dashboard",
    description:
      "Your account is a customer account. We've signed you back out.",
  },
  // The API gives one answer for unknown, expired, used and revoked tokens,
  // so the page can't tell "already set up" from "run out" — this wording
  // covers all of them and names who fixes it.
  invalidActivationLink: {
    tone: "error",
    title: "We can't use this link",
    description:
      "It may have run out, been used already, or been replaced by a newer one. If you already set a password, just sign in — otherwise ask the office for a new link.",
  },
  activatedSignInFailed: {
    tone: "success",
    title: "You're set up",
    description: "Sign in with the password you just chose.",
  },
} as const satisfies Record<string, FormAlertContent>
