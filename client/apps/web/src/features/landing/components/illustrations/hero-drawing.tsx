import { DrawingCallouts } from "@/features/landing/components/illustrations/drawing-callouts"
import { HERO_CALLOUTS } from "@/features/landing/constants/hero.constants"

/** Technical drawing of a split AC with the four job stages marked on it. */
export function HeroDrawing() {
  return (
    <svg
      viewBox="0 0 560 500"
      fill="none"
      className="h-auto w-full max-w-[560px]"
      role="img"
      aria-label="Technical drawing of a split air-conditioning system with the four stages of a ChillWork job marked on it"
    >
      <g className="stroke-paper">
        {/* indoor unit */}
        <rect
          x="86"
          y="44"
          width="248"
          height="76"
          rx="12"
          strokeWidth="2"
          strokeOpacity="0.52"
        />
        <path
          d="M104 64 H316 M104 77 H316"
          strokeWidth="1.6"
          strokeOpacity="0.3"
        />
        <path
          d="M126 110 l-8 12 M160 110 l-8 12 M194 110 l-8 12 M228 110 l-8 12 M262 110 l-8 12"
          strokeWidth="1.4"
          strokeOpacity="0.24"
          strokeLinecap="round"
        />

        {/* refrigerant lines */}
        <path
          d="M180 120 C 180 190, 224 214, 250 268"
          strokeWidth="2"
          strokeOpacity="0.4"
        />
        <path
          d="M198 120 C 198 188, 242 212, 268 268"
          strokeWidth="2"
          strokeOpacity="0.4"
        />

        {/* outdoor unit */}
        <rect
          x="150"
          y="268"
          width="290"
          height="192"
          rx="8"
          strokeWidth="2"
          strokeOpacity="0.52"
        />
        <circle cx="248" cy="364" r="66" strokeWidth="2" strokeOpacity="0.36" />
        <path
          d="M248 349 C 274 344, 288 358, 282 378"
          strokeWidth="2"
          strokeOpacity="0.36"
        />
        <path
          d="M235 372 C 218 392, 228 410, 248 410"
          strokeWidth="2"
          strokeOpacity="0.36"
        />
        <path
          d="M260 372 C 274 392, 258 412, 236 404"
          strokeWidth="2"
          strokeOpacity="0.25"
        />
        <path
          d="M352 292 V436 M370 292 V436 M388 292 V436 M406 292 V436 M424 292 V436"
          strokeWidth="1.6"
          strokeOpacity="0.24"
        />

        {/* scale bar */}
        <path
          d="M86 480 H334 M86 474 V486 M334 474 V486"
          strokeWidth="1.4"
          strokeOpacity="0.28"
        />
      </g>

      <g className="stroke-primary" strokeWidth="2">
        <rect x="104" y="92" width="212" height="12" rx="6" />
        <circle cx="222" cy="196" r="5" />
        <circle cx="248" cy="364" r="15" />
        <rect x="168" y="286" width="46" height="26" rx="3" />
        <path d="M176 299 H206" strokeWidth="1.6" />
      </g>

      <DrawingCallouts callouts={HERO_CALLOUTS} />

      <text
        x="210"
        y="470"
        textAnchor="middle"
        fontSize="11"
        className="fill-paper/40 font-mono"
      >
        SPLIT UNIT 1.5T
      </text>
    </svg>
  )
}
