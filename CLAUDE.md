# CLAUDE.md

This file guides Claude Code when working in this repo. It reflects the current design/engineering decisions, what’s complete, and what remains. Keep the site simple, fast, and accessible.

## Vision and Constraints

- Audience: Hiring managers and collaborators.
- Stack: Static HTML + modern CSS only. No build tools or frameworks.
- Performance: Small CSS, optimized images, no blocking font loads.
- Accessibility: WCAG 2.2 AA; keyboard-first; visible focus; reduced motion honored.
- Design: Narrow content column; old-school HTML feel with tasteful modern touches.

## Current State (Phases 0–7 Complete)

- Structure: `index.html`, `projects/*.html`, `assets/`, `main.css`, `vercel.json`, `sitemap.xml`, `robots.txt`.
- Typography/layout:
  - Uniform font size across headings and body; hierarchy via color only.
  - Narrow column (`--content-max-width: 60ch`), body padding responsive.
- Header:
  - “Status” chip with pulsing dot to the left (uses `--color-success`), “Updated Month DD, YYYY”.
  - Header left-aligned within centered column.
- Links:
  - Underline by default; hover uses accent background with readable contrast.
  - External links show a fixed-color icon; a11y text “(opens in new tab)” is visually hidden.
- Home content:
  - Bio + contact links.
  - Selected Work and Side Projects as rows: project name + year, with subtle dividers between rows.
- Project detail pages:
  - Standardized: title, year, role, summary, text, media slots, top/bottom back link.
- Accessibility:
  - Landmarks and headings correct; skip link present and readable.
  - Reduced motion disables animations; focus styles visible and consistent.

## Information Architecture

- `index.html`: Header (status + name + last updated), Bio (with contact), Selected Work, Side Projects.
- `projects/<slug>.html`: Standard detail template (title, meta, summary, body, media, back links).
- `404.html` (optional later).

## Visual System and Tokens

- Colors:
  - `--color-text`, `--color-text-muted`, `--color-bg` (slightly off-white), `--color-accent`, `--color-border`, `--color-success` (status dot).
- Typography:
  - `--font-sans` (Inter) and `--font-serif` (Newsreader) available; currently using sans everywhere with optional future serif usage.
  - Type scale simplified: `--font-size-base`, `--font-size-sm`.
  - Line heights: `--line-height-tight`, `--line-height-relaxed`.
- Layout:
  - `--content-max-width: 60ch`; responsive `--content-padding`.

## Completed Decisions Worth Preserving

- Uniform text sizing; hierarchy via color (black vs muted greys).
- Accent-colored hover background for links; fixed-color external icon.
- Project rows: internal dividers only between rows; full container width; no top/bottom border.
- Back link left-aligned within the same centered container as content.
- Simple skip link with strong contrast; no shadows or animations.

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

- No frameworks or JS unless explicitly added for small microinteractions later.
- Keep CSS minimal, readable, and commented only where intent isn’t obvious.
- Prefer inheritance over repetition; single source of truth for link styles and containers.
- Maintain accessibility (skip link, focus visibility, reduced motion).
- When changing the homepage date, also update `sitemap.xml` `<lastmod>`.

## Branches

- `main` — Production
- `2025-redesign` — Active development

## Deployment Notes

- Vercel previews for PRs to `2025-redesign`.
- `vercel.json` keeps resume `noindex`.
- Assets live under `assets/images/` and `assets/files/`.

```

```
