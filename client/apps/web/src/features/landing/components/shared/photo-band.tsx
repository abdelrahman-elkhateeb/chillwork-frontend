import { cn } from "@workspace/ui/lib/utils"

import type { LandingPhoto } from "@/features/landing/types/landing.types"

type Props = {
  photo: LandingPhoto
  /** Height classes, e.g. "h-[300px] md:h-[460px]". */
  heightClassName: string
  className?: string
}

const CORNERS = [
  "top-3.5 left-3.5 border-t-2 border-l-2 md:top-6 md:left-6",
  "top-3.5 right-3.5 border-t-2 border-r-2 md:top-6 md:right-6",
  "bottom-3.5 left-3.5 border-b-2 border-l-2 md:bottom-6 md:left-6",
  "bottom-3.5 right-3.5 border-r-2 border-b-2 md:right-6 md:bottom-6",
]

/** Full-bleed photo with the design's viewfinder corner marks. */
export function PhotoBand({ photo, heightClassName, className }: Props) {
  return (
    <figure
      className={cn(
        "relative w-full overflow-hidden bg-[#1B2022]",
        heightClassName,
        className
      )}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        style={{ objectPosition: photo.focus }}
        className="h-full w-full object-cover"
      />
      {CORNERS.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={cn("absolute size-5 border-paper/60 md:size-7", position)}
        />
      ))}
    </figure>
  )
}
