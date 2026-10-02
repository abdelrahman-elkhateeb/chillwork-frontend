import { cn } from "@workspace/ui/lib/utils"

import { LandingContainer } from "@/features/landing/components/shared/landing-container"
import { SectionEyebrow } from "@/features/landing/components/shared/section-eyebrow"
import type { PhotoFeature as PhotoFeatureContent } from "@/features/landing/types/landing.types"

type Props = {
  content: PhotoFeatureContent
  /** Photo on the left and copy on the right (desktop only). */
  reverse?: boolean
  className?: string
}

const CORNERS = [
  "top-3 left-3 border-t-2 border-l-2 md:top-4 md:left-4",
  "top-3 right-3 border-t-2 border-r-2 md:top-4 md:right-4",
  "bottom-3 left-3 border-b-2 border-l-2 md:bottom-4 md:left-4",
  "bottom-3 right-3 border-r-2 border-b-2 md:right-4 md:bottom-4",
]

/** Copy beside a framed photo with the design's viewfinder corner marks. */
export function PhotoFeature({ content, reverse, className }: Props) {
  const { photo } = content

  return (
    <section className={className}>
      <LandingContainer
        className={cn(
          "flex flex-col gap-7 py-10 md:gap-10 md:py-20 lg:flex-row lg:items-center lg:gap-[72px]",
          reverse && "lg:flex-row-reverse"
        )}
      >
        <div className="min-w-0 flex-1">
          <SectionEyebrow className="mb-4 md:mb-[22px]">
            {content.eyebrow}
          </SectionEyebrow>
          <h2 className="max-w-[560px] text-[28px] leading-[1.1] font-bold tracking-[-0.026em] text-ink md:text-[36px] lg:text-[40px]">
            {content.title}
          </h2>
          <p className="mt-4 max-w-[520px] text-[15px] leading-[1.6] text-muted-foreground md:mt-5 md:text-[16px]">
            {content.body}
          </p>

          <ol className="mt-6 max-w-[520px] border-b border-border md:mt-8">
            {content.points.map((point, index) => (
              <li
                key={point}
                className="flex items-baseline gap-4 border-t border-border py-3 md:py-3.5"
              >
                <span className="font-mono text-[12px] font-semibold text-primary-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[14.5px] font-medium text-ink md:text-[15px]">
                  {point}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <figure className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-[6px] bg-ink sm:aspect-[16/10] lg:aspect-[4/5] lg:w-[440px]">
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
              className={cn(
                "absolute size-5 border-paper/70 md:size-6",
                position
              )}
            />
          ))}
        </figure>
      </LandingContainer>
    </section>
  )
}
