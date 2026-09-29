export const STATE_COPY = {
  error: {
    title: "We couldn't load this",
    description:
      "Something went wrong at our end, not yours. Nothing you did is lost.",
    retry: "Try again",
  },
  saveFailed: {
    title: "We couldn't save that",
    description: "Nothing you typed is lost. Try again in a moment.",
  },
  notFound: {
    description: "It may have moved, or it was never yours.",
  },
} as const
