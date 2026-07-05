/**
 * Data for the hidden /arcade page — a Steam-style library of all playable
 * games and tools, meant to be shared with friends via direct URL.
 * Content is intentionally German only (target audience: friends).
 */

export type GameCategory = 'idle' | 'party' | 'action' | 'story' | 'kreativ' | 'experiment' | 'tool';

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
  categories: GameCategory[];
  /** e.g. "1" or "2–10" */
  players: string;
  playtime: string;
  /** For which situation/mood this is the right pick. */
  situation: string;
  description: string;
  tags: string[];
  /** Optional screenshot (from the old-site archive). */
  image?: string;
  featured?: boolean;
}

const PAGES = 'https://danielzaiser91.github.io';
const GH = 'https://github.com/danielzaiser91';

export const GAMES: Game[] = [
  {
    title: 'Incremental Adventure',
    emoji: '🗡️',
    url: `${PAGES}/incremental-adventure`,
    categories: ['idle'],
    players: '1',
    playtime: '20–50+ Std.',
    situation: 'Für lange Abende, den Zweitmonitor und alle, die „nur noch ein Upgrade“ sagen.',
    description:
      'Mein Herzensprojekt (246 Commits!): Ressourcen sammeln, Abenteuer bestehen, Prestige-Ebenen freischalten. Läuft auch nebenbei weiter — im Browser und auf dem Handy.',
    tags: ['Idle', 'Incremental', 'Prestige', 'Browser & Handy'],
    featured: true,
  },
  {
    title: 'Stardust to Singularity',
    emoji: '🌌',
    url: `${PAGES}/stardust-to-singularity`,
    categories: ['idle'],
    players: '1',
    playtime: '5–15 Std.',
    situation: 'Zum Runterkommen: zurücklehnen und dem Universum beim Wachsen zusehen.',
    description:
      'Vom Staubkorn bis zur Singularität — 3D-Incremental mit Three.js und 5 Prestige-Ebenen. Chillige Musik im Kopf dazu denken.',
    tags: ['3D', 'Three.js', 'Incremental', 'Browser & Handy'],
    featured: true,
  },
  {
    title: 'Wer bin ich? — Ratespiel',
    emoji: '🎭',
    url: `${PAGES}/ratespiel-wer-bin-ich`,
    categories: ['party'],
    players: '2–10',
    playtime: '15–60 Min. pro Runde',
    situation: 'Spieleabend, Party, Familienfeier — Handy an die Stirn und losraten!',
    description:
      'Heads-up-Style Partyspiel als PWA: Begriff auf die Stirn, die anderen geben Hinweise, Handy kippen zum Werten. Lässt sich wie eine App installieren.',
    tags: ['Partyspiel', 'PWA', 'Gesellschaftsspiel', 'Handy'],
    featured: true,
  },
  {
    title: 'Endless Arena',
    emoji: '⚔️',
    url: `${PAGES}/endless-arena`,
    categories: ['action', 'idle'],
    players: '1',
    playtime: '2–10 Std.',
    situation: 'Hirn aus, Loot an — perfekt nach einem anstrengenden Tag.',
    description:
      'Winziger prozeduraler 3D-Auto-Battler: kein Tod, keine Wände, endloser Loot. Einfach laufen lassen und stärker werden.',
    tags: ['Auto-Battler', '3D', 'Loot', 'Browser & Handy'],
  },
  {
    title: 'Anime Adventure',
    emoji: '⚡',
    url: `${PAGES}/anime-adventure`,
    categories: ['story'],
    players: '1',
    playtime: '2–5 Std.',
    situation: 'Für Anime-Fans mit Lust auf Story statt nur Zahlen.',
    description:
      '„Chronicles of the Celestial Blade“ — ein Adventure mit Anime-Flair als installierbare PWA.',
    tags: ['Adventure', 'Anime', 'Story', 'PWA'],
  },
  {
    title: 'Cosmic Forge',
    emoji: '⛏️',
    url: `${PAGES}/cosmic-forge`,
    categories: ['idle', 'action'],
    players: '1',
    playtime: '3–8 Std.',
    situation: 'Wenn Idle allein zu wenig ist: minen, schmieden, Dungeons klopfen.',
    description:
      'Incremental-Roguelike, gebaut in Godot 4: Ressourcen abbauen, Prestige sammeln, Dungeon-Runs wagen.',
    tags: ['Godot', 'Roguelike', 'Incremental'],
  },
  {
    title: 'Revolution Idle Clone',
    emoji: '🌀',
    url: `${PAGES}/revolution-idle-clone`,
    categories: ['idle'],
    players: '1',
    playtime: '1–3 Std.',
    situation: 'Kleiner Idle-Snack für zwischendurch.',
    description: 'Schneller Nachbau der Kern-Mechanik von Revolution Idle — kreiseln, aufwerten, weiterkreiseln.',
    tags: ['Idle', 'Klon', 'Minimal'],
  },
  {
    title: 'Punch! 🥊',
    emoji: '🥊',
    url: '/archive/playground/punch/demo/index.html',
    categories: ['action', 'party'],
    players: '1–2',
    playtime: '10–30 Min.',
    situation: 'Kurzer Lacher zwischendurch — mit bekannten Gesichtern.',
    description: 'Box-Minispiel aus dem alten Playground. Wer austeilt, gewinnt. Insider inklusive.',
    tags: ['Archiv', 'Minigame', 'Boxen'],
  },
  {
    title: 'Click-RPG',
    emoji: '🌳',
    url: '/archive/playground/click-rpg.html',
    categories: ['idle', 'experiment'],
    players: '1',
    playtime: '15–45 Min.',
    situation: 'Für die 5-Minuten-Pause, die dann doch länger wird.',
    description: 'Schüttel die Bäume 😎 — Retro-Clicker aus dem alten Playground, charmant unfertig.',
    tags: ['Archiv', 'Clicker', 'Retro'],
  },
  {
    title: 'Incremental Adventure Classic',
    emoji: '🏰',
    url: '/archive/playground/incremental_adventure/incremental_adventure.html',
    categories: ['idle'],
    players: '1',
    playtime: '1–2 Std.',
    situation: 'Nostalgie pur: das Original, mit dem alles anfing.',
    description: 'Die allererste Version meines Incremental-Adventures aus dem alten Playground — der Urahn des großen Remakes.',
    tags: ['Archiv', 'Idle', 'Das Original'],
  },
  {
    title: 'Game of Life',
    emoji: '🦠',
    url: '/archive/playground/game-of-life.html',
    categories: ['experiment'],
    players: '1',
    playtime: '10–30 Min.',
    situation: 'Zum Staunen und Muster-Basteln — meditativ und mathematisch.',
    description: 'Conways Lebenssimulation: Zellen setzen, Start drücken, Evolution beobachten.',
    tags: ['Archiv', 'Simulation', 'Klassiker'],
    image: '/archive/public/images/conway.gif',
  },
  {
    title: 'Zeichen-App',
    emoji: '🖌️',
    url: '/archive/playground/drawing/index.html',
    categories: ['kreativ'],
    players: '1+',
    playtime: 'offen',
    situation: 'Einfach mal drauflos malen — oder Montagsmaler spielen.',
    description: 'Kleine Drawing-App aus dem alten Playground: Pinsel, Farben, Leinwand, fertig.',
    tags: ['Archiv', 'Malen', 'Kreativ'],
    image: '/archive/public/images/draw.png',
  },
  {
    title: 'Design it yourself!',
    emoji: '🎨',
    url: '/archive/playground/design-it.html',
    categories: ['kreativ', 'experiment'],
    players: '1',
    playtime: '10–20 Min.',
    situation: 'Für alle, die schon immer mal Webdesigner spielen wollten.',
    description: 'Interaktives Spielzeug: Farben und Styles live an einer Seite herumschrauben.',
    tags: ['Archiv', 'Design', 'Interaktiv'],
    image: '/archive/public/images/design-it.png',
  },
  {
    title: 'Number Clicker',
    emoji: '🔢',
    url: '/archive/playground/increase number/index.html',
    categories: ['idle', 'experiment'],
    players: '1',
    playtime: '5–15 Min.',
    situation: 'Die ehrlichste 5-Minuten-Pause: Zahl groß machen, gut fühlen.',
    description: 'Minimalistischer Clicker-Prototyp — klicken, Ziel erreichen, nächstes Ziel.',
    tags: ['Archiv', 'Clicker', 'Minimal'],
    image: '/archive/public/images/clicker.png',
  },
  {
    title: '3D-Art',
    emoji: '🌀',
    url: '/archive/playground/3d-art.html',
    categories: ['experiment', 'kreativ'],
    players: '1',
    playtime: '5 Min.',
    situation: 'Kurz reinschauen, „whoa“ sagen, weiterschicken.',
    description: 'Generativer 3D-Sketch mit p5.js — Kunst zum Zugucken.',
    tags: ['Archiv', 'p5.js', 'Generativ'],
  },
  {
    title: 'CSS-Challenges',
    emoji: '💅',
    url: '/archive/playground/css-challenges.html',
    categories: ['experiment'],
    players: '1',
    playtime: '10–20 Min.',
    situation: 'Für die Dev-Freunde: CSS-Spielereien und Tricks.',
    description: 'Gesammelte CSS-Herausforderungen und Effekte aus dem alten Playground.',
    tags: ['Archiv', 'CSS', 'Für Devs'],
  },
  {
    title: 'Die Uhr',
    emoji: '🕰️',
    url: '/archive/playground/uhr.html',
    categories: ['experiment'],
    players: '1',
    playtime: '2 Min.',
    situation: 'Kurioses Fundstück — eine Uhr, aber handgebaut.',
    description: 'Analoge Uhr in purem HTML/CSS/JS. Zeigt tatsächlich die Zeit an. Meistens.',
    tags: ['Archiv', 'Fundstück'],
    image: '/archive/public/images/uhr.png',
  },
  {
    title: 'Chrome Utilities',
    emoji: '🧩',
    url: `${GH}/chrome-utilities`,
    repoOnly: true,
    categories: ['tool'],
    players: '—',
    playtime: 'täglich im Einsatz',
    situation: 'Für den Browser-Alltag: meine Extension-Sammlung (195 Commits über 4 Jahre).',
    description:
      'Chrome-Extensions und Utilities, die ich selbst täglich nutze. Im Repo steht, wie man sie installiert.',
    tags: ['Extension', 'Produktivität', 'Repo'],
  },
  {
    title: 'QuizCheater',
    emoji: '🤫',
    url: `${GH}/QuizCheater`,
    repoOnly: true,
    categories: ['tool'],
    players: '—',
    playtime: 'situativ 😉',
    situation: 'Augenzwinkernder Quiz-Helfer — nutzt auf eigene Verantwortung.',
    description: 'Kleines Tool, das bei Online-Quizzen „unterstützt“. Mehr wird nicht verraten.',
    tags: ['Tool', 'Augenzwinkern', 'Repo'],
  },
];
