# Kerala Origins

Single-page site for the Kerala Origins showcase. Plain HTML and CSS — no build
step, no dependencies, no npm install.

## Run locally

Open `index.html` in a browser. That's it.

Or, if you want a local server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

### Push to GitHub

Create an empty repo on github.com (no README, no .gitignore — this project has
its own), then:

```bash
git init
git add .
git commit -m "Kerala Origins site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/kerala-origins.git
git push -u origin main
```

### Connect Vercel

1. vercel.com → **Add New → Project → Import Git Repository**
2. Select the repo
3. Framework preset: **Other**
4. Build command: leave **empty**
5. Output directory: leave **empty** (root)
6. Deploy

Netlify and Cloudflare Pages work the same way — no build command, publish
directory is the root.

## Before going live

Find and replace `YOURDOMAIN.com` with your real domain. It appears in:

- `index.html` — canonical, og:url, og:image, twitter:image
- `robots.txt`
- `sitemap.xml`

Social previews will not work until this is done. WhatsApp needs the full
absolute URL to fetch the share image.

## Content to replace

The nine estates in the "On the table" section are **placeholders**. Swap the
names, districts, elevations, varietals and processes for the real ones. They
are ordered by elevation, highest first — keep that order when you edit.

The schedule times under "The day" are also placeholder.

## Brand

| Token  | Hex       | Used for                          |
|--------|-----------|-----------------------------------|
| Navy   | `#012448` | Text, buttons, logo               |
| Orange | `#EC8800` | Accent rule, nav CTA, hover state |
| Paper  | `#FFFFFF` | Page background                   |
| Warm   | `#F7F5F0` | Alternate section background      |

Type: Playfair Display (display), Inter (body), DM Mono (data and labels).

## Files

```
index.html                 the whole site
favicon.ico                multi-size, 16/32/48
favicon-16/32/48.png       browser tabs
apple-touch-icon.png       iOS home screen, 180px, opaque
icon-192/512.png           Android / PWA
icon-maskable-512.png      Android adaptive icon, 20% safe zone
logo.png @2x @3x           nav wordmark, 36px tall
logo-mark.png @2x          K mark only, for tight layouts
og-image.jpg               WhatsApp / social share card, 1200x630
site.webmanifest           PWA manifest
```
