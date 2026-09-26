import { z } from "zod"

import { MAX_DEVICES_PER_REQUEST } from "@/features/requests/constants/request-validation.constants"
import type { CreateRequestFormInput } from "@/features/requests/types/request.types"

/**
 * "Saved as you type": an unsent request survives a reload or a session
 * refresh in this tab. sessionStorage, not localStorage — the draft holds
 * an address and phone number and shouldn't outlive the tab. It's only a
 * convenience: any read/write failure just means no draft.
 */
const draftSchema = z.object({
  address: z.string(),
  directions: z.string(),
  contactPhone: z.string(),
  devices: z
    .array(
      z.object({
        clientDeviceId: z.string().min(1),
        label: z.string(),
        brand: z.string(),
        model: z.string(),
        originalDescription: z.string(),
      })
    )
    .min(1)
    .max(MAX_DEVICES_PER_REQUEST),
})

function draftKey(userId: string): string {
  return `chillwork:request-draft:${userId}`
}

export function readRequestDraft(
  userId: string
): CreateRequestFormInput | null {
  try {
    const raw = sessionStorage.getItem(draftKey(userId))
    if (!raw) {
      return null
    }
    const parsed = draftSchema.safeParse(JSON.parse(raw))
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

export function writeRequestDraft(
  userId: string,
  values: CreateRequestFormInput
): void {
  try {
    sessionStorage.setItem(draftKey(userId), JSON.stringify(values))
  } catch {
    // Storage full or blocked — the form still works without a draft.
  }
}

export function clearRequestDraft(userId: string): void {
  try {
    sessionStorage.removeItem(draftKey(userId))
  } catch {
    // Nothing to clear.
  }
}
