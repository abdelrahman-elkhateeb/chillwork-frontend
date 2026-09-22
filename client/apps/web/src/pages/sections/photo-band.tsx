type PhotoBandProps = {
  src: string
  alt: string
  heightClassName: string
}

/**
 * TODO(swap-photo): temporary stock image, replace with real shoot photography.
 */
export function PhotoBand({ src, alt, heightClassName }: PhotoBandProps) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-[#1B2022] ${heightClassName}`}
      data-temp-stock-photo="true"
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <span className="absolute bottom-3 right-3 rounded-[3px] bg-black/60 px-2 py-1 font-mono text-[11px] text-white/80">
        TODO: swap for real shoot photo
      </span>
    </div>
  )
}
