# Fr. Joe Staudt Homilies

Static React site serving Fr. Joe Staudt's Sunday homilies.

## Local development

```bash
pnpm install     # or npm install
pnpm dev         # starts dev server on http://localhost:3000
```

## Build for production

```bash
pnpm build
```

Outputs static files to `dist/public/`. Deploy that folder anywhere that serves static files (Cloudflare Pages, Netlify, Vercel, GitHub Pages, S3, etc).

## Deploying to Netlify or Cloudflare Pages

1. Push this repo to GitHub.
2. In Netlify/Cloudflare Pages, connect the repo.
3. Build settings:
   - Build command: `pnpm build`  (or `npm run build`)
   - Publish directory: `dist/public`
4. For SPA routing, add a redirect so all paths fall back to `index.html`:
   - **Netlify**: create `client/public/_redirects` with `/* /index.html 200`
   - **Cloudflare Pages**: handled automatically for SPAs, or add the same `_redirects` file

## Adding a weekly homily

All homilies live in one file: `client/src/data/homilies_full.json`.

To add a new homily, prepend a new entry to that array:

```json
{
  "title": "Trinity Sunday",
  "date": "2026-05-31",
  "season": "Ordinary Time",
  "audio_url": "https://your-audio-host.com/2026-05-31-trinity.m4a",
  "duration": "06:12:00"
}
```

Field notes:
- `date` is `YYYY-MM-DD` (or `null` for TBD)
- `season` must match one of: `Advent`, `Christmas`, `Ordinary Time`, `Lent`, `Easter`
- `duration` is `HH:MM:SS`
- `audio_url` can point anywhere reachable (the existing entries point at the old Squarespace CDN — fine until/unless that goes away)

Then:

```bash
git commit -am "add Trinity Sunday homily"
git push
```

Netlify/Cloudflare rebuilds automatically. Live in ~30 seconds.

## Project structure

- `client/src/data/homilies_full.json` — homily data (the only file you edit weekly)
- `client/src/data/homilies.ts` — typings + helpers wrapped around the JSON
- `client/src/pages/` — Home, Archive, HomilySingle, ContemplativePrayer, NotFound
- `client/src/components/` — AudioPlayer, FeaturedHomily, Header, Map, etc.
