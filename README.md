# Stay Inspired Knowledge Is Power — website

Next.js 16 (App Router) + Tailwind CSS v4. Static, no database, no server code.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Deploys to Vercel as-is: import the repo, framework auto-detects as Next.js, no environment variables required.

---

## Design direction

The whole visual system comes out of Miriam's own brand rather than a stock palette.

**Palette** — sampled from the brand seal: the black disc, the deep rose of the flower, the forest green of its leaves, and the warm ivory of the lettering. Green is used consistently and only for the scholarship fund, so the colour itself tells you when you are looking at where the money goes.

| Token | Hex | Used for |
| --- | --- | --- |
| `ink` | `#121013` | Primary dark background |
| `coal` | `#1b181d` | Alternate dark background |
| `bone` | `#efece5` | Light "paper" sections |
| `rose` | `#a82836` | The brand. Buttons, waveform, crisis bar |
| `rose-lit` | `#d2384a` | Hover and accent type on dark |
| `leaf` | `#2e5233` | The scholarship fund, everywhere it appears |
| `lime` | `#8fd14f` | Availability notes, focus rings |

**Type** — Bodoni Moda for display (the "fashion-centered" half of her stated vision) and Instrument Sans for reading. Two families only.

**Signature element** — the waveform. "Music Is My Therapy" is the flagship design and a waveform already runs through that artwork, so the site uses one as its spine. It underlines every page title and separates sections, with an amplitude that matches what the section is saying. The `silence` variant — full voice, a held silence, then louder than before — appears in exactly three places: the scholarship section on the home page, the scholarship page hero, and the passage about William on the About page. It is not used anywhere else, on purpose.

Motion is deliberate and narrow: a page-load stagger, a scroll reveal, the waveform drawing in, and the community photo strip drifting. All of it respects `prefers-reduced-motion`.

---

## Structure

| Route | Bucket | Notes |
| --- | --- | --- |
| `/` | all five | Ordered by Miriam's priority: swag, speaking, education, scholarship, resources |
| `/shop` | 1 | Ten products in four categories. Cards link out to the current store |
| `/speaking` | 2 | Miriam D.R. Speaks — differentiators, four talk topics, audiences, booking steps |
| `/learn` | 3 | The "How Addiction Happens" video plus a stigma-language table |
| `/scholarship` | 4 | Eligibility, what it covers, how to apply, two ways to give |
| `/resources` | 5 | Crisis block, ZIP search, sixteen links in four grouped sections |
| `/about` | — | Mission, vision, William, the verse |
| `/contact` | — | Booking and enquiry form |

**Crisis help is on every page** — a rose bar above the navigation, plus a block in the footer, plus the top section of `/resources`. That is deliberate for a mental health site and should not be removed to tidy up the header.

---

## Editing content

Almost everything is in **`lib/content.ts`** — mission text, all ten products with prices and photos, speaking topics and audiences, scholarship figures, and every resource link. Change a price or add a resource there and it updates everywhere it appears. No layout files need touching.

Images live in `public/`:

- `public/brand/` — `seal.png` (transparent, used in the nav, footer and closing sections), `seal.jpg`, `roses.jpg`, `ribbon.jpg`
- `public/products/` — one photo per product, named to match the `slug` in `content.ts`
- `public/photos/` — Miriam and the community shots. `miriam-event.jpg` is a crop of `miriam-standing.jpg`

All of these were pulled from the current Wix site, so they are the same photos Miriam is already using. Higher-resolution originals would improve the hero noticeably — the source there is only 1154px wide.

---

## Things to confirm with Miriam before launch

These are written as accurately as the brief allowed, but a few need her sign-off:

1. **Checkout.** Product cards open the existing Wix store in a new tab (`org.legacyStore` in `content.ts`). Real on-site checkout would need a commerce integration — Stripe or Shopify via the Vercel Marketplace — which is a separate piece of work.
2. **Instagram handle.** The site links to `@getfitwmiriam`, which is the only Instagram supplied. It reads as a personal fitness account rather than a Stay Inspired business account — worth confirming that is where she wants supporters sent. Facebook, Instagram and LinkedIn are the three accounts shown; there is no TikTok.
3. **"Mental Health Alliance."** The meeting notes said Alliance; the resource list uses **Mental Health America** (`mhanational.org`), which is almost certainly what was meant. Worth a check.
4. **Child welfare / DCS.** Described as "years of work in Indiana child welfare" rather than naming the agency or a title, since the brief only said "DCS background." She should set the exact wording.
5. **Speaking availability.** The site says "Now booking first engagements for the 2026–27 school year," which reflects having no bookings yet without sounding new. Update as dates fill.
6. **William.** The site states that Miriam lost her son to substance use and that the fund carries his name. This is inferred from the brief and the fund's own eligibility rule. She should read those passages — on `/about` and `/scholarship` — and approve the wording herself. No quotations are attributed to her anywhere on the site.
7. **Resources layout.** The ask was for "a dropdown with multiple resource links," because Wix only allowed one. This is built as four labelled groups of four links each — sixteen total, all visible, no clicking to discover them. If she specifically wants a collapsed dropdown, that is a small change.
8. **Scholarship application.** Currently a pre-filled email. If she wants a real form with file upload, that is a follow-up.
9. **Contact form** composes an email in the visitor's mail app rather than posting to a server, so nothing can silently fail to arrive. If she would rather receive submissions directly, that needs a form service or an API route.

---

## Accessibility and performance

- Skip link, visible keyboard focus (lime on dark, rose on light), `aria-current` on the active nav item, labelled form fields with inline validation.
- The YouTube embed is click-to-load, so nothing is requested from YouTube until a visitor presses play.
- All pages are statically prerendered. Images go through `next/image`.
- Verified at 1440px and 390px with no horizontal overflow, no console errors and no broken images.
