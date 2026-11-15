/**
 * Renders hand-built promo covers for projects whose live page says nothing about
 * what they do (a browser extension has no demo, and its GitHub repo page is just a
 * file list).
 *
 * Writes 800x420 webp files to public/images/previews/projects/<repo-name>.webp — the
 * same slot, size and format tools/capture-previews.js fills with screenshots, so the
 * projects page needs no change. One image serves both languages, so the cover shows
 * the product (its UI is English) instead of carrying a translated headline.
 *
 * Plain HTML/CSS rendered by headless Chrome, like tools/og-cards.js; colours come from
 * src/styles.scss and the typographic cover (.feat-ph) in projects.scss. Provider names
 * appear as text only — no third-party logos.
 *
 * Usage:  npm i --no-save puppeteer-core  &&  node tools/promo-covers.js [name...]
 *         (CHROME_PATH overrides the Chrome location)
 */
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const OUT = path.join(__dirname, '..', 'public', 'images', 'previews', 'projects');

const CHECK = `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.5l5 5L19.5 7"/></svg>`;
const SITES = ['YouTube', 'Netflix', 'Disney+', 'Crunchyroll', 'Prime Video', 'Twitch'];

const BASE = `
  * { box-sizing: border-box; margin: 0; }
  body {
    width: 1200px; height: 630px; overflow: hidden; position: relative;
    font-family: system-ui, 'Segoe UI', Inter, Roboto, sans-serif; color: #e8eef6;
    background:
      radial-gradient(640px 340px at 88% 4%, rgba(106,165,255,.25), transparent 70%),
      radial-gradient(580px 360px at 6% 100%, rgba(53,208,186,.22), transparent 70%),
      #0d1428;
  }
  .mono { font-family: ui-monospace, 'Cascadia Code', 'JetBrains Mono', Consolas, monospace; }
  .chips { display: flex; gap: 12px; align-items: center; }
  .chip {
    font-size: 25px; padding: 8px 20px; border-radius: 999px; white-space: nowrap;
    border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.055); color: #cfd9e6;
  }
  .chip.more { color: #35d0ba; border-color: rgba(53,208,186,.35); background: rgba(53,208,186,.14); font-weight: 600; }
  .pill {
    display: inline-flex; align-items: center; gap: 12px; font-size: 27px; font-weight: 600;
    padding: 11px 22px 11px 16px; border-radius: 999px; white-space: nowrap;
    background: rgba(10,15,30,.78); border: 1px solid rgba(53,208,186,.45); color: #e8eef6;
  }
  .pill .ok { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: #35d0ba; color: #0a0f1e; font-size: 21px; }

  /* Player */
  .player { position: absolute; border-radius: 22px; overflow: hidden; border: 1px solid rgba(255,255,255,.14);
    background: linear-gradient(150deg, #1b2547 0%, #131b38 45%, #0a0f1e 100%); box-shadow: 0 24px 60px rgba(0,0,0,.45); }
  .player::before { content: ''; position: absolute; inset: 0;
    background: radial-gradient(420px 260px at 30% 38%, rgba(106,165,255,.20), transparent 70%),
                radial-gradient(360px 240px at 78% 70%, rgba(53,208,186,.12), transparent 70%); }
  .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 104px; padding: 0 30px;
    background: linear-gradient(transparent, rgba(5,8,18,.92) 55%); }
  .track { position: absolute; left: 30px; right: 30px; top: 22px; height: 10px; border-radius: 5px; background: rgba(255,255,255,.2); }
  .track .intro { position: absolute; left: 9%; width: 17%; top: 0; bottom: 0; border-radius: 5px;
    background: repeating-linear-gradient(115deg, #35d0ba 0 9px, rgba(53,208,186,.35) 9px 18px); }
  .track .done { position: absolute; left: 0; width: 9%; top: 0; bottom: 0; border-radius: 5px; background: #e8eef6; }
  .track .knob { position: absolute; left: 26%; top: -7px; width: 24px; height: 24px; margin-left: -12px; border-radius: 50%; background: #fff; }
  .jump { position: absolute; left: calc(30px + (100% - 60px) * .09); width: calc((100% - 60px) * .17); bottom: 82px; height: 56px; }
  .ctrl { position: absolute; left: 30px; right: 30px; bottom: 16px; display: flex; align-items: center; gap: 20px; font-size: 24px; color: #cfd9e6; }
  .ctrl .sp { margin-left: auto; }
  .rate { font-weight: 700; font-size: 26px; color: #0a0f1e; background: #35d0ba; padding: 5px 16px; border-radius: 10px; }
  .pop { position: absolute; padding: 18px 22px 16px; border-radius: 18px; background: rgba(10,15,30,.9);
    border: 1px solid rgba(255,255,255,.16); }
  .pop .big { font-size: 46px; font-weight: 700; line-height: 1; }
  .pop .slider { position: relative; height: 8px; border-radius: 4px; background: rgba(255,255,255,.2); margin: 18px 0 10px; }
  .pop .slider i { position: absolute; left: 0; width: 31%; top: 0; bottom: 0; border-radius: 4px; background: #35d0ba; }
  .pop .slider b { position: absolute; left: 31%; top: -8px; width: 24px; height: 24px; margin-left: -12px; border-radius: 50%; background: #fff; }
  .pop .ends { display: flex; justify-content: space-between; font-size: 22px; color: #9aa7b8; }

  /* Episode list */
  .eps { position: absolute; display: flex; flex-direction: column; gap: 12px; }
  .ep { display: flex; align-items: center; gap: 14px; height: 64px; padding: 0 16px; border-radius: 14px; font-size: 24px;
    border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.055); color: #9aa7b8; }
  .ep .thumb { width: 62px; height: 38px; border-radius: 7px; background: linear-gradient(135deg, #2a3766, #18203f); }
  .ep .lang { margin-left: auto; font-weight: 700; font-size: 21px; padding: 3px 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,.18); }
  .ep.de { border-color: #4ade80; background: rgba(74,222,128,.14); color: #e8eef6; }
  .ep.de .lang { background: #4ade80; border-color: #4ade80; color: #0a0f1e; }
`;

const jumpArrow = `<svg class="jump" viewBox="0 0 200 56" preserveAspectRatio="none" fill="none" stroke="#35d0ba" stroke-width="4" stroke-linecap="round"><path d="M6 52 C 40 -8, 160 -8, 194 52" stroke-dasharray="2 11"/></svg>`;
const playIcon = `<svg width="26" height="28" viewBox="0 0 26 28"><path d="M3 2l21 12L3 26z" fill="#e8eef6"/></svg>`;
const chips = `<div class="chips">${SITES.map((s) => `<span class="chip">${s}</span>`).join('')}<span class="chip more">+9</span></div>`;

const player = (w, h, x, y, extra = '') => `
  <div class="player" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">
    ${extra}
    <div class="bar">
      <div class="track"><div class="done"></div><div class="intro"></div><div class="knob"></div></div>
      <div class="ctrl">${playIcon}<span>01:32 / 23:40</span><span class="sp"></span><span class="rate">1.7×</span></div>
    </div>
    ${jumpArrow}
  </div>`;

const pop = (style) => `<div class="pop" style="${style}"><div class="big">1.7×</div><div class="slider"><i></i><b></b></div><div class="ends"><span>0.2×</span><span>5×</span></div></div>`;
const eps = (style) => `<div class="eps" style="${style}">
  <div class="ep"><span class="thumb"></span>E6<span class="lang">JA</span></div>
  <div class="ep"><span class="thumb"></span>E7<span class="lang">JA</span></div>
  <div class="ep de"><span class="thumb"></span>E8<span class="lang">DE</span></div>
  <div class="ep"><span class="thumb"></span>E9<span class="lang">JA</span></div>
</div>`;


const COVERS = {
  // A generic video player doing what the extension does on every episode: intro skipped,
  // already logged in, speed 1.7x on the 0.2x-5x range, the German dub marked in the
  // episode list, and the supported sites as chips (6 named + 9 = the 15 on the card).
  'chrome-utilities': `<style>${BASE}</style>
    ${player(800, 440, 50, 50, `
      <span class="pill" style="position:absolute;left:26px;top:26px"><span class="ok">${CHECK}</span>Intro skipped</span>
      <span class="pill" style="position:absolute;left:26px;top:96px"><span class="ok">${CHECK}</span>Logged in</span>
      ${pop('right:26px;bottom:112px;width:230px')}`)}
    ${eps('left:880px;top:50px;width:270px')}
    <div class="mono" style="position:absolute;left:880px;top:366px;width:270px;font-size:23px;line-height:1.45;color:#9aa7b8">German dub<br/>highlighted</div>
    <div style="position:absolute;left:50px;right:50px;bottom:44px">${chips}</div>`,
};

(async () => {
  const only = process.argv.slice(2);
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--hide-scrollbars'] });
  for (const [name, html] of Object.entries(COVERS)) {
    if (only.length && !only.includes(name)) continue;
    const page = await browser.newPage();
    // CSS viewport 1200x630, bitmap 800x420 via dsf 2/3 — same as capture-previews.js.
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 / 3 });
    await page.setContent(html, { waitUntil: 'load' });
    const file = path.join(OUT, `${name}.webp`);
    await page.screenshot({ path: file, type: 'webp', quality: 82 });
    console.log(`OK  ${name} (${Math.round(fs.statSync(file).size / 1024)} KB)`);
    await page.close();
  }
  await browser.close();
})();
