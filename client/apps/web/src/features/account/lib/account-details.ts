import type { AuthUser } from "@/features/auth"
import type { AccountDetail } from "@/features/account/types/account.types"

export function toAccountDetails(user: AuthUser): AccountDetail[] {
  return [
    { label: "Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Phone", value: user.phone },
  ]
}

export function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName
}
