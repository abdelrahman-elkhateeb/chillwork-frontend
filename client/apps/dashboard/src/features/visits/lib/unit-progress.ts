import type {
  DeviceParts,
  DeviceWorkResult,
  PartProposal,
} from "@/features/visits/types/visit.types"

/**
 * Where one unit is on the road "pick parts → customer approves → record
 * the outcome", from the server's own data.
 */
export type UnitProgress = {
  openProposals: PartProposal[]
  approved: PartProposal[]
  refused: PartProposal[]
  /** Proposals with a decision field at all (not legacy items). */
  hasTrackedProposals: boolean
  /** Picked parts still waiting for the customer's yes or no. */
  awaitingApproval: boolean
  /**
   * The API's rule: "fixed" needs at least one approved part — unless the
   * unit never went through part approval at all.
   */
  canMarkFixed: boolean
  /** Nothing can be recorded while every tracked proposal is undecided. */
  outcomeBlocked: boolean
  result: DeviceWorkResult | null
}

export function unitProgress(
  parts: DeviceParts | undefined,
  result: DeviceWorkResult | undefined
): UnitProgress {
  const items = parts?.items ?? []
  const tracked = items.filter((item) => item.decision !== null)
  const approved = tracked.filter((item) => item.decision === "APPROVED")
  const refused = tracked.filter((item) => item.decision === "REJECTED")
  const open = tracked.filter((item) => item.decision === "PROPOSED")
  const anyDecided = approved.length + refused.length > 0

  return {
    openProposals: open,
    approved,
    refused,
    hasTrackedProposals: tracked.length > 0,
    awaitingApproval: open.length > 0,
    canMarkFixed: tracked.length === 0 || approved.length > 0,
    outcomeBlocked: tracked.length > 0 && !anyDecided,
    result: result?.result ? result : null,
  }
}

export function approvedPartsMinor(progress: UnitProgress): number {
  return progress.approved.reduce((sum, item) => sum + item.lineTotalMinor, 0)
}
