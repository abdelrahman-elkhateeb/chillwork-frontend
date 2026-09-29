import { useEffect, useState } from "react"
import { SearchIcon, XIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { cn } from "@workspace/ui/lib/utils"

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder: string
  /** Label for screen readers. */
  label: string
  className?: string
}

const DEBOUNCE_MS = 300

/** A search box that reports what was typed once typing pauses. */
export function SearchField({
  value,
  onChange,
  placeholder,
  label,
  className,
}: Props) {
  const [draft, setDraft] = useState(value)
  const [seenValue, setSeenValue] = useState(value)

  // Follow outside changes ("Clear the search", back/forward navigation),
  // adjusting during render rather than in an effect.
  if (value !== seenValue) {
    setSeenValue(value)
    setDraft(value)
  }

  useEffect(() => {
    if (draft.trim() === value) {
      return undefined
    }
    const timer = window.setTimeout(() => onChange(draft.trim()), DEBOUNCE_MS)
    return () => window.clearTimeout(timer)
  }, [draft, value, onChange])

  return (
    <div className={cn("relative", className)}>
      <SearchIcon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#8A9093]"
      />
      <Input
        type="search"
        aria-label={label}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder={placeholder}
        className="h-10 bg-white pr-9 pl-9 text-[13.5px] [&::-webkit-search-cancel-button]:hidden"
      />
      {draft ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Clear the search"
          onClick={() => {
            setDraft("")
            onChange("")
          }}
          className="absolute top-1/2 right-1.5 -translate-y-1/2 text-muted-foreground"
        >
          <XIcon />
        </Button>
      ) : null}
    </div>
  )
}
