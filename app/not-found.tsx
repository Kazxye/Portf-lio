import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Not found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section className="container-page pb-40 pt-32">
      <p className="font-mono text-[0.75rem] text-fg-3">404</p>
      <h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-medium leading-tight tracking-[-0.04em]">
        This page does not exist.
      </h1>
      <p className="mt-4 max-w-[48ch] text-fg-2">
        The link may be outdated, or the address has a typo.
      </p>
      <Link href="/" className="btn mt-10">
        Go to the homepage
      </Link>
    </section>
  )
}
