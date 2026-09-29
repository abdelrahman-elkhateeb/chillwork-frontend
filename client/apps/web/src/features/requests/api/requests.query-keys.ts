export const requestKeys = {
  all: ["requests"] as const,
  lists: () => [...requestKeys.all, "list"] as const,
  list: (page: number) => [...requestKeys.lists(), page] as const,
  detail: (requestId: string) =>
    [...requestKeys.all, "detail", requestId] as const,
  timeline: (requestId: string) =>
    [...requestKeys.detail(requestId), "timeline"] as const,
}
