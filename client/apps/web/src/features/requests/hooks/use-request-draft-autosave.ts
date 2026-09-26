import { useEffect } from "react"
import type { UseFormReturn } from "react-hook-form"

import { writeRequestDraft } from "@/features/requests/lib/request-draft-storage"
import type {
  CreateRequestFormInput,
  CreateRequestFormValues,
} from "@/features/requests/types/request.types"

const SAVE_DELAY_MS = 400

/** Writes the form to the tab's draft a moment after each change. */
export function useRequestDraftAutosave(
  form: UseFormReturn<CreateRequestFormInput, unknown, CreateRequestFormValues>,
  userId: string,
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled) {
      return
    }

    let timer: ReturnType<typeof setTimeout> | undefined

    const subscription = form.watch(() => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        writeRequestDraft(userId, form.getValues())
      }, SAVE_DELAY_MS)
    })

    return () => {
      clearTimeout(timer)
      subscription.unsubscribe()
    }
  }, [form, userId, enabled])
}
