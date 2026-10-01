# Gen AI Accelerator — Feedback

Next.js + Neon Postgres. Public form with past testimonials (4-5 stars), password-protected read-only admin at `/admin`.

1. `npm install`
2. Run `db/schema.sql` in the Neon SQL Editor.
3. Copy `.env.example` to `.env.local` and fill in `DATABASE_URL` (pooled), `ADMIN_PASSWORD`, `SESSION_SECRET`.
4. `npm run dev` → http://localhost:3000
