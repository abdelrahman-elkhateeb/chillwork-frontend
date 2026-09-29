import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { HatchedNote } from "@/components/layout/hatched-note"
import { formatDate } from "@/lib/format/dates"
import { activationLink } from "@/features/technicians/lib/activation-link"
import type { Invitation } from "@/features/technicians/types/technician.types"

type Props = {
  title: string
  invitation: Invitation
}

/**
 * The link — once. Only its hash is stored, so nobody can read it back
 * later; a lost link means making a new one.
 */
export function ActivationLinkCard({ title, invitation }: Props) {
  const link = activationLink(invitation.activationToken)
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Card className="gap-0 rounded-[8px]">
      <CardHeader className="border-b-0 bg-ink px-4 py-[13px]">
        <CardTitle className="font-heading text-[13px] font-bold tracking-[-0.01em] text-paper-bright uppercase">
          The link — once
        </CardTitle>
        <span className="font-narrow text-[11px] font-bold tracking-[0.06em] text-primary uppercase">
          Copy it now
        </span>
      </CardHeader>
      <div className="p-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-full bg-[#11705A] text-white">
            <CheckIcon className="size-4" strokeWidth={3} />
          </span>
          <span className="text-[15px] font-bold">{title}</span>
        </div>

        <div className="mt-3.5 rounded-[5px] border border-line-strong bg-white px-3 py-[11px] font-mono text-[12px] leading-[1.5] break-all select-all">
          {link}
        </div>

        <Button
          type="button"
          onClick={() => void copy()}
          className="mt-2.5 h-[46px] w-full text-[14px] font-semibold"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied" : "Copy the link"}
        </Button>

        <HatchedNote
          tone="red"
          title="You will not see this link again"
          className="mt-3.5 px-[13px] py-3"
        >
          It is stored hashed, so nobody — including us — can read it back. If
          it is lost, make a new one from their page. It stops working on{" "}
          {formatDate(invitation.expiresAt)}, and the moment it is used.
        </HatchedNote>
      </div>
    </Card>
  )
}
