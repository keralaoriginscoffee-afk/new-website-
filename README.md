# Kerala Origins

Single-page site. Plain HTML and CSS — no build step, no dependencies.

## Structure

1. Hero — Western Ghats, Edition 02 date and venue
2. Facts strip
3. Why this exists
4. People. Place. Process.
5. The editions — KO—02 (next) and KO—01 (completed, with photos)
6. Register
7. Footer

## Fill these before launch

Everything in `[square brackets]`:

- **Facts strip** — people so far, coffees poured. Real numbers across both editions.
- **Edition 02** — one or two lines on what it will hold
- **Edition 01** — one or two lines on what happened
- **Three photos** from Edition 01. Drop an `<img>` inside each `.shot` div; it
  covers automatically. One wide room shot, one close on hands or cupping bowls,
  one of someone pouring or talking.

Also replace:

- `YOURDOMAIN.com` — in `index.html`, `robots.txt`, `sitemap.xml`
- `91XXXXXXXXXX` — the WhatsApp number in the register section
- `YOUREMAIL@DOMAIN.com` — the mailto fallback

## Before it goes live

- **Malayalam needs a native copy editor.** Three lines: the tagline in hero and
  footer, `വളരുന്നത് ഇവിടെ` in the editorial, and the three panel captions.
  They carry meaning, not decoration — an error will be visible to every reader.
- **Confirm The Cochin Club booking covers non-member attendees** before
  publishing an open registration link. It is a members' club.
  +91 484 2216211 · cochinclub@sify.com
- **Photo permissions** — get an okay from anyone recognisable in the Edition 01
  shots before they go on a public page.

## Palette

| Token         | Hex       | Role                                |
|---------------|-----------|-------------------------------------|
| Malabar Green | `#0B4F3A` | Facts, register, panels, footer type |
| Coconut Paper | `#F4E8CF` | Page background                     |
| Coffee Ink    | `#191510` | Body type, footer                   |
| Turmeric      | `#F2B827` | Edition 02 accent                   |
| Cherry Red    | `#D6472F` | People panel, drop cap              |
| Monsoon Blue  | `#2D6275` | Place panel                         |

Each edition takes one rotating accent. Change `--turmeric` for Edition 03 and
the whole page follows.

Type: Playfair Display (display), Inter (body), DM Mono (data), Anek Malayalam.

## Fog

Three layers desktop, two mobile. Each is a tile duplicated end-to-end in a
200%-wide track translating exactly -50%, so the loop is seamless. Drift
38s/62s/88s plus independent opacity cycles. Horizontal only — that is what
separates mist from smoke. Clipped inside `.ghats` so it never reaches text.
Off under `prefers-reduced-motion`.

## Deploy

```bash
git init && git add . && git commit -m "Kerala Origins"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/kerala-origins.git
git push -u origin main
```

Vercel → Import → Framework preset **Other** → build command and output
directory both **empty** → Deploy.


## Five-page Kaapi Kada Almanac structure

| Page | File | Vernacular character |
|---|---|---|
| Home | index.html | Almanac cover — mountain scenes + tickers + stamps |
| Why We Exist | why-we-exist.html | Malayalam film poster — three acts |
| Our Story | our-story.html | Matchbox label archive — editions as labels |
| Farmers | farmers.html | Painted wall chart — cherry-to-cup in six steps |
| Contact | contact.html | Lorry art — route board Calicut → Fort Kochi |

Shared system: styles.css (tokens, tickers, matchbox stamps, menu overlay,
buttons, footer) + app.js (menu, reveals, ticker loop, cherry cursor).

Fill before launch, in addition to earlier list: [bracketed] lines on
our-story and farmers pages, WhatsApp number and email on contact page.
ALL Malayalam still needs a native copy-editor pass — there is much more of it
now, on every page.
