import type { ReactNode } from "react"
import { QueryClientProvider } from "@tanstack/react-query"

import { queryClient } from "@/app/query-client"
import { ThemeProvider } from "@/components/theme-provider"

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Light by default: the design has no dark palette yet (the .dark
          tokens are still shadcn's neutral placeholders). */}
      <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
    </QueryClientProvider>
  )
}
