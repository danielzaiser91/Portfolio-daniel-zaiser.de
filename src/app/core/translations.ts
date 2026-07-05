import { Lang } from './i18n';

export const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.recruiters': 'For Recruiters',
    'nav.archive': 'Old Website',
    'nav.contact': 'Contact',

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
    'home.recruiter.text': 'Experience, skills, certificates and languages at a glance — the full CV is available on request.',
    'home.recruiter.cta': 'View my profile',
    'home.tech.title': 'Tech I work with',

    // Projects
    'projects.title': 'Projects',
    'projects.lead':
      'Everything public on my GitHub — split into serious work and fun experiments. ' +
      'Time invested is an honest estimate; the stats come straight from the repositories.',
    'projects.serious': 'Serious projects',
    'projects.fun': 'Fun & experiments',
    'projects.commits': 'commits',
    'projects.span': 'Development span',
    'projects.lastTouched': 'Last touched',
    'projects.estTime': 'Est. time invested',
    'projects.hours': 'h',
    'projects.knowledge': 'What I learned',
    'projects.repo': 'Repository',
    'projects.demo': 'Live demo',

    // Recruiters
    'rec.title': 'For Recruiters & Headhunters',
    'rec.lead':
      'The essentials of my professional profile. The full CV — including contact details and references — ' +
      'is available on request via the contact form.',
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
    'rec.cv.title': 'Want the full CV?',
    'rec.cv.text':
      'I don’t publish my CV with private contact details on the open web. ' +
      'Send me a short message and I’ll reply with the complete PDF — usually within a day.',
    'rec.cv.cta': 'Request CV',
    'rec.linkedin': 'See my LinkedIn profile',

    // Contact
    'contact.title': 'Contact',
    'contact.lead':
      'Whether it’s a role, a project or just a question about one of my repos — drop me a message. ' +
      'It lands directly and privately in my inbox (spam-filtered, my address is never exposed).',
    'contact.name': 'Your name',
    'contact.email': 'Your email',
    'contact.subject': 'Subject',
    'contact.subject.placeholder': 'e.g. Job opportunity, project inquiry, CV request …',
    'contact.message': 'Message',
    'contact.send': 'Send message',
    'contact.sending': 'Sending …',
    'contact.success': 'Thanks! Your message has been sent — I’ll get back to you soon.',
    'contact.error': 'Something went wrong. Please try again, or reach out via LinkedIn instead.',
    'contact.required': 'This field is required.',
    'contact.invalidEmail': 'Please enter a valid email address.',
    'contact.linkedin.title': 'Prefer LinkedIn?',
    'contact.linkedin.text': 'You can also reach me directly there:',

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
    'nav.contact': 'Kontakt',

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
    'home.recruiter.text': 'Erfahrung, Skills, Zertifikate und Sprachen auf einen Blick — den vollständigen Lebenslauf gibt es auf Anfrage.',
    'home.recruiter.cta': 'Zum Profil',
    'home.tech.title': 'Tech-Stack',

    // Projects
    'projects.title': 'Projekte',
    'projects.lead':
      'Alles Öffentliche von meinem GitHub — aufgeteilt in ernsthafte Projekte und Spaß-Experimente. ' +
      'Der Zeitaufwand ist eine ehrliche Schätzung, die Statistiken kommen direkt aus den Repositories.',
    'projects.serious': 'Ernsthafte Projekte',
    'projects.fun': 'Spaß & Experimente',
    'projects.commits': 'Commits',
    'projects.span': 'Entwicklungszeitraum',
    'projects.lastTouched': 'Zuletzt angefasst',
    'projects.estTime': 'Geschätzter Aufwand',
    'projects.hours': 'Std.',
    'projects.knowledge': 'Was ich gelernt habe',
    'projects.repo': 'Repository',
    'projects.demo': 'Live-Demo',

    // Recruiters
    'rec.title': 'Für Recruiter & Headhunter',
    'rec.lead':
      'Das Wichtigste aus meinem beruflichen Profil. Den vollständigen Lebenslauf — inklusive Kontaktdaten und ' +
      'Arbeitszeugnissen — gibt es auf Anfrage über das Kontaktformular.',
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
    'rec.cv.title': 'Vollständigen Lebenslauf anfordern?',
    'rec.cv.text':
      'Meinen Lebenslauf mit privaten Kontaktdaten veröffentliche ich nicht im offenen Web. ' +
      'Eine kurze Nachricht genügt — ich antworte mit dem vollständigen PDF, meist innerhalb eines Tages.',
    'rec.cv.cta': 'Lebenslauf anfragen',
    'rec.linkedin': 'Zu meinem LinkedIn-Profil',

    // Contact
    'contact.title': 'Kontakt',
    'contact.lead':
      'Ob Jobangebot, Projekt oder einfach eine Frage zu einem meiner Repos — schreib mir. ' +
      'Die Nachricht landet direkt und privat in meinem Postfach (spam-gefiltert, meine Adresse bleibt verborgen).',
    'contact.name': 'Dein Name',
    'contact.email': 'Deine E-Mail',
    'contact.subject': 'Betreff',
    'contact.subject.placeholder': 'z. B. Jobangebot, Projektanfrage, Lebenslauf-Anfrage …',
    'contact.message': 'Nachricht',
    'contact.send': 'Nachricht senden',
    'contact.sending': 'Wird gesendet …',
    'contact.success': 'Danke! Deine Nachricht wurde gesendet — ich melde mich bald.',
    'contact.error': 'Da ist etwas schiefgelaufen. Bitte versuch es nochmal — oder schreib mir auf LinkedIn.',
    'contact.required': 'Pflichtfeld.',
    'contact.invalidEmail': 'Bitte eine gültige E-Mail-Adresse eingeben.',
    'contact.linkedin.title': 'Lieber LinkedIn?',
    'contact.linkedin.text': 'Du erreichst mich auch direkt dort:',

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
