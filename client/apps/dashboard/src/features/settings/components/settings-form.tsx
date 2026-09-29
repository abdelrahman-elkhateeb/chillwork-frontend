import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LockIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { FieldSet } from "@workspace/ui/components/field"
import { Label } from "@workspace/ui/components/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"

import { FormAlert } from "@/components/form/form-alert"
import { MoneyField } from "@/components/form/money-field"
import { SubmitButton } from "@/components/form/submit-button"
import { TextField } from "@/components/form/text-field"
import { STATE_COPY } from "@/components/states/state-copy.constants"
import { SavedNote } from "@/components/states/saved-note"
import { hasErrorCode } from "@/lib/api/api-error"
import { API_ERROR_CODES } from "@/lib/api/api.constants"
import { applyServerFieldErrors } from "@/lib/forms/apply-server-field-errors"
import { minorToInput } from "@/lib/format/money"
import {
  CURRENCY_LABELS,
  SETTINGS_COPY,
} from "@/features/settings/constants/settings-copy.constants"
import { useUpdateCompanySettings } from "@/features/settings/hooks/use-company-settings"
import {
  settingsSchema,
  type SettingsFormInput,
  type SettingsFormValues,
} from "@/features/settings/schemas/settings.schema"
import {
  CURRENCIES,
  type CompanySettings,
} from "@/features/settings/types/settings.types"

type Props = { settings: CompanySettings }

/**
 * The field about to lock is the only one with a border around it, and
 * the warning sits under it rather than in a dialog after the fact.
 */
export function SettingsForm({ settings }: Props) {
  const update = useUpdateCompanySettings()
  const locked = settings.currency !== null

  const defaults: SettingsFormInput = {
    name: settings.name,
    phone: settings.contact.phone ?? "",
    currency: settings.currency ?? "EGP",
    laborFee: minorToInput(settings.laborFeeMinor),
  }

  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<SettingsFormInput, unknown, SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: defaults,
  })

  const currency = useWatch({ control, name: "currency" })

  const onSubmit = handleSubmit((values) => {
    update.mutate(
      {
        name: values.name,
        contact: { phone: values.phone },
        laborFeeMinor: values.laborFee,
        // Sent only while it is still open; the API refuses a change after.
        ...(locked ? {} : { currency: values.currency }),
      },
      {
        onSuccess: (saved) =>
          reset({
            name: saved.name,
            phone: saved.contact.phone ?? "",
            currency: saved.currency ?? "EGP",
            laborFee: minorToInput(saved.laborFeeMinor),
          }),
        onError: (error) =>
          applyServerFieldErrors(error, setError, ["name", "currency"]),
      }
    )
  })

  const currencyLockedError = hasErrorCode(
    update.error,
    API_ERROR_CODES.CURRENCY_LOCKED
  )

  return (
    <form noValidate onSubmit={onSubmit} className="px-[18px] py-4">
      {update.isError ? (
        <FormAlert
          tone="error"
          {...(currencyLockedError
            ? {
                title: "The currency is already set",
                description: SETTINGS_COPY.currencyLocked,
              }
            : STATE_COPY.saveFailed)}
          className="mb-4"
        />
      ) : null}

      <FieldSet disabled={update.isPending} className="gap-3.5">
        <TextField
          label="Company name"
          error={errors.name?.message}
          className="h-[42px] bg-white text-[14.5px]"
          {...register("name")}
        />
        <TextField
          label="Phone customers call"
          type="tel"
          error={errors.phone?.message}
          className="h-[42px] bg-white text-[14.5px]"
          {...register("phone")}
        />

        {locked ? (
          <div className="mt-1">
            <div className="mb-1.5 flex items-center gap-[7px] text-muted-foreground">
              <LockIcon className="size-3.5" />
              <span className="text-[13px] font-semibold">Currency</span>
            </div>
            <div className="flex h-11 items-center rounded-[5px] border border-line-strong bg-hatch-muted px-3 text-[14.5px] text-muted-foreground">
              {CURRENCY_LABELS[settings.currency!]}
            </div>
            <p className="mt-2 font-narrow text-[13px] leading-[1.55] text-muted-foreground">
              {SETTINGS_COPY.currencyLocked}
            </p>
            <p className="mt-1.5 font-narrow text-[12.5px] leading-[1.55] text-muted-foreground">
              {SETTINGS_COPY.currencyLockedHelp}
            </p>
          </div>
        ) : (
          <div className="mt-1 overflow-hidden rounded-[6px] border-2 border-primary">
            <div className="border-b border-primary/35 bg-[#FFF3EC] px-[13px] py-[9px] font-narrow text-[11.5px] font-bold tracking-[0.08em] text-primary-deep uppercase">
              {SETTINGS_COPY.decideOnce}
            </div>
            <div className="p-[13px]">
              <Label htmlFor="settings-currency" className="mb-1.5 block text-[13px]">
                Currency
              </Label>
              <NativeSelect
                id="settings-currency"
                size="sm"
                aria-invalid={errors.currency ? true : undefined}
                {...register("currency")}
              >
                {CURRENCIES.map((code) => (
                  <NativeSelectOption key={code} value={code}>
                    {CURRENCY_LABELS[code]}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              <p className="mt-2 font-narrow text-[13px] leading-[1.55] text-muted-foreground">
                {SETTINGS_COPY.currencyWarning}
              </p>
            </div>
          </div>
        )}

        <MoneyField
          label="Labour, per unit that gets fixed"
          currency={settings.currency ?? currency ?? null}
          hint={locked ? SETTINGS_COPY.laborAfter : SETTINGS_COPY.laborFirstTime}
          error={errors.laborFee?.message}
          {...register("laborFee")}
        />
      </FieldSet>

      <div className="mt-[18px] flex gap-[9px]">
        <SubmitButton
          pending={update.isPending}
          pendingLabel="Saving…"
          className="flex-1"
        >
          {locked ? "Save changes" : "Save these settings"}
        </SubmitButton>
        {locked ? (
          <Button
            type="button"
            variant="outline"
            disabled={!isDirty || update.isPending}
            onClick={() => reset(defaults)}
            className="h-12 bg-white px-4 text-[14px] font-semibold"
          >
            Cancel
          </Button>
        ) : null}
      </div>

      {update.isSuccess && !isDirty ? <SavedNote className="mt-4" /> : null}
    </form>
  )
}
