import { useState } from "react"
import { MinusIcon, PlusIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Card, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"
import { cn } from "@workspace/ui/lib/utils"

import { FormAlert } from "@/components/form/form-alert"
import { SubmitButton } from "@/components/form/submit-button"
import { HatchedNote } from "@/components/layout/hatched-note"
import { STATE_COPY } from "@/components/states/state-copy.constants"
import { SavedNote } from "@/components/states/saved-note"
import { hasErrorCode } from "@/lib/api/api-error"
import { API_ERROR_CODES } from "@/lib/api/api.constants"
import { STOCK_REASONS } from "@/features/parts/constants/stock-reasons.constants"
import { useAdjustStock } from "@/features/parts/hooks/use-parts"
import type { AdminPart } from "@/features/parts/types/part.types"

type Direction = "add" | "take"

/**
 * Stock is moved, never typed over — every change carries a reason. Taking
 * off more than there is is stopped before the save, and the server
 * refuses it again anyway, since two people can be on this screen at once.
 */
export function StockMoveCard({ part }: { part: AdminPart }) {
  const adjust = useAdjustStock(part.id)
  const [direction, setDirection] = useState<Direction>("add")
  const [quantityText, setQuantityText] = useState("1")
  const [reason, setReason] = useState<string>(STOCK_REASONS[0])

  const quantity = /^\d+$/.test(quantityText) ? Number(quantityText) : 0
  const now = part.stockQuantity
  const tooMany = direction === "take" && quantity > now
  const after = direction === "add" ? now + quantity : now - quantity
  const canSave = quantity > 0 && !tooMany

  const step = (by: number) => {
    const next = Math.max(0, quantity + by)
    setQuantityText(String(direction === "take" ? Math.min(next, now) : next))
  }

  const save = () => {
    adjust.mutate(
      { delta: direction === "add" ? quantity : -quantity, note: reason },
      { onSuccess: () => setQuantityText("1") }
    )
  }

  const serverTooMany = hasErrorCode(
    adjust.error,
    API_ERROR_CODES.INSUFFICIENT_STOCK
  )

  return (
    <Card className="gap-0 rounded-[8px]">
      <CardHeader className="px-4 py-[13px]">
        <CardTitle className="font-heading text-[13px] font-bold tracking-[-0.01em] uppercase">
          Move the stock
        </CardTitle>
      </CardHeader>
      <div className="p-4">
        <div className="flex items-center justify-between rounded-[5px] bg-surface-sunken px-[13px] py-[11px]">
          <div className="min-w-0 truncate text-[13.5px] font-bold">
            {part.name}
          </div>
          <div className="text-right">
            <div className="font-narrow text-[11.5px] tracking-[0.06em] text-muted-foreground uppercase">
              Now
            </div>
            <div className="font-mono text-[22px] font-semibold">{now}</div>
          </div>
        </div>

        <div
          role="radiogroup"
          aria-label="Which way"
          className="mt-3.5 flex gap-2"
        >
          {(
            [
              ["add", "Add to the shelf"],
              ["take", "Take off the shelf"],
            ] as const
          ).map(([value, label]) => (
            <Button
              key={value}
              type="button"
              role="radio"
              aria-checked={direction === value}
              variant={direction === value ? "default" : "outline"}
              onClick={() => setDirection(value)}
              className={cn(
                "h-[46px] flex-1 text-[14px] font-semibold",
                direction === value
                  ? "border-2 border-primary"
                  : "bg-white"
              )}
            >
              {label}
            </Button>
          ))}
        </div>

        <Label htmlFor="stock-qty" className="mt-3.5 mb-1.5 block text-[13px]">
          How many
        </Label>
        <div className="flex items-center gap-[9px]">
          <Button
            type="button"
            variant="outline"
            aria-label="One fewer"
            onClick={() => step(-1)}
            disabled={quantity <= 1}
            className="size-12 bg-white"
          >
            <MinusIcon />
          </Button>
          <Input
            id="stock-qty"
            inputMode="numeric"
            value={quantityText}
            aria-invalid={tooMany || undefined}
            onChange={(event) =>
              setQuantityText(event.target.value.replace(/\D/g, ""))
            }
            className="h-12 flex-1 bg-white text-center font-mono text-[19px] font-semibold"
          />
          <Button
            type="button"
            variant="outline"
            aria-label="One more"
            onClick={() => step(1)}
            disabled={direction === "take" && quantity >= now}
            className="size-12 bg-white disabled:bg-[#EFF0F0]"
          >
            <PlusIcon />
          </Button>
        </div>

        {tooMany || serverTooMany ? (
          <HatchedNote
            tone="red"
            title={`There ${now === 1 ? "is" : "are"} only ${now} on the shelf`}
            className="mt-3 px-[13px] py-3"
          >
            Stock cannot go below zero. If more really are gone, the count was
            wrong before this — choose “Counted the shelf” and put in what is
            actually there.
          </HatchedNote>
        ) : null}

        <Label htmlFor="stock-why" className="mt-3.5 mb-1.5 block text-[13px]">
          Why
        </Label>
        <NativeSelect
          id="stock-why"
          size="sm"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
        >
          {STOCK_REASONS.map((option) => (
            <NativeSelectOption key={option} value={option}>
              {option}
            </NativeSelectOption>
          ))}
        </NativeSelect>

        {adjust.isError && !serverTooMany ? (
          <FormAlert
            tone="error"
            {...STATE_COPY.saveFailed}
            className="mt-3.5"
          />
        ) : null}

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#E4E6E6] pt-3.5">
          <div>
            <div className="font-narrow text-[12px] text-muted-foreground">
              After this
            </div>
            <div className="mt-px font-mono text-[20px] font-semibold">
              {now} → {canSave ? after : "—"}
            </div>
          </div>
          <SubmitButton
            type="button"
            onClick={save}
            disabled={!canSave}
            pending={adjust.isPending}
            pendingLabel="Saving…"
            className="w-auto px-[22px]"
          >
            Save the move
          </SubmitButton>
        </div>

        {adjust.isSuccess && !adjust.isPending ? (
          <SavedNote label="Stock moved" className="mt-3.5" />
        ) : null}
      </div>
    </Card>
  )
}
