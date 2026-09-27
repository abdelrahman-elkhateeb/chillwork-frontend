import { ADDRESS_DIRECTIONS_SEPARATOR } from "@/features/requests/constants/request-validation.constants"
import type {
  CreateRequestFormValues,
  CreateServiceRequestBody,
} from "@/features/requests/types/request.types"

/** Takes the schema's parsed output (labels etc. already trimmed). */
export function toCreateRequestBody(
  values: CreateRequestFormValues
): CreateServiceRequestBody {
  return {
    address: values.directions
      ? `${values.address}${ADDRESS_DIRECTIONS_SEPARATOR}${values.directions}`
      : values.address,
    contactPhone: values.contactPhone,
    devices: values.devices.map((device) => ({
      clientDeviceId: device.clientDeviceId,
      label: device.label,
      brand: device.brand || undefined,
      model: device.model || undefined,
      originalDescription: device.originalDescription,
    })),
  }
}
