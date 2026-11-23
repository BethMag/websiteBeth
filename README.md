# CommonGround — Team Development & DiSC® Practice

A clean, modern website and installable Progressive Web App (PWA) for team development practices utilizing Everything DiSC®.

## Customizing Your Content

All brand copy, practitioner details, offers, deliverables, DiSC® style descriptions, and client testimonials live in one file:

- `src/data/siteContent.ts`

Update `SITE_CONFIG` (brand name, practitioner name, email, location) and `SERVICE_OFFERS` to match your exact practice.

## Local Development

```bash
npm install
npm run dev
```

## Building & Publishing to GitHub Pages

1. Push this repository to GitHub.
2. Run a production build to generate the static `dist/` bundle:
   ```bash
   npm run build
   ```
3. Deploy the `dist/` directory using GitHub Pages (via GitHub Actions `actions/deploy-pages`), Vercel, or Netlify.
4. Note: If deploying under a repository subpath (e.g., `https://username.github.io/repo-name/`), set `base: '/repo-name/'` in `vite.config.ts` and update the PWA `start_url` and `scope` accordingly.
