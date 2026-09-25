import type { LeakIconName } from "@/features/landing/types/landing.types"

type Props = {
  name: LeakIconName
}

/** Line icons for the "where jobs lose money" cards: ink outline, orange accent. */
export function LeakIcon({ name }: Props) {
  return (
    <svg
      viewBox="0 0 86 66"
      fill="none"
      aria-hidden="true"
      strokeWidth="2"
      className="h-[54px] w-[70px]"
    >
      {name === "missing-part" ? (
        <>
          <g className="stroke-ink">
            <rect x="18" y="12" width="38" height="44" rx="4" />
            <path d="M27 12 V4 M47 12 V4" strokeLinecap="round" />
          </g>
          <path d="M26 26 H48 M26 34 H48" stroke="#9EA4A6" strokeWidth="1.6" />
          <path
            d="M62 24 l16 18 M78 24 l-16 18"
            className="stroke-primary"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </>
      ) : null}

      {name === "second-visit" ? (
        <>
          <g className="stroke-ink">
            <rect x="8" y="22" width="40" height="26" rx="3" />
            <path d="M48 30 H62 l10 10 v8 H48 z" strokeLinejoin="round" />
            <circle cx="22" cy="52" r="6" />
            <circle cx="60" cy="52" r="6" />
          </g>
          <g className="stroke-primary">
            <path d="M74 12 a10 10 0 1 1 -0.1 0" />
            <path d="M74 14 v5 l4 3" strokeLinecap="round" />
          </g>
        </>
      ) : null}

      {name === "double-booking" ? (
        <>
          <g className="stroke-ink">
            <rect x="14" y="12" width="48" height="44" rx="4" />
            <path d="M14 26 H62" />
            <path d="M26 12 V4 M50 12 V4" strokeLinecap="round" />
          </g>
          <g className="stroke-primary">
            <rect x="24" y="34" width="16" height="12" rx="2" />
            <rect x="34" y="40" width="16" height="12" rx="2" />
          </g>
        </>
      ) : null}
    </svg>
  )
}
