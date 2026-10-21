KERALA ORIGINS — JOURNAL UPDATE ONLY
Prepared: 21 October 2026

This is a manual-upload update, not a complete website or a deployment.
Nothing has been published or pushed to GitHub. It is only for the Kerala
Origins website at www.keralaoriginscoffee.com, not Calidry or another site.

WHAT IS INCLUDED

- journal.html: the new Journal landing page, matching the existing Kerala
  Origins colours and typography, with a featured guide and relevant links.
- kerala-specialty-coffee-regions-producers.html: the complete researched
  article, regional photographs, contents navigation, producer links,
  numbered sources and image credits.
- journal.css: styles scoped to the two new pages, including phone/tablet
  layouts, focus states, reduced-motion support and print styles.
- assets/journal/: three openly licensed photographs, responsive WebP and
  JPEG versions, a social-sharing image, and IMAGE-CREDITS.txt.
- sitemap.xml: the existing sitemap plus the two new pages and article images.
- Nine existing HTML pages, each changed ONLY to add Journal to its footer:
  index.html, our-story.html, why-we-exist.html, farmers.html,
  producers.html, contact.html, events.html, kochi-2026.html,
  kozhikode-2026.html.

No existing photos, videos, shared styles.css or shared app.js are included
or changed. The existing assets and files must remain on your website.

MANUAL UPLOAD

1. Back up your current Kerala Origins website files.
2. Extract this ZIP on your computer. Do not upload the ZIP itself as a page.
3. Open the Kerala Origins repository/folder containing the current index.html.
   Do not use the Calidry repository.
4. Upload the extracted website files into that same root, preserving the
   assets/journal/ folder. Replace the matching HTML files and sitemap.xml.
   Do not put them inside a new parent folder. Do not delete unrelated files.
5. If your live site has been edited since the previous Kerala Origins update,
   merge the footer change into your newer HTML files instead of replacing
   them blindly. The only existing-page addition is this line, immediately
   after the footer's Events link:

   <a href="/journal.html">Journal</a>

   Likewise, merge the two new URLs and their image entries into your newer
   sitemap rather than discarding any pages added since the previous update.
6. Commit/upload manually and let your existing hosting workflow deploy it.
   There is no npm install, build step, new service or subscription required.
7. Check /journal.html and /kerala-specialty-coffee-regions-producers.html
   on the live domain. Open the Journal link from the homepage footer.
   Check the photos, contents links and producer links on a phone as well.

The pages use the same root-relative URL convention as your existing site.
They should be served at the root of the configured custom domain, not a
new subfolder. Double-clicking HTML files locally is not a full deployment
test because root-relative links need a web server.

SEO INCLUDED

- Unique page titles, descriptions and canonical URLs on the current domain.
- Open Graph and social preview metadata with a self-hosted 1200 x 630 image.
- Blog/CollectionPage, BlogPosting and BreadcrumbList JSON-LD.
- One H1 per new page; meaningful headings and crawlable article text.
- Internal links between Journal, the article, producers, events and our story.
- Descriptive image alt text, image dimensions, responsive sources and lazy
  loading for the two photographs below the lead image.
- Updated sitemap entries. The current robots.txt already remains in place.

After deployment, use the site's existing Google Search Console account to
inspect the two new URLs and submit the updated sitemap if appropriate.
No account action or Search Console submission has been made for you.
Search indexing, ranking and rich-result display are not guaranteed.

EDITORIAL & PHOTOGRAPHY NOTES

The byline is Kerala Origins. The article is dated 21 October 2026 and is
approximately 1,800 words before research notes. If publication happens on
a different date, update the visible date, datePublished/dateModified in
both pages' structured data, article date metadata and sitemap consistently.

The article distinguishes government/research sources, estate or roaster
accounts, and Kerala Origins' own programme records. It makes no invented
tasting-score, export-success, interview or independent-review claims.

Three photographs were sourced from Wikimedia Commons and verified as
CC BY-SA 4.0. They are openly licensed, not copyright-free. Visible credits,
source links, licence links and change notices are already included.
Retain assets/journal/IMAGE-CREDITS.txt and the page credits. Any adaptations
of those images remain under CC BY-SA 4.0. This does not relicense the
website's separate code, brand or editorial text.

The Nelliyampathy image shows a tea-growing landscape, clearly labelled as
regional context. The photographs are not presented as photographs of any
named featured estate or as documentation of a Kerala Origins farm visit.

CHECKS COMPLETED

- Desktop and small-screen browser review, including phone and tablet widths.
- Journal-to-article navigation and contents anchors.
- Shared menu open/close, Escape handling and focus restoration.
- Local file links, producer anchors, image attributes and image loading.
- JSON-LD syntax, canonical fields, heading counts and sitemap XML.
- File-by-file comparison against the pre-Journal website: no deleted files;
  existing HTML changes are limited to the footer link.

This update does not change event status, registration, founder details or
producer records elsewhere on the site. Those previous updates are retained.
