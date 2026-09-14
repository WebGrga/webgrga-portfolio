# webgrga.com

Roko Grga's portfolio, designed as an editorial motorsport broadcast rather than a standard developer card grid.

## What is here

- Opt-in F1-inspired driver entrance with an original Web Audio synth sting
- Five evidence-led project case studies with direct public repository links
- Page-wide surface and accent controls with saved preferences
- Lazy-loaded Three.js journey map with a reduced-motion path
- Responsive layouts for desktop and mobile
- Netlify redirects, security headers, metadata, sitemap, and cache rules

## Run locally

```bash
pnpm install
pnpm dev
```

## Verify

```bash
pnpm typecheck
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

## Deploy to Netlify

Create a new Netlify site from this repository. The included `netlify.toml` uses `pnpm build` and publishes `dist`. Point `webgrga.com` to the resulting site after the production deploy has been checked.

## Design direction

The visual system uses one semantic accent at a time across graphite or warm-light surfaces. Cut corners, telemetry typography, sparse borders, and large editorial type carry the racing language without copying a real team or championship identity.

The route illustration and fictional driver portrait were generated specifically for this portfolio. The driver image was derived from Roko's own GitHub profile photo and deliberately contains no real team, sponsor, or racing-series branding.

## Asset prompts

The generated driver cutout prompt requested an identity-preserving editorial motorsport portrait, a fictional charcoal suit, papaya rim light, no logos, and a transparent background.

The generated journey prompt requested a graphite software-adventure world connected by an orange elevated road through five development landmarks, with no text or brand marks.

## Rights

Source code is available under the MIT license. Personal photographs and identity-derived image assets are not licensed for reuse.
