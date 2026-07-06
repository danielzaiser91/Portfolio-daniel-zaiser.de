# daniel-zaiser.de — Portfolio

Professional portfolio of **Daniel Zaiser**, Senior Software Developer (Angular since 2018).

Built with **Angular 21** — standalone components, signals, lazy routes, zoneless. Bilingual
(DE/EN, runtime toggle). Dark glassmorphism design. No trackers, no cookies, no external fonts.

## Sections

- **Home** — intro, quick stats, audience split (visitors vs. recruiters)
- **Projects** — all public GitHub repos, split into serious & fun, with commit counts,
  development spans and honest time estimates
- **For Recruiters** — experience timeline, skills, certificates, languages
- **Old Website** — the previous hand-crafted daniel-zaiser.de (2020–2023), preserved verbatim
  in [`website/`](website/) and served at `/archive/`

Contact is intentionally LinkedIn-only — no contact form, no email address anywhere in this
codebase.

## Development

```bash
yarn            # install
yarn start      # dev server at http://localhost:4200
yarn build      # production build to dist/portfolio/browser
yarn test       # unit tests
```

## Hosting

The build output in `dist/portfolio/browser/` is fully static. Deploy notes:

1. Copy the contents of `dist/portfolio/browser/` to the webroot.
2. A `.htaccess` with `FallbackResource /index.html` ships in `public/` and is included in every
   build — it makes direct URLs like `/projects` or `/arcade` work on Apache/Plesk hosting.
   On nginx, use `try_files $uri $uri/ /index.html;` instead.
3. The old-site archive is emitted to `/archive/` automatically during the build.

## Privacy

- `.secrets/` (CV, references) is gitignored — never commit it.
- The archived old site had a page with plain-text contact details; those were redacted
  before publishing (original kept privately).
