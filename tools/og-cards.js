/**
 * Renders the link-preview images (Open Graph / Twitter cards) for the site.
 *
 * Writes 1200x630 JPEGs to public/images/og/ — the size every messenger and social
 * network crops from. Two cards, because the site has two very different audiences:
 *
 *   daniel-zaiser.jpg  professional portfolio, for recruiters and colleagues
 *   arcade.jpg         the hidden /arcade, shared with friends — deliberately playful
 *
 * The cards are plain HTML/CSS rendered by headless Chrome, so they stay editable here
 * instead of living in a design tool. Colours come from src/styles.scss.
 *
 * Usage:  npm i --no-save puppeteer-core  &&  node tools/og-cards.js
 *         (CHROME_PATH overrides the Chrome location)
 */
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const OUT = path.join(__dirname, '..', 'public', 'images', 'og');

const BASE = `
  * { box-sizing: border-box; margin: 0; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
    color: #e8eef6; display: flex; flex-direction: column; justify-content: center;
    padding: 78px 84px;
  }
  .kicker { font-size: 27px; letter-spacing: .22em; text-transform: uppercase; color: #9aa7b8; }
  h1 { font-size: 82px; line-height: 1.04; letter-spacing: -.025em; margin: 20px 0 0; }
  .sub { font-size: 36px; line-height: 1.35; color: #cfd9e6; margin-top: 26px; max-width: 900px; }
  .foot { margin-top: auto; display: flex; align-items: center; gap: 18px; font-size: 30px; color: #9aa7b8; }
  .dot { width: 12px; height: 12px; border-radius: 50%; }
`;

const CARDS = {
  // ===== Normal: the portfolio itself =====
  'daniel-zaiser': `
    <style>
      ${BASE}
      body {
        background:
          radial-gradient(1100px 600px at 88% -12%, rgba(106,165,255,.20), transparent 60%),
          radial-gradient(900px 700px at -8% 32%, rgba(53,208,186,.16), transparent 55%),
          linear-gradient(160deg, #0a0f1e, #101830 70%);
      }
      h1 .accent { color: #35d0ba; }
      .tags { display: flex; gap: 14px; margin-top: 34px; flex-wrap: wrap; }
      .tag {
        font-size: 27px; padding: 10px 22px; border-radius: 999px;
        border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.055); color: #cfd9e6;
      }
    </style>
    <div class="kicker">Portfolio</div>
    <h1>Daniel Zaiser<br /><span class="accent">Senior Software Developer</span></h1>
    <div class="sub">Angular-Spezialist seit 2018 — berufliche Arbeit, Herzensprojekte und das
      Archiv meiner ersten handgebauten Webseite.</div>
    <div class="tags"><span class="tag">Angular</span><span class="tag">TypeScript</span>
      <span class="tag">RxJS &amp; Signals</span><span class="tag">Web-Games</span></div>
    <div class="foot"><span class="dot" style="background:#35d0ba"></span>daniel-zaiser.de</div>
  `,

  // ===== Special: the hidden arcade =====
  arcade: `
    <style>
      ${BASE}
      body {
        background:
          radial-gradient(760px 520px at 12% 8%, rgba(255,92,170,.30), transparent 62%),
          radial-gradient(820px 560px at 88% 92%, rgba(120,90,255,.34), transparent 62%),
          linear-gradient(155deg, #140a24, #0a0f1e 72%);
      }
      h1 { font-size: 96px; }
      h1 .accent {
        background: linear-gradient(92deg, #ff8ad4, #8f7bff 55%, #35d0ba);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      }
      /* nowrap: mit Umbruch rutschte die Domain-Zeile aus dem Bild (1200px sind schnell voll) */
      .emojis { font-size: 58px; letter-spacing: 10px; margin-top: 28px; white-space: nowrap; }
      .badge {
        position: absolute; top: 58px; right: 72px; font-size: 26px; letter-spacing: .12em;
        text-transform: uppercase; padding: 12px 24px; border-radius: 999px;
        border: 1px dashed rgba(255,255,255,.3); color: #ffd9f0;
      }
    </style>
    <div class="badge">🔒 Nur über den Link</div>
    <div class="kicker">Geheime Spielesammlung</div>
    <h1><span class="accent">DZ Arcade</span> 🎮</h1>
    <div class="sub">Alle meine spielbaren Projekte an einem Ort — Idle-Grind, Partyspiele,
      3D-Experimente. Such dir was aus, worauf du Lust hast.</div>
    <div class="emojis">🔮 🗡️ 🌌 🎭 ⚔️ ⚡ ⛏️</div>
    <div class="foot"><span class="dot" style="background:#ff8ad4"></span>daniel-zaiser.de/arcade</div>
  `,
};

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  for (const [name, html] of Object.entries(CARDS)) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
    await page.setContent(`<body>${html}</body>`, { waitUntil: 'networkidle0' });
    // Emoji glyphs load from the system font — give them a beat before shooting.
    await new Promise((r) => setTimeout(r, 600));
    const file = path.join(OUT, `${name}.jpg`);
    await page.screenshot({ path: file, type: 'jpeg', quality: 90 });
    console.log(`OK  ${name}.jpg (${Math.round(fs.statSync(file).size / 1024)} KB)`);
    await page.close();
  }
  await browser.close();
})();
