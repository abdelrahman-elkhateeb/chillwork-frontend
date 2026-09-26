import { Card, CardContent } from "@workspace/ui/components/card"

import type { AccountDetail } from "@/features/account/types/account.types"

type Props = {
  details: readonly AccountDetail[]
}

export function AccountDetails({ details }: Props) {
  return (
    <Card asChild className="divide-y divide-border">
      <dl>
        {details.map((detail) => (
          <CardContent
            key={detail.label}
            className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <dt className="text-[13.5px] font-semibold text-muted-foreground">
              {detail.label}
            </dt>
            <dd className="text-[15px] break-all text-foreground">
              {detail.value}
            </dd>
          </CardContent>
        ))}
      </dl>
    </Card>
  )
}
