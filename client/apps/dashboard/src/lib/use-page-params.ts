import { useCallback } from "react"
import { useSearchParams } from "react-router-dom"

/**
 * `?q=&page=` kept in the URL, so a filtered list survives a reload and
 * the back button. Changing the search always goes back to page 1.
 */
export function usePageParams() {
  const [params, setParams] = useSearchParams()
  const search = params.get("q") ?? ""
  const page = Math.max(1, Number(params.get("page")) || 1)

  const setSearch = useCallback(
    (next: string) => {
      setParams(
        (current) => {
          const updated = new URLSearchParams(current)
          if (next) updated.set("q", next)
          else updated.delete("q")
          updated.delete("page")
          return updated
        },
        { replace: true }
      )
    },
    [setParams]
  )

  const setPage = useCallback(
    (next: number) => {
      setParams((current) => {
        const updated = new URLSearchParams(current)
        if (next > 1) updated.set("page", String(next))
        else updated.delete("page")
        return updated
      })
      window.scrollTo({ top: 0 })
    },
    [setParams]
  )

  return { search, page, setSearch, setPage }
}
