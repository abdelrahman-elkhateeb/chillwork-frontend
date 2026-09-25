import { DrawingCallouts } from "@/features/landing/components/illustrations/drawing-callouts"
import { CAPACITOR_CALLOUTS } from "@/features/landing/constants/billing.constants"

/**
 * Start capacitor being fitted: the part drops in (A), stock comes down (B). The A/B markers only show
 * from `md` up — on phones the drawing is small and the text below explains.
 */
export function CapacitorDrawing() {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      className="h-auto w-full max-w-[250px] md:max-w-[370px]"
      role="img"
      aria-label="Technical drawing of a start capacitor with its rating and terminals labelled"
    >
      <g className="stroke-paper">
        <rect
          x="128"
          y="62"
          width="120"
          height="176"
          rx="10"
          strokeWidth="2"
          strokeOpacity="0.55"
        />
        <path d="M128 92 H248" strokeWidth="1.6" strokeOpacity="0.3" />
        <path
          d="M148 130 H228 M148 150 H228 M148 170 H206"
          strokeWidth="1.6"
          strokeOpacity="0.26"
        />
        <ellipse
          cx="188"
          cy="238"
          rx="60"
          ry="9"
          strokeWidth="2"
          strokeOpacity="0.35"
        />
        <path
          d="M128 272 H248 M128 266 V278 M248 266 V278"
          strokeWidth="1.4"
          strokeOpacity="0.28"
        />
      </g>

      <g className="stroke-primary" strokeWidth="2">
        <rect x="160" y="14" width="14" height="16" rx="2" />
        <rect x="181" y="14" width="14" height="16" rx="2" />
        <rect x="202" y="14" width="14" height="16" rx="2" />
        {/* the part going in */}
        <path
          d="M188 34 V52 M182 46 L188 52 L194 46"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <DrawingCallouts
        callouts={CAPACITOR_CALLOUTS}
        radius={16}
        fontSize={13}
        leaderWidth={1.5}
        className="hidden md:inline"
      />

      <text
        x="188"
        y="262"
        textAnchor="middle"
        fontSize="11"
        className="fill-paper/40 font-mono"
      >
        CAP-45/5 · 440V
      </text>
    </svg>
  )
}
