export type NavLink = {
  label: string
  href: string
}

export type Device = {
  label: string
  /** Shorter label for the phone strip. */
  mobileLabel?: string
}

export type HeroStat = {
  value: string
  label: string
}

/** A numbered/lettered marker on a technical drawing, with a dashed leader line. */
export type DrawingCallout = {
  label: string
  cx: number
  cy: number
  leaderToX: number
}

export type LeakIconName = "missing-part" | "second-visit" | "double-booking"

export type LeakCard = {
  icon: LeakIconName
  title: string
  body: string
  /** Shorter copy for small screens. */
  mobileBody: string
}

export type JobStepIllustration =
  "intake" | "triage" | "dispatch" | "on-site" | "close"

export type JobStep = {
  n: number
  stage: string
  title: string
  body: string
  illustration: JobStepIllustration
}

export type AppRoleId = "customer" | "dispatcher" | "technician"

export type AppRole = {
  id: AppRoleId
  role: string
  title: string
  summary: string
}

export type Capability = {
  title: string
  body: string
}

export type BillingCallout = {
  title: string
  body: string
}

export type InvoiceLine = {
  title: string
  code?: string
  detail: string
  mobileDetail: string
  amount: string
  /** Not billed — hatched, with `detail` shown as the reason. */
  excluded?: boolean
}

export type FooterColumn = {
  heading: string
  links: NavLink[]
}

export type LandingPhoto = {
  src: string
  alt: string
  /** CSS object-position — which part of the photo survives the crop. */
  focus?: string
}
