# CLAUDE.md

This file guides Claude Code when working in this repo. It reflects the current design/engineering decisions, what’s complete, and what remains. Keep the site simple, fast, and accessible.

## Vision and Constraints

- Audience: Hiring managers and collaborators.
- Stack: Static HTML + modern CSS only. No build tools or frameworks.
- Performance: Small CSS, optimized images, no blocking font loads.
- Accessibility: WCAG 2.2 AA; keyboard-first; visible focus; reduced motion honored.
- Design: Narrow content column; old-school HTML feel with tasteful modern touches.

## Current State (Phases 0–7+ Complete)

- Structure: `index.html`, `projects/*.html`, `assets/`, `main.css`, `vercel.json`, `sitemap.xml`, `robots.txt`.
- Typography/layout:
  - Uniform font size across headings and body; hierarchy via color only.
  - Narrow column (`--content-max-width: 60ch`), body padding responsive.
  - Two font stacks: Inter (sans), Newsreader (serif).
- Header:
  - Name + subhead ("Product Designer").
  - "Open to work" status chip with pulsing dot (uses `--color-success`).
  - Header content flex layout (name on left, status on right).
  - Name has scramble text effect on hover.
- Links:
  - Underline by default; hover uses accent background with readable contrast.
  - External links show a fixed-color icon; a11y text "(opens in new tab)" is visually hidden.
  - Spotify links use green hover state (#1db954) instead of accent.
- Home content:
  - Bio + contact links.
  - Selected Work and Side Projects as rows: project name + year, with subtle dividers between rows.
- Footer:
  - Weather icon widget (emoji, loads from `/api/weather`).
  - Combined widget: local time (NYC) + Spotify status ("listening to..." or "last heard...").
  - Spotify widget shows artist name with link to Spotify profile; animated ellipsis for "currently playing".
  - "Updated Month DD, YYYY" on right.
  - Graceful degradation: shows fallback if APIs unavailable.
- Page load animations:
  - Staggered section entrance (opacity/blur/translate) with 200ms delay between sections.
  - Respects `prefers-reduced-motion`.
- Project detail pages:
  - Standardized: title, year, role, summary, text, media slots, top/bottom back link.
- Accessibility:
  - Landmarks and headings correct; skip link present and readable.
  - Reduced motion disables all animations; focus styles visible and consistent.
  - Widgets are non-interactive decorative elements (not in tab order).

## Information Architecture

- `index.html`: Header (status + name + last updated), Bio (with contact), Selected Work, Side Projects.
- `projects/<slug>.html`: Standard detail template (title, meta, summary, body, media, back links).
- `404.html` (optional later).

## Visual System and Tokens

- Colors:
  - `--color-text` (#1a1a1a), `--color-text-muted` (#666666), `--color-text-footer` (#999999)
  - `--color-bg` (#fefefe, slightly off-white), `--color-accent` (#fc5200), `--color-border` (#e5e5e5)
  - `--color-success` (#1dab62, status dot), `--color-spotify` (#1db954, Spotify links)
- Typography:
  - `--font-sans` (Inter), `--font-serif` (Newsreader)
  - Currently using sans everywhere with optional future serif usage.
  - Type scale: `--font-size-base` (1rem/16px), `--font-size-sm` (0.875rem/14px)
  - Font weights: `--font-weight-normal` (500), `--font-weight-bold` (600)
  - Line heights: `--line-height-tight` (1.25), `--line-height-relaxed` (1.625)
- Spacing:
  - Scale from `--space-xs` (4px) to `--space-4xl` (64px) in consistent increments
- Transitions:
  - `--transition-fast` (0.3s), `--transition-base` (0.75s), `--transition-slow` (1.5s), `--transition-pulse` (2s)
- Layout:
  - `--content-max-width: 60ch`; responsive `--content-padding` (48px → 16px → 12px)

## Completed Decisions Worth Preserving

- Uniform text sizing; hierarchy via color (black vs muted greys).
- Accent-colored hover background for links; fixed-color external icon.
- Spotify links have special green hover state (#1db954) to match Spotify brand.
- Project rows: internal dividers only between rows; full container width; no top/bottom border.
- Back link left-aligned within the same centered container as content.
- Simple skip link with strong contrast; no shadows or animations.
- Widgets use progressive enhancement: fade in when loaded, show graceful fallback on error.
- Page animations respect `prefers-reduced-motion` completely (no animation, instant display).
- Footer widgets are non-interactive, decorative elements (not in tab order, user-select: none).

## Remaining Phases

### Phase 8 — Content and Typography

- Tasks:
  - Add real content for Bio, Selected Work, Side Projects; create project detail pages for each.
  - Optionally introduce `--font-serif` in targeted areas (e.g., long-form body in project pages or summary) while maintaining performance: minimal weights; `display=swap`.
- Acceptance Criteria:
  - All project links resolve to a detail page with meaningful content.
  - Serif introduction (if used) has no measurable CLS or FOIT issues; Lighthouse Performance remains ≥ 90.
- Checkpoint:
  - Share 1–2 completed project pages and confirm font usage locations.

### Phase 9 — Polish and Micro-touches (No JS)

- Tasks:
  - Fine-tune spacing, contrast, and rhythm (e.g., section margins, divider faintness).
  - Confirm external icon remains fixed color on hover; underline/hover behaviors match across contexts.
  - Verify the “status” dot pulse is subtle, single-direction, and respects reduced motion.
- Acceptance Criteria:
  - No visual regressions at 320px, 768px, 1280px; link hover/focus consistent (bio vs project list).
- Checkpoint:
  - Provide screenshots for the header, links, rows (hover/focus), and a project page.

### Phase 10 — SEO and Social

- Tasks:
  - Update meta title/description per page; add OG/Twitter tags on `index.html` and project pages.
  - Add an OG image asset `assets/images/og-image.jpg` (1200×630); reuse for Twitter.
  - Update `sitemap.xml` `<lastmod>` when the homepage “Updated …” date changes.
  - Keep resume disallowed and noindexed as configured.
- Acceptance Criteria:
  - Titles/descriptions meaningful and unique; Rich link previews show correctly.
- Checkpoint:
  - Share production URL with a test of social cards.

### Phase 11 — Performance Hardening and Launch

- Tasks:
  - Images: convert to WebP; set intrinsic `width`/`height`; right-size for layout; avoid overserving.
  - CSS: trim any remaining dead rules; ensure single-pass link/focus styles.
  - Fonts: only required weights; use `<link>` with `display=swap`; verify no blocking.
  - Update the visible “Updated …” string and sync `sitemap.xml`.
  - Merge `2025-redesign` → `main`.
- Acceptance Criteria:
  - Lighthouse: Performance ≥ 95, Accessibility ≥ 100, Best Practices ≥ 95, SEO ≥ 90.
  - No 404s for favicons; resume path remains noindex and disallowed.
- Checkpoint:
  - Share Lighthouse results and final URLs.

## Operational Checklists

### Content Update Checklist

- [ ] Update Bio for clarity and brevity.
- [ ] Add projects to `index.html` and corresponding `projects/*.html`.
- [ ] On homepage: update “Updated Month DD, YYYY”.
- [ ] In `sitemap.xml`: set `<lastmod>` to `YYYY-MM-DDT00:00:00+00:00` for homepage.

### Font Update Checklist (Google Fonts)

- [ ] Add `<link>` tags for Inter and Newsreader (minimal weights).
- [ ] Keep `display=swap`; ensure system fallbacks are in stacks.
- [ ] Introduce serif selectively; verify no CLS.

### SEO/Share Checklist

- [ ] Unique `<title>` and `<meta name="description">` per page.
- [ ] OG/Twitter meta; `og:image` set to `assets/images/og-image.jpg`.
- [ ] Verify robots/sitemap; deploy and test previews.

## Working Agreements

- Vanilla JavaScript only (no frameworks); used sparingly for widgets and microinteractions.
- Progressive enhancement: core content works without JS; widgets enhance experience.
- Graceful degradation: all features fail silently and show sensible fallbacks.
- Keep CSS minimal, readable, and commented only where intent isn't obvious.
- Prefer inheritance over repetition; single source of truth for link styles and containers.
- Maintain accessibility (skip link, focus visibility, reduced motion respected throughout).
- When changing the homepage date, also update `sitemap.xml` `<lastmod>`.

## JavaScript Philosophy

- **Progressive Enhancement**: Widgets load and fade in; page is fully functional without JS.
- **Graceful Degradation**: API failures result in fallback states (time only, default weather icon).
- **Performance-Conscious**: Minimal DOM manipulation; state stored in memory; updates batched.
- **Accessibility-First**: All animations respect `prefers-reduced-motion`; widgets are decorative (aria-hidden, not in tab order).
- **No Dependencies**: Vanilla JS only; no frameworks, no build step required.

## Branches

- `main` — Production
- `2025-redesign` — Active development

## Deployment Notes

- Vercel previews for PRs to `2025-redesign`.
- `vercel.json` keeps resume `noindex`.
- Assets live under `assets/images/` and `assets/files/`.

```

```
