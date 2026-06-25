/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Web3Forms access key — get a free one at https://web3forms.com (no account needed). */
  readonly VITE_WEB3FORMS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
