export type NavLink = {
  label: string
  href: string
}

export type Device = {
  label: string
  /** Shorter label for the phone strip. */
  mobileLabel?: string
}

export type HeroStep = {
  n: string
  text: string
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

export type FlowStep = {
  n: string
  title: string
  mobileTitle?: string
  body: string
  mobileBody: string
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
  /** Not billed — shown struck through and faded. */
  dropped?: boolean
}

export type DayBoardSlotKind = "job" | "free" | "blocked"

export type DayBoardSlot = {
  kind: DayBoardSlotKind
  /** Relative width (flex-grow). */
  span: number
  label?: string
}

export type DayBoardRow = {
  technician: string
  slots: DayBoardSlot[]
}

export type FieldPoint = {
  title: string
  body: string
}

export type SiteUnitStatus = "done" | "checking"

export type SiteUnit = {
  name: string
  mobileName: string
  status: SiteUnitStatus
  note: string
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
