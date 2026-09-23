import type { AuthAsideDrawingVariant } from "@/features/auth/types/auth-layout.types"

type Props = {
  variant: AuthAsideDrawingVariant
}

/** Faint AC line drawing bleeding off the side panel's right edge. */
export function AuthAsideDrawing({ variant }: Props) {
  const isSplit = variant === "split"

  return (
    <svg
      viewBox="0 0 360 300"
      aria-hidden="true"
      fill="none"
      stroke="#F0F1F1"
      className={
        isSplit
          ? "pointer-events-none absolute right-[-70px] bottom-24 z-0 h-[300px] w-[360px] opacity-[0.09]"
          : "pointer-events-none absolute top-[250px] right-[-80px] z-0 h-[270px] w-[330px] opacity-[0.08]"
      }
    >
      {isSplit ? (
        <>
          <rect x="20" y="20" width="180" height="56" rx="10" strokeWidth="3" />
          <path d="M36 42 H184" strokeWidth="2.4" />
          <path d="M96 76 C 96 130, 130 150, 150 186" strokeWidth="3" />
          <path d="M112 76 C 112 128, 146 148, 166 186" strokeWidth="3" />
        </>
      ) : null}
      <rect x="86" y="186" width="200" height="130" rx="8" strokeWidth="3" />
      <circle cx="150" cy="248" r="44" strokeWidth="3" />
      <circle cx="150" cy="248" r="11" strokeWidth="3" />
      <path d="M226 202 V294 M242 202 V294 M258 202 V294" strokeWidth="2.4" />
    </svg>
  )
}
