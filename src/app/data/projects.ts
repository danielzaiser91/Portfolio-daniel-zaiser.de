import { LText } from '../core/i18n';

export interface Project {
  /** Repository name on GitHub. */
  name: string;
  category: 'serious' | 'fun' | 'abandoned';
  tech: string[];
  description: LText;
  knowledge: LText;
  commits: number;
  /** YYYY-MM of first commit / repo creation. */
  started: string;
  /** YYYY-MM of last push. */
  lastTouched: string;
  /** Honest rough estimate, in hours. */
  estHours: number;
  /** Set when a GitHub Pages demo exists. */
  demo?: string;
  highlight?: boolean;
  /** True when the repo is private — hide the (dead-for-visitors) repo link, show a badge instead. */
  repoPrivate?: boolean;
}

const GH = 'https://github.com/danielzaiser91';
const PAGES = 'https://danielzaiser91.github.io';

export const repoUrl = (p: Project) => `${GH}/${p.name}`;

/** Primary GitHub language per repo (from the API, 2026-07-05). */
export const LANGUAGES: Record<string, string> = {
  'chrome-utilities': 'JavaScript',
  'homestream': 'Shell',
  'bubble-notifications': 'JavaScript',
  'best_posts': 'TypeScript',
  'ng-abschlussprojekt-reisekarte': 'TypeScript',
  'Portfolio-daniel-zaiser.de': 'TypeScript',
  'calendarApp': 'TypeScript',
  'custom-scrollbars': 'HTML',
  'arturs-webseite': 'HTML',
  'ng-whatsapp-clone': 'TypeScript',
  'incremental-adventure': 'JavaScript',
  'stardust-to-singularity': 'TypeScript',
  'ratespiel-wer-bin-ich': 'JavaScript',
  'anime-adventure': 'TypeScript',
  'cosmic-forge': 'GDScript',
  'endless-arena': 'HTML',
  'revolution-idle-clone': 'JavaScript',
  'angular-clicker': 'TypeScript',
  'incremental_adventure__dirty': 'JavaScript',
  'incremental_adventure': 'JavaScript',
  'multiplayer-games': 'TypeScript',
  'QuizCheater': 'TypeScript',
  'ng-cyberpunk-minigame': 'TypeScript',
  'geoguessr-hints': 'Python',
};

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  Shell: '#89e051',
  GDScript: '#478cbf',
  Python: '#3572A5',
};

/**
 * Curated project data. Commits/started/lastTouched/language below are a snapshot from
 * 2026-07-05 and serve as the fallback baseline — the projects page (see GithubLiveStats)
 * fetches these live from the public GitHub API at runtime and overlays them reactively,
 * falling back to this snapshot only if the live fetch fails or a repo is unreachable
 * (e.g. private). Everything else (description, knowledge, category, estHours, tech tags)
 * is curated and never live — GitHub has no API for "hours invested" or a bilingual write-up.
 * estHours is a heuristic from commit count x development span, sanity-checked by memory.
 */
export const PROJECTS: Project[] = [
  // ===== Serious =====
  {
    name: 'chrome-utilities',
    category: 'serious',
    tech: ['JavaScript', 'Chrome Extension', 'Manifest V3'],
    description: {
      en: 'A steadily growing collection of Chrome extensions and browser utilities I actually use every day — my longest-running side project.',
      de: 'Eine stetig wachsende Sammlung von Chrome-Extensions und Browser-Utilities, die ich täglich selbst nutze — mein am längsten laufendes Nebenprojekt.',
    },
    knowledge: {
      en: 'Chrome Extension APIs, Manifest V3 migration, content scripts, long-term maintenance of a personal toolset.',
      de: 'Chrome-Extension-APIs, Manifest-V3-Migration, Content Scripts, Langzeitpflege eines eigenen Toolsets.',
    },
    commits: 195,
    started: '2022-09',
    lastTouched: '2026-06',
    estHours: 180,
    highlight: true,
  },
  {
    name: 'homestream',
    category: 'serious',
    tech: ['Docker', 'Jellyfin', 'Caddy', 'Shell', 'Oracle Cloud'],
    description: {
      en: 'Free self-hosted media server: Jellyfin + Jellyseerr + Caddy, deployable on Oracle Cloud Always Free — 2K streaming for up to 4 viewers, honest hosting guide included.',
      de: 'Kostenloser Self-Hosted-Medienserver: Jellyfin + Jellyseerr + Caddy, lauffähig auf Oracle Cloud Always Free — 2K-Streaming für bis zu 4 Zuschauer, inklusive ehrlichem Hosting-Guide.',
    },
    knowledge: {
      en: 'Self-hosting, Docker Compose orchestration, reverse proxies, cloud free-tier constraints, writing docs for others.',
      de: 'Self-Hosting, Docker-Compose-Orchestrierung, Reverse Proxies, Cloud-Free-Tier-Grenzen, Doku für andere schreiben.',
    },
    commits: 11,
    started: '2026-07',
    lastTouched: '2026-07',
    estHours: 20,
    demo: `${PAGES}/homestream`,
    highlight: true,
  },
  {
    name: 'bubble-notifications',
    category: 'serious',
    tech: ['JavaScript', 'CSS Animations', 'Library Design'],
    description: {
      en: 'A small zero-dependency library for customizable notification bubbles with smooth animations.',
      de: 'Eine kleine Zero-Dependency-Library für anpassbare Notification-Bubbles mit sanften Animationen.',
    },
    knowledge: {
      en: 'API design for libraries, CSS animation performance, publishing reusable code.',
      de: 'API-Design für Libraries, Performance von CSS-Animationen, Veröffentlichen von wiederverwendbarem Code.',
    },
    commits: 26,
    started: '2021-02',
    lastTouched: '2023-12',
    estHours: 30,
  },
  {
    name: 'best_posts',
    category: 'serious',
    tech: ['Angular', 'TypeScript', 'REST API', 'RxJS'],
    description: {
      en: 'An Angular app that pulls and presents the best Reddit posts — an early deep dive into consuming third-party APIs cleanly.',
      de: 'Eine Angular-App, die die besten Reddit-Posts lädt und aufbereitet — ein früher Deep Dive in saubere Anbindung von Fremd-APIs.',
    },
    knowledge: {
      en: 'RxJS operators in practice, API pagination, infinite scrolling, Angular architecture on a real feature set.',
      de: 'RxJS-Operatoren in der Praxis, API-Pagination, Infinite Scrolling, Angular-Architektur an echten Features.',
    },
    commits: 91,
    started: '2021-03',
    lastTouched: '2021-03',
    estHours: 50,
  },
  {
    name: 'ng-abschlussprojekt-reisekarte',
    category: 'serious',
    tech: ['Angular', 'TypeScript', 'Google Maps API'],
    description: {
      en: 'Final project of my Fachinformatiker (application development) training: an interactive Google Maps view of all Berge & Meer travel products, built to inspire customers to find their next destination.',
      de: 'Abschlussprojekt meiner Ausbildung zum Fachinformatiker für Anwendungsentwicklung: alle Reisen von Berge & Meer auf einer interaktiven Google-Maps-Karte — zur Inspiration für das nächste Reiseziel.',
    },
    knowledge: {
      en: 'Planning and delivering a certified solo project end-to-end: requirements, documentation, Maps API integration, presentation.',
      de: 'Ein zertifiziertes Soloprojekt komplett liefern: Anforderungen, Doku, Maps-API-Integration, Präsentation.',
    },
    commits: 3,
    started: '2020-12',
    lastTouched: '2021-03',
    estHours: 150,
    highlight: true,
    repoPrivate: true,
  },
  {
    name: 'calendarApp',
    category: 'serious',
    tech: ['TypeScript', 'Angular'],
    description: {
      en: 'A calendar application experiment — built while working on professional calendar software at CGM, to try ideas freely.',
      de: 'Ein Kalender-Experiment — entstanden parallel zur Arbeit an professioneller Kalendersoftware bei CGM, um Ideen frei auszuprobieren.',
    },
    knowledge: {
      en: 'Date/time edge cases, calendar grid rendering strategies.',
      de: 'Datums-/Zeit-Sonderfälle, Rendering-Strategien für Kalender-Grids.',
    },
    commits: 3,
    started: '2022-08',
    lastTouched: '2022-09',
    estHours: 10,
    repoPrivate: true,
  },
  {
    name: 'custom-scrollbars',
    category: 'serious',
    tech: ['HTML', 'CSS', 'JavaScript'],
    description: {
      en: 'A focused demonstration of how custom scrollbars can be implemented cross-browser.',
      de: 'Eine fokussierte Demonstration, wie sich Custom Scrollbars browserübergreifend umsetzen lassen.',
    },
    knowledge: {
      en: 'Scroll APIs, browser inconsistencies, progressive enhancement.',
      de: 'Scroll-APIs, Browser-Inkonsistenzen, Progressive Enhancement.',
    },
    commits: 4,
    started: '2023-03',
    lastTouched: '2023-03',
    estHours: 6,
  },
  {
    name: 'arturs-webseite',
    category: 'serious',
    tech: ['HTML', 'CSS', 'JavaScript'],
    description: {
      en: 'A small website built for a friend — real-world requirements, real-world feedback.',
      de: 'Eine kleine Webseite für einen Freund — echte Anforderungen, echtes Feedback.',
    },
    knowledge: {
      en: 'Working to someone else’s wishes, fast iteration on visual feedback.',
      de: 'Nach fremden Wünschen arbeiten, schnelle Iteration auf visuelles Feedback.',
    },
    commits: 2,
    started: '2021-02',
    lastTouched: '2021-02',
    estHours: 10,
  },
  {
    name: 'ng-whatsapp-clone',
    category: 'serious',
    tech: ['Angular', 'TypeScript'],
    description: {
      en: 'A compact WhatsApp clone built as a school project for demonstration purposes during my training.',
      de: 'Ein kompakter WhatsApp-Klon als Schulprojekt zu Demonstrationszwecken während meiner Ausbildung.',
    },
    knowledge: {
      en: 'Component communication, layout replication, presenting code to an audience.',
      de: 'Komponenten-Kommunikation, Layout-Nachbau, Code vor Publikum präsentieren.',
    },
    commits: 22,
    started: '2020-12',
    lastTouched: '2021-01',
    estHours: 25,
  },
  {
    name: 'Portfolio-daniel-zaiser.de',
    category: 'serious',
    tech: ['Angular 21', 'TypeScript', 'SCSS', 'Signals'],
    description: {
      en: 'The repository behind this very website: bilingual Angular 21 portfolio (signals, zoneless, lazy routes) — including the complete hand-crafted predecessor site, preserved under /archive.',
      de: 'Das Repository hinter genau dieser Webseite: zweisprachiges Angular-21-Portfolio (Signals, zoneless, Lazy Routes) — inklusive der komplett erhaltenen handgebauten Vorgänger-Seite unter /archive.',
    },
    knowledge: {
      en: 'Modern Angular 21 in practice — and how to give a legacy site a dignified home inside its successor.',
      de: 'Modernes Angular 21 in der Praxis — und wie man einer alten Webseite ein würdiges Zuhause im Nachfolger gibt.',
    },
    commits: 12,
    started: '2021-02',
    lastTouched: '2026-07',
    estHours: 100,
    demo: 'https://daniel-zaiser.de',
    highlight: true,
  },
  {
    name: 'geoguessr-hints',
    category: 'serious',
    tech: ['Python', 'globe.gl', 'Data Pipeline'],
    description: {
      en: 'An interactive 3D globe of GeoGuessr country metas — hints grouped by specificity and filterable by source, distilled from the Plonk It guide, with one JSON file per country as the single source of truth.',
      de: 'Ein interaktiver 3D-Globus mit GeoGuessr-Länder-Metas — Hinweise nach Spezifität gruppiert und nach Quelle filterbar, destilliert aus dem Plonk-It-Guide, mit einer JSON-Datei pro Land als Single Source of Truth.',
    },
    knowledge: {
      en: 'Small data-pipeline design (per-country JSON → build script → static site feed), vendoring a 3D library for offline/CDN-free operation, respecting a CC BY-NC-SA source license in a derivative.',
      de: 'Kleines Datenpipeline-Design (JSON pro Land → Build-Skript → Datenfeed der Seite), eine 3D-Library vendored für Offline-/CDN-freien Betrieb, Umgang mit einer CC-BY-NC-SA-Quelllizenz in einem Derivat.',
    },
    commits: 20,
    started: '2026-07',
    lastTouched: '2026-07',
    estHours: 18,
    demo: `${PAGES}/geoguessr-hints`,
  },

  // ===== Fun =====
  {
    name: 'incremental-adventure',
    category: 'fun',
    tech: ['JavaScript', 'Game Design', 'PWA'],
    description: {
      en: 'My most persistent passion project: an incremental idle adventure game — third iteration, 246 commits and counting.',
      de: 'Mein hartnäckigstes Herzensprojekt: ein Incremental-Idle-Adventure — dritte Iteration, 246 Commits und es geht weiter.',
    },
    knowledge: {
      en: 'Game loops, big-number math, save-game systems, balancing, keeping motivation over many iterations.',
      de: 'Game Loops, Big-Number-Mathematik, Savegame-Systeme, Balancing, Motivation über viele Iterationen halten.',
    },
    commits: 246,
    started: '2026-06',
    lastTouched: '2026-06',
    estHours: 120,
    demo: `${PAGES}/incremental-adventure`,
    highlight: true,
  },
  {
    name: 'stardust-to-singularity',
    category: 'fun',
    tech: ['TypeScript', 'Three.js', 'WebGL'],
    description: {
      en: '3D incremental game: from a mote of dust to the singularity — 5 prestige layers, playable in browser and on mobile.',
      de: '3D-Incremental-Game: vom Staubkorn zur Singularität — 5 Prestige-Ebenen, spielbar im Browser und mobil.',
    },
    knowledge: {
      en: 'Three.js scenes and cameras, WebGL performance on mobile, prestige-layer game math.',
      de: 'Three.js-Szenen und Kameras, WebGL-Performance auf Mobilgeräten, Spielmathematik mit Prestige-Ebenen.',
    },
    commits: 21,
    started: '2026-07',
    lastTouched: '2026-07',
    estHours: 15,
    demo: `${PAGES}/stardust-to-singularity`,
    highlight: true,
  },
  {
    name: 'ratespiel-wer-bin-ich',
    category: 'fun',
    tech: ['JavaScript', 'PWA', 'Mobile-first'],
    description: {
      en: 'A heads-up style “Who am I?” party guessing game as an installable PWA.',
      de: 'Ein Partyspiel im Heads-up-Stil — „Wer bin ich?“ — als installierbare PWA.',
    },
    knowledge: {
      en: 'PWA installability, device orientation APIs, designing for a room full of players.',
      de: 'PWA-Installierbarkeit, Device-Orientation-APIs, Design für einen Raum voller Mitspieler.',
    },
    commits: 42,
    started: '2026-06',
    lastTouched: '2026-06',
    estHours: 30,
    demo: `${PAGES}/ratespiel-wer-bin-ich`,
  },
  {
    name: 'anime-adventure',
    category: 'fun',
    tech: ['TypeScript', 'PWA'],
    description: {
      en: '“Chronicles of the Celestial Blade” — an anime-flavored adventure game as a PWA.',
      de: '„Chronicles of the Celestial Blade“ — ein Adventure mit Anime-Flair als PWA.',
    },
    knowledge: {
      en: 'Story-driven game structure, TypeScript modelling of game content.',
      de: 'Story-getriebene Spielstruktur, TypeScript-Modellierung von Spielinhalten.',
    },
    commits: 29,
    started: '2026-06',
    lastTouched: '2026-06',
    estHours: 20,
    demo: `${PAGES}/anime-adventure`,
  },
  {
    name: 'cosmic-forge',
    category: 'fun',
    tech: ['Godot 4', 'GDScript'],
    description: {
      en: 'An incremental roguelike built in Godot 4 — mine resources, prestige, run dungeons. First serious step outside the web platform.',
      de: 'Ein Incremental-Roguelike in Godot 4 — Ressourcen abbauen, Prestige, Dungeons. Erster ernsthafter Schritt raus aus der Web-Plattform.',
    },
    knowledge: {
      en: 'Godot engine, GDScript, scene composition, exporting a game engine project for the web.',
      de: 'Godot-Engine, GDScript, Szenen-Komposition, Web-Export eines Game-Engine-Projekts.',
    },
    commits: 19,
    started: '2026-06',
    lastTouched: '2026-06',
    estHours: 15,
    demo: `${PAGES}/cosmic-forge`,
  },
  {
    name: 'endless-arena',
    category: 'fun',
    tech: ['JavaScript', '3D', 'Procedural Generation'],
    description: {
      en: 'Tiny grindy procedural infinite 3D auto-battler — no death, no walls, endless loot. Browser and mobile.',
      de: 'Winziger, grindiger, prozeduraler 3D-Auto-Battler — kein Tod, keine Wände, endloser Loot. Browser und mobil.',
    },
    knowledge: {
      en: 'Procedural generation, minimal-scope game design.',
      de: 'Prozedurale Generierung, Game Design mit minimalem Scope.',
    },
    commits: 1,
    started: '2026-07',
    lastTouched: '2026-07',
    estHours: 5,
    demo: `${PAGES}/endless-arena`,
  },
  {
    name: 'revolution-idle-clone',
    category: 'abandoned',
    tech: ['JavaScript'],
    description: {
      en: 'Started clone of the idle game Revolution Idle — a mechanics study. Unfinished and currently not really playable.',
      de: 'Begonnener Klon des Idle-Games Revolution Idle — eine Mechanik-Studie. Unfertig und aktuell nicht wirklich spielbar.',
    },
    knowledge: {
      en: 'Deconstructing game mechanics, rapid prototyping.',
      de: 'Spielmechaniken zerlegen, schnelles Prototyping.',
    },
    commits: 1,
    started: '2026-06',
    lastTouched: '2026-06',
    estHours: 5,
    demo: `${PAGES}/revolution-idle-clone`,
  },
  {
    name: 'angular-clicker',
    category: 'fun',
    tech: ['Angular', 'TypeScript', 'Signals'],
    description: {
      en: 'A clicker game in modern Angular — because even idle games deserve signals.',
      de: 'Ein Clicker-Game in modernem Angular — weil auch Idle-Games Signals verdienen.',
    },
    knowledge: {
      en: 'Signal-based state for high-frequency updates.',
      de: 'Signal-basierter State bei hochfrequenten Updates.',
    },
    commits: 5,
    started: '2025-08',
    lastTouched: '2025-08',
    estHours: 6,
  },
  {
    name: 'incremental_adventure__dirty',
    category: 'abandoned',
    tech: ['JavaScript', 'break_eternity.js'],
    description: {
      en: 'Second attempt at the incremental adventure — intentionally less architecture, more shipping. A playable prototype, later superseded by the 2026 remake.',
      de: 'Zweiter Anlauf für das Incremental-Adventure — bewusst weniger Architektur, mehr Machen. Ein spielbarer Prototyp, später vom 2026er-Remake abgelöst.',
    },
    knowledge: {
      en: 'When to drop perfectionism: architecture vs. momentum in hobby projects.',
      de: 'Wann Perfektionismus stört: Architektur vs. Momentum in Hobby-Projekten.',
    },
    commits: 5,
    started: '2025-03',
    lastTouched: '2025-08',
    estHours: 15,
  },
  {
    name: 'incremental_adventure',
    category: 'abandoned',
    tech: ['JavaScript'],
    description: {
      en: 'First attempt at my incremental idle game — never made it past the architecture skeleton, but the whole journey started here.',
      de: 'Erster Versuch meines Incremental-Idle-Games — kam nie über das Architektur-Gerüst hinaus, aber hier begann die ganze Reise.',
    },
    knowledge: {
      en: 'Over-engineering as a learning experience — the architecture outgrew the game.',
      de: 'Over-Engineering als Lernerfahrung — die Architektur wuchs schneller als das Spiel.',
    },
    commits: 2,
    started: '2025-02',
    lastTouched: '2025-02',
    estHours: 10,
  },
  {
    name: 'multiplayer-games',
    category: 'fun',
    tech: ['TypeScript', 'WebSockets'],
    description: {
      en: 'Experiments with browser multiplayer games and real-time communication — including a draw-and-guess party game with word prompts and chat.',
      de: 'Experimente mit Browser-Multiplayer-Spielen und Echtzeit-Kommunikation — u. a. ein Montagsmaler-Ratespiel mit Suchbegriff und Chat.',
    },
    knowledge: {
      en: 'WebSockets, realtime state sync, latency handling.',
      de: 'WebSockets, Echtzeit-State-Sync, Umgang mit Latenz.',
    },
    commits: 9,
    started: '2024-04',
    lastTouched: '2024-04',
    estHours: 15,
  },
  {
    name: 'QuizCheater',
    category: 'abandoned',
    tech: ['TypeScript'],
    description: {
      en: 'Unfinished quiz tool inspired by the German “WER LÜGT HIER?” show format by Vlesk, built for Twitch streamer umut_rre. Never completed — kept public as a project snapshot.',
      de: 'Unvollendetes Quiz-Tool, angelehnt an das „WER LÜGT HIER?“-Format von Vlesk, gebaut für den Twitch-Streamer umut_rre. Nie fertiggestellt — bleibt als Projekt-Einblick öffentlich.',
    },
    knowledge: {
      en: 'Translating a live-show format into an app concept; knowing when to park a side project.',
      de: 'Ein Live-Show-Format in ein App-Konzept übersetzen; erkennen, wann man ein Nebenprojekt ruhen lässt.',
    },
    commits: 3,
    started: '2024-03',
    lastTouched: '2024-03',
    estHours: 5,
  },
  {
    name: 'ng-cyberpunk-minigame',
    category: 'fun',
    tech: ['Angular', 'TypeScript'],
    description: {
      en: 'The breach-protocol hacking minigame from Cyberpunk 2077, rebuilt in Angular.',
      de: 'Das Breach-Protocol-Hacking-Minispiel aus Cyberpunk 2077, nachgebaut in Angular.',
    },
    knowledge: {
      en: 'Algorithmic puzzle logic, grid-based UI state in Angular.',
      de: 'Algorithmische Puzzle-Logik, Grid-basierter UI-State in Angular.',
    },
    commits: 9,
    started: '2020-12',
    lastTouched: '2020-12',
    estHours: 12,
  },
];
