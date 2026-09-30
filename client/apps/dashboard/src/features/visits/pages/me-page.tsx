import { Card } from "@workspace/ui/components/card"

import { SubmitButton } from "@/components/form/submit-button"
import { Eyebrow } from "@/components/layout/eyebrow"
import { useCurrentUser, useLogout } from "@/features/auth"
import { ScreenBody } from "@/features/visits/components/shared/screen-body"
import { ScreenHeader } from "@/features/visits/components/shared/screen-header"

/** The "Me" tab: who is signed in, and signing out. */
export function MePage() {
  const { user } = useCurrentUser()
  const logout = useLogout()

  if (!user) {
    return null
  }

  return (
    <>
      <ScreenHeader
        title={<h1 className="text-[13px] font-bold text-paper-bright">Me</h1>}
      />
      <ScreenBody className="flex flex-col gap-3.5 py-4 md:py-6">
        <Card className="gap-0 rounded-[6px] px-[15px] py-3.5">
          <div className="text-[17px] font-bold">{user.name}</div>
          <Eyebrow className="mt-3">Work email</Eyebrow>
          <div className="mt-0.5 text-[14px] break-all">{user.email}</div>
          <Eyebrow className="mt-3">Phone</Eyebrow>
          <div className="mt-0.5 text-[14px]">{user.phone}</div>
        </Card>
        <p className="font-narrow text-[12.5px] leading-[1.5] text-muted-foreground">
          To change your details, ask the office. Changing your own password
          isn't built yet.
        </p>
        <SubmitButton
          type="button"
          variant="outline"
          pending={logout.isPending}
          pendingLabel="Signing out…"
          onClick={() => logout.mutate()}
          className="border-line-strong bg-white text-foreground hover:bg-secondary"
        >
          Sign out
        </SubmitButton>
      </ScreenBody>
    </>
  )
}
