export type UserRole = "CUSTOMER" | "ADMIN" | "TECHNICIAN"

export type AuthUser = {
  id: string
  email: string
  name: string
  phone: string
  role: UserRole
  companyId: string
}

export type AuthSession = {
  id: string
  expiresAt: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type SignupRequest = {
  name: string
  email: string
  phone: string
  password: string
}

export type LoginResponse = {
  user: AuthUser
  session: AuthSession
}

export type SignupResponse = {
  user: AuthUser
}

export type CurrentUserResponse = {
  user: AuthUser
}

export type LogoutResponse = {
  loggedOut: true
}

/**
 * Registration never opens a session on the API, so signup chains a login
 * after it. That login can still fail (e.g. throttled) after the account
 * already exists — `signedIn` tells the page which of the two happened.
 */
export type SignupResult = {
  user: AuthUser
  signedIn: boolean
}
