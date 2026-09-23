import type { DrawingCallout } from "@/features/landing/types/landing.types"

type Props = {
  callouts: readonly DrawingCallout[]
  radius?: number
  fontSize?: number
  leaderWidth?: number
  className?: string
}

/** Orange ringed labels with dashed leader lines, drawn inside a parent <svg>. */
export function DrawingCallouts({
  callouts,
  radius = 17,
  fontSize = 14,
  leaderWidth = 1.6,
  className,
}: Props) {
  return (
    <g className={className}>
      {callouts.map(({ label, cx, cy, leaderToX }) => {
        const leaderFromX = leaderToX > cx ? cx + radius : cx - radius

        return (
          <g key={label}>
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              className="stroke-primary"
              strokeWidth="2"
            />
            <text
              x={cx}
              y={cy + fontSize * 0.42}
              textAnchor="middle"
              fontSize={fontSize}
              fontWeight="700"
              className="fill-primary stroke-none font-sans"
            >
              {label}
            </text>
            <path
              d={`M${leaderFromX} ${cy} H${leaderToX}`}
              className="stroke-primary"
              strokeWidth={leaderWidth}
              strokeDasharray="4 4"
            />
          </g>
        )
      })}
    </g>
  )
}
