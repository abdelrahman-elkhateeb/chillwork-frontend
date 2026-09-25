import { cn } from "@workspace/ui/lib/utils"

type Props = {
  code: string
  note: string
  available: boolean
}

/** Part code + stock note; hatched red when the part is not on the shelf. */
export function PartChip({ code, note, available }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[3px] border px-2 py-[3px] font-mono text-[11.5px] whitespace-nowrap",
        available
          ? "border-[#17876A]/35 bg-[#17876A]/10 text-[#11705A]"
          : "border-destructive/40 bg-hatch text-[#8E1913]"
      )}
    >
      {code} · {note}
    </span>
  )
}
