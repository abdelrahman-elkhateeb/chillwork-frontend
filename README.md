# ChillWork — Frontend

**Job management for AC, refrigeration and appliance repair companies.**

ChillWork runs a repair job from the customer's first message to the final
invoice: intake, AI triage, conflict-free scheduling, on-site part approval and
billing. This repository holds the two web apps people use. The API lives in
[chillwork-backend](https://github.com/abdelrahman-elkhateeb/chillwork-backend).

---

## What it does

### One system, three roles

| Role | App | What they do |
| --- | --- | --- |
| **Customer** | `web` — the public site | Sign up, report one or more units in their own words, follow each visit on a live timeline, see the outcome per unit and the invoice. |
| **Admin / dispatcher** | `dashboard` | See every request with its AI reading, book visits on technicians' free hours, manage technicians, the parts catalog, stock and the company labor fee. |
| **Technician** | `dashboard` (phone-first) | See only their assigned visits, propose parts per unit, record the customer's approval, mark each unit repaired or not, and issue the invoice before leaving. |

Each role signs in separately and is checked on the server for every request.
A customer who reaches the dashboard is refused.

### How a job runs

1. **Intake.** The customer lists each unit and describes the fault. One request
   covers the whole flat.
2. **AI triage.** Before the request is saved, each unit's description is read
   for likely causes, missing information and questions to ask on site. The
   customer's own words are kept exactly as written. If the AI is unavailable,
   the request is still saved and triaged by hand.
3. **Dispatch.** The admin books a visit. A slot that overlaps the technician's
   existing work is refused, not just warned about.
4. **On site.** The technician proposes catalog parts per unit. The customer
   approves or declines each one before it goes in.
5. **Close.** Each unit is marked **repaired** or **not repaired** with a reason.
   The invoice is built from that.

### Billing rules

- **No fix, no fee.** A repaired unit costs its approved parts plus one labor
  fee. A unit left unrepaired costs nothing.
- **Declined parts never reach the bill.**
- **Prices don't drift.** A part's price is captured when it's proposed, and the
  company currency locks once it's set.
- **Stock is real.** Issuing an invoice takes the fitted parts off the shelf,
  and every stock change is written to a ledger.

---

## Screens

**Customer site (`apps/web`)**

- Landing page
- Sign up / sign in, account
- My requests, new request (multi-unit), request detail with timeline

**Dashboard (`apps/dashboard`)**

- Admin: home, requests list and detail, schedule a visit, technicians (invite
  and deactivate), parts and stock, company settings
- Technician: my visits, visit detail, pick parts per unit, customer approval,
  unit outcome, invoice, profile
- Technician activation from a one-time invite link

---

## Tech stack

| Concern | Tool |
| --- | --- |
| Monorepo | npm workspaces + Turborepo |
| Build | Vite 8, TypeScript 6 |
| UI | React 19, shadcn/ui on Radix UI, Tailwind CSS v4 |
| Routing | React Router 7 |
| Server state | TanStack Query 5 |
| Forms | react-hook-form + zod |
| Hosting | Vercel (one project per app) |

```
client/
  apps/
    web/          customer site and landing page
    dashboard/    admin and technician app
  packages/
    ui/           shared shadcn/ui components and design tokens
docs/
  README.md         developer guide (architecture, API layer, conventions)
  design-system.md  tokens, components, status chips and copy rules
```

---

## Running it locally

Requires **Node 20+** and **npm 11**, plus a running
[backend](https://github.com/abdelrahman-elkhateeb/chillwork-backend)
(by default on `http://localhost:3000`).

```bash
cd client
npm install
cp apps/web/.env.example apps/web/.env
cp apps/dashboard/.env.example apps/dashboard/.env
npm run dev
```

The customer site starts on http://localhost:5173 and the dashboard on the next
free port (usually http://localhost:5174).

### Environment variables

| Variable | App | Purpose |
| --- | --- | --- |
| `API_PROXY_TARGET` | both | Backend base URL, e.g. `http://localhost:3000`. |
| `VITE_CUSTOMER_SITE_URL` | dashboard | The customer site, for "customers sign in on the main site" links. |

The browser always calls `/api` on the app's own origin. In development Vite
forwards it to `API_PROXY_TARGET`, and on Vercel `middleware.ts` does the same.
That keeps the API's HttpOnly auth cookies on the app's own domain. In
production the backend must list each app's URL in `AUTH_ALLOWED_ORIGINS`.

### Scripts

Run from `client/`:

| Command | What it does |
| --- | --- |
| `npm run dev` | Start both apps |
| `npm run build` | Type-check and build both apps |
| `npm run typecheck` | Type-check only |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

### Demo accounts

The backend ships a guarded seed script that creates a demo company, an admin,
two technicians, two customers and sample jobs. See the backend's
[docs/demo.md](https://github.com/abdelrahman-elkhateeb/chillwork-backend/blob/main/docs/demo.md).

---

## Deploying

Each app is its own Vercel project with its root set to `client/apps/web` or
`client/apps/dashboard`. Set `API_PROXY_TARGET` (and `VITE_CUSTOMER_SITE_URL`
for the dashboard) in the project's environment variables. `vercel.json` sends
every non-API path to the single-page app.

---

## Not in this version

These are planned but not built yet: photo uploads, service reports, recording
payments, rescheduling and cancelling visits, and email notifications.
Technician invites are shared as a link for now.

---

For architecture, conventions and how to add a screen, see the
[developer guide](docs/README.md).
