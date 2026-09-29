export type TechnicianStatus = "ACTIVE" | "INVITED" | "INACTIVE"

export type Technician = {
  id: string
  name: string
  email: string
  phone: string
  status: TechnicianStatus
  /** SCHEDULED / IN_PROGRESS visits — what needs reassigning if stopped. */
  activeVisitCount: number
  createdAt: string
}

export type Invitation = {
  /** Shown once: only its hash is stored. */
  activationToken: string
  expiresAt: string
}

export type CreateTechnicianBody = {
  name: string
  email: string
  phone: string
}

export type CreateTechnicianResult = {
  technician: Technician
  invitation: Invitation
}

export type UpdateTechnicianBody = {
  name?: string
  phone?: string
  isActive?: boolean
}

export type TechniciansQuery = {
  status?: TechnicianStatus
  search?: string
  page?: number
  pageSize?: number
}
