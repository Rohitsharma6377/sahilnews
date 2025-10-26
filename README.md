# SahilNews — Full-Stack News & Blogs (Next.js + Tailwind + Mongoose + NextAuth)

## Quick start

- **Install**: `npm install`
- **Dev**: `npm run dev` (Turbopack)
- **Build**: `npm run build`
- **Start**: `npm start`
- **Test**: `npm test`
- **Lint**: `npm run lint`

## Env setup

Copy `.env.example` to `.env.local` and fill values.

- `ADMIN_EMAIL`, `ADMIN_PASSWORD` are used for admin login.
- `DATABASE_URL` for MongoDB Atlas (optional; app falls back to demo content if not set).
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` for optimized remote images.
- `NEXTAUTH_SECRET` any strong random string.

## Seeding (optional if DB configured)

- `npm run seed` (uses Mongoose and sample articles)

## Tech

- Next.js App Router, Tailwind CSS, Framer Motion
- NextAuth (credentials) for admin
- MongoDB via Mongoose (models + seed)
- Jest + RTL tests
- GitHub Actions CI
- Dockerfile

## Structure

- `app/` pages, API, sitemap/robots
- `components/` UI
- `lib/` utils, seo, analytics, sample data
- `prisma/` schema + seed

## Deploy to Vercel

- Push to GitHub, Import repo in Vercel
- Add env variables in Vercel Project Settings
- Build Command: `npm run build` — Output: `.next`

## Lighthouse target

- Scores > 90 with optimized images, SSR/ISR where applicable
