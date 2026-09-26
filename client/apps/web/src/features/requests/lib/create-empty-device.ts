import type { RequestDeviceFormInput } from "@/features/requests/types/request.types"

export function createEmptyDevice(): RequestDeviceFormInput {
  return {
    clientDeviceId: crypto.randomUUID(),
    label: "",
    brand: "",
    model: "",
    originalDescription: "",
  }
}
