import { useId } from "react"

import type { JobStepIllustration } from "@/features/landing/types/landing.types"

type Props = {
  name: JobStepIllustration
}

const INK = "#14181A"
const MUTED = "#9EA4A6"
const RED = "#B3201A"
const GREEN = "#17876A"

/** Diagonal red hatch — the product's mark for "blocked or excluded". */
function HatchPattern({ id }: { id: string }) {
  return (
    <defs>
      <pattern
        id={id}
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <path d="M0 0 V4" stroke={RED} strokeWidth="1.6" />
      </pattern>
    </defs>
  )
}

/** Small line drawing for each stage of a job, on a 213×138 card. */
export function StepIllustration({ name }: Props) {
  const hatchId = useId()

  return (
    <svg
      viewBox="0 0 213 138"
      fill="none"
      aria-hidden="true"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full"
    >
      <HatchPattern id={hatchId} />

      {name === "intake" ? (
        <>
          {/* phone with photo → request card + photo */}
          <rect x="56" y="38.5" width="41" height="66.5" rx="5" stroke={INK} />
          <rect
            x="63.5"
            y="47.5"
            width="26"
            height="39.5"
            rx="3"
            stroke={MUTED}
            strokeWidth="1.4"
          />
          <circle cx="76.5" cy="96" r="3" stroke={MUTED} strokeWidth="1.4" />
          <path
            d="M100 66 H111 M107 62 L111 66 L107 70"
            className="stroke-primary"
          />
          <rect x="116" y="42.5" width="41" height="22.5" rx="4" stroke={INK} />
          <path d="M124 50.5 H149" stroke={MUTED} strokeWidth="1.4" />
          <rect
            x="122"
            y="55.5"
            width="29"
            height="4.5"
            rx="2.2"
            className="stroke-primary"
            strokeWidth="1.6"
          />
          <rect x="116" y="82.5" width="41" height="22.5" rx="1" stroke={INK} />
          <circle cx="130.5" cy="94" r="7" stroke={MUTED} strokeWidth="1.6" />
        </>
      ) : null}

      {name === "triage" ? (
        <>
          {/* photos → reading with parts */}
          <rect x="58.5" y="36" width="35" height="26.5" rx="3" stroke={INK} />
          <circle cx="76" cy="49.5" r="5" stroke={MUTED} strokeWidth="1.6" />
          <rect x="58.5" y="70" width="35" height="26.5" rx="3" stroke={INK} />
          <circle cx="76" cy="83.5" r="5" stroke={MUTED} strokeWidth="1.6" />
          <path
            d="M98 66.5 H111 M107 62.5 L111 66.5 L107 70.5"
            className="stroke-primary"
          />
          <rect x="116.5" y="40" width="41.5" height="57" rx="3" stroke={INK} />
          <path
            d="M124 52.5 H150 M124 62.5 H150 M124 72.5 H142"
            stroke={MUTED}
            strokeWidth="1.4"
          />
          <rect
            x="124"
            y="81"
            width="16"
            height="8"
            rx="2"
            className="stroke-primary"
            strokeWidth="1.6"
          />
          <rect
            x="143.5"
            y="81"
            width="7"
            height="8"
            rx="2"
            className="stroke-primary"
            strokeWidth="1.6"
          />
        </>
      ) : null}

      {name === "dispatch" ? (
        <>
          {/* day board with a refused, hatched slot */}
          <rect x="58" y="38.5" width="97" height="62.5" rx="3" stroke={INK} />
          <path d="M58 52.5 H155" stroke={INK} />
          <path
            d="M90.5 52.5 V101 M122.5 52.5 V101"
            stroke={MUTED}
            strokeWidth="1.4"
          />
          <rect
            x="63.5"
            y="59.5"
            width="23"
            height="11"
            rx="1.5"
            fill={INK}
            stroke="none"
          />
          <rect
            x="95"
            y="77"
            width="23"
            height="11"
            rx="1.5"
            fill={INK}
            stroke="none"
          />
          <rect
            x="126.5"
            y="58.5"
            width="24"
            height="12.5"
            rx="1.5"
            fill={`url(#${hatchId})`}
            stroke={RED}
            strokeWidth="1.6"
          />
          <circle cx="138.5" cy="109" r="7" stroke={RED} strokeWidth="1.8" />
          <path d="M134.5 109 H142.5" stroke={RED} strokeWidth="1.8" />
        </>
      ) : null}

      {name === "on-site" ? (
        <>
          {/* part going into the unit, accepted estimate */}
          <path d="M84.5 26 V32.5 M94.5 26 V32.5" className="stroke-primary" />
          <path
            d="M84 32.5 H95 A4 4 0 0 1 99 36.5 V54.5 A4 4 0 0 1 95 58.5 H93 L89.5 65 L86 58.5 H84 A4 4 0 0 1 80 54.5 V36.5 A4 4 0 0 1 84 32.5 Z"
            className="stroke-primary"
          />
          <rect
            x="68.5"
            y="72.5"
            width="58.5"
            height="34"
            rx="5"
            stroke={INK}
          />
          <circle cx="88.5" cy="89.5" r="11" stroke={MUTED} strokeWidth="1.6" />
          <path
            d="M111 79 V100 M116 79 V100 M121 79 V100"
            stroke={MUTED}
            strokeWidth="1.4"
          />
          <rect x="134.5" y="40" width="22.5" height="29" rx="2" stroke={INK} />
          <path
            d="M140 49.5 H151 M140 54.5 H148"
            stroke={MUTED}
            strokeWidth="1.2"
          />
          <path d="M137.5 61.5 L141 65 L147.5 58" stroke={GREEN} />
        </>
      ) : null}

      {name === "close" ? (
        <>
          {/* invoice with one excluded, hatched line */}
          <rect
            x="74.5"
            y="32.5"
            width="64.5"
            height="74"
            rx="4"
            stroke={INK}
          />
          <path d="M82.5 48.5 H130.5" stroke={INK} />
          <path
            d="M82.5 60.5 H116.5 M82.5 70.5 H120.5"
            stroke={MUTED}
            strokeWidth="1.6"
          />
          <rect
            x="82.5"
            y="76.5"
            width="38.5"
            height="10.5"
            rx="1"
            fill={`url(#${hatchId})`}
            stroke={RED}
            strokeWidth="1.6"
          />
          <rect
            x="116.5"
            y="90.5"
            width="14"
            height="4"
            rx="1"
            className="fill-primary"
            stroke="none"
          />
          <path d="M82.5 96.5 H130.5" stroke={INK} />
        </>
      ) : null}
    </svg>
  )
}
