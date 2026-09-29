import type { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeftIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

type Props = {
  /** Where the back button goes; no button when omitted. */
  backTo?: string
  title: ReactNode
  aside?: ReactNode
  children?: ReactNode
}

/** The ink bar on top of every technician screen. */
export function PhoneHeader({ backTo, title, aside, children }: Props) {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-10 bg-ink px-4 pt-[13px] pb-[15px]">
      <div className="flex min-h-[34px] items-center justify-between gap-3">
        {backTo ? (
          <Button
            variant="inverse"
            size="icon-lg"
            aria-label="Back"
            onClick={() => navigate(backTo)}
            className="size-[34px] shrink-0 rounded-[5px] border-paper/20"
          >
            <ChevronLeftIcon />
          </Button>
        ) : null}
        <div className="min-w-0 flex-1 truncate">{title}</div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>
      {children}
    </header>
  )
}
