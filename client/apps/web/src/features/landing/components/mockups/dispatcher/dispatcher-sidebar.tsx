import { cn } from "@workspace/ui/lib/utils"

import {
  DISPATCHER_MOCKUP,
  DISPATCHER_SIDEBAR,
} from "@/features/landing/constants/dispatcher-mockup.constants"

export function DispatcherSidebar() {
  return (
    <div className="w-[180px] shrink-0 border-r border-paper/10 bg-[#1B2022]">
      <div className="border-b border-paper/10 px-[15px] pt-[18px] pb-4">
        <p className="text-[12px] font-bold tracking-[0.1em] text-paper/50 uppercase">
          {DISPATCHER_MOCKUP.company}
        </p>
        <p className="mt-1.5 text-[12.5px] text-paper/80">
          {DISPATCHER_MOCKUP.user}
        </p>
      </div>

      <ul className="flex flex-col px-[9px] pt-3">
        {DISPATCHER_SIDEBAR.map((item) => (
          <li
            key={item.label}
            className={cn(
              "flex h-[30px] items-center justify-between rounded-[4px] px-[11px] text-[12.5px]",
              item.active
                ? "border-l-2 border-primary bg-primary/20 font-semibold text-paper-bright"
                : "text-paper/75"
            )}
          >
            <span>{item.label}</span>
            <span
              className={cn(
                "text-[11px]",
                item.mono && "font-mono",
                item.alert ? "text-primary" : "text-paper/40"
              )}
            >
              {item.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
