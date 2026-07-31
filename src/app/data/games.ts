/**
 * Data for the hidden /arcade page — a Steam-style library of all playable
 * games, mini projects and tools, meant to be shared with friends via direct URL.
 * Content is intentionally German only (target audience: friends).
 */

export type GameCategory = 'idle' | 'party' | 'action' | 'story' | 'kreativ' | 'experiment' | 'tool';

/** Section on the arcade page. Games only — minis/tools are deliberately not sold as games. */
export type GameKind = 'game' | 'mini' | 'tool';

export const CATEGORY_LABELS: Record<GameCategory, string> = {
  idle: '⏳ Idle & Clicker',
  party: '🎉 Party',
  action: '⚔️ Action',
  story: '📖 Story',
  kreativ: '🎨 Kreativ',
  experiment: '🧪 Experimente',
  tool: '🛠️ Tools',
};

export interface Game {
  title: string;
  emoji: string;
  /** Play/open URL — GitHub Pages demo, archive path, or repo. */
  url: string;
  /** True when the URL is a repo instead of something directly playable. */
  repoOnly?: boolean;
  kind: GameKind;
  /** Unfinished/abandoned — shown in its own section, clearly badged, never advertised as a full game. */
  wip?: boolean;
  categories: GameCategory[];
  /** e.g. "1" or "2–10" */
  players: string;
  playtime: string;
  /** For which situation/mood this is the right pick. */
  situation: string;
  description: string;
  tags: string[];
  /** Optional screenshot (from the old-site archive or public/images/previews). */
  image?: string;
  /**
   * Wide screenshot for the floating hover preview (desktop only). Most entries reuse
   * the shot the projects page already captures via tools/capture-previews.js; falls
   * back to `image` when unset, so archive entries need nothing extra.
   */
  preview?: string;
  featured?: boolean;
}

const PAGES = 'https://danielzaiser91.github.io';
const GH = 'https://github.com/danielzaiser91';
/** Screenshot of the projects page (same repo name) — no second capture needed. */
const shot = (repo: string) => `images/previews/projects/${repo}.webp`;

/** What the hover preview shows: the wide shot, else the capsule image, else nothing. */
export const gamePreview = (g: Game): string | undefined => g.preview ?? g.image;

export const GAMES: Game[] = [
  // ===== 🎮 Spiele (fertig & spielbar) =====
  {
    title: 'Incremental Adventure Rewritten',
    emoji: '⚔️',
    url: `${PAGES}/incremental-adventure-rewritten-live`,
    kind: 'game',
    categories: ['idle'],
    players: '1',
    playtime: '10–40+ Std.',
    situation: 'Wenn du eine Ratte im Keller verprügeln willst und drei Wochen später Göttern beim Umfallen zusiehst.',
    description:
      'Du fängst mit einem rostigen Schwert an. Irgendwann kaufst du Gesetze, die die Spielregeln selbst umschreiben — „Der Tod ist optional", „Die Zeit fließt zweimal". Dazwischen liegen acht Ebenen, die nicht größere Zahlen bringen, sondern jedes Mal ein anderes Spiel: ein Seelengitter, ein Runen-Codex mit 250 Einträgen, ein Kachel-Puzzle, Roguelite-Läufe. Alles selbst gezeichnet und selbst vertont, keine einzige Bilddatei.',
    tags: ['Idle', 'Incremental', 'Fantasy-RPG', 'Prestige', 'Browser & Handy'],
    preview: shot('incremental-adventure-rewritten'),
    featured: true,
  },
  {
    title: 'Archmage Idle',
    emoji: '🔮',
    url: `${PAGES}/archmage-idle-live`,
    kind: 'game',
    categories: ['idle'],
    players: '1',
    playtime: '3–10 Std.',
    situation: 'Wenn du ein Idle willst, das dich nicht mit Zahlenkolonnen zuschüttet.',
    description:
      'Werde Erzmagier: Orb füllen, vier Elemente freischalten, Elementargeister nach ihrer Typ-Schwäche jagen — und am Ende die Zeit selbst zurückdrehen. Erzählt alles über Ringe, Farben und Füllstände: im ganzen Spiel steht keine einzige Zahl.',
    tags: ['Idle', 'Incremental', 'Elemente', 'Browser & Handy'],
    preview: shot('archmage-idle'),
    featured: true,
  },
  {
    title: 'Incremental Adventure',
    emoji: '🗡️',
    url: `${PAGES}/incremental-adventure`,
    kind: 'game',
    categories: ['idle'],
    players: '1',
    playtime: '20–50+ Std.',
    situation: 'Für lange Abende, den Zweitmonitor und alle, die „nur noch ein Upgrade“ sagen.',
    description:
      'Mein Herzensprojekt (246 Commits!): Ressourcen sammeln, Abenteuer bestehen, Prestige-Ebenen freischalten. Läuft auch nebenbei weiter — im Browser und auf dem Handy.',
    tags: ['Idle', 'Incremental', 'Prestige', 'Browser & Handy'],
    featured: true,
    preview: shot('incremental-adventure'),
  },
  {
    title: 'Stardust to Singularity',
    emoji: '🌌',
    url: `${PAGES}/stardust-to-singularity`,
    kind: 'game',
    categories: ['idle'],
    players: '1',
    playtime: '5–15 Std.',
    situation: 'Zum Runterkommen: zurücklehnen und dem Universum beim Wachsen zusehen.',
    description:
      'Vom Staubkorn bis zur Singularität — 3D-Incremental mit Three.js und 5 Prestige-Ebenen. Chillige Musik im Kopf dazu denken.',
    tags: ['3D', 'Three.js', 'Incremental', 'Browser & Handy'],
    featured: true,
    preview: shot('stardust-to-singularity'),
  },
  {
    title: 'Wer bin ich? — Ratespiel',
    emoji: '🎭',
    url: `${PAGES}/ratespiel-wer-bin-ich`,
    kind: 'game',
    categories: ['party'],
    players: '2–10',
    playtime: '15–60 Min. pro Runde',
    situation: 'Spieleabend, Party, Familienfeier — Handy an die Stirn und losraten!',
    description:
      'Heads-up-Style Partyspiel als PWA: Begriff auf die Stirn, die anderen geben Hinweise, Handy kippen zum Werten. Lässt sich wie eine App installieren.',
    tags: ['Partyspiel', 'PWA', 'Gesellschaftsspiel', 'Handy'],
    featured: true,
    preview: shot('ratespiel-wer-bin-ich'),
  },
  {
    title: 'Endless Arena',
    emoji: '⚔️',
    url: `${PAGES}/endless-arena`,
    kind: 'game',
    categories: ['action', 'idle'],
    players: '1',
    playtime: '2–10 Std.',
    situation: 'Hirn aus, Loot an — perfekt nach einem anstrengenden Tag.',
    description:
      'Winziger prozeduraler 3D-Auto-Battler: kein Tod, keine Wände, endloser Loot. Einfach laufen lassen und stärker werden.',
    tags: ['Auto-Battler', '3D', 'Loot', 'Browser & Handy'],
    preview: shot('endless-arena'),
  },
  {
    title: 'Anime Adventure',
    emoji: '⚡',
    url: `${PAGES}/anime-adventure`,
    kind: 'game',
    categories: ['story'],
    players: '1',
    playtime: '2–5 Std.',
    situation: 'Für Anime-Fans mit Lust auf Story statt nur Zahlen.',
    description:
      '„Chronicles of the Celestial Blade“ — ein Adventure mit Anime-Flair als installierbare PWA.',
    tags: ['Adventure', 'Anime', 'Story', 'PWA'],
    preview: shot('anime-adventure'),
  },
  {
    title: 'Cosmic Forge',
    emoji: '⛏️',
    url: `${PAGES}/cosmic-forge`,
    kind: 'game',
    categories: ['idle', 'action'],
    players: '1',
    playtime: '3–8 Std.',
    situation: 'Wenn Idle allein zu wenig ist: minen, schmieden, Dungeons klopfen.',
    description:
      'Incremental-Roguelike, gebaut in Godot 4: Ressourcen abbauen, Prestige sammeln, Dungeon-Runs wagen.',
    tags: ['Godot', 'Roguelike', 'Incremental'],
    preview: shot('cosmic-forge'),
  },
  {
    title: 'Punch! 🥊',
    emoji: '🥊',
    url: '/archive/playground/punch/demo/index.html',
    kind: 'game',
    categories: ['action', 'party'],
    players: '1–2',
    playtime: '10–30 Min.',
    situation: 'Kurzer Lacher zwischendurch — mit bekannten Gesichtern.',
    description: 'Box-Minispiel aus dem alten Playground. Wer austeilt, gewinnt. Insider inklusive.',
    tags: ['Archiv', 'Minigame', 'Boxen'],
  },
  {
    title: 'Click-RPG — der Palmen-Clicker',
    emoji: '🌴',
    url: '/archive/playground/click-rpg.html',
    kind: 'game',
    categories: ['idle'],
    players: '1',
    playtime: '15–45 Min.',
    situation: 'Für die 5-Minuten-Pause, die dann doch länger wird.',
    description:
      'Palmen schütteln 😎 — der Retro-Clicker aus dem alten Playground. Geplant war mal, dass Früchte von den Bäumen fallen 🍍🍌🥭.',
    tags: ['Archiv', 'Clicker', 'Palmen', 'Retro'],
    image: '/archive/public/images/clicker.png',
  },

  // ===== 🧪 Mini-Projekte & Tech-Demos (keine Spiele) =====
  {
    title: 'Game of Life',
    emoji: '🦠',
    url: '/archive/playground/game-of-life.html',
    kind: 'mini',
    categories: ['experiment'],
    players: '1',
    playtime: '10–30 Min.',
    situation: 'Zum Staunen und Muster-Basteln — meditativ und mathematisch.',
    description: 'Conways Lebenssimulation: Zellen setzen, Start drücken, Evolution beobachten. Kein Spiel — eine Simulation zum Spielen.',
    tags: ['Archiv', 'Simulation', 'Klassiker'],
    image: '/archive/public/images/conway.gif',
  },
  {
    title: 'Draw something! — Formen-Stempeln',
    emoji: '🖌️',
    url: '/archive/playground/drawing/index.html',
    kind: 'mini',
    categories: ['kreativ'],
    players: '1',
    playtime: '5–10 Min.',
    situation: 'Kurz abschalten: Maus gedrückt halten und Sternenspuren ziehen.',
    description:
      'Canvas-Spielzeug aus dem alten Playground: rotierende Formen stempeln, solange die Maustaste gedrückt ist. Klein, hübsch, hypnotisch.',
    tags: ['Archiv', 'Canvas', 'Kreativ-Toy'],
    image: '/images/previews/zeichen-toy.png',
  },
  {
    title: 'Number Clicker',
    emoji: '🔢',
    url: '/archive/playground/increase number/index.html',
    kind: 'mini',
    categories: ['experiment', 'idle'],
    players: '1',
    playtime: '5–15 Min.',
    situation: 'Die ehrlichste 5-Minuten-Pause: Zahl groß machen, gut fühlen.',
    description: 'Minimalistischer Clicker-Prototyp — klicken, Ziel erreichen, nächstes Ziel. Mehr Tech-Demo als Spiel.',
    tags: ['Archiv', 'Prototyp', 'Minimal'],
  },
  {
    title: '3D-Art',
    emoji: '🌀',
    url: '/archive/playground/3d-art.html',
    kind: 'mini',
    categories: ['experiment', 'kreativ'],
    players: '1',
    playtime: '5 Min.',
    situation: 'Kurz reinschauen, „whoa“ sagen, weiterschicken.',
    description: 'Generativer 3D-Sketch mit p5.js — Kunst zum Zugucken, kein Spiel.',
    tags: ['Archiv', 'p5.js', 'Generativ'],
  },
  {
    title: 'CSS-Challenges',
    emoji: '💅',
    url: '/archive/playground/css-challenges.html',
    kind: 'mini',
    categories: ['experiment'],
    players: '1',
    playtime: '10–20 Min.',
    situation: 'Für die Dev-Freunde: CSS-Spielereien und Tricks.',
    description: 'Gesammelte CSS-Herausforderungen und Effekte aus dem alten Playground — Tech-Demo pur.',
    tags: ['Archiv', 'CSS', 'Für Devs'],
  },
  {
    title: 'Die Uhr',
    emoji: '🕰️',
    url: '/archive/playground/uhr.html',
    kind: 'mini',
    categories: ['experiment'],
    players: '1',
    playtime: '2 Min.',
    situation: 'Kurioses Fundstück — eine Uhr, aber handgebaut.',
    description: 'Analoge Uhr in purem HTML/CSS/JS. Zeigt tatsächlich die Zeit an. Meistens.',
    tags: ['Archiv', 'Fundstück', 'Mini-Projekt'],
    image: '/archive/public/images/uhr.png',
  },

  // ===== 🛠️ Tools & Extensions (keine Spiele) =====
  {
    title: 'Chrome Utilities',
    emoji: '🧩',
    url: `${GH}/chrome-utilities`,
    repoOnly: true,
    kind: 'tool',
    categories: ['tool'],
    players: '—',
    playtime: 'täglich im Einsatz',
    situation: 'Browser-Extension, kein Spiel: erleichtert den Browser-Alltag.',
    description:
      'Meine Chrome-Extension-Sammlung (195 Commits über 4 Jahre) — Utilities, die ich selbst täglich nutze. Installation steht im Repo.',
    tags: ['Extension', 'Produktivität', 'Repo'],
    preview: shot('chrome-utilities'),
  },

  // ===== 🚧 Unfertig & Prototypen =====
  {
    title: 'Incremental Adventure — Prototyp 2025',
    emoji: '🏰',
    url: '/archive/playground/incremental_adventure__dirty/incremental_adventure.html',
    kind: 'game',
    wip: true,
    categories: ['idle', 'story'],
    players: '1',
    playtime: '15–30 Min. (dann ist Schluss)',
    situation: 'Nostalgie & Neugier: der spielbare Vorgänger des großen Remakes.',
    description:
      'Zweiter Anlauf von 2025 — City-Map, Dialoge, Schmied & Gilde funktionieren schon. Danach wurde daraus das große Incremental Adventure. Unfertig, aber anspielbar.',
    tags: ['Archiv', 'Prototyp', 'Unfertig'],
    preview: shot('incremental_adventure__dirty'),
  },
  {
    title: 'Revolution Idle Clone',
    emoji: '🌀',
    url: `${PAGES}/revolution-idle-clone`,
    kind: 'game',
    wip: true,
    categories: ['idle'],
    players: '1',
    playtime: 'aktuell kaum spielbar',
    situation: 'Nur für Neugierige — angefangen und liegen geblieben.',
    description:
      'Begonnener Nachbau der Kern-Mechanik von Revolution Idle. Im aktuellen Zustand praktisch unspielbar — kein fertiges Spiel, nur ein Anfang.',
    tags: ['Unfertig', 'Idle', 'Klon'],
    preview: shot('revolution-idle-clone'),
  },
  {
    title: 'QuizCheater',
    emoji: '🎙️',
    url: `${GH}/QuizCheater`,
    repoOnly: true,
    kind: 'tool',
    wip: true,
    categories: ['tool'],
    players: '—',
    playtime: '—',
    situation: 'Projekt-Einblick für Neugierige — kein fertiges Tool.',
    description:
      'Halbfertiges Quiz-Tool, angelehnt an das „WER LÜGT HIER?“-Format von Vlesk (YouTube), gebaut für den Twitch-Streamer umut_rre. Nie vollendet — der spannende Teil war der Anfang. 😄',
    tags: ['Unfertig', 'WER LÜGT HIER?', 'Twitch', 'Repo'],
    preview: shot('QuizCheater'),
  },
];
