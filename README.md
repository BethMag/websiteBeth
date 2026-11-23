# CommonGround — Team Development & DiSC® Practice

A clean, accessible website and installable Progressive Web App (PWA) for team development practices utilizing Everything DiSC®.

## Customizing Your Content

All brand copy, practitioner details, offers, deliverables, DiSC® style descriptions, and client testimonials live in one file:

- `src/data/siteContent.ts`

Update `SITE_CONFIG` (brand name, practitioner name, email, location) and `SERVICE_OFFERS` to match your exact practice.

## Publishing to GitHub Pages (Important)

This app is built with Vite, React, and TypeScript, so browsers cannot load raw `src/main.tsx` directly from the `main` branch. A production build (`npm run build`) must be deployed instead.

A ready-to-use workflow is already included at `.github/workflows/deploy.yml`:

1. Push all files (including `.github/workflows/deploy.yml`) to the `main` branch of your GitHub repository.
2. In your GitHub repository, open **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions** (not "Deploy from a branch").
4. GitHub will automatically build `dist/` with the correct repository path and publish your live website and PWA.

*(If you use a custom domain on GitHub Pages, update `VITE_BASE_PATH` in `.github/workflows/deploy.yml` to `/`.)*

## Local Development

```bash
npm install
npm run dev
```
