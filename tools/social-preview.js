/**
 * Post-build step: gives /arcade its OWN link preview.
 *
 * Why a build step and not the Angular Meta service: the messengers and networks that
 * draw link previews (WhatsApp, Telegram, Discord, Slack, iMessage, Facebook …) never
 * run JavaScript. They read the HTML they get and stop. This app is a client-rendered
 * SPA with a single index.html, so whatever stands in there is the preview for EVERY
 * route — a route-specific card has to exist as a real file.
 *
 * So we copy the built index.html to arcade/index.html and swap the block between the
 * <!-- social:start --> / <!-- social:end --> markers (see src/index.html). Users hitting
 * /arcade get that file, the same app boots and the router shows the arcade — only the
 * preview tags differ. The copy also carries noindex: the arcade is shared by link, it
 * has no business in search results.
 *
 * Runs automatically as part of `npm run build` / `yarn build`, so the deploy workflow
 * picks it up without extra setup.
 */
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist', 'portfolio', 'browser');
const SITE = 'https://daniel-zaiser.de';

const ARCADE_HEAD = `  <title>🎮 DZ Arcade — geheime Spielesammlung</title>
  <meta name="robots" content="noindex">
  <meta name="description" content="Alle spielbaren Projekte von Daniel Zaiser an einem Ort: Idle-Games, Partyspiele, 3D-Experimente und Prototypen. Nur über den Link erreichbar.">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="DZ Arcade">
  <meta property="og:locale" content="de_DE">
  <meta property="og:url" content="${SITE}/arcade">
  <meta property="og:title" content="🎮 DZ Arcade — geheime Spielesammlung">
  <meta property="og:description" content="Idle-Grind, Partyspiele, 3D-Experimente — such dir was aus, worauf du gerade Lust hast. Psst: nur über den Link.">
  <meta property="og:image" content="${SITE}/images/og/arcade.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="DZ Arcade — geheime Spielesammlung, mit den Emojis der einzelnen Spiele">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="🎮 DZ Arcade — geheime Spielesammlung">
  <meta name="twitter:description" content="Idle-Grind, Partyspiele, 3D-Experimente — such dir was aus, worauf du gerade Lust hast.">
  <meta name="twitter:image" content="${SITE}/images/og/arcade.jpg">`;

const index = path.join(DIST, 'index.html');
if (!fs.existsSync(index)) {
  console.error(`social-preview: ${index} fehlt — lief der Build durch?`);
  process.exit(1);
}

const html = fs.readFileSync(index, 'utf8');
// Start-Marker ohne "-->": der Kommentar in src/index.html erklärt darin gleich noch,
// warum es diese Datei überhaupt gibt, geht also über mehrere Zeilen.
const start = html.indexOf('<!-- social:start');
const end = html.indexOf('<!-- social:end -->');
if (start < 0 || end < 0) {
  console.error('social-preview: Marker <!-- social:start/end --> fehlen in src/index.html');
  process.exit(1);
}

// Der <title> steht VOR dem Block (Angular/Tooling erwartet ihn früh) — beide ersetzen.
const arcade = (html.slice(0, start) + ARCADE_HEAD + html.slice(end + '<!-- social:end -->'.length)).replace(
  /<title>[\s\S]*?<\/title>\s*/,
  '',
);

fs.mkdirSync(path.join(DIST, 'arcade'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'arcade', 'index.html'), arcade);
console.log('social-preview: arcade/index.html mit eigener Link-Vorschau geschrieben');
