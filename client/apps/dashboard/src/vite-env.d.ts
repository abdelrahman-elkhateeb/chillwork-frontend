/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Customer site origin, for "sign in on the main site" links. */
  readonly VITE_CUSTOMER_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
