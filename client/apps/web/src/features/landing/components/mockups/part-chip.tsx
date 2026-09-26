import { Badge } from "@workspace/ui/components/badge"

type Props = {
  code: string
  note: string
  available: boolean
}

/** Part code + stock note; hatched red when the part is not on the shelf. */
export function PartChip({ code, note, available }: Props) {
  return (
    <Badge
      variant={available ? "success" : "blocked"}
      className="px-2 py-[3px] font-mono text-[11.5px] leading-[normal] font-normal tracking-normal normal-case"
    >
      {code} · {note}
    </Badge>
  )
}
