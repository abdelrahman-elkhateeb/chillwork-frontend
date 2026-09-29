import { Button } from "@workspace/ui/components/button"

import { StatePanel } from "@/components/states/state-panel"

type Props = {
  query: string
  hint: string
  onClear: () => void
  className?: string
}

/**
 * "Nothing matched" is never the same screen as "nothing yet" — the search
 * box stays with the query in it, and the way out is one tap.
 */
export function NoMatchState({ query, hint, onClear, className }: Props) {
  return (
    <StatePanel
      className={className}
      title={`Nothing matched “${query}”`}
      description={hint}
      action={
        <Button
          variant="outline"
          size="lg"
          onClick={onClear}
          className="h-[42px] bg-white px-[18px] text-[14px] font-semibold"
        >
          Clear the search
        </Button>
      }
    />
  )
}
