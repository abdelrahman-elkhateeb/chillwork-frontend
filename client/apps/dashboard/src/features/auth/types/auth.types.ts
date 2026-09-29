export type UserRole = "CUSTOMER" | "ADMIN" | "TECHNICIAN"

/** The two roles this dashboard is for. */
export type StaffRole = Exclude<UserRole, "CUSTOMER">

export type AuthUser = {
  id: string
  email: string
  name: string
  phone: string
  role: UserRole
  companyId: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  user: AuthUser
  session: { id: string; expiresAt: string }
}

export type CurrentUserResponse = {
  user: AuthUser
}

export type LogoutResponse = {
  loggedOut: true
}

export type ActivateTechnicianRequest = {
  token: string
  password: string
}

export type ActivateTechnicianResponse = {
  email: string
}

/** Shape of `location.state` the login page accepts. */
export type LoginLocationState = {
  /** Where to go after signing in (set by the auth guard). */
  from?: string
  /** Pre-fills the email field. */
  email?: string
  /** Shown once after the customer-account bounce. */
  signedOutCustomer?: boolean
}
