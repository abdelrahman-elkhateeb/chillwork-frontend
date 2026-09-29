/** Copy from the "Request — step 2" and "Request — steps 1, 3 and states" boards. */
export const REQUEST_STEPS = [
  { id: "where", title: "Where and who" },
  { id: "units", title: "The units" },
  { id: "review", title: "Check and send" },
] as const

export const REQUEST_COPY = {
  savedAsYouType: "Saved as you type",
  where: {
    title: "Where and who",
    description:
      "Address and phone are asked once, not per unit. They belong to the visit.",
    address: "Address",
    directions: "How to find you",
    directionsPlaceholder: "Flat, floor, landmark",
    phone: "Phone for the day",
    phoneHint:
      "The technician calls this when he sets off. Use a number someone will answer.",
    next: "Next — the units",
  },
  units: {
    title: "What needs looking at?",
    description:
      "Add every unit you want checked, even the ones that are only a bit off. One technician, one visit, one call-out fee.",
    location: "Where is it?",
    locationPlaceholder: "Bedroom, living room, kitchen…",
    brand: "Brand",
    brandAside: "if you know it",
    brandPlaceholder: "Leave blank if unsure",
    model: "Model",
    modelAside: "optional",
    modelPlaceholder: "On the sticker inside",
    issue: "What is it doing?",
    issuePlaceholder: "Tell us what you see, hear or smell",
    issueHint:
      "Say what you hear and when it started — that is what tells us which part to bring.",
    add: "Add another unit",
    edit: "Edit",
  },
  summary: {
    eyebrow: "This request",
    oneVisit: "one visit",
    change: "Change →",
    callOut:
      "One call-out fee covers every unit at this address. Adding another costs you nothing extra to have looked at.",
    next: "Check and send",
  },
  review: {
    title: "Check and send",
    description:
      "Nothing is sent until you press send. Everything is still editable.",
    edit: "Edit",
    send: "Send this request",
    back: "Back to the units",
  },
  sending: {
    label: "Sending your request",
    title: "Don't refresh",
    description:
      "The request carries a one-time key. If your connection drops and it retries, you still get one request, not two.",
  },
  sent: {
    eyebrow: "Your request number",
    quote: "Quote this if you call us.",
    nextTitle: "What happens next",
    nextBody:
      "We read what you told us and pick the right technician, then you get the slot and his name before he sets off.",
    done: "Follow this request",
  },
  failed: {
    stillHere: "Still here, exactly as you left it",
    retry: "Try again",
  },
} as const

export const UNIT_STATUS_LABELS = {
  ready: "Ready",
  needsDescription: "Needs a description",
  needsLocation: "Needs a location",
} as const
