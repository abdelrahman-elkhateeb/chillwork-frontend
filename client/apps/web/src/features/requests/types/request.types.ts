import type { z } from "zod"

import type {
  createRequestSchema,
  requestDeviceSchema,
} from "@/features/requests/schemas/create-request.schema"

export type ServiceRequestStatus = "SUBMITTED"

/** What the form holds (before zod trims it). */
export type CreateRequestFormInput = z.input<typeof createRequestSchema>

/** What the form submits (after zod's parsing). */
export type CreateRequestFormValues = z.output<typeof createRequestSchema>

export type RequestDeviceFormInput = z.input<typeof requestDeviceSchema>

export type CreateServiceRequestDeviceBody = {
  clientDeviceId: string
  label: string
  brand?: string
  model?: string
  /** Sent exactly as typed — the API stores it byte-for-byte. */
  originalDescription: string
  photoIds: string[]
}

export type CreateServiceRequestBody = {
  address: string
  contactPhone: string
  devices: CreateServiceRequestDeviceBody[]
}

/** Customer-safe: the API never returns AI analysis on this endpoint. */
export type ServiceRequestDevice = {
  clientDeviceId: string
  label: string
  brand?: string
  model?: string
  originalDescription: string
}

export type CreatedServiceRequest = {
  requestId: string
  /** Human-readable, e.g. "SR-7K9XQAB2". */
  reference: string
  status: ServiceRequestStatus
  devices: ServiceRequestDevice[]
}
