# Herrera Landscape — Website

A modern, responsive marketing and lead-generation website for **Herrera Landscape**, a landscaping and hardscaping company serving Sunnyvale and the Bay Area.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **React Hook Form + Zod**, **Lucide** icons, and **Supabase** authentication.

---

## ✨ Features

- **12 pages** — Home, About, Services, dynamic Service details, Projects/Gallery, Request a Quote, Contact, Customer Login, Customer Dashboard, Privacy Policy, Terms, custom 404.
- **Lead generation** — sticky mobile contact bar, WhatsApp button, click-to-call, quote CTAs throughout, and a delayed/exit-intent quote modal (once per session).
- **Filterable project gallery** with lightbox and a draggable before/after comparison slider.
- **Working forms** — Quote and Contact forms with client + server validation, honeypot spam protection, rate limiting, loading/success/error states, and email-ready API routes.
- **Customer auth** via Supabase (graceful demo mode when unconfigured) with a protected dashboard.
- **Full local SEO** — per-page metadata, Open Graph/Twitter cards, canonical URLs, `sitemap.xml`, `robots.txt`, web manifest, and JSON-LD schema (LocalBusiness/LandscapingBusiness, Service, FAQ, Breadcrumb).
- **Accessible & responsive** — semantic HTML, keyboard nav, focus states, ARIA, reduced-motion support, and no horizontal overflow.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Create your local env file
cp .env.example .env.local     # then fill in values (all optional to start)

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> The site runs fully **without any environment variables**. Auth shows a friendly setup message and forms log submissions to the server console until you configure Supabase / Resend.

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint with ESLint |
| `npm run gen:placeholders` | Regenerate the placeholder images in `public/images` |

---

## 🔐 Environment Variables

Copy `.env.example` → `.env.local`. **Never commit `.env.local`.** Only `NEXT_PUBLIC_*` variables are exposed to the browser.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL for metadata, sitemap, and schema |
| `NEXT_PUBLIC_SUPABASE_URL` | For auth | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For auth | Supabase anon/public key |
| `RESEND_API_KEY` | For email | Enables sending form submissions via Resend |
| `EMAIL_FROM` | Optional | Verified "from" address for Resend |
| `CONTACT_EMAIL` | Optional | Recipient for form submissions (defaults to the business email) |

---

## 🔑 Supabase Auth Setup

Customer login/signup and the protected dashboard use [Supabase Auth](https://supabase.com/auth).

1. Create a free project at [supabase.com](https://supabase.com).
2. In **Project Settings → API**, copy the **Project URL** and **anon public key**.
3. Add them to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
   ```
4. In **Authentication → Providers**, ensure **Email** is enabled. (Optionally disable "Confirm email" during testing.)
5. Restart the dev server. The login page now performs real sign-in/sign-up, and `/dashboard` is protected by `proxy.ts` (server-side redirect to `/login` when signed out).

**Without Supabase configured:** the login form shows a setup notice and the dashboard renders sample demo data — the whole site remains browsable.

The dashboard currently uses demo data from `data/dashboard.ts`. Wire it to real Supabase tables (quotes, projects, invoices, etc.) when ready.

---

## ✉️ Email / Form Submissions

The Quote and Contact forms POST to `app/api/quote/route.ts` and `app/api/contact/route.ts`. Each route:

- Validates with the same Zod schema used on the client.
- Applies a **honeypot** check (hidden `company` field) and **rate limiting** (`lib/rate-limit.ts`).
- Sends the submission via `lib/email.ts`.

**Enable real email (Resend):**

1. Create an account at [resend.com](https://resend.com) and add/verify a sending domain.
2. Add `RESEND_API_KEY` (and optionally `EMAIL_FROM`, `CONTACT_EMAIL`) to `.env.local`.
3. Submissions are emailed to `CONTACT_EMAIL`. Without the key, submissions are safely **logged to the server console** in development.

To use Nodemailer or another provider instead, swap the implementation in `lib/email.ts` — the route handlers don't change.

> **Image uploads:** the quote form includes an image picker for future use. The current demo API stores text details only. To persist uploads, switch the form to `multipart/form-data` and store files (e.g. Supabase Storage or Vercel Blob).

---

## 🗂️ Project Structure

```text
app/
  about/            about page
  services/         services overview
    [slug]/         dynamic individual service pages
  projects/         gallery
  quote/            request a quote
  contact/          contact
  login/            customer login/signup
  dashboard/        protected customer dashboard
  privacy-policy/ · terms/
  api/
    contact/ · quote/   form submission route handlers
  layout.tsx · page.tsx · not-found.tsx · error.tsx · loading.tsx
  sitemap.ts · robots.ts · manifest.ts · globals.css
components/
  common/           Button, PageHero, CTA, FAQ, JsonLd, modals, etc.
  layout/           Header, MobileMenu, Footer
  home/             homepage sections
  services/         ServiceCard
  gallery/          ProjectGallery, Lightbox, BeforeAfterSlider, ProjectCard
  forms/            QuoteForm, ContactForm, AuthForm, field primitives
  dashboard/        DashboardShell, LogoutButton
data/               services, projects, testimonials, faqs, process, dashboard
lib/                site config, nav, utils, validations/, supabase/, email, rate-limit
types/              shared TypeScript types
public/
  images/           placeholder SVGs (hero, services, projects, before-after, og)
  logo/             brand logo
scripts/            gen-placeholders.mjs
proxy.ts            session refresh + dashboard route protection (Next 16 "proxy")
```

---

## 🖼️ Imagery & Licensing

> **Current website imagery is licensed stock photography (Unsplash License) and must not be
> represented as completed Herrera Landscape projects unless approved by the client.** Replace it
> with the client's own original project photographs before presenting the work as real.

- All photos are downloaded, cropped, and optimized to **WebP** under `public/assets/images/**`
  (hero, about, services, projects, before-after, contact, auth, backgrounds).
- Image paths and alt text live in the data files (`data/services.ts`, `data/projects.ts`,
  `data/dashboard.ts`) — not hardcoded in components.
- To re-fetch or change the image set, edit the manifest in `scripts/fetch-images.mjs` and run
  `node scripts/fetch-images.mjs` (requires network access to images.unsplash.com).
- Missing images degrade gracefully via `components/common/SmartImage.tsx` (a branded fallback),
  though all current paths are verified.

## 🖼️ Replacing Placeholder Content

Everything is designed to be easily swapped before launch:

- **Images** — replace any file in `public/images/**` with a real photo of the **same path/name**. Regenerate placeholders anytime with `npm run gen:placeholders`.
- **Services** — edit `data/services.ts` (drives cards, the services page, and dynamic detail pages).
- **Projects** — edit `data/projects.ts`.
- **Testimonials** — edit `data/testimonials.ts`. ⚠️ All entries are marked `placeholder: true` and labeled in the UI. Replace with real, permitted reviews and set `placeholder: false` before launch.
- **Business details** — edit `lib/site.ts` (phone, email, hours, service areas, social links).

---

## 🌐 Deployment (Vercel)

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Add environment variables (from `.env.example`) in **Project → Settings → Environment Variables**.
4. Deploy. Next.js is detected automatically.

Set `NEXT_PUBLIC_SITE_URL` to your production domain so metadata, sitemap, and schema use absolute URLs.

Any Node host works too: `npm run build` then `npm run start`.

---

## ✅ Notes

- No invented license numbers, awards, certifications, exact years of experience, or team members — copy is professional draft content ready for the client's real details.
- Testimonials are clearly labeled placeholders and are **not** presented as verified reviews.
- Business hours and the map are placeholders; update `lib/site.ts` and embed a real Google Map on the contact page.
