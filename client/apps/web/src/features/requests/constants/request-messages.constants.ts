import type { FormAlertContent } from "@/components/form/form.types"

export const REQUEST_ALERTS = {
  inProgress: {
    tone: "info",
    title: "Your request is still being submitted",
    description: "Give it a moment, then submit again. It won't be sent twice.",
  },
  creationFailed: {
    tone: "error",
    title: "We couldn't send it just now",
    description:
      "Your details are still here. Submit again. It won't be sent twice.",
  },
  customersOnly: {
    tone: "error",
    title: "Only customer accounts can request service",
    description: "Sign in with a customer account to submit a request.",
  },
  rateLimited: {
    tone: "info",
    title: "Too many requests for now",
    description: "Wait a few minutes and try again.",
  },
  invalid: {
    tone: "error",
    title: "Some details need another look",
    description: "Check the request and try again.",
  },
  network: {
    tone: "error",
    title: "Can't reach ChillWork",
    description:
      "Check your connection and submit again. It won't be sent twice.",
  },
  generic: {
    tone: "error",
    title: "We couldn't send it just now",
    description: "Nothing you typed is lost. Try again in a moment.",
  },
} as const satisfies Record<string, FormAlertContent>
