import type { NextConfig } from 'next'

// VERCEL_ENV is only "production" for the kazys.dev deployment. Previews skip the
// CSP so the Vercel toolbar (injected from vercel.live) keeps working there.
const isProduction = process.env.VERCEL_ENV === 'production'

// A nonce-based CSP would force every page to render dynamically. This site ships
// no third-party scripts and takes no user input, so a static policy that locks
// down sources, framing, base-uri and plugins is the better trade-off.
// 'unsafe-inline' in script-src is required by Next's inline bootstrap scripts.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains',
  },
  ...(isProduction
    ? [{ key: 'Content-Security-Policy', value: contentSecurityPolicy }]
    : []),
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  agentRules: false,
  devIndicators: false,
  reactStrictMode: true,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
