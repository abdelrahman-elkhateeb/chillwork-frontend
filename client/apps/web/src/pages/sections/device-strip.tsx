const DEVICES = [
  "Split & window AC",
  "Chillers",
  "Commercial refrigeration",
  "Washers & dryers",
  "Water heaters",
]

export function DeviceStrip() {
  return (
    <div className="w-full bg-primary py-3">
      <p className="mx-auto max-w-[1200px] px-4 text-center font-mono text-[13px] font-medium uppercase tracking-[-0.01em] text-[#14181A] md:px-8">
        {DEVICES.join(" · ")}
      </p>
    </div>
  )
}
