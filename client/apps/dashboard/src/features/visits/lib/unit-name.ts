/** "Bedroom — Carrier" */
export function unitName(device: {
  label: string
  brand: string | null
}): string {
  return device.brand ? `${device.label} — ${device.brand}` : device.label
}
