# Demo Prototypes

Static HTML demo prototypes hosted via GitHub Pages at `demo.premiercodeinc.com`.

## Repository

- **Remote**: `git@github.com:brhurley/premiercodeinc-demos.git`
- **Hosting**: GitHub Pages with custom domain `demo.premiercodeinc.com`

## Demo Guidelines

### Structure
- Each demo project gets its own directory under `demo/` (e.g., `premiercode/`)
- Every demo directory **must** include an `index.html` page that links to all example pages within that directory
- The root `index.html` should serve as a landing/navigation page for all demos

### Naming Conventions
- All pages **must** have descriptive names that reflect the design concept or purpose
- Use lowercase kebab-case for file names
- **Do**: `prototype-glass-meridian.html`, `dashboard-dark-theme.html`, `landing-page-minimal.html`
- **Do NOT**: `example-1.html`, `demo2.html`, `test.html`, `page3.html`

### SEO / Indexing
- These are private demos and **must not be indexed** by search engines
- `robots.txt` at the repo root disallows all crawlers
- All HTML pages must include a `noindex, nofollow` meta tag in the `<head>`:
  ```html
  <meta name="robots" content="noindex, nofollow">
  ```