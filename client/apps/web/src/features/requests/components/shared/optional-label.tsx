/** "Brand — if you know it": the aside reads lighter than the label. */
export function OptionalLabel({
  label,
  aside,
}: {
  label: string
  aside: string
}) {
  return (
    // One inline span: the field label is a flex row with a gap.
    <span>
      {label} <span className="font-normal text-[#8A9093]">— {aside}</span>
    </span>
  )
}
