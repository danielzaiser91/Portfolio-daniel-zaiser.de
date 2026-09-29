/**
 * Post-Build-Schritt für GitHub Pages.
 *
 * GitHub Pages kennt keine SPA-Umschreibung: Ein Direktaufruf oder Neuladen von
 * /projects würde eine echte 404 liefern. Deshalb legen wir die gebaute
 * index.html zusätzlich als 404.html daneben — GitHub Pages liefert sie für
 * unbekannte Pfade aus, und die Angular-App übernimmt das Routing.
 *
 * Für Cloudflare Pages ist die Datei wirkungslos (dort greift `_redirects`),
 * deshalb schadet sie im gemeinsamen Build nicht.
 *
 * Aufruf: am Ende von `yarn build`, siehe package.json.
 */
const { copyFileSync, existsSync } = require('node:fs')
const { join, resolve } = require('node:path')

const OUT = resolve(__dirname, '..', 'dist', 'portfolio', 'browser')
const index = join(OUT, 'index.html')
const notFound = join(OUT, '404.html')

if (!existsSync(index)) {
  console.error(`github-pages-fallback: ${index} fehlt — Build zuerst laufen lassen.`)
  process.exit(1)
}

copyFileSync(index, notFound)
console.log('github-pages-fallback: 404.html aus index.html geschrieben')
