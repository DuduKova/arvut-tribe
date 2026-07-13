# AGENTS.md — AI Handoff for The Tribe Guardians

Instructions for any AI (or human) continuing work on this repository. Read this before making changes.

## What this project is

**The Tribe Guardians / שומרי השבט** — bilingual (Hebrew primary, English secondary) marketing + registration site for an Amazonian/clinical healing journey for Israeli soldiers dealing with trauma.

- Public site: homepage, volunteer healer form, patient registration form, donation page
- Admin panel: magic-link login + submission queue (approve/reject/notes)
- Notifications: Resend email + Green API WhatsApp on form submit
- Deployed on **Vercel**; data in **Supabase**

Repo: `https://github.com/DuduKova/thetribeguardians.git`  
Production (typical): `https://tribe-guardians.vercel.app`

---

## Critical: sync git before coding

Always start from an up-to-date `main`:

```bash
git fetch origin
git status
git pull origin main
npm install
```

Homepage source of truth after pull:

- `src/app/[locale]/(site)/page.tsx`
- `src/app/[locale]/(site)/homepageContent.ts` ← almost all HE/EN marketing copy
- `src/components/TribeGuardiansShell.tsx`
- `public/tribe-guardians/**` ← images/icons
- `src/app/[locale]/(site)/donate/page.tsx` + `src/components/DonationEmbed.tsx`

---

## Tech stack

| Layer | Choice |
|-------|--------|
| App | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, some shadcn/ui primitives under `src/components/ui/` |
| i18n | `next-intl` — locales `he` (default), `en`; URL prefix always (`/he/...`, `/en/...`) |
| DB / Auth | Supabase (Postgres + magic-link email auth) |
| Forms | React Hook Form + Zod; API routes persist via service role |
| Email | Resend (`src/lib/email.ts`) → `thetribeguardians@gmail.com` |
| WhatsApp | Green API (`src/lib/whatsapp.ts`) |
| Hosting | Vercel (`vercel.json`) |

Path alias: `@/*` → `./src/*`

Translations JSON: **`messages/he.json`**, **`messages/en.json`** (repo root, not under `src/`).  
Marketing homepage copy is **not** only in messages — much of it is typed in `homepageContent.ts`.

---

## Setup (local)

### Prerequisites

- Node.js 18+
- npm
- Access to Supabase project + env secrets (ask the human owner)

### Install & run

```bash
npm install
cp env.example .env.local   # then fill real values
npm run dev                 # http://localhost:3000 → redirects to /he
```

### Environment variables

See `env.example`. Required / used keys:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata / OG |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID (default `G-9100MV6K3L`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser + cookie auth client |
| `SUPABASE_SERVICE_ROLE_KEY` | Server form writes (bypasses RLS) — **secret** |
| `ADMIN_EMAILS` | Comma-separated lowercase allowlist for admin panel |
| `GREEN_API_ID_INSTANCE` | WhatsApp via Green API |
| `GREEN_API_API_TOKEN` | WhatsApp via Green API |
| `ADMIN_PHONE_NUMBER` | WhatsApp notification recipient (e.g. `972...`) |
| `RESEND_API_KEY` | Transactional email |

Never commit `.env.local`. Never print secret values in chat logs.

### Database

SQL migrations (run in Supabase SQL editor if not already applied):

1. `supabase/migrations/001_create_form_tables.sql`
2. `supabase/migrations/002_extend_form_tables.sql` (adds `form_data` JSONB, etc.)
3. `supabase/migrations/003_create_admin_submissions_view.sql` (unified `admin_submissions` view)

Tables: `healer_applications`, `patient_registrations`.  
RLS: public **insert** allowed; admin reads/updates go through authenticated server/API with allowlist checks.

### Supabase Auth (admin)

- Enable Email provider (magic link)
- Redirect URLs must include:
  - `http://localhost:3000/he/auth/callback`
  - `http://localhost:3000/en/auth/callback`
  - Production equivalents

Admin URLs:

- `/{locale}/admin/login`
- `/{locale}/admin` (protected queue)

User must be signed in **and** email ∈ `ADMIN_EMAILS`.

---

## Project map (mental model)

```
src/
  app/
    [locale]/
      layout.tsx              # fonts, metadata, next-intl provider
      (site)/                 # public marketing + forms
        page.tsx              # landing
        homepageContent.ts    # HE/EN landing copy (source of truth for homepage)
        volunteer-healer/
        register-patient/
        donate/               # IsraelGives embed (after pull)
      (admin)/admin/          # login + protected queue
      auth/callback/          # magic-link handler
    api/
      forms/healer|patient/   # POST submissions
      admin/submissions/      # admin list + patch
      health/                 # keep-alive / health check
  components/                 # UI, MultiStepForm, admin/*, TribeGuardiansShell
  lib/
    supabase/                 # client, server, forms
    admin/                    # auth allowlist, types, form_data presentation
    email.ts, whatsapp.ts
  middleware.ts               # next-intl locale routing only
messages/                     # he.json / en.json for nav, forms, admin chrome
public/tribe-guardians/       # branding + landing assets (after pull)
```

### Important flows

1. **Form submit** → `POST /api/forms/{healer|patient}` → `submit*` in `src/lib/supabase/forms.ts` (service role) → optional WhatsApp + Resend email.
2. **Admin queue** → `GET/PATCH /api/admin/submissions...` guarded by `requireAdminApiUser()` in `src/lib/admin/auth.ts`.
3. **i18n** → middleware forces locale prefix; pages use `useTranslations` / `getTranslations` **or** `homepageContent[locale]`.

---

## How to work on this codebase (AI rules)

1. **Minimal diffs** — change only what the task needs; no drive-by refactors.
2. **Always update both locales** when changing user-facing copy (HE + EN). For homepage, edit `homepageContent.ts`. For chrome/forms/admin strings, edit both `messages/*.json`.
3. **Hebrew is primary** — RTL for `he`; keep UI readable in both.
4. **Landing vs older design docs** — `DESIGN_SYSTEM.md` describes an earlier Playfair/Lato / cream system. The current Tribe Guardians landing (on `origin/main`) uses **Heebo** and its own earthy palette in shell/CSS. Prefer matching the **existing landing**, not inventing a third look. Do not apply generic purple/AI aesthetic.
5. **Forms** — required fields and Zod/API validation must stay in sync; gender + email were made required in earlier client work.
6. **Secrets** — never commit env files; never put service role key in client components.
7. **Verify** after substantive changes:
   ```bash
   npm run typecheck
   npm run lint
   npm run build   # before claiming deploy-ready
   ```
8. **Do not commit or push** unless the human explicitly asks.
9. WhatsApp details: see `WHATSAPP_SETUP.md`.
10. Human-oriented overview: `README.md` (may lag the landing page; trust the code after `git pull`).

---

## Scripts

| Command | Use |
|---------|-----|
| `npm run dev` | Local Next.js |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run typecheck` | `tsc --noEmit` |

---

## Recent client homepage fixes (applied)

- **Gap section** (`homepageContent.ts` → `gap.intro` HE + EN): PTSD-focused body copy; title `לא כל טיפול מתאים לכל אדם`.
- **Ayahuasca phase**: medicine woman + veteran mentors + clinical therapists (HE/EN).
- **Meta description**: `דרך ריפוי אמזונית ומערבית קלינית לחיילים וחיילות` (+ EN equivalent) in `[locale]/layout.tsx`.
- **Hero**: separate mobile/desktop assets; mobile uses dedicated crop + `object-position` so the soldier stays visible.
- **Pillar icons** (מיכל בטוח / מיקוד ארוך טווח / קהילה ושבט): shared webp icons for both locales via `ContentIcon`.

Donation: IsraelGives embeds  
`https://secured.israelgives.org/{he|en}/give/tribeguardians`

---

## External accounts the human owns

You will need the human for:

- Supabase dashboard / keys
- Vercel project + env vars
- Resend API key
- Green API instance + connected WhatsApp
- `ADMIN_EMAILS` membership
- IsraelGives donation form settings

Sanity MCP may be available in Cursor but **this project is not Sanity-backed** — content is in repo files + Supabase.

---

## Quick smoke checklist

- [ ] `git pull` + `npm install` + `npm run dev`
- [ ] `/he` and `/en` homepage load
- [ ] `/he/volunteer-healer` and `/he/register-patient` multi-step forms
- [ ] `/he/donate` (after pull) shows IsraelGives embed
- [ ] Form POST creates row in Supabase; email/WhatsApp if keys set
- [ ] `/he/admin/login` magic link works for allowlisted email
- [ ] Admin queue lists healer + patient; status/notes update

---

## When stuck

1. Prefer code + this file over stale docs.
2. Diff against `origin/main` before assuming missing features.
3. Ask the human for secrets or product copy decisions; do not invent brand voice that contradicts existing Hebrew copy.
```