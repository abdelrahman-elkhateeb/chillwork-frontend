/**
 * The decorative mini day board on the sign-in panel: each technician's
 * day as booked (orange) and free (grey) blocks. Illustration, not data.
 */
export const DAY_BOARD = {
  day: "Thursday 12 March",
  rows: [
    { name: "Mostafa K.", blocks: [["busy", 2], ["free", 1], ["busy", 2]] },
    { name: "Hana S.", blocks: [["free", 1], ["busy", 3], ["free", 1]] },
    { name: "Tarek A.", blocks: [["busy", 2], ["free", 2], ["free", 1]] },
  ],
} as const
