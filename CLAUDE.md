# CLAUDE.md

Guidance for Claude Code when working in this directory.

## Know which repo you are in

`test/` is its **own git repo** (remote `gen-ai-feedback`, deployed on Vercel), nested inside the
parent `claude/` repo (remote `course-feedback`). Run git commands from here, and confirm with:

```bash
git remote get-url origin
```

The parent app has a similar form but a different `feedback` schema (NOT NULL `designation` /
`video_testimonial`), so **this app must use its own Neon project**. Never point it at the
shared Neon database.

## Commands

```bash
npm run dev
```

```bash
npm run typecheck
```

`npm run build` and `npm start` also exist. There is no test framework and no linter, so
`typecheck` is the only automated check. Dev server port is 3300 (`.claude/launch.json`).
Don't run `npm run build` while `npm run dev` is running; they share `.next` and corrupt each
other. Recovery: stop dev, `rm -rf .next`, restart.

## Architecture

Next.js 15 App Router, React 19, TypeScript, Tailwind v4, Server Actions only (no API routes).

- **`course_name` is stamped server-side.** `submitFeedback` in `src/app/actions.ts` writes
  `COURSE_NAME` from `src/lib/constants.ts`; the client never sends it.
- **Public testimonials** come from `getPublicTestimonials()`: `rating >= PUBLIC_MIN_RATING` (4),
  newest first, limited to `PUBLIC_TESTIMONIAL_LIMIT`, and selects only id/name/company/rating/
  testimonial. Errors return `[]` so the page still renders. The home page is `force-dynamic`.
- **Auth is a self-contained HMAC token** (`src/lib/auth.ts`): `<expiry-ms>.<hmac>` signed with
  `SESSION_SECRET`, in an httpOnly cookie, 8h, no session store. Password comparison hashes both
  sides and uses `timingSafeEqual`.
- **Admin is read-only by construction.** Only `insert` (submit) and `select` queries exist.
  Adding `update`/`delete` deliberately breaks this invariant.
- **Neon client is lazy.** `getSql()` in `src/lib/db.ts` builds on first use, so a missing
  `DATABASE_URL` is a request-time error, not a build failure.

Brand colours are `@theme` tokens in `src/app/globals.css`; restyle there.

## Database

Schema is in `db/schema.sql` (apply via the Neon SQL Editor; `psql` is not installed).

## Environment

`DATABASE_URL` (Neon **pooled** string, hostname contains `-pooler`, must start with
`postgresql://`), `ADMIN_PASSWORD`, `SESSION_SECRET`. See `.env.example`. Vercel env vars only
apply to builds made after they are set, so **redeploy after changing them**. Never commit or
paste these values in chat.
