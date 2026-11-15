import { LText } from '../core/i18n';

export interface Project {
  /** Repository name on GitHub. */
  name: string;
  category: 'serious' | 'guides' | 'fun' | 'abandoned';
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
  /** Set when a hover-preview screenshot exists at public/images/previews/projects/<name>.webp. */
  preview?: boolean;
  highlight?: boolean;
  /**
   * Set for the few projects shown big under "Ausgewählte Projekte". Criteria: real use
   * (live site or daily tool), technical depth, sustained work, and something a visitor can
   * open right now. `metric` is one hard, checkable number; `benefit` says who gains what.
   */
  featured?: { metric: LText; benefit: LText };
  /** True when the repo is private — hide the (dead-for-visitors) repo link, show a badge instead. */
  repoPrivate?: boolean;
  /** Public companion repo (e.g. a build mirror) to link instead when the source repo is private. */
  publicRepo?: string;
}

const GH = 'https://github.com/danielzaiser91';
const PAGES = 'https://danielzaiser91.github.io';

export const repoUrl = (p: Project) => `${GH}/${p.publicRepo ?? p.name}`;
export const previewUrl = (p: Project) => `images/previews/projects/${p.name}.webp`;

/** Primary GitHub language per repo (from the API, 2026-11-15). */
export const LANGUAGES: Record<string, string> = {
  'anime-kalender-de': 'TypeScript',
  'anime-kalender-nativ': 'JavaScript',
  'obs-disk-replay-buffer': 'Lua',
  'geoguessr-clues': 'Markdown',
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
  'endless-arena': 'TypeScript',
  'revolution-idle-clone': 'JavaScript',
  'angular-clicker': 'TypeScript',
  'incremental_adventure__dirty': 'JavaScript',
  'incremental_adventure': 'JavaScript',
  'multiplayer-games': 'TypeScript',
  'QuizCheater': 'TypeScript',
  'ng-cyberpunk-minigame': 'TypeScript',
  'geoguessr-hints': 'Python',
  'pc-noise-reduction': 'Markdown',
  'isekai-idle-mockups': 'HTML',
  'archmage-idle': 'TypeScript',
  'incremental-adventure-rewritten': 'TypeScript',
  'malazan-cyoa': 'TypeScript',
};

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  Shell: '#89e051',
  GDScript: '#478cbf',
  Python: '#3572A5',
  Lua: '#000080',
  Markdown: '#083fa1',
};

/**
 * Curated project data. Commits/started/lastTouched/language below are a snapshot from
 * 2026-11-15 and serve as the fallback baseline — the projects page (see GithubLiveStats)
 * fetches these live from the public GitHub API at runtime and overlays them reactively,
 * falling back to this snapshot only if the live fetch fails or a repo is unreachable
 * (e.g. private). Everything else (description, knowledge, category, estHours, tech tags)
 * is curated and never live — GitHub has no API for "hours invested" or a bilingual write-up.
 * estHours is a heuristic from commit count x development span, sanity-checked by memory.
 */
export const PROJECTS: Project[] = [
  // ===== Serious =====
  {
    name: 'anime-kalender-de',
    category: 'serious',
    tech: ['TypeScript', 'React 19', 'Vite', 'Tailwind v4', 'Cloudflare Workers', 'D1', 'Playwright'],
    description: {
      en: 'A calendar for anime released with a German dub — the one thing no API will tell you. Week, month, agenda and database views, filters for platform, genre, FSK rating and keywords, Google Calendar and ICS subscription feeds, and a double-opt-in newsletter that mails what is coming up.',
      de: 'Ein Kalender für Anime mit deutscher Synchro — genau die Information, die keine API hergibt. Wochen-, Monats-, Agenda- und Datenbankansicht, Filter für Plattform, Genre, FSK und Schlagworte, Google-Calendar- und ICS-Abo-Feeds, dazu ein Newsletter mit Double-Opt-in.',
    },
    knowledge: {
      en: 'Building a dataset nobody publishes: German dub times exist only inside a JavaScript-rendered streaming calendar and one provider API that happens to expose a language code per episode. Everything derived is marked as derived, and a claimed date with no evidence in the scanned window gets dropped rather than shown. Also: hash routing cannot carry a link preview, so every release gets a real prerendered page — and the address bar rewrites itself to it.',
      de: 'Einen Datenbestand aufbauen, den niemand veröffentlicht: Deutsche Sendezeiten stehen nur in einem JS-gerenderten Streaming-Kalender und in einer Anbieter-Schnittstelle, die je Folge den Sprachcode ausweist. Abgeleitetes wird als abgeleitet gekennzeichnet, und ein behaupteter Termin ohne Beleg im abgesuchten Zeitraum fliegt raus, statt angezeigt zu werden. Außerdem: Hash-Routing kann keine Linkvorschau tragen — deshalb bekommt jedes Release eine echte vorgerenderte Seite, und die Adressleiste schreibt sich selbst darauf um.',
    },
    commits: 9738,
    started: '2026-08',
    lastTouched: '2026-11',
    estHours: 200,
    demo: 'https://anime-kalender.de',
    preview: true,
    highlight: true,
    featured: {
      metric: { en: '2,900+ titles, updated daily', de: '2.900+ Titel, täglich aktualisiert' },
      benefit: {
        en: 'Anyone who watches anime in German sees at a glance what airs with a dub this week, and can subscribe to it in their own calendar.',
        de: 'Wer Anime auf Deutsch schaut, sieht auf einen Blick, was diese Woche mit Synchro läuft, und kann es im eigenen Kalender abonnieren.',
      },
    },
  },
  {
    name: 'anime-kalender-nativ',
    category: 'serious',
    tech: ['JavaScript', 'ES Modules', 'HTML', 'CSS', 'GitHub Pages'],
    description: {
      en: 'Lean twin of anime-kalender.de: the same German-dub data as week and month views with search, news, season and calendar feed, in plain HTML, CSS and ES modules. No dependencies, no server, no tracking.',
      de: 'Schlanker Zwilling von anime-kalender.de: dieselben Synchro-Daten als Wochen- und Monatsansicht mit Suche, News, Saison und Kalender-Abo, in reinem HTML, CSS und ES-Modulen. Ohne Abhängigkeiten, ohne Server, ohne Tracking.',
    },
    knowledge: {
      en: 'How much of a React app survives without a framework: the data comes hourly from the public main repo, so the twin needs no backend at all.',
      de: 'Wie viel von einer React-App ohne Framework übrig bleibt: Die Daten kommen stündlich aus dem öffentlichen Haupt-Repo, der Zwilling braucht also gar kein Backend.',
    },
    commits: 9,
    started: '2026-10',
    lastTouched: '2026-11',
    estHours: 15,
    demo: `${PAGES}/anime-kalender-nativ/`,
    preview: true,
  },
  {
    name: 'obs-disk-replay-buffer',
    category: 'serious',
    tech: ['Lua', 'OBS Studio', 'ffmpeg', 'Windows'],
    description: {
      en: 'A 30-minute replay buffer for OBS that lives on disk instead of in RAM: OBS records all the time, keeps only the last 30 minutes in 1080p60, and Alt+F10 saves everything since the last save as one video. Windows, one-click setup.',
      de: 'Ein 30-Minuten-Replay-Buffer für OBS, der auf der Festplatte statt im RAM liegt: OBS nimmt dauernd auf, behält nur die letzten 30 Minuten in 1080p60, und Alt+F10 speichert alles seit dem letzten Speichern als ein Video. Windows, Einrichtung mit einem Klick.',
    },
    knowledge: {
      en: 'Scripting OBS from Lua, rewriting a recording profile safely, rolling segments that get joined with ffmpeg, and a placeholder file so a clip never looks finished before it is.',
      de: 'OBS per Lua skripten, ein Aufnahmeprofil sicher umschreiben, rollierende Segmente, die ffmpeg zusammenfügt, und eine Platzhalter-Datei, damit ein Clip nie fertig aussieht, bevor er es ist.',
    },
    commits: 14,
    started: '2026-10',
    lastTouched: '2026-11',
    estHours: 20,
    featured: {
      metric: { en: '9× less RAM, under 1 % CPU', de: '9× weniger RAM, unter 1 % CPU' },
      benefit: {
        en: 'Gamers keep the last 30 minutes as a clip without OBS eating gigabytes of memory.',
        de: 'Wer spielt, behält die letzten 30 Minuten als Clip, ohne dass OBS Gigabytes an Arbeitsspeicher frisst.',
      },
    },
  },
  {
    name: 'chrome-utilities',
    category: 'serious',
    tech: ['JavaScript', 'Chrome Extension', 'Manifest V3'],
    description: {
      en: 'A browser extension for 15 streaming and video sites (YouTube, Netflix, Disney+, Crunchyroll, Prime Video, Twitch and more): skips intros, sets playback speed from 0.2× to 5×, logs in automatically and highlights German dubs. In daily use since 2022, now at v1.16.',
      de: 'Eine Browser-Erweiterung für 15 Streaming- und Videoseiten (YouTube, Netflix, Disney+, Crunchyroll, Prime Video, Twitch und mehr): überspringt Intros, stellt die Geschwindigkeit von 0,2× bis 5× ein, meldet automatisch an und hebt deutsche Synchros hervor. Seit 2022 täglich im Einsatz, inzwischen v1.16.',
    },
    knowledge: {
      en: 'Chrome Extension APIs, Manifest V3 migration, content scripts against 15 sites that change their markup without warning, long-term maintenance of a personal toolset.',
      de: 'Chrome-Extension-APIs, Manifest-V3-Migration, Content Scripts gegen 15 Seiten, die ihr Markup ohne Vorwarnung ändern, Langzeitpflege eines eigenen Toolsets.',
    },
    commits: 474,
    started: '2022-09',
    lastTouched: '2026-11',
    estHours: 250,
    preview: true,
    highlight: true,
    featured: {
      metric: { en: '15 sites, maintained since 2022', de: '15 Seiten, gepflegt seit 2022' },
      benefit: {
        en: 'Saves the same clicks on every episode: no intro, the right speed, already logged in.',
        de: 'Spart bei jeder Folge dieselben Klicks: kein Intro, die richtige Geschwindigkeit, schon angemeldet.',
      },
    },
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
    preview: true,
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
    commits: 35,
    started: '2021-02',
    lastTouched: '2026-08',
    estHours: 30,
    preview: true,
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
    preview: true,
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
    started: '2021-03',
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
    commits: 5,
    started: '2023-03',
    lastTouched: '2026-08',
    estHours: 6,
    preview: true,
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
    commits: 86,
    started: '2021-02',
    lastTouched: '2026-10',
    estHours: 35,
    preview: true,
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
    preview: true,
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
    commits: 61,
    started: '2021-02',
    lastTouched: '2026-09',
    estHours: 100,
    demo: 'https://daniel-zaiser.de',
    preview: true,
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
    commits: 178,
    started: '2026-07',
    lastTouched: '2026-07',
    estHours: 30,
    demo: `${PAGES}/geoguessr-hints`,
    preview: true,
  },

  // ===== Guides & tooling =====
  {
    name: 'pc-noise-reduction',
    category: 'guides',
    tech: ['Technical Writing', 'Windows', 'Telemetry', 'Prompt Design'],
    description: {
      en: 'A method for making a loud Windows PC quiet without changing hardware — power plan, background load, fan curve, in that order because each cause hides the next. Ships a layperson guide, a ready-made prompt for an AI with terminal access, a fully measured case study including the wrong turns, and the measurement methodology behind it.',
      de: 'Ein Verfahren, einen lauten Windows-PC ohne Hardwarewechsel leise zu bekommen — Energieplan, Hintergrundlast, Lüfterkurve, in dieser Reihenfolge, weil jede Ursache die nächste verdeckt. Enthält eine Anleitung für Laien, einen fertigen Auftragstext für eine KI mit Terminalzugriff, ein durchgemessenes Fallbeispiel samt Irrwegen und die Messmethodik dahinter.',
    },
    knowledge: {
      en: 'Reading hardware sensors headlessly via a local JSON endpoint, load-normalised comparison of measurement runs, thermal settling times that make short runs actively misleading, percentile-based thresholds instead of averages, and writing a prompt that constrains an agent to a cheap, verifiable path.',
      de: 'Hardware-Sensoren headless über einen lokalen JSON-Endpunkt auslesen, lastbereinigter Vergleich von Messläufen, thermische Einschwingzeiten, die kurze Läufe aktiv irreführend machen, perzentilbasierte Schwellen statt Mittelwerte, und einen Auftragstext schreiben, der einen Agenten auf einen günstigen, überprüfbaren Weg zwingt.',
    },
    commits: 1,
    started: '2026-08',
    lastTouched: '2026-08',
    estHours: 5,
  },
  {
    name: 'geoguessr-clues',
    category: 'guides',
    tech: ['Technical Writing', 'Research', 'GeoGuessr'],
    description: {
      en: 'A lexicon of clues that split lookalike countries in GeoGuessr (Hungary vs. Croatia, the Baltics, Scandinavia …) and pin regions inside big ones (US, Canadian, Australian, Indian states). One line per clue, the deciding country in bold, no prose.',
      de: 'Ein Lexikon der Hinweise, die in GeoGuessr ähnliche Länder auseinanderhalten (Ungarn gegen Kroatien, das Baltikum, Skandinavien …) und Regionen in großen Ländern verorten (Bundesstaaten der USA, Kanadas, Australiens, Indiens). Eine Zeile pro Hinweis, das entscheidende Land fett, keine Prosa.',
    },
    knowledge: {
      en: 'Writing for a glance instead of a read, and keeping a research log of dead ends so nothing gets looked up twice.',
      de: 'Für einen Blick schreiben statt zum Durchlesen, und ein Recherche-Log der Sackgassen führen, damit nichts zweimal nachgeschlagen wird.',
    },
    commits: 49,
    started: '2026-08',
    lastTouched: '2026-08',
    estHours: 15,
  },

  // ===== Fun =====
  {
    name: 'malazan-cyoa',
    category: 'fun',
    tech: ['TypeScript', 'Vite', 'Vitest', 'i18n', 'FLUX.2', 'Game Design'],
    description: {
      en: 'A bilingual, illustrated choose-your-own-adventure retelling Book 1 of Steven Erikson\u2019s '
        + '*Malazan Book of the Fallen*. Branch-and-bottleneck structure with a twist: the story graph is '
        + 'in-fiction a card reading, and you can jump back to any scene you have reached and get exactly '
        + 'the state you had then \u2014 what you *know* stays, what you *are* rolls back. Every page carries '
        + 'its own oil-painted illustration, generated through a versioned prompt pipeline. '
        + 'Prologue and chapter 1 are playable; nine chapters to go.',
      de: 'Ein zweisprachiges, illustriertes Choose-your-own-Adventure, das Band 1 von Steven Eriksons '
        + '\u201eDas Buch der Gefallenen\u201c nacherz\u00e4hlt. Branch-and-Bottleneck mit einem Dreh: Der '
        + 'Story-Graph ist in-fiction eine Kartenlegung, und man springt zu jeder erreichten Szene zur\u00fcck '
        + 'und bekommt exakt den Zustand von damals \u2014 was man *wei\u00df*, bleibt; was man *ist*, rollt '
        + 'zur\u00fcck. Jede Seite tr\u00e4gt ihre eigene, in \u00d6l gemalte Illustration aus einer versionierten '
        + 'Prompt-Pipeline. Prolog und Kapitel 1 sind spielbar, neun Kapitel fehlen.',
    },
    knowledge: {
      en: 'Keeping a story spoiler-free by construction rather than by discipline \u2014 an unreached card '
        + 'yields neither title nor summary nor artwork, enforced in the core and covered by tests, not '
        + 'hidden in the view. Building an image pipeline where prompts are versioned content: a locked '
        + 'style anchor, a world anchor against period drift, character and rank sheets copied verbatim so '
        + 'the same person survives hundreds of pictures \u2014 and cost protection, so improving a prompt '
        + 'does not silently invalidate every image already paid for.',
      de: 'Eine Geschichte spoilerfrei by construction halten statt durch Disziplin \u2014 eine nie erreichte '
        + 'Karte gibt weder Titel noch Zusammenfassung noch Bild her, durchgesetzt im Core und durch Tests '
        + 'abgedeckt, nicht in der Ansicht versteckt. Eine Bild-Pipeline bauen, in der Prompts versionierter '
        + 'Content sind: ein gesperrter Stil-Anker, ein Welt-Anker gegen Epochen-Drift, Figuren- und '
        + 'Standesbl\u00e4tter, die wortgleich eingesetzt werden, damit dieselbe Person hunderte Bilder '
        + '\u00fcbersteht \u2014 und Bestandsschutz, damit eine bessere Formulierung nicht still jedes bereits '
        + 'bezahlte Bild entwertet.',
    },
    commits: 53,
    started: '2026-08',
    lastTouched: '2026-08',
    estHours: 35,
    demo: `${PAGES}/malazan-cyoa/`,
    preview: true,
    featured: {
      metric: { en: 'An oil painting on every page, in DE and EN', de: 'Jede Seite ein eigenes Ölgemälde, auf DE und EN' },
      benefit: {
        en: 'Readers of the books play through Book 1 as an illustrated story, without ever being spoiled ahead of where they are.',
        de: 'Wer die Bücher mag, spielt Band 1 als illustrierte Geschichte durch, ohne je über den eigenen Stand hinaus gespoilert zu werden.',
      },
    },
  },
  {
    name: 'incremental-adventure-rewritten',
    category: 'fun',
    tech: ['TypeScript', 'Vite', 'Canvas 2D', 'Web Audio', 'break_eternity.js', 'Game Design'],
    description: {
      en: 'A fantasy-RPG incremental with eight prestige layers, where each layer adds a new verb instead of a bigger number: an animated combat arena, a soul grid, a bloodline crucible, a codex of 250 hand-written runes, a talent tree, a tile puzzle, roguelite runs and finally laws that rewrite the game’s own rules. Spiritual successor to incremental-adventure.',
      de: 'Ein Fantasy-RPG-Incremental mit acht Prestige-Ebenen, von denen jede ein neues Verb einführt statt einer größeren Zahl: animierte Kampfarena, Seelengitter, Blutlinien-Tiegel, ein Codex aus 250 handgeschriebenen Runen, ein Talentbaum, ein Kachel-Puzzle, Roguelite-Läufe und zuletzt Gesetze, die die Spielregeln selbst umschreiben. Geistiger Nachfolger von incremental-adventure.',
    },
    knowledge: {
      en: 'Designing a headless deterministic core that runs identically in the game, in offline catch-up and in a simulation bot; taming double-exponential feedback with softcap chains until a run lasts weeks instead of twelve minutes; procedural creature silhouettes and a full synth engine with no asset files at all; shipping German and English complete from day one, with a missing translation as a compile error.',
      de: 'Einen kopflosen deterministischen Core bauen, der im Spiel, im Offline-Nachlauf und im Sim-Bot identisch läuft; doppelt-exponentielle Rückkopplung mit Softcap-Ketten bändigen, bis ein Durchlauf Wochen statt zwölf Minuten dauert; prozedurale Kreatur-Silhouetten und eine komplette Synth-Engine ganz ohne Asset-Dateien; Deutsch und Englisch von Tag eins vollständig, mit fehlender Übersetzung als Compile-Fehler.',
    },
    commits: 2,
    started: '2026-07',
    lastTouched: '2026-07',
    estHours: 40,
    demo: `${PAGES}/incremental-adventure-rewritten-live`,
    preview: true,
    repoPrivate: true,
  },
  {
    name: 'archmage-idle',
    category: 'fun',
    tech: ['TypeScript', 'Vite', 'Canvas 2D', 'Web Audio', 'Game Design'],
    description: {
      en: 'Medieval-fantasy anime-isekai incremental: a mage’s orb, four elements that feed each other, elemental spirits that answer to type matchups, and a time layer that resets everything for something permanent. Grown out of the isekai-idle mockups, released as v0.5.',
      de: 'Incremental im Mittelalter-Fantasy-Anime-Isekai-Setting: der Orb eines Magiers, vier Elemente, die sich gegenseitig nähren, Elementargeister mit Typ-Schwächen und eine Zeit-Ebene, die alles für Dauerhaftes zurücksetzt. Aus den isekai-idle-Mockups entstanden, veröffentlicht als v0.5.',
    },
    knowledge: {
      en: 'A pure core (game logic without DOM or audio) that the UI only reads; a visual language that avoids numbers entirely — every value is told through rings, orbiting orbs and fill levels; shipping a private source repo to public Pages through a build-only mirror repo.',
      de: 'Ein purer Core (Spiellogik ohne DOM und Audio), den die UI nur liest; eine visuelle Sprache ganz ohne Zahlen — jeder Wert wird über Ringe, kreisende Orbs und Füllstände erzählt; ein privates Quell-Repo über ein reines Build-Spiegel-Repo auf öffentliche Pages bringen.',
    },
    commits: 206,
    started: '2026-07',
    lastTouched: '2026-08',
    estHours: 70,
    demo: `${PAGES}/archmage-idle-live`,
    preview: true,
    highlight: true,
    repoPrivate: true,
    publicRepo: 'archmage-idle-live',
  },
  {
    name: 'incremental-adventure',
    category: 'fun',
    tech: ['JavaScript', 'HTML', 'CSS', 'Game Design'],
    description: {
      en: '“Chronicles of the Forgotten Path”: a text-based incremental RPG in four chapters, with NPCs, quests, combat, needs, a skill tree and music. Plain HTML, CSS and JavaScript with no build step. My most persistent passion project, now in its third iteration.',
      de: '„Chroniken des vergessenen Weges“: ein textbasiertes Incremental-RPG in vier Kapiteln, mit NPCs, Quests, Kämpfen, Bedürfnissen, Skillbaum und Musik. Reines HTML, CSS und JavaScript ohne Build-Schritt. Mein hartnäckigstes Herzensprojekt, inzwischen in der dritten Iteration.',
    },
    knowledge: {
      en: 'Game loops, big-number math, save-game systems, balancing, and keeping motivation over many iterations.',
      de: 'Game Loops, Big-Number-Mathematik, Savegame-Systeme, Balancing und Motivation über viele Iterationen halten.',
    },
    commits: 342,
    started: '2026-06',
    lastTouched: '2026-09',
    estHours: 150,
    demo: `${PAGES}/incremental-adventure`,
    preview: true,
    highlight: true,
    featured: {
      metric: { en: '4 chapters, 342 commits', de: '4 Kapitel, 342 Commits' },
      benefit: {
        en: 'Plays straight in the browser, no install, and keeps going while you are away.',
        de: 'Läuft direkt im Browser, ohne Installation, und spielt weiter, während man weg ist.',
      },
    },
  },
  {
    name: 'stardust-to-singularity',
    category: 'fun',
    tech: ['TypeScript', 'Three.js', 'WebGL', 'PWA', 'break_eternity.js', 'Web Audio'],
    description: {
      en: '3D incremental game: from a mote of dust to the singularity. GPU particles, a black hole, 5 prestige layers, offline progress, procedural audio, English and German. Installable as a PWA and playable on mobile.',
      de: '3D-Incremental-Game: vom Staubkorn zur Singularität. GPU-Partikel, ein Schwarzes Loch, 5 Prestige-Ebenen, Offline-Fortschritt, prozeduraler Sound, Deutsch und Englisch. Als PWA installierbar und mobil spielbar.',
    },
    knowledge: {
      en: 'Three.js scenes and GPU particles, WebGL performance on mobile, prestige-layer game math, and a headless balance simulation that runs in CI.',
      de: 'Three.js-Szenen und GPU-Partikel, WebGL-Performance auf Mobilgeräten, Spielmathematik mit Prestige-Ebenen und eine kopflose Balance-Simulation, die in der CI läuft.',
    },
    commits: 129,
    started: '2026-07',
    lastTouched: '2026-08',
    estHours: 60,
    demo: `${PAGES}/stardust-to-singularity`,
    preview: true,
    highlight: true,
    featured: {
      metric: { en: '5 prestige layers, balance tested in CI', de: '5 Prestige-Ebenen, Balance in der CI getestet' },
      benefit: {
        en: 'A full 3D game in the browser that stays smooth on a phone, with no install.',
        de: 'Ein komplettes 3D-Spiel im Browser, das auch auf dem Handy flüssig läuft, ohne Installation.',
      },
    },
  },
  {
    name: 'isekai-idle-mockups',
    category: 'fun',
    tech: ['HTML', 'JavaScript', 'Game Design', 'Prototyping'],
    description: {
      en: 'Five playable HTML mockups for an incremental/idle game in a medieval-fantasy anime-isekai setting (Revolution-Idle-style mechanics) — built to pick a direction before committing to the real game.',
      de: 'Fünf spielbare HTML-Mockups für ein Incremental/Idle im Mittelalter-Fantasy/Anime-Isekai-Setting (Mechanik à la Revolution Idle) — als Entscheidungsgrundlage, bevor das echte Spiel entsteht.',
    },
    knowledge: {
      en: 'Rapid prototyping of one core mechanic in five visual and mechanical directions; using playable mockups as a decision tool instead of design documents.',
      de: 'Rapid Prototyping einer Kernmechanik in fünf visuellen und mechanischen Richtungen; spielbare Mockups als Entscheidungswerkzeug statt Design-Dokumenten.',
    },
    commits: 1,
    started: '2026-07',
    lastTouched: '2026-07',
    estHours: 8,
    demo: `${PAGES}/isekai-idle-mockups`,
    preview: true,
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
    commits: 60,
    started: '2026-06',
    lastTouched: '2026-08',
    estHours: 30,
    demo: `${PAGES}/ratespiel-wer-bin-ich`,
    preview: true,
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
    commits: 35,
    started: '2026-06',
    lastTouched: '2026-08',
    estHours: 20,
    demo: `${PAGES}/anime-adventure`,
    preview: true,
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
    commits: 20,
    started: '2026-06',
    lastTouched: '2026-08',
    estHours: 15,
    demo: `${PAGES}/cosmic-forge`,
    preview: true,
  },
  {
    name: 'endless-arena',
    category: 'fun',
    tech: ['TypeScript', 'Vite', 'Three.js', 'Firebase', 'Procedural Generation'],
    description: {
      en: 'Tiny grindy procedural infinite 3D auto-battler — no death, no walls, endless loot, and a live leaderboard. English and German, browser and mobile.',
      de: 'Winziger, grindiger, prozeduraler 3D-Auto-Battler — kein Tod, keine Wände, endloser Loot und eine Live-Bestenliste. Deutsch und Englisch, Browser und mobil.',
    },
    knowledge: {
      en: 'Procedural generation, minimal-scope game design, a live leaderboard on Firebase, and a headless simulation for balancing.',
      de: 'Prozedurale Generierung, Game Design mit minimalem Scope, eine Live-Bestenliste auf Firebase und eine kopflose Simulation fürs Balancing.',
    },
    commits: 12,
    started: '2026-07',
    lastTouched: '2026-07',
    estHours: 5,
    demo: `${PAGES}/endless-arena`,
    preview: true,
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
    commits: 2,
    started: '2026-06',
    lastTouched: '2026-07',
    estHours: 5,
    demo: `${PAGES}/revolution-idle-clone`,
    preview: true,
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
    preview: true,
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
    preview: true,
    repoPrivate: true,
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
    preview: true,
    repoPrivate: true,
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
    preview: true,
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
    commits: 4,
    started: '2024-03',
    lastTouched: '2026-07',
    estHours: 5,
    preview: true,
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
    preview: true,
  },
];
