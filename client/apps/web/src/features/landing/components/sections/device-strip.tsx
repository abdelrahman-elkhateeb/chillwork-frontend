import { Fragment } from "react"
import { cn } from "@workspace/ui/lib/utils"

import {
  DEVICES,
  DEVICES_ON_MOBILE,
} from "@/features/landing/constants/device-strip.constants"

export function DeviceStrip() {
  return (
    <section
      aria-label="Equipment we cover"
      className="overflow-hidden bg-primary"
    >
      <ul className="mx-auto flex h-[46px] max-w-[1440px] items-center gap-4 px-5 md:h-[58px] md:gap-[34px] md:px-16">
        {DEVICES.map((device, index) => {
          const mobileHidden = index >= DEVICES_ON_MOBILE && "hidden md:flex"

          return (
            <Fragment key={device.label}>
              {index > 0 ? (
                <li
                  aria-hidden="true"
                  className={cn(
                    "size-1 shrink-0 bg-ink md:size-[5px]",
                    index >= DEVICES_ON_MOBILE && "hidden md:block"
                  )}
                />
              ) : null}
              <li
                className={cn(
                  "text-[11.5px] font-bold tracking-[0.1em] whitespace-nowrap text-ink uppercase md:text-[13px]",
                  mobileHidden
                )}
              >
                {device.mobileLabel ? (
                  <>
                    <span className="md:hidden">{device.mobileLabel}</span>
                    <span className="hidden md:inline">{device.label}</span>
                  </>
                ) : (
                  device.label
                )}
              </li>
            </Fragment>
          )
        })}
      </ul>
    </section>
  )
}
