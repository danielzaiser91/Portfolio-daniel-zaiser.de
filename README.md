# daniel-zaiser.de — Portfolio

Professional portfolio of **Daniel Zaiser**, Senior Software Developer (Angular since 2018).

Built with **Angular 21** — standalone components, signals, lazy routes, zoneless. Bilingual
(DE/EN, runtime toggle). Dark glassmorphism design. No trackers, no cookies, no external fonts.

## Sections

- **Home** — intro, quick stats, audience split (visitors vs. recruiters)
- **Projects** — all public GitHub repos, split into serious & fun, with commit counts,
  development spans and honest time estimates
- **For Recruiters** — experience timeline, skills, certificates, languages; full CV on request
- **Old Website** — the previous hand-crafted daniel-zaiser.de (2020–2023), preserved verbatim
  in [`website/`](website/) and served at `/archive/`
- **Contact** — via [Web3Forms](https://web3forms.com): spam-filtered, the email address never
  appears in this codebase

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
2. Configure an SPA fallback: all non-file routes must serve `index.html`
   (Apache: `FallbackResource /index.html`, nginx: `try_files $uri $uri/ /index.html;`).
3. The old-site archive is emitted to `/archive/` automatically during the build
   (plus `/public/` and `/myIcons.css` so the archive's root-absolute references keep working).

## Contact form setup (one-time)

The contact form posts to Web3Forms. To activate it:

1. Get a free access key at <https://web3forms.com> (entering the target email there —
   the key maps to the address server-side, so the address stays out of this repo).
2. Replace `REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY` in
   [`src/app/pages/contact/contact.ts`](src/app/pages/contact/contact.ts).

The access key is public by design; spam is handled by Web3Forms' filters plus a honeypot field.

## Privacy

- `.secrets/` (CV, references) is gitignored — never commit it.
- The archived old site had a page with plain-text contact details; those were redacted
  before publishing (original kept privately).
