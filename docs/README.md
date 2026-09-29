# ChillWork Frontend — Developer Docs

The customer-facing web app for ChillWork: a marketing landing page, login/signup, and a signed-in account page. It talks to the `fs-api` backend over a same-origin `/api` proxy.

- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Repository layout](#repository-layout)
- [App architecture](#app-architecture)
- [Routing](#routing)
- [API layer](#api-layer)
- [Authentication](#authentication)
- [Forms](#forms)
- [UI package and styling](#ui-package-and-styling)
- [Conventions](#conventions)
- [Adding things](#adding-things)

---

## Tech stack

| Concern         | Tool                                                                |
| --------------- | ------------------------------------------------------------------- |
| Monorepo        | npm workspaces + Turborepo                                          |
| Build / dev     | Vite 8, TypeScript 6                                                |
| UI              | React 19, shadcn/ui (`radix-nova` style), Radix UI, lucide-react    |
| Styling         | Tailwind CSS v4 (CSS-first config, design tokens as CSS variables)  |
| Routing         | React Router 7 (`createBrowserRouter`)                              |
| Server state    | TanStack Query 5                                                    |
| Forms           | react-hook-form + zod (via `@hookform/resolvers`)                   |
| Lint / format   | ESLint 10 (typescript-eslint, react-hooks, react-refresh), Prettier |

Requirements: **Node ≥ 20** and **npm 11** (`packageManager: npm@11.17.0`).

---

## Getting started

All commands run from the `client/` directory.

```bash
cd client
npm install
```

Create the web app's env file and point it at your running API:

```bash
cp apps/web/.env.example apps/web/.env
```

| Variable           | Default                 | Purpose                                              |
| ------------------ | ----------------------- | ---------------------------------------------------- |
| `API_PROXY_TARGET` | `http://localhost:3000` | Where the Vite dev server proxies `/api` requests to |

Start the dev server (http://localhost:5173):

```bash
npm run dev
```

### Scripts

Run from `client/` — Turbo fans them out to every workspace:

| Script              | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Vite dev server for `apps/web`                 |
| `npm run build`     | `tsc -b && vite build` → `apps/web/dist`       |
| `npm run lint`      | ESLint across all packages                     |
| `npm run typecheck` | `tsc --noEmit` across all packages             |
| `npm run format`    | Prettier (with Tailwind class sorting)         |

`apps/web` also has `npm run preview -w web` to serve a production build locally.

---

## Repository layout

```
chillwork-frontend/
├── docs/                      ← you are here
└── client/                    ← the npm/Turbo monorepo
    ├── turbo.json
    ├── package.json           ← npm workspaces config
    ├── apps/
    │   └── web/               ← the React app
    │       ├── .env.example
    │       ├── vite.config.ts
    │       └── src/
    │           ├── main.tsx           entry: global CSS + <App />
    │           ├── app/               app shell: providers, router, query client
    │           ├── config/            app-wide constants (routes)
    │           ├── components/        shared app components (form, feedback, brand)
    │           ├── lib/               framework-agnostic helpers (api, forms)
    │           └── features/          feature modules (landing, auth, account)
    └── packages/
        └── ui/                ← @workspace/ui: shadcn components + design tokens
            └── src/
                ├── components/        button, card, input, field, alert, …
                ├── lib/utils.ts       cn()
                └── styles/globals.css Tailwind entry + theme tokens
```

---

## App architecture

```
main.tsx
 └─ <App>                         app/app.tsx
     └─ <AppProviders>            app/providers.tsx
         ├─ QueryClientProvider   app/query-client.ts
         └─ ThemeProvider         components/theme-provider.tsx (light by default)
             └─ <RouterProvider>  app/router.tsx
```

### Feature modules

Each feature under `src/features/<name>/` is self-contained and follows the same shape (only the folders a feature needs exist):

```
features/auth/
├── index.ts        public surface — the ONLY thing other code imports
├── api/            request functions, query keys, queryOptions
├── components/     feature-private components
├── constants/      copy, messages, validation limits
├── guards/         route guards
├── hooks/          React Query hooks (useLogin, useSignup, …)
├── lib/            pure helpers
├── pages/          route-level components
├── schemas/        zod schemas
└── types/          TypeScript types
```

Current features:

| Feature   | Route(s)             | Notes                                                                                          |
| --------- | -------------------- | ---------------------------------------------------------------------------------------------- |
| `landing` | `/`                  | Marketing page built from `sections/`; all copy and data live in `constants/*.constants.ts`   |
| `auth`    | `/login`, `/signup`  | Forms, guards, current-user query, session handling                                            |
| `account` | `/account`           | Signed-in profile view + logout                                                                |
| `requests`| `/requests`, `/requests/new`, `/requests/:requestId` | The customer's home: her requests (FS16), the 3-step new request (FS15), and one request with its timeline |

### Query client defaults

`app/query-client.ts`:

- `staleTime` 30 s, no refetch on window focus.
- Retries up to 2 times, **but never on 4xx** (they won't change on retry).
- A global `QueryCache.onError` sets the current user to `null` on any 401 that survives the HTTP client's refresh-and-retry — so guards react immediately to a lost session.

---

## Routing

Paths are defined once in `src/config/routes.ts` — always use `ROUTES.*`, never string literals.

```ts
ROUTES = { home: "/", login: "/login", signup: "/signup", account: "/account",
  requests: "/requests", newRequest: "/requests/new", request: "/requests/:requestId" }

pathTo(ROUTES.request, { requestId }) // fills :params
```

`src/app/router.tsx`:

| Path       | Guard         | Page          |
| ---------- | ------------- | ------------- |
| `/`        | —             | `LandingPage` |
| `/login`   | `GuestOnly`   | `LoginPage`   |
| `/signup`  | `GuestOnly`   | `SignupPage`  |
| `/account` | `RequireAuth` | `AccountPage` |
| `/requests` | `RequireAuth` | `MyRequestsPage` (customers only; staff see a notice) |
| `/requests/new` | `RequireAuth` | `NewRequestPage` (customers only; staff see a notice) |
| `/requests/:requestId` | `RequireAuth` | `RequestPage` (customers only; staff see a notice) |
| `*`        | —             | redirect to `/` |

**Guards** (`features/auth/guards/`) are layout routes rendering `<Outlet />`:

- `RequireAuth` — shows `PageLoader` while the current user loads; if signed out, redirects to `/login` with `state.from` set to the original path.
- `GuestOnly` — if the user is *already* signed in **on arrival**, redirects them on. It decides once, so signing in on the page doesn't cause a competing redirect.

### Navigation state

Some pages accept typed `location.state`:

| Page       | Type                    | Fields                                             |
| ---------- | ----------------------- | -------------------------------------------------- |
| `/login`   | `LoginLocationState`    | `from`, `email` (prefill), `justRegistered`        |
| `/requests` | `MyRequestsLocationState` | `welcome` (show greeting after signup)           |
| `/requests/new` | `ReportAgainState`  | `reportAgain` (prefill one unit, see below)        |

`location.state` is user-controllable, so it's always parsed defensively (`readLoginLocationState`). `getPostLoginPath` only honours same-app paths (`/…`, not `//…`, not auth pages) to prevent open redirects; the fallback is `/requests`.

---

## API layer

Lives in `src/lib/api/`.

### Same-origin by design

`API_BASE_URL` is `/api/v1` — always a relative path. The API's auth cookies are **HttpOnly with no `Domain`**, and its CSRF guard compares `Origin` to the request's own `Host`. So:

- **Dev:** Vite proxies `/api` → `API_PROXY_TARGET` with `changeOrigin: false`. Do **not** turn `changeOrigin` on — every POST would fail with `403 CSRF_ORIGIN_REJECTED`.
- **Production:** the host must proxy `/api` to the backend the same way (same origin, `Host` preserved).

### Response envelope

```ts
// success
{ data: T, meta?: {...} }

// failure
{ error: { code: string, message: string, fieldErrors?: Record<string, string[]>, requestId: string } }
```

### `httpClient`

```ts
import { httpClient, withQuery } from "@/lib/api/http-client"

const user = await httpClient.get<CurrentUserResponse>("/auth/me", { signal })
await httpClient.post<LoginResponse>("/auth/login", body, { skipAuthRefresh: true })
const { items, meta } = await httpClient.getPage<Row>(withQuery("/requests", { page }))
```

- Returns the envelope's `data`, or throws an `ApiError`.
- Sends cookies (`credentials: "same-origin"`) and JSON bodies.
- On a **401**, calls `refreshSession()` once and retries the request — unless `skipAuthRefresh` is set (used on login/signup/logout, where a 401 is a real answer).
- `refreshSession()` is **single-flight**: concurrent 401s share one `POST /auth/refresh` so tokens aren't rotated multiple times.

### `ApiError`

```ts
class ApiError extends Error {
  status: number        // 0 for network failures
  code: string          // see API_ERROR_CODES
  fieldErrors?: Record<string, string[]>
  requestId?: string
}
```

Helpers: `isApiError(e)`, `isUnauthorizedError(e)`. Known codes are in `API_ERROR_CODES` (`api.constants.ts`) — e.g. `VALIDATION_ERROR`, `INVALID_CREDENTIALS`, `CONFLICT`, `RATE_LIMITED`, `NETWORK_ERROR`, `DEMO_COMPANY_UNAVAILABLE`.

---

## Authentication

Endpoints used (`features/auth/api/auth.api.ts`):

| Call               | Endpoint                 |
| ------------------ | ------------------------ |
| `getCurrentUser`   | `GET  /auth/me`          |
| `login`            | `POST /auth/login`       |
| `signup`           | `POST /auth/register`    |
| `logout`           | `POST /auth/logout`      |
| (refresh, internal)| `POST /auth/refresh`     |

### Current user

`useCurrentUser()` returns the query plus `user` (`AuthUser | null`) and `isAuthenticated`. A 401 from `/auth/me` resolves to `null` ("signed out") instead of an error. Cache key: `authKeys.currentUser()`.

```ts
type AuthUser = {
  id: string; email: string; name: string; phone: string
  role: "CUSTOMER" | "ADMIN" | "TECHNICIAN"; companyId: string
}
```

### Flows

- **Login** — `useLogin()` posts credentials and writes the returned user into the current-user cache. The page then navigates to `getPostLoginPath(state)`.
- **Signup** — the API's register endpoint doesn't open a session, so `useSignup()` registers **then** logs in with the same credentials. Result: `{ user, signedIn }`.
  - `signedIn: true` → `/requests` with `{ welcome: true }`.
  - `signedIn: false` (account created, login failed, e.g. rate-limited) → `/login` with the email prefilled and a "just registered" notice.
- **Logout** — `useLogout()` posts `/auth/logout` and then does a **full page load** to `/` on either outcome, which wipes all in-memory user data and avoids a guard/navigation race.

## Service requests

`features/requests` — FS15 (`POST /requests`), with FS14's analysis running server-side.

- **One `Idempotency-Key` per submission.** `useCreateServiceRequest()` keeps the key while the payload is unchanged, so double clicks, automatic retries (network, any 5xx, `IDEMPOTENCY_IN_PROGRESS` — up to 2) and a manual "Try again" all replay the same request. Editing the form after a failure starts a new key (the API rejects a reused key with a different payload).
- **The customer never sees AI output.** The response has none; the sending state just says what is happening.
- **Draft:** the form is saved to `sessionStorage` per user as it's typed ("Saved as you type") and cleared on success.
- **API gaps the UI works around:** there's no "how to find you" field, so it's appended to `address` after ` — `; photos are hidden until FS13 exists (the API rejects any `photoIds`).

### My requests and one request (FS16)

`GET /requests?page=&pageSize=`, `GET /requests/:id`, `GET /requests/:id/timeline` — `requestsApi.list/get/timeline`, hooks in `hooks/use-my-requests.ts` (`useMyRequests(page)`, `useMyRequest(id)`, `useRequestTimeline(id)`). Keys: `requestKeys.list(page)`, `.detail(id)`, `.timeline(id)`; creating a request invalidates `requestKeys.all`.

- **List (`/requests`)** — newest first, 10 per page, `?page=` in the URL. The newest request that isn't finished gets a card with the technician's name and slot (it reads the detail query, so opening it is instant); the rest are one line each.
- **Detail (`/requests/:requestId`)** — unit by unit (what she said, the result, why not), the bill once an invoice exists, and the timeline. A 404 (not hers, gone, or a malformed id) shows "No such request" and isn't retried.
- **Timeline** — only the five event types the API returns, worded for her (`lib/request-display.ts`). Nothing is invented: there is no "parts approved" or per-unit event, so unit results appear on the "finished the visit" line.
- **Report again** — an unfixed unit links to `/requests/new` with `ReportAgainState`: the address, phone and that unit (label, brand, model) are prefilled and the flow opens on the units step. An unsent draft is kept and the unit is added to it. The state is cleared after it's read, so a reload doesn't add the unit twice.
- **API gaps the UI works around:** the customer invoice is a summary only (itemized is FS27), so the bill lists fixed units by name with the total; the technician's notes and phone aren't returned, and no cancel exists yet (FS20).

### Error messages

`getAuthErrorAlert(error)` maps an `ApiError` to the alert shown above the form, or `null` when the error is already shown under a field (validation errors, email taken). `INVALID_CREDENTIALS` is deliberately generic — the UI never reveals whether an account exists. User-facing copy lives in `features/auth/constants/`.

---

## Forms

Pattern (see `features/auth/components/login/login-form.tsx`):

1. A **zod schema** in `features/<name>/schemas/` — the form's value type is `z.infer<typeof schema>`.
2. `useForm({ resolver: zodResolver(schema) })`.
3. A **mutation hook**; on error, `applyServerFieldErrors(error, setError, FIELDS)` copies the API's `fieldErrors` onto matching fields so server and client validation look the same.
4. Remaining errors go through a feature-level mapper (e.g. `getAuthErrorAlert`) into a `<FormAlert>`.
5. Wrap inputs in `<FieldSet disabled={mutation.isPending}>` and use `<SubmitButton pending …>`.

Shared form components (`src/components/form/`):

| Component       | Purpose                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| `TextField`     | Label + input + hint/error, with `aria-invalid` / `aria-describedby`    |
| `PasswordField` | `TextField` with an optional Show/Hide toggle (`revealable`)            |
| `SubmitButton`  | Button with `pending` spinner and `pendingLabel`                        |
| `FormAlert`     | `error` / `info` / `success` alert with title + description             |
| `FieldChrome`   | The label/hint/error wrapper the fields share                           |

Use `noValidate` on `<form>` — validation is zod's job.

---

## UI package and styling

### `@workspace/ui`

Shared shadcn/ui components live in `client/packages/ui` and are imported via package exports:

```tsx
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import "@workspace/ui/globals.css" // done once in main.tsx
```

Available today: `alert`, `alert-dialog`, `avatar`, `badge`, `button`, `card`, `collapsible`, `dropdown-menu`, `field`, `input`, `label`, `native-select`, `separator`, `skeleton`, `spinner`, `table`, `tabs`, `textarea`.

Shared state blocks live in the app at `src/components/states/` (the "Loading, empty, error & 404" board): `EmptyState`, `ErrorState` (shows the short request id), `NotFoundState`, `Pager`, `CardListSkeleton` / `DetailSkeleton`.

Add a new shadcn component (run in `client/`) — it lands in `packages/ui/src/components`:

```bash
npx shadcn@latest add dialog -c apps/web
```

### Design tokens

`packages/ui/src/styles/globals.css` is the Tailwind v4 entry point (no `tailwind.config.js`). It defines:

- **Colors** as CSS variables on `:root`, exposed as Tailwind colors via `@theme inline`. Beyond the shadcn set (`background`, `foreground`, `primary`, `muted`, `card`, `border`, …) the brand adds: `ink`, `paper`, `paper-bright`, `primary-deep` (orange for text on light backgrounds), `line-strong` (input borders), `surface-sunken` (card header bars).
- **Fonts**: `font-sans` (Archivo), `font-heading` (Archivo Expanded), `font-mono` (IBM Plex Mono), `font-narrow` (Archivo Narrow — dense UI: tables, mockups, fine print).
- **Radii** derived from `--radius` (`rounded-sm` … `rounded-4xl`).

Use tokens (`bg-card`, `text-muted-foreground`, `text-primary-deep`) rather than raw hex values.

### Theme

`ThemeProvider` supports `light` / `dark` / `system`, persisted in `localStorage` under `theme`, and toggles with the **`d`** key (outside inputs). The app forces **light by default** because the `.dark` tokens are still shadcn placeholders — the design has no dark palette yet.

---

## Conventions

- **Imports:** use the `@/` alias for `apps/web/src`, and `@workspace/ui/...` for the UI package. Never deep-import another feature's internals — go through its `index.ts`.
- **File names:** kebab-case, with a role suffix where useful: `*.api.ts`, `*.query.ts`, `*.query-keys.ts`, `*.schema.ts`, `*.types.ts`, `*.constants.ts`.
- **Copy and data out of JSX:** strings, lists, and mock data go in `constants/`. Components stay presentational.
- **Types:** `type` aliases, strict TS (`noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly` — so no `enum`s; use `as const` objects).
- **Formatting (Prettier):** no semicolons, double quotes, 2-space indent, trailing commas (es5), 80 cols, LF line endings, Tailwind classes auto-sorted (also inside `cn()` / `cva()`).
- **Comments** explain *why* (constraints, API quirks, race conditions), not what.
- Before committing: `npm run lint && npm run typecheck`.

---

## Adding things

### A new page / route

1. Add the path to `ROUTES` in `src/config/routes.ts`.
2. Create `features/<name>/pages/<name>-page.tsx` and export it from `features/<name>/index.ts`.
3. Register it in `src/app/router.tsx` — under `RequireAuth` or `GuestOnly` if it needs a guard.

### A new API call

1. Types in `features/<name>/types/<name>.types.ts`.
2. Request functions in `features/<name>/api/<name>.api.ts` using `httpClient`.
3. Query keys in `<name>.query-keys.ts` (`const xKeys = { all: ["x"] as const, … }`).
4. Wrap in a hook (`useQuery` / `useMutation`) under `hooks/`; update or invalidate caches in `onSuccess`.

### A new landing section

1. Put the section's copy/data in `features/landing/constants/<section>.constants.ts` (types in `types/landing.types.ts`).
2. Build it in `components/sections/<section>.tsx`, reusing `LandingContainer`, `SectionHeader`, `SectionEyebrow`.
3. Slot it into `pages/landing-page.tsx`.
