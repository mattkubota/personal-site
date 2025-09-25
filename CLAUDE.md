# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository. It defines scope, constraints, phases, acceptance criteria, and review checkpoints for building a fast, accessible, vanilla HTML/CSS personal site.

## Vision and Constraints

- **Audience**: Hiring managers and teammates reviewing senior/staff-level product design work.
- **Non-Goals**: No frameworks, build tools, or client-side JS initially. JS may be introduced later for small microinteractions only.
- **Tech Constraints**
  - **Stack**: Static HTML + modern CSS only (no preprocessors).
  - **Performance**: Tiny footprint; target single CSS file ≤ 12 KB gzipped; no render-blocking fonts; optimized images (WebP; AVIF optional).
  - **Accessibility**: WCAG 2.2 AA.
  - **Readability**: Clear, commented CSS; semantic HTML; consistent naming.
  - **Design**: Narrow content column; old-school HTML vibe with tasteful modern touches.

## Information Architecture

- **Pages**
  - Home (`index.html`): Header (chip + name + “last updated: …”), Bio, Selected Work, Side Projects.
  - Project detail (`projects/<slug>.html`): Standardized template with title, year, role, summary, body copy, and media.
  - 404 (`404.html`): Plain, fast, helpful.
- **Navigation**: Minimal; home and project detail pages only.

## Visual + Typographic System

- **Fonts**: Pair a grotesk sans with a serif.
  - Primary sans: Inter (or System UI fallback).
  - Serif: Newsreader (or Garamond as an alternate).
  - Use a single weight set initially to minimize payload; add more only if justified.
  - Use `font-display: swap` (or equivalent behavior) and a system stack fallback.
- **Measure and Leading**
  - Body measure target: 60–75 characters per line.
  - Heading measure target: 30–45 characters per line when applicable.
  - Line height: 1.5–1.7 for body; headings slightly tighter but ≥ 1.25.
  - Content column width: ~66ch max with generous padding; minimal reflow across breakpoints.
- **Links**
  - Hover: full text highlight background + thick underline (visible and high-contrast).
  - External links: small icon to the right of text indicating a new tab.
- **Header**
  - Small chip above the name: “Open to work”.
  - Name prominent below chip.
  - “last updated: <YYYY‑MM‑DD>” below name (manually kept in sync; also update `sitemap.xml` lastmod).

## Accessibility Requirements (WCAG 2.2 AA)

- Semantic landmarks: `header`, `nav` (if needed), `main`, `footer`.
- Accessible names: headings form a logical outline.
- Color contrast: ≥ 4.5:1 for text; ≥ 3:1 for larger text and UI elements.
- Focus states: highly visible for all interactive elements, not relying on color alone.
- Link underline always present; hover adds background highlight + thicker underline.
- External link icon should not be read by screen readers if redundant; icon is hidden from assistive tech, while text announces “(opens in new tab)” via visually-hidden text.
- Images: meaningful `alt`; decorative images use empty `alt`.
- Reduced motion: honor `prefers-reduced-motion` if motion is later introduced.

## Performance Requirements

- Single CSS file at first; combine only what’s necessary.
- Use modern image formats (WebP; AVIF optional if trivial).
- Provide 2–3 responsive sizes per image when practical; avoid overserving pixels.
- Lazy load images on project detail pages only after we decide to introduce minimal JS—initially keep media small and in-flow.
- Self-host fonts only if we can verify equal or better performance vs a reliable CDN; otherwise use a robust CDN with early preconnect.
- Avoid multiple weights/axes until necessary.

## CSS Architecture

- Single file `main.css` to start.
- Use modern CSS: custom properties for spacing, colors, typography; logical properties; media queries for `prefers-*`.
- Naming: small, composable utility-like classes for spacing/typography; semantic component classes for key blocks (`.header`, `.chip`, `.link`, `.project-row`, `.project-card`).
- Keep selectors shallow; no over-nesting.
- Comment intent near non-obvious rules.

## Repository Structure

- `index.html` — Home
- `projects/` — Project detail pages, one file per project (e.g., `projects/waterpik.html`)
- `assets/`
  - `images/` — Optimized images only (WebP preferred)
  - `files/` — Resume, etc.
- `main.css` — Primary stylesheet
- `vercel.json` — Vercel configuration
- `sitemap.xml` — SEO sitemap (update `lastmod` on homepage changes)
- `robots.txt` — Search engine directives

## Current Deploy & SEO

- Hosted on Vercel.
- `vercel.json` sets `x-robots-tag: noindex` for the resume file.
- `robots.txt` disallows indexing the resume.
- `sitemap.xml` exists; keep updated with `lastmod`.

## Source of Truth for Content

- Home page: Inline content in `index.html` for now.
- Projects: One file per project in `projects/`. Standardized top matter (title, year, role, summary, media).
- Later option: move to a data file; for now, keep human-editable HTML to remain tool-free.

## Phased Engineering Plan (Do Not Skip Order)

Each phase includes acceptance criteria (AC) and a review checkpoint. Do not proceed until ACs are met.

### Phase 0 — Repo Reset and Safety

- Tasks:
  - Ensure branch is `2025-redesign`.
  - Restore baseline structure if missing: `index.html`, `main.css`, `assets/`, `projects/`.
  - Preserve `vercel.json`, `robots.txt`, `sitemap.xml`.
- AC:
  - Repo builds statically on Vercel with a placeholder home page and CSS.
  - No console errors in the browser; 200 OK on `/`.
- Checkpoint:
  - Confirm structure exists and deploy preview URL works.

### Phase 1 — Typography + Layout System

- Tasks:
  - Establish root CSS custom properties for type scale, spacing, colors.
  - Implement content column with max-width ~66ch, centered, responsive padding.
  - Set base type ramp: body, h1–h4, measure, line-height targets.
  - Configure font loading with `swap` semantics and system fallbacks.
- AC:
  - Body text sits at 60–75ch measure on typical laptop viewport.
  - Single CSS file ≤ 12 KB gzipped.
- Checkpoint:
  - Share screenshots of body text, headings, and column behavior at 320px, 768px, 1280px.

### Phase 2 — Header (Chip + Name + Last Updated)

- Tasks:
  - Build header block with chip “Open to work” above name.
  - Place “last updated: YYYY‑MM‑DD” below the name.
  - Ensure semantic structure (e.g., `header` + first `h1` on home).
- AC:
  - Chip is keyboard-focusable only if interactive; otherwise not in tab order.
  - Last updated date matches `sitemap.xml` `lastmod`.
- Checkpoint:
  - Verify accessibility tree and visual alignment at small and large viewports.

### Phase 3 — Link System (Internal/External)

- Tasks:
  - Define default link style with constant underline.
  - On hover/focus: background highlight + thicker underline.
  - External links: add small icon to the right; visually hidden “(opens in new tab)” for screen readers; `target="_blank"` uses `rel="noopener noreferrer"`.
- AC:
  - Focus outline visible, meets contrast.
  - External icon does not add redundant speech for screen readers.
- Checkpoint:
  - Provide before/after screenshots for normal/hover/focus on light background.

### Phase 4 — Home Content: Bio, Selected Work, Side Projects

- Tasks:
  - Create bio block with concise paragraph.
  - Selected Work: choose either
    - Rows: Year + linked Project Name (leanest), or
    - Cards: Thumbnail + Title + Brief Description (heavier).
  - Side Projects: shorter list with the same format as chosen above.
- AC:
  - Lists are keyboard navigable; hit targets sized ≥ 44×44 CSS px where practical.
  - Thumbnails (if any) are optimized (WebP) and properly sized.
- Checkpoint:
  - Confirm section headings and reading order.

### Phase 5 — Project Detail Template (Reusable)

- Tasks:
  - Standardize page with: title, year, role, summary, body text, and media regions.
  - Provide slots for 2–3 images or one embedded video (placeholder initially).
  - Back link to Home at top and bottom.
- AC:
  - Template validates with the W3C validator.
  - All media have meaningful `alt` or empty `alt` for decorative items.
- Checkpoint:
  - Share one completed project page and its Lighthouse scores.

### Phase 6 — Assets and Icons

- Tasks:
  - Recreate favicons and touch icons; ensure crisp rendering and small files.
  - External link icon integrated in CSS or inline, hidden from AT when redundant.
  - Ensure resume path remains disallowed and noindex as configured.
- AC:
  - No favicon 404s; correct sizes reported by browser devtools.
- Checkpoint:
  - List favicon files and sizes verified by the browser.

### Phase 7 — Accessibility QA

- Tasks:
  - Keyboard-only audit: tab order, focus visibility, skip link if page grows.
  - Screen reader smoke test: headings outline, link purpose, landmarks.
  - Color contrast checks for text, links, and focus states.
- AC:
  - Passes WCAG 2.2 AA for tested scenarios; document any exceptions with rationale.
- Checkpoint:
  - Provide brief accessibility notes with any remaining issues.

### Phase 8 — Performance Hardening

- Tasks:
  - Image pass: ensure no overserving; set dimensions to prevent layout shift.
  - CSS pass: remove dead rules; consider splitting print styles if material.
  - Font pass: verify weight usage; eliminate unused variants.
- AC:
  - Lighthouse Performance ≥ 95 on mid-range laptop emulation.
  - CLS near 0; TBT minimal (no JS).
- Checkpoint:
  - Share Lighthouse JSON/screenshot.

### Phase 9 — SEO and Polish

- Tasks:
  - Ensure meaningful metadata, titles, descriptions, and Open Graph/Twitter tags.
  - Update `sitemap.xml` `lastmod` on homepage changes; verify robots rules.
- AC:
  - Page titles/description unique and human-readable; link text descriptive.
- Checkpoint:
  - Confirm social share card renders correctly (manual test is fine).

### Phase 10 — Launch

- Tasks:
  - Merge `2025-redesign` → `main`.
  - Tag release and annotate date used in “last updated”.
- AC:
  - Production matches preview; no regressions on core pages.

## Definition of Done (Project)

- Home and at least one project detail page are complete.
- Lighthouse: Performance ≥ 95, Accessibility ≥ 100, Best Practices ≥ 95, SEO ≥ 90.
- WCAG 2.2 AA checks documented and passed.
- CSS file size ≤ 12 KB gzipped; no blocking font loads.
- Resume remains disallowed in `robots.txt` and `noindex` via headers.
- `sitemap.xml` `lastmod` matches the on-page “last updated” string.

## Working Agreements for Claude Code

- Do not add frameworks, bundlers, or client-side JS without explicit instruction.
- Prefer semantic HTML and modern CSS features (custom properties, logical props).
- Keep selectors shallow; avoid cleverness; add concise comments only where intent is unclear.
- When adding images, always optimize to WebP and choose an appropriate intrinsic width.
- Keep a running CHANGELOG in PR descriptions summarizing what changed and why.
- At each phase checkpoint, pause for human review before proceeding.

## Branches

- `main` — Production
- `2025-redesign` — Active redesign

## Deployment Notes

- Vercel previews for PRs to `2025-redesign`.
- `vercel.json` must continue to set `x-robots-tag: noindex` for the resume path.
- Update `sitemap.xml` `lastmod` whenever the homepage content is updated.
