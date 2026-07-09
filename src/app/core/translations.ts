import { Lang } from './i18n';

export const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.recruiters': 'For Recruiters',
    'nav.archive': 'Old Website',

    // Footer
    'footer.built': 'Built with Angular 21 — no trackers, no cookies.',
    'footer.source': 'View source on GitHub',

    // Home
    'home.hello': 'Hi, I’m',
    'home.role': 'Senior Software Developer',
    'home.tagline': 'Frontend specialist — working professionally with Angular since July 2018.',
    'home.pitch':
      'I build maintainable, fast web applications for a living — and playful experiments for fun. ' +
      'Currently migrating enterprise legacy systems to modern Angular at Funk Gruppe in Hamburg.',
    'home.stat.years': 'years of professional Angular',
    'home.stat.repos': 'public repositories',
    'home.stat.companies': 'companies',
    'home.stat.cert': 'certified Angular & TypeScript (top 10%)',
    'home.visitor.title': 'Here to look around?',
    'home.visitor.text': 'Browse my serious work and my fun experiments — games, tools, and the playground of my old website.',
    'home.visitor.cta': 'Explore my projects',
    'home.recruiter.title': 'Recruiter or headhunter?',
    'home.recruiter.text': 'Experience, skills, certificates and languages at a glance — feel free to connect on LinkedIn.',
    'home.recruiter.cta': 'View my profile',
    'home.tech.title': 'Tech I work with',

    // Projects
    'projects.title': 'Projects',
    'projects.lead':
      'Everything public on my GitHub — split into serious work and fun experiments. ' +
      'Time invested is an honest estimate; the stats come straight from the repositories.',
    'projects.serious': 'Serious projects',
    'projects.fun': 'Fun & experiments',
    'projects.abandoned': 'Unfinished & abandoned',
    'projects.abandoned.hint':
      'Honest building sites: started, learned from, moved on. Kept public because unfinished code tells its own story.',
    'projects.commits': 'commits',
    'projects.span': 'Development span',
    'projects.lastTouched': 'Last touched',
    'projects.estTime': 'Est. time invested',
    'projects.hours': 'h',
    'projects.knowledge': 'What I learned',
    'projects.repo': 'Repository',
    'projects.repo.private': 'Private repository',
    'projects.repo.private.tooltip': 'This repository is private — the code isn’t publicly browsable.',
    'projects.demo': 'Live demo',
    'projects.summary.projects': 'public projects',
    'projects.summary.commits': 'commits total',
    'projects.summary.hours': 'estimated hours',
    'projects.summary.years': 'years of side projects',
    'projects.archive.title': 'The old website',
    'projects.archive.text': 'My previous hand-crafted site (2020–2023) is fully preserved — playground games, experiments and all.',
    'projects.archive.cta': 'Visit the archive',
    'projects.live.on': 'Live from GitHub',
    'projects.live.syncing': 'Syncing with GitHub …',
    'projects.live.tooltip': 'Commit counts and dates are fetched live from the GitHub API — this page always reflects the real repos, not a static snapshot.',

    // Recruiters
    'rec.title': 'For Recruiters & Headhunters',
    'rec.lead': 'The essentials of my professional profile — experience, skills, certificates and languages.',
    'rec.summary.title': 'Profile',
    'rec.summary.text':
      'Senior software developer with a frontend focus (Angular), professionally since August 2018. ' +
      'Passionate about clean architecture, developer experience and shipping features that users actually enjoy. ' +
      'Based in Germany, working remotely and on-site.',
    'rec.experience': 'Experience',
    'rec.today': 'today',
    'rec.skills': 'Skills',
    'rec.certs': 'Certificates',
    'rec.cert.angular':
      'Certified advanced knowledge in Angular & TypeScript (top 10%) and more — valid 09/2021 – 12/2028, verifiable via LinkedIn.',
    'rec.langs': 'Languages',
    'rec.lang.de': 'German',
    'rec.lang.de.level': 'native',
    'rec.lang.en': 'English',
    'rec.lang.en.level': 'fluent to business-level',
    'rec.connect.title': 'Let’s connect',
    'rec.connect.text': 'The best way to reach me is LinkedIn — feel free to connect or send a message there.',
    'rec.connect.cta': 'Connect on LinkedIn',
    'rec.linkedin': 'See my LinkedIn profile',

    // Archive
    'archive.title': 'The Old Website',
    'archive.lead':
      'Before this portfolio, daniel-zaiser.de was a hand-crafted playground — pure HTML, CSS and vanilla JavaScript, ' +
      'no framework, built between 2020 and 2023. It’s preserved here in its entirety, exactly as it was.',
    'archive.what.title': 'What’s in there?',
    'archive.what.text':
      'An animated landing page, a drawing app, Conway’s Game of Life, an incremental adventure game, ' +
      'CSS challenges, a syntax highlighter, a boxing mini-game and more — all written from scratch without libraries.',
    'archive.note':
      'Note: the archive is served as-is. Some internal links assume the old domain root and may lead back to this site.',
    'archive.open': 'Open the old website',
    'archive.playground': 'Jump straight to the playground',

    // 404
    'notfound.title': 'Page not found',
    'notfound.text': 'This page doesn’t exist — maybe it never did, maybe it lives in the archive now.',
    'notfound.home': 'Back to home',
  },

  de: {
    // Nav
    'nav.home': 'Start',
    'nav.projects': 'Projekte',
    'nav.recruiters': 'Für Recruiter',
    'nav.archive': 'Alte Webseite',

    // Footer
    'footer.built': 'Gebaut mit Angular 21 — ohne Tracker, ohne Cookies.',
    'footer.source': 'Quellcode auf GitHub',

    // Home
    'home.hello': 'Hallo, ich bin',
    'home.role': 'Senior Software-Entwickler',
    'home.tagline': 'Frontend-Spezialist — professionell mit Angular unterwegs seit Juli 2018.',
    'home.pitch':
      'Beruflich baue ich wartbare, schnelle Webanwendungen — privat verspielte Experimente. ' +
      'Aktuell migriere ich bei der Funk Gruppe in Hamburg Enterprise-Altsysteme in eine moderne Angular-Welt.',
    'home.stat.years': 'Jahre professionelles Angular',
    'home.stat.repos': 'öffentliche Repositories',
    'home.stat.companies': 'Unternehmen',
    'home.stat.cert': 'zertifiziert in Angular & TypeScript (Top 10%)',
    'home.visitor.title': 'Einfach nur stöbern?',
    'home.visitor.text': 'Hier gibt es ernsthafte Projekte und verspielte Experimente — Spiele, Tools und den Playground meiner alten Webseite.',
    'home.visitor.cta': 'Zu meinen Projekten',
    'home.recruiter.title': 'Recruiter oder Headhunter?',
    'home.recruiter.text': 'Erfahrung, Skills, Zertifikate und Sprachen auf einen Blick — gerne auch auf LinkedIn vernetzen.',
    'home.recruiter.cta': 'Zum Profil',
    'home.tech.title': 'Tech-Stack',

    // Projects
    'projects.title': 'Projekte',
    'projects.lead':
      'Alles Öffentliche von meinem GitHub — aufgeteilt in ernsthafte Projekte und Spaß-Experimente. ' +
      'Der Zeitaufwand ist eine ehrliche Schätzung, die Statistiken kommen direkt aus den Repositories.',
    'projects.serious': 'Ernsthafte Projekte',
    'projects.fun': 'Spaß & Experimente',
    'projects.abandoned': 'Unfertig & aufgegeben',
    'projects.abandoned.hint':
      'Ehrliche Baustellen: angefangen, daraus gelernt, weitergezogen. Bleiben öffentlich, weil auch unfertiger Code eine Geschichte erzählt.',
    'projects.commits': 'Commits',
    'projects.span': 'Entwicklungszeitraum',
    'projects.lastTouched': 'Zuletzt angefasst',
    'projects.estTime': 'Geschätzter Aufwand',
    'projects.hours': 'Std.',
    'projects.knowledge': 'Was ich gelernt habe',
    'projects.repo': 'Repository',
    'projects.repo.private': 'Privates Repository',
    'projects.repo.private.tooltip': 'Dieses Repository ist privat — der Code ist nicht öffentlich einsehbar.',
    'projects.demo': 'Live-Demo',
    'projects.summary.projects': 'öffentliche Projekte',
    'projects.summary.commits': 'Commits gesamt',
    'projects.summary.hours': 'geschätzte Stunden',
    'projects.summary.years': 'Jahre Nebenprojekte',
    'projects.archive.title': 'Die alte Webseite',
    'projects.archive.text': 'Meine frühere handgebaute Seite (2020–2023) ist vollständig erhalten — mit Playground-Spielen, Experimenten und allem.',
    'projects.archive.cta': 'Zum Archiv',
    'projects.live.on': 'Live von GitHub',
    'projects.live.syncing': 'Synchronisiere mit GitHub …',
    'projects.live.tooltip': 'Commit-Zahlen und Daten werden live von der GitHub-API geladen — diese Seite zeigt immer die echten Repos, keinen statischen Schnappschuss.',

    // Recruiters
    'rec.title': 'Für Recruiter & Headhunter',
    'rec.lead': 'Das Wichtigste aus meinem beruflichen Profil — Erfahrung, Skills, Zertifikate und Sprachen.',
    'rec.summary.title': 'Profil',
    'rec.summary.text':
      'Senior Software-Entwickler mit Frontend-Fokus (Angular), im Beruf seit August 2018. ' +
      'Leidenschaft für saubere Architektur, Developer Experience und Features, die Nutzern wirklich Spaß machen. ' +
      'Wohnhaft in Deutschland, remote und vor Ort tätig.',
    'rec.experience': 'Berufserfahrung',
    'rec.today': 'heute',
    'rec.skills': 'Kompetenzen',
    'rec.certs': 'Zertifikate',
    'rec.cert.angular':
      'Zertifiziert für fortgeschrittene Kenntnisse in Angular & TypeScript (Top 10%) und weitere — gültig 09/2021 – 12/2028, nachweisbar über LinkedIn.',
    'rec.langs': 'Sprachen',
    'rec.lang.de': 'Deutsch',
    'rec.lang.de.level': 'Muttersprache',
    'rec.lang.en': 'Englisch',
    'rec.lang.en.level': 'fließend bis verhandlungssicher',
    'rec.connect.title': 'Lass uns vernetzen',
    'rec.connect.text': 'Am besten erreichst du mich über LinkedIn — dort gerne vernetzen oder eine Nachricht schreiben.',
    'rec.connect.cta': 'Auf LinkedIn vernetzen',
    'rec.linkedin': 'Zu meinem LinkedIn-Profil',

    // Archive
    'archive.title': 'Die alte Webseite',
    'archive.lead':
      'Vor diesem Portfolio war daniel-zaiser.de ein handgebauter Playground — pures HTML, CSS und Vanilla-JavaScript, ' +
      'ohne Framework, entstanden zwischen 2020 und 2023. Hier ist sie vollständig erhalten, genau wie sie war.',
    'archive.what.title': 'Was steckt drin?',
    'archive.what.text':
      'Eine animierte Startseite, eine Zeichen-App, Conways Game of Life, ein Incremental-Adventure, ' +
      'CSS-Challenges, ein Syntax-Highlighter, ein Box-Minispiel und mehr — alles ohne Libraries von Hand geschrieben.',
    'archive.note':
      'Hinweis: Das Archiv wird unverändert ausgeliefert. Manche internen Links erwarten die alte Domain-Root und führen zurück auf diese Seite.',
    'archive.open': 'Alte Webseite öffnen',
    'archive.playground': 'Direkt zum Playground',

    // 404
    'notfound.title': 'Seite nicht gefunden',
    'notfound.text': 'Diese Seite existiert nicht — vielleicht hat sie das nie, vielleicht lebt sie jetzt im Archiv.',
    'notfound.home': 'Zurück zur Startseite',
  },
};
