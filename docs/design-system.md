**ChillWork**

# How the thing is supposed to look

The whole visual system in one page: tokens, type, every component rendered at the size it ships at, and the rules that decide which one to reach for. Built on shadcn/ui out of `packages/ui`. If a screen disagrees with this page, this page is right.

[Rules](#rules) [Color](#color) [Type](#type) [Space](#space) [Buttons](#buttons) [Forms](#forms) [Status](#status) [Hatching](#hatch) [Surfaces](#surfaces) [Tables](#tables) [Money](#money) [States](#states) [Shells](#shells) [Words](#words) [shadcn map](#map)

00

## Nine rules that hold the whole thing together

Read these before anything else. Every component below is downstream of them, and breaking one is how a screen stops looking like the rest of the product.

- **Orange marks one thing per screen.** The single action this screen exists for. A second orange button on the same screen means the hierarchy is wrong, not that the screen is important.
- **Text on orange is graphite, never white.** `#14181A` on `#EA5B1B` reads at about 5.1:1; white falls to roughly 3.2 and fails.
- **Hatching means blocked or excluded.** One meaning, product-wide. It is never texture.
- **A disabled action is greyed, not hidden.** The user is allowed to see that more exists and why it is not available yet.
- **Status is a sentence, not a code.** “Waiting for a visit”, not `PENDING_ASSIGNMENT`.
- **Mono is for machine values only** — ids, codes, amounts, timestamps, keys. Never for prose, never for headings.
- **Zero-state is never a shrug.** Empty names what is missing and carries the button that fills it.
- **Technician targets are 48px minimum.** He taps this on a roof with a glove on.
- **Nothing jumps.** Loading is the shape of what is coming; a button keeps its width while it works.

**Light only for v1.** There is no dark theme for the product, and one should not be improvised. The documentation page you are reading follows your system theme; every specimen below is pinned to the product's real light palette so the colours are accurate.

01

## Color

Warm graphite and a working orange. The neutrals are very slightly cool so the orange sits on them without turning muddy. Semantic colours are used only for meaning — they are never decoration and never a second accent.

#### Surfaces and ink

**ink**

#14181A

All body text. Also the dark panel background on headers and technician screens.

**paper**

#F0F1F1

Page background. Everything sits on this.

**card**

#FAFBFB

Panels and cards, one step above the page.

**sunk**

#E9EBEB

Panel header bars, inset blocks, read-only summaries.

**hair**

#E4E6E6

Internal dividers inside a panel. Table row lines use #EDEEEE.

**line**

#D7D9D9

The border of a panel or card.

**line-strong**

#C0C4C4

Inputs and secondary buttons — anything the user can act on.

**muted-fg**

#5F6568

Secondary text, help text, footnotes.

**faint-fg**

#8A9093

Placeholders, mono metadata, the quietest labels.

#### Primary

**primary**

#EA5B1B

Fills only: the one action per screen, the 3px rule under a page title, an active marker.

**primary-ink**

#B8440E

Orange as TEXT on a light surface. Links, the one status that needs clearing.

**primary-wash**

#FFF3EC

The tint on a row that needs attention. One row type per table, never all of them.

**primary-soft**

#F4A576

A primary button while it is working. Same size, same text colour.

#### Semantic

**cyan**

#19A2C4 · ink #145A75

Happening right now. Technician on site, unit count.

**blue**

#1F6FA8 · ink #1A5583

Booked, scheduled, informational. Not a warning.

**teal**

#17876A · ink #11705A

Done, fixed, saved, working.

**red**

#B3201A · ink #8E1913

Destroyed, refused, failed, not fixed. The only colour that pairs with hatching.

#### Paste this into the theme

```
/* packages/ui — globals.css. shadcn token names, ChillWork values. */
:root {
  --background: 180 3% 94%;        /* #F0F1F1 paper       */
  --foreground: 200 13% 9%;        /* #14181A ink         */
  --card: 180 11% 98%;             /* #FAFBFB             */
  --card-foreground: 200 13% 9%;
  --popover: 0 0% 100%;
  --popover-foreground: 200 13% 9%;
  --primary: 19 83% 51%;           /* #EA5B1B             */
  --primary-foreground: 200 13% 9%;/* graphite, NOT white */
  --secondary: 180 5% 92%;         /* #E9EBEB sunk        */
  --secondary-foreground: 200 13% 9%;
  --muted: 180 4% 90%;             /* #E4E6E6             */
  --muted-foreground: 200 5% 39%;  /* #5F6568             */
  --accent: 19 83% 51%;
  --accent-foreground: 200 13% 9%;
  --destructive: 2 75% 40%;        /* #B3201A             */
  --destructive-foreground: 0 0% 100%;
  --border: 180 3% 85%;            /* #D7D9D9             */
  --input: 180 3% 76%;             /* #C0C4C4             */
  --ring: 19 83% 51%;
  --radius: 0.375rem;              /* 6px, one value      */
}
/* No .dark block. v1 is light only — see the rule above. */
```

02

## Type

One family doing four jobs, plus a mono for machine values. Archivo carries a trade-signage feel without being a novelty face, and its condensed cut is what makes dense tables readable instead of cramped.

```
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?
  family=Archivo:wdth,wght@100,400;100,500;100,600;100,700;125,700
  &family=Archivo+Narrow:wght@400;500;600;700
  &family=IBM+Plex+Mono:wght@400;500;600&display=swap">

/* Expanded display = Archivo at width 125 */
.display { font-family:'Archivo'; font-stretch:125%; font-weight:700;
           text-transform:uppercase; letter-spacing:-0.024em; }
```

**The scale**every size in the product

display-xl · 34/1.1 · -0.026emGet your unit looked at

display-l · 27/1.0 · -0.024emCreate your account

display-m · 20/1.15Waiting for a visit

panel-head · 12.5/1.2Schedule a visit

body-l · 16/1.55Mahmoud is on his way between 10:00 and 12:00.

body · 15/1.55You are charged per unit we actually fix.

body-s · 13.5/1.5Replaced the start capacitor and the contactor.

narrow-data · 13.5/1.514 Street 9, Maadi — flat 6, third floor

label · 11.5/1 · 0.1em · capsUnit by unit

mono · 13/1.4REQ-2481 · VIS-3390 · CAP-45/5

**When to use which.** Expanded uppercase is only for naming something — a page, a panel, a screen. Archivo regular is anything read as a sentence. Archivo Narrow is dense data: table cells, footnotes, the small print under a control. Mono is only a value a machine produced.

03

## Space, radius, edges

| Thing | Value | Where |
| --- | --- | --- |
| Page gutter | 48px desktop · 20px at 390 | Outer padding on the page shell. |
| Panel padding | 16–18px | Body of a card. Header bar is 11–13px vertical. |
| Gap between panels | 20px | Columns in a row, cards in a stack. |
| Gap inside a form | 14–16px | Between one labelled field and the next. |
| Radius | 6px | One value. Inputs and chips may use 5px and 3px respectively; nothing else deviates. |
| Rule under a page title | 3px solid primary | Every full screen. It is the one consistent piece of chrome. |
| Elevation | none | No shadows anywhere. Depth is a 1px border and a surface step. |
| Touch target | 48px min on technician | Admin may go to 40px, customer to 44px. Never below. |

There are no shadows in this product on purpose. Everything is separated by a hairline and a change of surface, which is what makes a dense table and a marketing page look like the same company.

04

## Buttons

**Variants**height 46 default

**One orange per screen.** Secondary is white with a `#C0C4C4` border. Destructive red is a fill only when the thing is genuinely destroyed (stopping a technician); an outline in red is for the softer cancel. A working button keeps its exact width and swaps to `#F4A576` with a spinner, so the layout never moves.

| Size | Height | Use on |
| --- | --- | --- |
| sm | 34px · 13px text | Inside a panel header or a table row. |
| md | 40–42px · 14px | Admin forms and secondary actions. |
| default | 46–48px · 14.5px | The main action on any screen. |
| tech | 52–54px, full width | Technician screens only. Always full width, always the last thing in the card. |

05

## Forms

**Field, help, error**height 42 · radius 5

Phone for the day

The technician calls this when he sets off. Use a number someone will answer.

Phone for the day

That is four digits. A mobile number here is eleven.

Why

How many

Steppers, not a keyboard. The plus button dies at the stock limit.

**Rules.** Every field has a real `<label>` with a stable `id`. Help text sits under the field and explains consequence, not format. An error replaces the help text, is specific, and never says “invalid”. `fieldErrors` from the API maps straight onto these — a rejected field keeps its own message instead of a banner saying something is wrong.

**Search, and a locked field**38–40px

Name, phone or request number

Currency

EGP — Egyptian pound

Locked when these settings were first saved.

**Locked is not hidden.** A field that can no longer change keeps its value legible, gains a padlock beside the label and the neutral hatch, and says in one line what changing it would break.

06

## Status chips

**Every status in the product**11.5px caps · radius 3

Waiting for a visit Visit booked · Thu 13:00 Technician on site Finished · 1 of 2 fixed Cancelled

Working Invited · 2 days Link expired Stopped None Fixed Not fixed

**Orange is scarce on purpose.** In a list, only the status that is the reader's job to clear is orange, and only that row gets the `#FFF3EC` tint. A list where every row shouts tells him nothing.

| Colour | Means | Examples |
| --- | --- | --- |
| orange | Needs a person to act. One per list. | Waiting for a visit · Invited |
| blue | Arranged, in the future, nothing to do. | Visit booked · Already scheduled |
| cyan | Happening right now. | Technician on site · 2 units |
| teal | Done and fine. | Finished · Fixed · Working · Saved |
| red + hatch | Failed, refused, or exhausted. | Not fixed · None left · Link expired |
| grey + hatch | Deliberately out of play. | Cancelled · Stopped · Slot taken |

07

## Hatching

The one mark that belongs to this product. Diagonal hatch is the engineering convention for “not available”, and here it means **blocked or excluded** — nothing else, ever. Red hatch when something failed or is exhausted; neutral hatch when something is simply out of play.

```
/* red — failed, refused, nothing left */
background-image: repeating-linear-gradient(45deg,
  rgba(179,32,26,.16) 0 5px, transparent 5px 10px);

/* neutral — taken, cancelled, locked */
background-image: repeating-linear-gradient(45deg,
  rgba(95,101,104,.13) 0 5px, transparent 5px 10px);

/* on a large block, open the pitch up: 0 6px / 6px 12px */
```

**The four places it appears**one meaning

Scheduling

13–15

Taken — Mahmoud

Parts

Fan motor 1/4 HP

None on the shelf

Invoice

Living room — not fixed

No labour, no parts — nothing to charge for.

Settings

EGP — Egyptian pound

Locked on first save.

**Never** use hatching as a background pattern, a hero texture, a loading state, or to make a section look technical. If it is not blocked or excluded, it is not hatched.

08

## Panels and banners

**The panel**header bar · body · footnote

**Schedule a visit**REQ-2481

Nadia Farouk — 2 units

14 Street 9, Maadi

A taken slot is hatched, not hidden.

**One request, opened**GET /requests/:id

REQ-2481

Nadia Farouk

Came in today at 09:14

Ink header = a detail view or a technician screen. Grey header = a list or a form.

**The footnote row is part of the component.** It carries the one sentence explaining why the panel behaves the way it does, in Archivo Narrow at 12.5px. It is not optional decoration — it is how the product explains itself.

**Banners**3px left rule

We couldn't send it just now

Nothing you typed is lost. Try again in a moment.

Saved

This one is already booked

Another dispatcher got there first. This is not an error — it is the answer.

Don't refresh

The request carries a one-time key. If your connection drops and it retries, you still get one request, not two.

**Blue is not a warning.** When something is already done, say so in blue and hand the user the result. Red is only for something that failed or is about to be destroyed. The dark-rule note is for a rule of the product, not for feedback about an action.

09

## Tables and lists

**Admin table**Archivo Narrow 13.5 · rows 12px

| Request | Customer | Where | Where it stands | Came in |
| --- | --- | --- | --- | --- |
| REQ-2481 | Nadia Farouk | Maadi | Waiting for a visit | 2 hours ago |
| REQ-2480 | Delta Pharmacy | Dokki | Technician on site | Yesterday |
| REQ-2478 | Hany Abdel Aziz | Heliopolis | Finished · 1 of 2 fixed | 3 days ago |
| REQ-2476 | Omar Selim | Maadi | Cancelled | Last week |

1–20 of 64

**Header `#F2F3F3`, row line `#EDEEEE`, no zebra striping.** Numbers get `font-variant-numeric: tabular-nums` and right alignment. Paging is always Back/Next with a count, never numbered pages. A cancelled row drops to `#8A9093` throughout.

**Customer list — not a table**cards, 390 and up

REQ-2481 Happening today

Mahmoud is on his way

Between 10:00 and 12:00 · 2 units

REQ-2462 Finished

1 of 2 units fixed

[Open](#tables)

**Staff get tables, customers get cards.** She has twelve requests in her life and only one matters today, so that one is a card with a name and a time in it and the rest are one line each. Never render her history as a data table.

10

## Money

Amounts are mono, right-aligned, tabular. Currency is shown once at the top of a block, never repeated on every line. Until the project decides the currency and the labour figure, every screen renders `[AMOUNT]` rather than inventing a number.

**The invoice block**grouped per device

Bedroom — fixed

Labour, this unit\[AMOUNT\]

Start capacitor CAP-45/5\[AMOUNT\]

Living room — not fixed

No labour, no parts — nothing to charge for.

Total \[AMOUNT\]

**Never collapse a not-fixed unit into a footnote.** It gets its own block, hatched, with the reason in her words. Seeing that we looked at it and did not bill her is the point of the whole invoice.

11

## The five states every screen needs

One set, reused everywhere. A page never invents its own.

**Loading — the shape of what is coming**never a spinner

Rows the size of the real rows, fading down the stack. The loaded content must land in exactly the shape the skeleton held, so nothing moves.

**Empty, nothing matched, error, 404**four different screens

No requests yet

When you report a fault it will show up here.

REQ-9999

Nothing matched “REQ-9999”

Try part of a name, a phone number, or the number without the prefix.

We couldn't load this

Something went wrong at our end, not yours.

ref 9f2c-a41

No such request

It may have moved, or it was never yours.

**Empty and “nothing matched” are never the same screen.** One is a beginning and carries the action that fills it; the other is a dead end and keeps the search box with the query still in it. The error blames the system and shows one short reference — the request id, which is what support asks for. The 404 wording is identical whether the record is gone or belongs to someone else, because “you can't see this” confirms it exists.

12

## The three shells

**Admin — full width**dashboard /dashboard

ChillWork

Home

Requests

Technicians

Parts

Company settings

Today Thursday, 12 March

Waiting for a visit

6

Technicians

4

Out of stock

2

**Three numbers, never nine.** Ink sidebar, orange left-rule on the active item, page title with the 3px orange rule under it. The only orange number is the one that is his job to clear.

**Technician — 390 first**dashboard /visits

VIS-3390 On site

Nadia Farouk

Maadi · started 10:18

Bedroom — Carrier 4 of 6

She approves each part before anything is fitted

**Ink header, 52px full-width buttons, tick-mark progress instead of a percentage.** A disallowed action stays visible and greyed with one line saying what has to happen first. Buttons come from `allowedActions` — the screen never decides for itself.

| Shell | Width | Density | Targets |
| --- | --- | --- | --- |
| Customer (site) | 1440 & 390 | Cards, generous, a lot of plain language. | 44px |
| Admin (dashboard) | 1440 full width | Tables, Archivo Narrow, keyboard-first. | 40px |
| Technician (dashboard) | 390 first | One card at a time, one action at the bottom. | 48px min |

13

## Words

The copy is part of the design system. A component built correctly with the wrong words still looks wrong, because the whole product's character is that it speaks like a person who does this job.

##### Write

- **“Waiting for a visit”** — a state in words
- **“Mahmoud is on his way”** — a person, a time
- **“No labour, no parts — nothing to charge for”**
- **“There is only 1 on the shelf”**
- **“Nothing you typed is lost”**
- **“It may have moved, or it was never yours”**

##### Never

- **PENDING_ASSIGNMENT**, or any code shown to a user
- **“Technician assigned successfully”**
- **“No data”**, “Nothing here”, “Oops!”
- **“Invalid input”** or a raw validation string
- **“An error occurred”** with a stack trace
- **“You don't have permission to view this”**

- **Buttons say what happens.** “Book it”, “Issue the invoice”, “Stop him anyway” — never “Submit”, “OK” or “Confirm”.
- **Errors blame the system.** “Something went wrong at our end, not yours.” Then what to do, then a short reference.
- **Confirms show consequences, not counts.** Three named visits with their times, not “3 active visits”.
- **Help text explains consequence.** “The technician calls this when he sets off” beats “Enter a valid phone number”.
- **Say the trade's words.** Units, not devices, when talking to a customer. Parts, the shelf, the van. Never “asset” and never “ticket”.

14

## What to build each piece from

Everything here is a shadcn/ui primitive with this theme applied, living in `packages/ui`. Nothing needs a custom component library, and nothing should be hand-rolled where a primitive exists.

| This system | shadcn/ui | What changes |
| --- | --- | --- |
| Primary / secondary / destructive button | button | Sizes 34 / 40 / 46 / 52. `primary-foreground` is graphite. |
| Field, label, help, error | input · label · form | Height 42, radius 5. Error border `1.5px #B3201A`. Wire `fieldErrors` into the form resolver. |
| Reason dropdown | select | Height 44. The five not-fixed reasons are a fixed list. |
| Status chip | badge | New variants: orange, blue, cyan, teal, red-hatch, grey-hatch. |
| Panel | card | Add a header bar and the footnote row. Two header styles: sunk and ink. |
| Banner | alert | 3px left rule. Four tones, and blue is informational, not a warning. |
| Saved / failed toast | sonner | Inline where possible; a toast only for something the user is not looking at. |
| Admin table | table | Archivo Narrow, header `#F2F3F3`, no striping, tabular numerals. |
| Confirm before stopping a technician | alert-dialog | Lists the real visits. Never `window.confirm`. |
| Quantity stepper | — compose from button + input | 48px controls; plus disables at the stock limit. |
| Skeletons | skeleton | Shaped like the real rows, fading down. No pulse on a whole page. |
| Time-slot picker | — compose from button | Taken slots render hatched and disabled, never removed. |
| Icons | lucide-react | 1.8–2.4px stroke, no fills. Inline SVG where a drawing is content rather than an icon. |

#### Two things that are not shadcn

- **The hatch.** A utility class in `packages/ui`, not a one-off style. Two variants, red and neutral.
- **The panel footnote.** Part of the card component, because it is how this product explains its own rules and it must look identical everywhere.

Colours, sizes and copy on this page are taken from the drawn artboards, not invented here. When a board and this page differ, this page wins and the board gets corrected — that is the point of having it.