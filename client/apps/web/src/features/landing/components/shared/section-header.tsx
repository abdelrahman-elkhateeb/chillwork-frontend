import { cn } from "@workspace/ui/lib/utils"

import { SectionEyebrow } from "@/features/landing/components/shared/section-eyebrow"

type Props = {
  eyebrow: string
  title: string
  /** Short note set against the title's baseline on the right. */
  aside?: string
  tone?: "light" | "dark"
  /** Max width of the title, e.g. "lg:max-w-[700px]". */
  titleClassName?: string
  /** Width of the note, e.g. "lg:w-[380px]". */
  asideClassName?: string
  className?: string
}

/** Eyebrow, big uppercase title and an optional right-hand note. */
export function SectionHeader({
  eyebrow,
  title,
  aside,
  tone = "light",
  titleClassName,
  asideClassName,
  className,
}: Props) {
  const dark = tone === "dark"

  return (
    <div
      className={cn(
        "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-14",
        className
      )}
    >
      <div>
        <SectionEyebrow tone={tone} className="mb-4 md:mb-[22px]">
          {eyebrow}
        </SectionEyebrow>
        <h2
          className={cn(
            "max-w-[760px] text-[28px] leading-[1.1] font-bold tracking-[-0.026em] md:text-[36px] lg:text-[40px]",
            dark ? "text-paper-bright" : "text-ink",
            titleClassName
          )}
        >
          {title}
        </h2>
      </div>

      {aside ? (
        <p
          className={cn(
            "max-w-[420px] text-[15px] leading-[1.58] md:text-[15.5px] lg:mb-1 lg:w-[400px] lg:shrink-0",
            dark ? "text-paper/65" : "text-muted-foreground",
            asideClassName
          )}
        >
          {aside}
        </p>
      ) : null}
    </div>
  )
}
