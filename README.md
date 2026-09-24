# kazys.dev

Personal site of Kazys Tatarunas, security-focused software engineer.

Built with Next.js (App Router), TypeScript and Tailwind CSS 4. Every route is
statically prerendered; client JavaScript is limited to the command menu.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # type-check (tsc --noEmit)
```

Requires Node.js 20.9 or newer.

## Structure

```
app/                 routes, metadata, sitemap, robots, global styles
components/site/     header and command menu (Cmd/Ctrl + K)
components/home/     home page sections
components/system/   diagrams and the shared schematic language
components/ui/       small primitives
content/             profile, navigation and project data
public/              static files (resume PDF)
```

Copy and project facts live in `content/`. Project entries only hold claims
that can be verified in the corresponding repository.

## Security headers

Set in `next.config.ts` for every route. The Content-Security-Policy is only
sent on the production deployment (`VERCEL_ENV=production`) so preview
deployments keep the Vercel toolbar. It is a static policy rather than a
nonce-based one: nonces would force dynamic rendering, and the site has no
third-party scripts or user input to protect.

## Deployment

Hosted on Vercel. `vercel.json` pins the framework to Next.js. Pushes to
`main` deploy to production; other branches get preview URLs.
