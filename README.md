# Kerala Origins website

Complete static website package with the event updates, prepared 3 October 2026. Contains seven HTML pages, styles, scripts, existing website images and videos, event posters, registration QR, icons, sitemap and robots.txt.

## Upload to GitHub

1. Extract this ZIP.
2. Create or open the repository intended for Kerala Origins.
3. Upload everything INSIDE the extracted `Kerala-Origins-Website` folder. Keep `index.html` at the repository root, alongside the other pages and the `assets` folder.
4. Keep all filenames and folder paths unchanged. Upload the extracted files, not the ZIP itself.

This is a static website and needs no build command. Uploading to GitHub does not itself update the existing live website; deploy this repository through the hosting service for Kerala Origins. Paths and canonical URLs target the root of https://www.keralaoriginscoffee.com/. A hosting URL with a repository subdirectory would need a path adjustment.

For local review, run `python3 -m http.server 8000` inside this folder and open http://localhost:8000. Opening an HTML file directly will not resolve the root-relative asset paths.

## Included event updates

- New `/events.html` page with the upcoming and previous editions. Its navigation link appears in the footer.
- Edition 02, Kochi: 10 October 2026, 2–6 PM IST, Cochin Club, Fort Kochi.
- Edition 01, Kozhikode: 11 July 2026, 2–5 PM IST, Sukoru Specialty Coffee, Calicut. Includes the original poster and freshly written archive copy.
- Current event registration links and QR point to https://forms.gle/MN7cxgS5N3VUBN5B8.
- Homepage, event popup, Our Story, Contact and related FAQs updated.
- Footer's next-edition and roasting-partner lines removed; the existing partner section retained.
- Page metadata, social previews, canonical URLs, structured data, image descriptions and sitemap updated.

## Verification and maintenance

Local page and asset references, JSON-LD syntax, JavaScript syntax, footer navigation and registration destinations have been checked. All local media referenced by the pages are included. Google Fonts, Google Forms, Formspree and social/contact links remain external services.

Mobile/desktop visual rendering and interactive browser tests still need a check after deployment. The registration destination matches the supplied QR; the Google form itself has not been submitted or tested. The existing producer enquiry form continues to use its original Formspree endpoint.

After the Kochi edition, update its visible registration status and any related metadata together. The Events page is a multi-event archive; its structured data does not guarantee Google event-rich results or search rankings. Submit the updated sitemap through the site's verified Search Console property after deployment.

## Event sources

- Edition 02: the supplied Kerala Origins Kochi poster.
- Edition 01: https://bermito.com/blogs/events/kerala-origins-specialty-coffee-calicut and its original poster.

No live website, hosting settings or GitHub repository was changed while preparing this package.
