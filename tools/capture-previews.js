/**
 * Captures the hover-preview screenshots for the projects page.
 *
 * Visits every live demo listed below and writes an 800x420 webp to
 * public/images/previews/projects/<repo-name>.webp — the projects page shows these on
 * card hover (see the `preview` flag in src/app/data/projects.ts).
 *
 * Usage:  npm i --no-save puppeteer-core  &&  node tools/capture-previews.js [name...]
 *         (no args = capture all; pass repo names to re-capture selectively)
 *
 * Needs a local Chrome (CHROME_PATH env var overrides the default install location).
 */
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PAGES = 'https://danielzaiser91.github.io';
const GH = 'https://github.com/danielzaiser91';
const OUT = path.join(__dirname, '..', 'public', 'images', 'previews', 'projects');

// name → { url, wait: extra ms after networkidle (games/3D need render time),
//          dismiss?: text of a blocking overlay button to click first,
//          prepare?: page-side JS run before the wait (set up a worth-showing game state),
//          local?: true = needs a local dev server, so it is SKIPPED on a full run and
//                  only captured when you pass its name explicitly }
const TARGETS = {
  'Portfolio-daniel-zaiser.de': { url: 'https://daniel-zaiser.de', wait: 2500 },
  'homestream': { url: `${PAGES}/homestream`, wait: 2000 },
  'geoguessr-hints': { url: `${PAGES}/geoguessr-hints`, wait: 6000 },
  'incremental-adventure': { url: `${PAGES}/incremental-adventure`, wait: 4000 },
  'stardust-to-singularity': { url: `${PAGES}/stardust-to-singularity`, wait: 6000 },
  'ratespiel-wer-bin-ich': { url: `${PAGES}/ratespiel-wer-bin-ich`, wait: 3000, dismiss: 'Im Browser' },
  'anime-adventure': { url: `${PAGES}/anime-adventure`, wait: 3000 },
  'cosmic-forge': { url: `${PAGES}/cosmic-forge`, wait: 8000, dismiss: 'Verstanden' },
  'endless-arena': { url: `${PAGES}/endless-arena`, wait: 6000 },
  'revolution-idle-clone': { url: `${PAGES}/revolution-idle-clone`, wait: 4000 },
  'isekai-idle-mockups': { url: `${PAGES}/isekai-idle-mockups`, wait: 4000 },
  // Quell-Repo ist privat, die Demo läuft aus dem öffentlichen Build-Spiegel. Der
  // Live-Build startet aber bei null — ein leerer Orb sagt nichts über das Spiel. Also
  // aus dem DEV-Server (npm run dev im archmage-idle-Repo) mit einem weit gespielten
  // Stand aufnehmen und das Debug-Werkzeug ausblenden.
  'archmage-idle': {
    url: 'http://localhost:5173',
    wait: 1200,
    local: true,
    prepare: `
      window.dev.beforeReset();          // alle vier Elemente auf Mastery 12, evolviert
      window.dev.select('fire');
      const s = window.dev.state();
      s.embers = 0;                      // volles Ascheglas würde die Geister vertreiben
      s.elements.fire.orb = s.elements.fire.orbCap * 0.62;
      window.dev.tick(40, 0.05);         // Bahnen, Geister und Füllstand einschwingen lassen
      document.getElementById('debug-btn').style.display = 'none';
    `,
  },
  // Public repos without a live demo: the GitHub repo page (dark via --force-dark-mode).
  'chrome-utilities': { url: `${GH}/chrome-utilities`, wait: 2500 },
  'bubble-notifications': { url: `${GH}/bubble-notifications`, wait: 2500 },
  'best_posts': { url: `${GH}/best_posts`, wait: 2500 },
  'custom-scrollbars': { url: `${GH}/custom-scrollbars`, wait: 2500 },
  'arturs-webseite': { url: `${GH}/arturs-webseite`, wait: 2500 },
  'ng-whatsapp-clone': { url: `${GH}/ng-whatsapp-clone`, wait: 2500 },
  'angular-clicker': { url: `${GH}/angular-clicker`, wait: 2500 },
  'incremental_adventure__dirty': { url: `${GH}/incremental_adventure__dirty`, wait: 2500 },
  'incremental_adventure': { url: `${GH}/incremental_adventure`, wait: 2500 },
  'multiplayer-games': { url: `${GH}/multiplayer-games`, wait: 2500 },
  'QuizCheater': { url: `${GH}/QuizCheater`, wait: 2500 },
  'ng-cyberpunk-minigame': { url: `${GH}/ng-cyberpunk-minigame`, wait: 2500 },
};

// Clicks the first button-ish element whose text contains `match`; falls back to a click
// in the lower-center of the page (works for full-width dialog buttons like cosmic-forge's).
const dismissOverlay = async (page, match) => {
  const clicked = await page.evaluate((m) => {
    const btn = [...document.querySelectorAll('button, .btn, [role="button"]')].find((b) =>
      b.textContent.toLowerCase().includes(m.toLowerCase()),
    );
    if (btn) btn.click();
    return !!btn;
  }, match);
  if (!clicked) await page.mouse.click(600, 318);
};

(async () => {
  const only = process.argv.slice(2);
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--mute-audio', '--hide-scrollbars', '--force-dark-mode'],
  });

  for (const [name, { url, wait, dismiss, prepare, local }] of Object.entries(TARGETS)) {
    if (only.length && !only.includes(name)) continue;
    if (!only.length && local) {
      console.log(`SKIP ${name} (braucht den lokalen Dev-Server — gezielt aufrufen)`);
      continue;
    }
    try {
      const page = await browser.newPage();
      // CSS viewport 1200x630 (desktop layout), bitmap 800x420 via dsf 2/3.
      await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 / 3 });
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
      if (dismiss) {
        await new Promise((r) => setTimeout(r, 3000));
        await dismissOverlay(page, dismiss);
      }
      if (prepare) await page.evaluate(prepare);
      await new Promise((r) => setTimeout(r, wait));
      const file = path.join(OUT, `${name}.webp`);
      await page.screenshot({ path: file, type: 'webp', quality: 82 });
      console.log(`OK  ${name} (${Math.round(fs.statSync(file).size / 1024)} KB)`);
      await page.close();
    } catch (e) {
      console.log(`FAIL ${name}: ${e.message}`);
    }
  }
  await browser.close();
})();
