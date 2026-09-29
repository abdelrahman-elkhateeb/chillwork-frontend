import { Card, CardHeader, CardTitle } from "@workspace/ui/components/card"

import { PageHeader } from "@/components/layout/page-header"
import { DetailSkeleton } from "@/components/states/skeletons"
import { ErrorState } from "@/components/states/error-state"
import { SettingsForm } from "@/features/settings/components/settings-form"
import { useCompanySettings } from "@/features/settings/hooks/use-company-settings"

export function SettingsPage() {
  const settings = useCompanySettings()
  const firstTime = settings.data ? settings.data.currency === null : false

  return (
    <div className="mx-auto max-w-[560px]">
      <PageHeader
        title="Company settings"
        description="The currency and labour fee every visit and invoice uses."
      />

      <Card className="mt-5 gap-0 rounded-[8px]">
        <CardHeader
          className={
            firstTime || !settings.data
              ? "px-[18px] py-[13px]"
              : "border-b-0 bg-ink px-[18px] py-[13px]"
          }
        >
          <CardTitle
            className={
              firstTime || !settings.data
                ? "font-heading text-[13px] font-bold tracking-[-0.01em] uppercase"
                : "font-heading text-[13px] font-bold tracking-[-0.01em] text-paper-bright uppercase"
            }
          >
            {firstTime ? "First time — nothing saved yet" : "Settings"}
          </CardTitle>
          {firstTime ? (
            <span className="font-narrow text-[11px] font-bold tracking-[0.06em] text-primary-deep uppercase">
              Open
            </span>
          ) : null}
        </CardHeader>

        {settings.isPending ? (
          <DetailSkeleton />
        ) : settings.isError ? (
          <ErrorState
            error={settings.error}
            onRetry={() => void settings.refetch()}
          />
        ) : (
          <SettingsForm settings={settings.data} />
        )}
      </Card>
    </div>
  )
}
