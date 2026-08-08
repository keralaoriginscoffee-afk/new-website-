# Kerala Origins — Kerala Coffee Almanac

Single-page site built on the Kerala Coffee Almanac direction. Plain HTML and
CSS, no build step, no dependencies.

## Palette

| Token          | Hex       | Role                                          |
|----------------|-----------|-----------------------------------------------|
| Malabar Green  | `#0B4F3A` | Nav, hero, map, association. ~30% of the page  |
| Coconut Paper  | `#F4E8CF` | Page background. ~45%                          |
| Coffee Ink     | `#191510` | Typography, edition block, footer. ~15%        |
| Turmeric       | `#F2B827` | Edition accent — Edition 01                    |
| Cherry Red     | `#D6472F` | People panel, drop cap, archive numeral        |
| Monsoon Blue   | `#2D6275` | Place panel, photo duotone                     |
| Wet Earth      | `#70432F` | Process panel, producer quotes                 |

Each annual edition takes **one** rotating accent. Edition 01 is Turmeric.
For Edition 02, change `--turmeric` to Cherry Red and the whole site follows.

## Type

- **Bricolage Grotesque** — headlines
- **Manrope** — navigation, body, labels
- **Source Serif 4** — editorial paragraphs and producer quotes
- **Anek Malayalam** — Malayalam captions

## What is placeholder

Everything in `[square brackets]` needs replacing:

- Producer names, farm names, quotes (section 03)
- Field story headlines (section 06)
- Regional notes in the `REGIONS` object at the bottom of `index.html`
- Thiruvananthapuram region data — marked `[to confirm]`

Edition date and location deliberately read **"Updates soon"** rather than
invented detail.

Also replace `YOURDOMAIN.com` in `index.html`, `robots.txt` and `sitemap.xml`.

## Photography

Producer cards have empty photo frames with the Monsoon Blue duotone treatment
already wired: duotone at rest, full colour on hover. Drop real portraits in as
`<img>` inside `.photo` and the effect applies automatically.

## Malayalam

`കേരളത്തിന്റെ കാപ്പിക്കഥകൾ` and the short section captions need a native
copy editor's review before this goes live. They are placed as meaning, not
decoration, so an error will be visible to every Malayali reader.

## Illustrations

The inline SVGs — cherry branch, topographic lines, three panel marks — are
structural stand-ins holding the right positions and weights. The brief calls
for 12–16 commissioned hand-drawn field illustrations; these are where they go.

## Logo

Unchanged artwork, recoloured into the palette:

- `logo-green.png` — primary, on Coconut Paper
- `logo-paper.png` — reverse, on Malabar Green (used in nav and footer)
- `mark-*.png` — K only, for tight layouts

## Deploy

```bash
git init && git add . && git commit -m "Kerala Origins — Almanac"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/kerala-origins.git
git push -u origin main
```

Vercel → Import → Framework preset **Other** → leave build command and output
directory **empty** → Deploy.
