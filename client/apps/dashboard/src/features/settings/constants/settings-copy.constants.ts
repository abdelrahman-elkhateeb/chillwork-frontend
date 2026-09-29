import type { Currency } from "@/features/settings/types/settings.types"

export const CURRENCY_LABELS = {
  EGP: "EGP — Egyptian pound",
  SAR: "SAR — Saudi riyal",
  AED: "AED — UAE dirham",
  USD: "USD — US dollar",
  EUR: "EUR — Euro",
} as const satisfies Record<Currency, string>

export const SETTINGS_COPY = {
  decideOnce: "Decide this once",
  currencyWarning:
    "Every price, every invoice and every part is kept in this currency. Once it is saved there is nothing sensible to convert it to, so it cannot be changed afterwards — by you, or by us.",
  currencyLocked:
    "Locked when these settings were first saved. Every part and invoice is priced in it; changing the label now would silently reprice all of them.",
  currencyLockedHelp:
    "If it is genuinely wrong, it takes a new company — talk to us. That is a worse answer than a dropdown, and it is the honest one.",
  laborFirstTime:
    "Charged once for each unit the technician actually repairs. A unit that is opened and cannot be repaired carries no labour and no parts. This one can be changed later — it only affects invoices issued after the change.",
  laborAfter:
    "Still open. Invoices already issued keep the figure they were issued with.",
} as const
