# Framer → Next.js conversion notes (themochi.app)

## Status

| Area | State |
|---|---|
| Foundation (fonts, tokens, breakpoints, analytics, metadata, 404) | done |
| Shared chrome (nav + mega menu + phone menu, CTA block, footer) | done |
| Home page `/` (all 10 sections, 3 breakpoints, scroll/pinned/ticker/tab/accordion behaviour) | done, offsets match live within 1px |
| Other ~40 unique pages | not started (dumps + reference screenshots already captured) |
| CMS collections (Updates 55, Watch 31, Academy 11, Legal 2, Audit 2) | not started |
| Demo multi-step form backend, calculator, Calendly/Wistia/YouTube embeds on other pages | not started |

## How the site is structured

- Breakpoints are Framer's: phone `<= 809px` (no prefix), tablet `810-1199px` (`md:`), desktop `>= 1200px` (`lg:`). `sm`/`xl` are intentionally disabled in `app/globals.css`.
- Fonts are self-hosted in `public/fonts` via `next/font/local` (`app/fonts.ts`): Inter, Clash Display (Fontshare, check licence for self-hosting), Open Runde, Geist Mono.
- Colour tokens in `app/globals.css` mirror Framer's 85 colour styles.
- All Framer-hosted images/videos used by the home page are mirrored in `public/framer/` under their original hashed names.
- Tracking scripts (Hyros, Dub, Mochi pixel, Meta Pixel, Mochi attribution hub, PostHog, affiliate/UTM capture, first-touch POST) live in `components/layout/analytics.tsx` + `public/js/`.
- `components/ui/button.tsx` holds the Framer button variants; `components/ui/reveal.tsx` is the Framer "appear" effect (spring 150/30).
- The Framer 404 page is a copy of the home page; `app/not-found.tsx` does the same.

## Known deviations from the Framer site

- Hero sky follows the updated Figma design (mochi-web-v2 `background`, node 304:2249) instead of Framer: one 50%-opacity layer (blue-to-white gradient + clouds, fading out at the bottom). Underneath, Framer's grainy "Sky Background" strip is replaced by a plain gradient of its average row colours, which keeps Framer's saturation without the grain, painted clouds and horizon. On phone the 50% layer is clipped and fades into that base, so it has no hard bottom edge. The html background is the sky's top colour (white in the bottom half of the page) and body is transparent (Safari uses body's background over html's), so overscrolling or pull-to-refresh past the top shows sky instead of white. Keep html and body agreeing on that colour: Safari 26+ samples the transparent fixed nav at the top edge (the sky) and paints a solid block over the nav when that differs from the page colour; offsetting the nav off the edge instead makes Safari let page content cover it during pull-to-refresh.
- Phone footer: Framer's grid is broken on the live site (Integrations column collapses, 1549px tall). The intended 2-column grid is implemented instead (~757px).
- Several "Start Free Trial" CTAs have no destination in Framer (`href=null`); they link to `https://use.themochi.app` (nav/footer CTAs use `/login`).
- "AS SEEN IN" (Forbes) label uses Montserrat on Framer; rendered in Inter here (Montserrat not bundled).
- Liquid-glass displacement filters inside the feature mockups (pills, chips, composer) are approximated with translucent backgrounds/blur; the nav pill uses a real port of the SVG displacement filter.
- Mega menu open/close, mobile menu height and scrolled-nav width use CSS/motion springs that approximate Framer's layout springs.
- Chat mockup intermediate animation frames in the Features section are approximations; final states and step timings match.
- Features section on tablet/desktop no longer uses Framer's 450vh pinned showcase (one phone, swapping copy, progress dots). Each feature is a card (32px from the screen edges, 128px shorter than the screen at each end, 32px apart, copy in the left half with the mascot beside the CTA) whose clip-path masks a phone fixed in the centre of the right half and vertically centred on screen, so scrolling reveals each feature's phone. The desktop frame gets the bottom fade the tablet/CRM frames already had, so its flat bottom edge never shows inside a card. Mockups mount a screen early and play once their card is 40% visible. The phone variant is unchanged.
- Yearly struck-through pricing uses Clash Display 500 instead of the variable 400 weight.

## Next steps

1. Scrape the five Framer CMS collections (static HTML already saved for server-rendered entries; the rest render client-side) into `content/` and build the `updates`, `watch`, `academy`, `legal`, `audit` templates.
2. Convert the remaining unique pages, reusing nav/footer/CTA and the home-page primitives. Dumps and reference screenshots for every page exist in the session scratchpad (`dumps/pages`, `ref/pages`).
3. Replace the Framer form backend for `/demo` and `/demo-jia` with a route handler.
4. Add `app/sitemap.ts` and `app/robots.ts` once all routes exist (robots must keep `Disallow: /calculator /proposal /login /admin` and the AI-crawler allow list).
