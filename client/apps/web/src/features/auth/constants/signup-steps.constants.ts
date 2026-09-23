import type { SignupStep } from "@/features/auth/types/auth-layout.types"

/** The customer journey the signup side panel walks through. Step 1 is this page. */
export const SIGNUP_STEPS: readonly SignupStep[] = [
  {
    title: "Create your account",
    description: "Name, phone and a password. Nothing else.",
  },
  {
    title: "Tell us what is wrong",
    description:
      "Add photos of every unit you want checked, not just the noisy one.",
  },
  {
    title: "Pick your visit",
    description:
      "You see the slot and the technician's name before they set off.",
  },
]

export const CURRENT_SIGNUP_STEP = 0
