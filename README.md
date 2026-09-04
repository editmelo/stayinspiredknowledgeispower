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

## Connecting Square

The shop is wired for **Square-hosted checkout**. Card details never touch this
site: we create a payment link server-side and send the shopper to Square, so
Square handles the card form, PCI, receipts and refunds — and the sale lands in
the same Square account as her in-person vendor-booth takings.

Until the two credentials below exist, product cards behave exactly as they
always have: they open the existing store. Nothing breaks while this is unset.

### What Miriam needs to do

1. Sign in at **developer.squareup.com/apps** with the same login she uses for
   Square. Her seller account already works here; there is nothing new to buy.
2. **+ Create app**, name it something like `Stay Inspired Website`.
3. Open the app, then **Credentials**. Note the **Sandbox** / **Production**
   toggle at the top — they are different tokens, and the sandbox one charges
   nothing. Copy the **Access token**.
4. Go to **Locations** in the same app and copy the **Location ID**.

Send those two values to the developer **privately** — a password manager, or
1Password/Bitwarden send. Not email, not Slack, and never into this repo: it is
public, and a leaked access token can take payments as her.

### Local development

```bash
cp .env.example .env.local     # .env* is gitignored
# paste the SANDBOX token and the SANDBOX location ID
npm run dev
```

Test with Square's sandbox card `4111 1111 1111 1111`, any future expiry, any
CVV. No real money moves.

**Keep local on sandbox permanently.** Production credentials on a laptop mean a
stray test charges a real card. Production values belong only on the host.

### Production on Vercel

Set the three variables in **Project → Settings → Environment Variables**, scoped
to **Production** only:

| Name | Value |
|---|---|
| `SQUARE_ACCESS_TOKEN` | the **production** access token |
| `SQUARE_LOCATION_ID` | the **production** location ID |
| `SQUARE_ENVIRONMENT` | `production` |

Or with the CLI (`npm i -g vercel`, then `vercel link`):

```bash
vercel env add SQUARE_ACCESS_TOKEN production   # prompts, value is not echoed
vercel env add SQUARE_LOCATION_ID production
vercel env add SQUARE_ENVIRONMENT production
```

**These are read at build time.** `/shop` is statically prerendered, so whether
the cart appears is decided when the site builds, not when someone visits.
Changing any of these variables requires a **redeploy** before it takes effect.
Set them before the first production deploy, or redeploy straight after.

Sandbox and production are separate accounts with different tokens *and*
different location IDs. Mixing a sandbox token with a production location fails.

### What is built

- `lib/square.ts` — creates the hosted payment link at
  `/v2/online-checkout/payment-links` (REST, no SDK dependency).
- `app/api/checkout/route.ts` — takes slugs and quantities, looks prices up
  **server-side**, returns the Square URL. A tampered request cannot change the
  price charged; this is verified against the live sandbox.
- `components/CartProvider.tsx` — cart state, persisted to `localStorage` via
  `useSyncExternalStore`. Stores slugs and quantities only, never prices, and
  drops any slug no longer in the catalog.
- `components/CartDrawer.tsx` — the panel: quantities, subtotal, checkout.
  Focus-trapped, Escape closes, background scroll locked.
- `components/AddToCartButton.tsx`, `components/CartButton.tsx` — the card
  button and the header trigger with its count.
- `components/ClearCart.tsx` — empties the cart on `/shop/thank-you` only, so
  abandoning Square's checkout leaves the cart intact.
- `/shop/thank-you` — where Square returns the shopper after paying.

### Still to do once it is live

- **Shipping and tax.** Square collects the delivery address, but shipping
  rates and tax must be configured in the Square Dashboard. Until then she
  absorbs postage on every order.
- **Inventory** is not synced. Square will not stop a sale when she runs out.
- **No order confirmation from us.** Square emails the receipt; the site sends
  nothing and keeps no record of orders.

## Things to confirm with Miriam before launch

These are written as accurately as the brief allowed, but a few need her sign-off:

1. **Checkout is now on-site via Square** (see "Connecting Square" above), verified end to end against Square's sandbox. Cards fall back to the Wix store (`org.legacyStore`) only when the credentials are absent at build time.
2. **Instagram handle — likely wrong.** The site links `@getfitwmiriam`, the only handle supplied. Her own printed bookmarks name two different accounts: **`knowledge_is_powerllc`** for the company and **`miriamdr.speaksllc`** for the speaking brand. Not changed without a say-so, but the current link is probably not where supporters should be sent. Facebook, Instagram and LinkedIn are the three shown; there is no TikTok.
3. **"Mental Health Alliance."** The meeting notes said Alliance; the resource list uses **Mental Health America** (`mhanational.org`), which is almost certainly what was meant. Worth a check.
4. **Child welfare / DCS.** Described as "years of work in Indiana child welfare" rather than naming the agency or a title, since the brief only said "DCS background." She should set the exact wording.
5. **William's memorial section (`/about`) is placeholder copy.** The photographs are in place; the two paragraphs in `william.copy` (`content.ts`) are holding text that says so out loud. Miriam is writing this herself — replace before launch.

   Two of the eight photographs show **children's faces** (`family-portrait.jpg`, `grandchildren-memorial-tees.jpg`) and one is the **graveside** (`graveside.jpg`). All three are fine to keep, but they are the kind of thing a family should choose to publish deliberately rather than by default. Ask.
6. **Speaking topics may be off-message.** The four talks under "What she can speak about" were written from the original brief and lean on addiction. Her bookmark describes the programme as *"empowering youth ages 12–18 … evidence-informed tools to practice positivity, strengthen resilience."* The topics were left alone rather than rewritten, but they should probably be replaced with her actual session list.
7. **Zelle.** Her Zelle QR is held in `private-assets/`, which is gitignored and outside `public/` — deliberately not on the site and not in this repo, per instruction. See `private-assets/README.md`. Note that this repo is public, so anything committed under `public/` is published permanently.
8. **Speaking availability.** The site says "Now booking first engagements for the 2026–27 school year," which reflects having no bookings yet without sounding new. Update as dates fill.
9. **William.** William Rivera was Miriam's father; she lost him to mental health and substance use. She should read the passages on `/about` and `/scholarship` and approve the wording herself. No quotations are attributed to her anywhere on the site.
10. **Resources layout.** The ask was for "a dropdown with multiple resource links," because Wix only allowed one. This is built as four labelled groups of four links each — sixteen total, all visible, no clicking to discover them. If she specifically wants a collapsed dropdown, that is a small change.
11. **Scholarship application.** Currently a pre-filled email. If she wants a real form with file upload, that is a follow-up.
12. **Contact form** composes an email in the visitor's mail app rather than posting to a server, so nothing can silently fail to arrive. If she would rather receive submissions directly, that needs a form service or an API route.

---

## Accessibility and performance

- Skip link, visible keyboard focus (lime on dark, rose on light), `aria-current` on the active nav item, labelled form fields with inline validation.
- The YouTube embed is click-to-load, so nothing is requested from YouTube until a visitor presses play.
- All pages are statically prerendered. Images go through `next/image`.
- Verified at 1440px and 390px with no horizontal overflow, no console errors and no broken images.
