# Framer → Next.js conversion notes (themochi.app)

## Status

| Area | State |
|---|---|
| Foundation (fonts, tokens, breakpoints, analytics, metadata, 404) | done |
| Shared chrome (nav + mega menu + phone menu, CTA block, footer) | done |
| Home page `/` (all 10 sections, 3 breakpoints, scroll/pinned/ticker/tab/accordion behaviour) | done, offsets match live within 1px |
| Inner pages in `app/(notrefined)` (attribution ×5, features ×4, reply-agent, download, mcp, meta-ads, payments, zapier, updates) | done, verified against live |
| Remaining unique pages: partner, calculator, legal ×2, business, agent, prompt-library, changelog, track-to-ig, features/offer, dm-audit, learn, thank-you (noindex, not in the sitemap); funnel pages without site chrome: demo, demo-jia, schedule-your-call, spot-confirmed, unconfirmed, vsl, vsl-2, thank-you-pdf, book-dm-audit | done, verified against live at 390/1024/1440 (section heights within a few px; remaining document-height gaps are the shared CTA block and phone footer, see below) |
| CMS collections | Updates (57) and Legal (2) done; Watch 31, Academy 11, Audit 2 not started |
| Demo multi-step form backend (`app/api/demo`), calculator, Calendly/Wistia/YouTube/Instagram embeds | done; the form needs `DEMO_FORM_WEBHOOK_URL` set (see Next steps) |
| Site files: per-page canonical + og:url, redirects (`next.config.ts`), `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt`, `public/.well-known/security.txt` | done |

## How the site is structured

- Breakpoints are Framer's: phone `<= 809px` (no prefix), tablet `810-1199px` (`md:`), desktop `>= 1200px` (`lg:`). `sm`/`xl` are intentionally disabled in `app/globals.css`.
- Fonts are self-hosted in `public/fonts` via `next/font/local` (`app/fonts.ts`): Inter, Clash Display (Fontshare, check licence for self-hosting), Open Runde, Geist Mono.
- Colour tokens in `app/globals.css` mirror Framer's 85 colour styles.
- All Framer-hosted images/videos used by the home page are mirrored in `public/framer/` under their original hashed names.
- Tracking scripts (Hyros, Dub, Mochi pixel, Meta Pixel, Mochi attribution hub, PostHog, affiliate/UTM capture, first-touch POST) live in `components/layout/analytics.tsx` + `public/js/`.
- `components/ui/button.tsx` holds the Framer button variants; `components/ui/reveal.tsx` is the Framer "appear" effect (spring 150/30).
- The Framer 404 page is a copy of the home page; `app/not-found.tsx` does the same.
- Route groups: `app/(notrefined)` renders nav + CTA block + footer around inner pages; `app/(funnel)` is a bare white `<main>` for the funnel pages that have no site chrome. `app/business` and `app/track-to-ig` sit outside both and compose their own shell like `app/page.tsx` (home sky; /track-to-ig closes with its own CTA instead of the shared block).
- `components/funnel/` holds the pieces shared by the funnel pages: the "Already installed for 120+ industry leaders" creator ring section (`CreatorTicker`, around `CreatorRing` from `components/shared/creator-carousel.tsx`), the Wistia embed and the "27 founders booked a call this week" badge.
- Legal entries live in `content/legal/*.json` (loader `lib/legal.ts`, route `app/(notrefined)/legal/[slug]`), like the updates collection.
- /changelog has no local data: it reads `https://mochi-customer-support-production.up.railway.app/api/changelog` (first page server-side with 5-minute revalidation, filters and "Load more" client-side), exactly as the live code component does.

## Known deviations from the Framer site

- Hero sky follows the updated Figma design (mochi-web-v2 `background`, node 304:2249) instead of Framer: one 50%-opacity layer (blue-to-white gradient + clouds, fading out at the bottom). Underneath, Framer's grainy "Sky Background" strip is replaced by a plain gradient of its average row colours, which keeps Framer's saturation without the grain, painted clouds and horizon. On phone the 50% layer is clipped and fades into that base, so it has no hard bottom edge. The html background is the sky's top colour (white in the bottom half of the page) and body is transparent (Safari uses body's background over html's), so overscrolling or pull-to-refresh past the top shows sky instead of white. Keep html and body agreeing on that colour: Safari 26+ samples the transparent fixed nav at the top edge (the sky) and paints a solid block over the nav when that differs from the page colour; offsetting the nav off the edge instead makes Safari let page content cover it during pull-to-refresh.
- Phone hero follows the mochi-web-v2 Figma (node 540:16369): 48/48 headline, a full-width pill CTA, then a centred "Trusted by" title over a full-width ticker (both ends fading over 5%), with the Meta and Forbes logos in two columns below it. Tablet/desktop keep the Framer layout (logos under the CTA, "Trusted by" inline), except the hero CTA is a pill there too.
- CTA and description type follow that Figma site wide: every big "Start Free Trial" button is Inter 500 20px/21.75px at all breakpoints (`primaryBig`/`whiteBig`, the features CTA and the CTA block), and section descriptions use `descriptionText` (`components/ui/text.ts`): 18/28 on phone and tablet, 20/28 on desktop.
- Phone footer: Framer's grid is broken on the live site (Integrations column collapses, 1549px tall). The intended 2-column grid is implemented instead (~757px).
- Several "Start Free Trial" CTAs have no destination in Framer (`href=null`); they link to `https://use.themochi.app` (nav/footer CTAs use `/login`).
- "AS SEEN IN" (Forbes) label uses Montserrat on Framer; rendered in Inter here (Montserrat not bundled).
- Liquid-glass displacement filters inside the feature mockups (pills, chips, composer) are approximated with translucent backgrounds/blur. The nav pill is 80% white with an 8px backdrop blur, as in the mochi-web-v2 Figma; the port of Framer's SVG displacement filter was dropped because rebuilding it on every frame of the mega menu opening made hovering "Features" lag.
- Mega menu open/close and mobile menu height use CSS/motion springs that approximate Framer's layout springs.
- The nav pill keeps its full width on scroll (Framer's "Desktop/Expand" variant shrank it to its content). The Features mega menu follows the mochi-web-v2 Figma (node 546:2244): the pill grows to hold it, three white bordered columns under the bar, Central icons for the non-brand items. The phone menu keeps Framer's contents (section accordions, links, stacked buttons) but opens the same way: the hamburger grows the frosted pill instead of swapping it for a white sheet, down to 20px from the bottom of the screen, with the accordions scrolling and the two buttons pinned at its bottom. Tapping outside the pill or following a link closes it.
- Chat mockup intermediate animation frames in the Features section are approximations; final states and step timings match.
- Features section on tablet/desktop no longer uses Framer's 450vh pinned showcase (one phone, swapping copy, progress dots). Each feature is a card (32px from the screen edges, 32px apart, 128px shorter than the screen at each end unless its copy needs more; copy vertically centred in the left half and on the page grid on desktop, mascot underneath) whose clip-path masks a phone fixed in the centre of the right half and vertically centred on screen, so scrolling reveals each feature's phone. The desktop frame gets the bottom fade the tablet/CRM frames already had, so its flat bottom edge never shows inside a card. Mockups mount a screen early and play once their card is 40% visible. On phone the features are the same tinted cards stacked (centred label and heading, phone frame shrunk to fit narrow screens, no body copy) with one "Start Free Trial" that sticks to the bottom of the screen and comes to rest under the last card; the timeline section above no longer has its own phone CTA.
- Revenue section on phone uses the same three tabs as tablet/desktop (smaller labels that wrap) instead of Framer's three stacked image + copy blocks; the active tab shows its heading, paragraph and phone crop of the screen. Performance Reports uses the desktop copy (Framer's phone block repeated the Funnel Dashboard paragraph).
- Yearly struck-through pricing uses Clash Display 500 instead of the variable 400 weight.
- The home canonical and og:url are `https://themochi.app` without Framer's trailing slash: Next's metadata resolver always strips it from a bare `/`, and `trailingSlash: true` would change every URL. Same URL either way.
- `security.txt` is served as plain text (live serves an RTF file by mistake) with Expires renewed to 2027-10-10. `robots.txt` says `User-Agent` where live says `User-agent` (Next's output; field names are case-insensitive).

### Pages added in the second batch

- Shared: every inner page is ~100px taller than live at >=1200px because the CTA block now has `lg:pt-[180px]` (home spacing); live inner pages have 80px there. Phone pages are ~745px shorter than live because of the footer fix above.
- Several pages use their own 1220px desktop breakpoint on live (/calculator, /dm-audit, /features/offer). /calculator keeps it (`min-[1220px]:`, the wide calculator only exists from there); the others use the site's 1200px.
- Some pages use Framer text presets with Inter's `cv03/cv04/cv09/cv11` (single-storey "a"); /partner and the legal/updates pages enable them locally (`interFeatures`), the rest of the site does not.
- /legal: the table of contents works (h1-h4 of the body, active row, scrolls inside its sticky box, desktop only as on live); live server-renders "No headings found" and its list runs off screen. Legal copy is kept verbatim, including the duplicated draft headings and "[insert publication date]".
- /calculator: one state shared by the wide (>=1220px) and stacked variants; stepper buttons use pointer events, so a phone tap steps once (live steps twice: touch + mouse).
- /demo, /demo-jia: the "you're a bit early" rule (lowest revenue bracket) applies at every width (on live it never ran on tablet and raced on desktop). Hidden tracking fields are de-duplicated and renamed (`setter_ref` for `?s=`); the IP is added server-side. Calendly and the disqualified screen mount only when shown. /schedule-your-call gets a canonical (live has none).
- /business: follows the redesigned home components wherever it is the same Framer component as home (features cards, revenue tabs, section spacing); its phone ticker is centred under the label (on live it is squeezed to 2px). Live typos kept ("Alex Team updatedg").
- /track-to-ig: the "viewer path" Framer HTML embed is a React component; buttons use the site `primaryBig`/`whiteBig` pills; it keeps the shared footer (live shows an older footer here).
- /agent: "See how it works" keeps live's `/mcp#questions` href; /mcp now has the `#questions` and `#set-up` anchors live has.
- /prompt-library: the "Run via Claude / Run via Mochi App" tabs are inert, as on live.
- /changelog: the gradient background covers `<main>` only (live paints it behind the CTA/footer too). The platform filter sends `tags=<platform>` as live does, so "Web" always shows the empty state.
- /vsl, /vsl-2, /thank-you-pdf: Framer's SmoothScroll is not ported (native scrolling); confetti is a small port of canvas-confetti; feature cards below an opened card jump instead of following Framer's layout spring.
- /book-dm-audit is a Framer HTML embed of a Poppins page, ported 1:1 (including its fixed 1080px inner scroll on tablet/desktop); its booking link appends UTMs/fbclid/ref on click.
- /learn keeps live's ">=1752px" hero variant; its sticky bottom bar no longer blocks clicks on the content under it.
- /thank-you: Wistia posters are mirrored and card heights are static (live fetches both from oEmbed at runtime).
- Wistia is embedded inline with `next/script` instead of Framer's iframe, so the blurred swatch placeholder actually shows.

## Next steps

1. Scrape the remaining Framer CMS collections (server-rendered entries come through with curl; the rest render client-side) into `content/` and build the `watch`, `academy`, `audit` templates. Most `watch` entries embed Wistia: reuse `components/funnel/wistia-video.tsx`.
2. Set `DEMO_FORM_WEBHOOK_URL` in the deployment to whatever consumed Framer's form webhook (live posts to Framer's form store, form `a976c191-a5fe-404e-8b65-7f02dc12086e`). Until then `app/api/demo` logs each lead (with contact details) to the server log and returns 200.
3. /business carries props-driven copies of the home features cards, timeline, comparison and testimonials (`components/pages/business/`); letting the home components take their copy as props would reduce those to data files.
4. Decide whether to port Framer's `data-preserve-internal-params`: on live, every internal link gets the landing URL's query string (UTMs, `ref`, `fbclid`) appended. `public/js/attribution.js` still stores UTMs in localStorage, but on later pages the tracking scripts no longer see them in the URL.
