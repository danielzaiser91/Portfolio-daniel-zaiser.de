/**
 * Refreshes the snapshot stats (commits / started / lastTouched) in
 * src/app/data/projects.ts for every project marked `repoPrivate: true`.
 *
 * Why: the projects page overlays live stats from the anonymous GitHub API, which
 * cannot see private repos — those cards silently fall back to the snapshot. This
 * script reads the real numbers through the locally authenticated `gh` CLI and
 * rewrites the snapshot, so private-repo cards stay honest without opening the repo.
 *
 * Usage:  node tools/update-private-stats.js          # all private entries
 *         node tools/update-private-stats.js <name…>  # only the given repos
 *
 * Needs: `gh` logged in with access to the private repos. Repos that gh cannot
 * reach (renamed, deleted) are skipped with a warning.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const OWNER = 'danielzaiser91';
const DATA = path.join(__dirname, '..', 'src', 'app', 'data', 'projects.ts');

const gh = (args) => execSync(`gh ${args}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const ym = (iso) => iso.slice(0, 7);

const fetchStats = (repo) => {
  // Latest commit on the default branch (development truth, unlike pushed_at
  // which any branch push would bump).
  const last = gh(`api "repos/${OWNER}/${repo}/commits?per_page=1" --jq ".[0].commit.committer.date"`);
  // Commit count: page number of rel="last" with per_page=1 (one request, no pagination walk).
  const head = gh(`api -i "repos/${OWNER}/${repo}/commits?per_page=1" --jq ""`) || gh(`api -i "repos/${OWNER}/${repo}/commits?per_page=1"`);
  const linkLine = head.split('\n').find((l) => l.toLowerCase().startsWith('link:')) ?? '';
  const m = linkLine.match(/[?&]page=(\d+)>; rel="last"/);
  const commits = m ? Number(m[1]) : 1;
  const first = commits === 1 ? last : gh(`api "repos/${OWNER}/${repo}/commits?per_page=1&page=${commits}" --jq ".[0].commit.committer.date"`);
  return { commits, started: ym(first), lastTouched: ym(last) };
};

const src = fs.readFileSync(DATA, 'utf8');
const only = process.argv.slice(2);

// Split into entry blocks by the `name: '…'` anchors; a block runs to the next anchor.
const anchors = [...src.matchAll(/name: '([^']+)',/g)];
let out = src;
let touched = 0;

for (let i = 0; i < anchors.length; i++) {
  const name = anchors[i][1];
  const start = anchors[i].index;
  const end = i + 1 < anchors.length ? anchors[i + 1].index : src.length;
  const block = src.slice(start, end);
  if (!/repoPrivate: true/.test(block)) continue;
  if (only.length && !only.includes(name)) continue;

  let stats;
  try {
    stats = fetchStats(name);
  } catch {
    console.log(`SKIP ${name}: gh kommt nicht ans Repo (umbenannt/geloescht/kein Zugriff)`);
    continue;
  }

  let newBlock = block
    .replace(/commits: \d+,/, `commits: ${stats.commits},`)
    .replace(/started: '[\d-]+',/, `started: '${stats.started}',`)
    .replace(/lastTouched: '[\d-]+',/, `lastTouched: '${stats.lastTouched}',`);
  if (newBlock !== block) {
    out = out.replace(block, newBlock);
    touched++;
    console.log(`OK   ${name}: ${stats.commits} commits, ${stats.started} – ${stats.lastTouched}`);
  } else {
    console.log(`OK   ${name}: unveraendert (${stats.commits} commits)`);
  }
}

if (touched) fs.writeFileSync(DATA, out);
console.log(touched ? `${touched} Eintrag/Eintraege aktualisiert.` : 'Nichts zu schreiben.');
