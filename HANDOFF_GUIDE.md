# Tribe Guardians — Independent Contributor Guide

**Purpose:** This guide is for a new maintainer who wants to make website changes and deploy them to production **without asking David for help every time**.

**Production site:** https://tribe-guardians.vercel.app  
**GitHub repo:** https://github.com/DuduKova/thetribeguardians.git

Read this once end-to-end, then keep it as your checklist.

---

## Table of contents

1. [What you are taking over](#1-what-you-are-taking-over)
2. [Access David must give you first](#2-access-david-must-give-you-first)
3. [Software to install on your computer](#3-software-to-install-on-your-computer)
4. [GitHub setup](#4-github-setup)
5. [First-time local setup](#5-first-time-local-setup)
6. [Daily workflow: change → test → deploy](#6-daily-workflow-change--test--deploy)
7. [Where to edit common things](#7-where-to-edit-common-things)
8. [Vercel (production hosting)](#8-vercel-production-hosting)
9. [Supabase (database + admin login)](#9-supabase-database--admin-login)
10. [Other external services](#10-other-external-services)
11. [Admin panel usage](#11-admin-panel-usage)
12. [Before you push to production](#12-before-you-push-to-production)
13. [Troubleshooting](#13-troubleshooting)
14. [Quick reference commands](#14-quick-reference-commands)

---

## 1. What you are taking over

This is a **bilingual marketing website** (Hebrew primary, English secondary) for **The Tribe Guardians / שומרי השבט**.

It includes:

- Public homepage, donation page, volunteer healer form, patient registration form
- Admin panel to review form submissions
- Email notifications (Resend)
- WhatsApp notifications (Green API)
- Hosting on **Vercel**
- Data in **Supabase**

When you push to the `main` branch on GitHub, **Vercel automatically rebuilds and deploys production** (if you have Vercel access).

---

## 2. Access David must give you first

Before you can work independently, ask David to grant you access to **all** of these:

| Service | What you need | Why |
|--------|----------------|-----|
| **GitHub** | Collaborator on `DuduKova/thetribeguardians` (Write access) | Clone, commit, push code |
| **Vercel** | Team member on the project | View deploys, env vars, logs, redeploy |
| **Supabase** | Project member (at least Developer role) | Database, auth, API keys |
| **Resend** | Access to the account or shared API key | Form submission emails |
| **Green API** | Access to the WhatsApp instance | Form WhatsApp alerts |
| **IsraelGives** | Access to donation form settings (optional) | Donation embed config |
| **Google Analytics** | Viewer access (optional) | Traffic stats |

Also ask David to send you (securely — **not in WhatsApp plain text**):

- A filled copy of `.env.local`, **or** all values from `env.example`
- Confirmation that your email is in `ADMIN_EMAILS` so you can use the admin panel

**Important:** Never commit `.env.local` to GitHub. It contains secrets.

---

## 3. Software to install on your computer

Install these in order.

### Required (free)

| Tool | Download | Notes |
|------|----------|-------|
| **Node.js 18+** | https://nodejs.org | Choose LTS. Verify: `node -v` and `npm -v` |
| **Git** | https://git-scm.com | Verify: `git --version` |
| **Cursor** (recommended) | https://cursor.com | AI-assisted code editor. Best for “change this text / add a video” tasks |
| **A web browser** | Chrome / Firefox / Safari | For testing localhost and production |

### Optional but useful (free)

| Tool | Download | When to use |
|------|----------|-------------|
| **VS Code** | https://code.visualstudio.com | Classic code editor if you prefer not to use Cursor |
| **GitHub Desktop** | https://desktop.github.com | Visual Git if you dislike the terminal |
| **OpenAI Codex** | Via ChatGPT Plus / Codex app | Alternative AI coding assistant; can work alongside Cursor |

### Paid (optional)

- **Cursor Pro** — faster AI, higher limits (not required to start)
- **ChatGPT Plus** — if you want Codex outside Cursor

### You do NOT need to install

- Supabase CLI (unless you want advanced DB workflows)
- Docker
- A separate database server (Supabase is cloud-hosted)

---

## 4. GitHub setup

### 4.1 Create a GitHub account

1. Go to https://github.com/signup
2. Enable **two-factor authentication (2FA)** — strongly recommended

### 4.2 Accept the invitation

David will invite your GitHub username to the repo. Accept the email invitation.

### 4.3 Clone the repository

Open Terminal (Mac) or PowerShell (Windows):

```bash
cd ~/Projects   # or any folder you prefer
git clone https://github.com/DuduKova/thetribeguardians.git
cd thetribeguardians
```

### 4.4 SSH key (recommended)

SSH avoids typing your password on every push.

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter for defaults, set a passphrase if you want
cat ~/.ssh/id_ed25519.pub
```

Copy the output → GitHub → **Settings → SSH and GPG keys → New SSH key**

Then switch the remote to SSH:

```bash
git remote set-url origin git@github.com:DuduKova/thetribeguardians.git
```

### 4.5 Basic Git rules for this project

- **`main` = production.** Merging or pushing to `main` deploys the live site.
- Always run `git pull origin main` before starting work.
- For bigger changes, create a branch, test, then merge via Pull Request (safer).
- Never commit `.env.local`, passwords, or API keys.

---

## 5. First-time local setup

Run these once after cloning:

```bash
git pull origin main
npm install
cp env.example .env.local
```

Edit `.env.local` with the real values David gave you.

Start the development server:

```bash
npm run dev
```

Open:

- http://localhost:3000 → redirects to Hebrew
- http://localhost:3000/he — Hebrew homepage
- http://localhost:3000/en — English homepage

### Critical: use `npm run dev`, not `npm run start`

| Command | What it does |
|---------|----------------|
| `npm run dev` | **Development** — hot reload, shows your latest code changes |
| `npm run start` | **Production build only** — serves an old built version; changes won't appear until you rebuild |

If you change code and don't see updates, you are probably running `npm run start` by mistake. Stop it (Ctrl+C) and run `npm run dev`.

---

## 6. Daily workflow: change → test → deploy

### Simple workflow (small text/image changes)

```bash
# 1. Get latest code
git pull origin main

# 2. Start dev server (in a separate terminal tab)
npm run dev

# 3. Edit files (see section 7)

# 4. Verify locally in browser: /he and /en

# 5. Run checks
npm run typecheck
npm run lint

# 6. Commit and push
git add .
git commit -m "Update homepage hero video for English"
git push origin main
```

After push, Vercel deploys automatically (usually 1–3 minutes). Check https://tribe-guardians.vercel.app

### Safer workflow (recommended until you're comfortable)

```bash
git pull origin main
git checkout -b my-change-description
# ... edit, test ...
npm run typecheck && npm run lint && npm run build
git add .
git commit -m "Describe what changed and why"
git push -u origin my-change-description
```

Then on GitHub: **Pull Request → main → Merge**.

Vercel creates a **preview URL** for each PR so you can test before merging.

---

## 7. Where to edit common things

### Homepage marketing copy (most frequent)

| What | File |
|------|------|
| Hero, crisis, program, pricing, apply sections (HE + EN) | `src/app/[locale]/(site)/homepageContent.ts` |
| Homepage layout / hero video / sections | `src/app/[locale]/(site)/page.tsx` |
| Images & icons | `public/tribe-guardians/` |

**Rule:** Homepage copy lives mainly in `homepageContent.ts`, not in `messages/*.json`.

### Navigation, forms, admin UI strings

| What | Files |
|------|-------|
| Hebrew UI strings | `messages/he.json` |
| English UI strings | `messages/en.json` |

When changing user-facing text, **update both Hebrew and English**.

### Donation page

- `src/app/[locale]/(site)/donate/page.tsx`
- `src/components/DonationEmbed.tsx`
- IsraelGives URLs: `https://secured.israelgives.org/he/give/tribeguardians` and `/en/give/tribeguardians`

### Forms (fields, validation)

- Patient form page: `src/app/[locale]/(site)/register-patient/page.tsx`
- Healer form page: `src/app/[locale]/(site)/volunteer-healer/page.tsx`
- API routes: `src/app/api/forms/patient/` and `src/app/api/forms/healer/`
- Server logic: `src/lib/supabase/forms.ts`

Keep client validation (Zod) and server validation in sync.

### Site header / footer shell

- `src/components/TribeGuardiansShell.tsx`

### SEO / page title / meta description

- `src/app/[locale]/layout.tsx`

### Styling

- Global CSS: `src/app/globals.css`
- Tailwind utility classes inline in components

### AI assistant context for this repo

If using **Cursor** or **Codex**, point it to:

- `AGENTS.md` — technical handoff written for AI and humans
- `README.md` — general overview
- This file — your operational checklist

In Cursor: open the project folder, start a chat, describe the change in plain English (Hebrew is fine too). Example:

> "Change the Hebrew hero tagline in homepageContent.ts to … and update the English version too."

---

## 8. Vercel (production hosting)

### Get access

David adds you in Vercel → Project → **Settings → Members**.

### What Vercel does

- Watches GitHub `main` branch
- Runs `npm run build` on every push
- Hosts https://tribe-guardians.vercel.app

### Environment variables

In Vercel → Project → **Settings → Environment Variables**, these must exist for Production (and usually Preview + Development):

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Supabase key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server writes (secret) |
| `ADMIN_EMAILS` | Who can access admin panel |
| `GREEN_API_ID_INSTANCE` | WhatsApp |
| `GREEN_API_API_TOKEN` | WhatsApp |
| `ADMIN_PHONE_NUMBER` | WhatsApp recipient |
| `RESEND_API_KEY` | Email sending |

If you add a new env var locally, you must also add it in Vercel, then **Redeploy**.

### Check a deployment

Vercel → **Deployments** → click latest → view build logs if something failed.

### Pull env vars to your machine (optional)

If David connected Vercel CLI:

```bash
npx vercel login
npx vercel link
npx vercel env pull .env.local
```

---

## 9. Supabase (database + admin login)

### Dashboard

https://supabase.com/dashboard → open the Tribe Guardians project.

### Database tables

- `healer_applications`
- `patient_registrations`
- View: `admin_submissions` (unified admin queue)

Migrations (already applied in production; run manually only on a fresh project):

1. `supabase/migrations/001_create_form_tables.sql`
2. `supabase/migrations/002_extend_form_tables.sql`
3. `supabase/migrations/003_create_admin_submissions_view.sql`

### Admin magic-link login

1. Supabase → **Authentication → Providers → Email** must be enabled
2. **Redirect URLs** must include:
   - `http://localhost:3000/he/auth/callback`
   - `http://localhost:3000/en/auth/callback`
   - `https://tribe-guardians.vercel.app/he/auth/callback`
   - `https://tribe-guardians.vercel.app/en/auth/callback`
3. Your email must be in `ADMIN_EMAILS` (comma-separated, lowercase)

Admin URLs:

- Login: `/he/admin/login` or `/en/admin/login`
- Queue: `/he/admin` or `/en/admin`

---

## 10. Other external services

### Resend (email)

- Dashboard: https://resend.com
- Sends form alerts to `thetribeguardians@gmail.com`
- Code: `src/lib/email.ts`
- Needs `RESEND_API_KEY` in env

### Green API (WhatsApp)

- Dashboard: https://console.green-api.com
- Full setup: `WHATSAPP_SETUP.md`
- Needs instance ID, token, and `ADMIN_PHONE_NUMBER`
- If WhatsApp stops working: check QR code / instance connection in Green API console

### IsraelGives (donations)

- Donation embed is external; settings are in IsraelGives dashboard
- Embedded in `src/components/DonationEmbed.tsx`

### Google Drive videos (homepage hero)

Hero videos are embedded from Google Drive in `homepageContent.ts` (`videoEmbedId` per locale).

For embeds to work, each Drive file must be shared: **"Anyone with the link"**.

---

## 11. Admin panel usage

1. Go to https://tribe-guardians.vercel.app/he/admin/login
2. Enter your allowlisted email
3. Click the magic link in your inbox
4. Review submissions: approve / reject / add internal notes

You do **not** need to redeploy the site to process form submissions — that happens in Supabase in real time.

---

## 12. Before you push to production

Run this checklist:

- [ ] `git pull origin main` — started from latest code
- [ ] Tested `/he` and `/en` locally with `npm run dev`
- [ ] Updated **both** Hebrew and English if copy changed
- [ ] `npm run typecheck` — no TypeScript errors
- [ ] `npm run lint` — no lint errors
- [ ] `npm run build` — production build succeeds (recommended for non-trivial changes)
- [ ] No secrets in the commit (no `.env.local`)
- [ ] After push: check Vercel deployment succeeded
- [ ] Smoke test production: homepage, forms, donate page, admin login

---

## 13. Troubleshooting

### "I changed code but localhost looks the same"

- Stop `npm run start` if running
- Run `npm run dev` instead
- Hard refresh browser: **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows)

### "Build failed on Vercel"

- Open Vercel → Deployments → failed deploy → **Build Logs**
- Often: TypeScript error, missing env var, or lint failure
- Fix locally, run `npm run build`, push again

### "Forms submit but no email / WhatsApp"

- Check env vars in Vercel (not just local `.env.local`)
- Resend: verify API key and domain/sender settings
- Green API: verify instance is connected (QR scan)

### "I can't log into admin"

- Email must be in `ADMIN_EMAILS` (lowercase)
- Check Supabase auth redirect URLs
- Check spam folder for magic link

### "Google Drive video doesn't show on site"

- File sharing must be "Anyone with the link"
- Correct `videoEmbedId` in `homepageContent.ts` for `he` and `en`

### "npm install fails"

- Use Node 18+
- Delete `node_modules` and run `npm install` again

---

## 14. Quick reference commands

```bash
# Start local development
npm run dev

# Type check
npm run typecheck

# Lint
npm run lint

# Format code
npm run format

# Production build (test before deploy)
npm run build

# Git: get latest
git pull origin main

# Git: save and push
git add .
git commit -m "Short description of why"
git push origin main

# Git: create feature branch
git checkout -b feature/my-change
```

---

## Suggested learning path (first week)

| Day | Task |
|-----|------|
| 1 | Install tools, clone repo, run `npm run dev`, browse `/he` and `/en` |
| 2 | Change one line of English copy in `homepageContent.ts`, commit, push, verify production |
| 3 | Replace or add an image in `public/tribe-guardians/`, update reference in code |
| 4 | Log into admin panel, find a test submission |
| 5 | Open Vercel, watch a deployment from push to live |
| 6 | Read `AGENTS.md` for deeper technical map |
| 7 | Make a change using Cursor AI with this guide open |

---

## When you still need David

You should be self-sufficient for **content, layout, images, copy, and routine deploys**.

You may still need David for:

- Billing / ownership transfers (Vercel, Supabase, domain DNS)
- Sharing new secret keys securely
- Legal/compliance decisions about site copy
- First-time access if an invite wasn't sent

---

## Contact emails on the site

- **Public contact:** TheTribeGuardians@gmail.com
- **Form notifications:** same address via Resend

---

*Last updated: July 2026. If the repo structure changes, trust `AGENTS.md` and the code over older docs.*
