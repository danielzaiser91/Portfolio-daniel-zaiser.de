# Status — Portfolio (daniel-zaiser.de)

Laufender Arbeitsstand dieses Repos. Angelegt am 26.07.2026.

## Task Queue

**Regeln:** Jeder neue Wunsch landet SOFORT beim Nennen hier, Erledigtes wandert
SOFORT ins Archiv. Sortierung: 1 · In Arbeit → 2 · Queue → 3 · Zu besprechen →
4 · Warten auf dein Feedback.

### 1 · In Arbeit

— nichts offen.

### 2 · Queue

1. **🚨 Sicherheitsvorfall `server14.tldhost.de` — Live-Seite liefert Malware aus** (gefunden
   29.09.2026): `daniel-zaiser.de/` antwortet **503** mit einer gefälschten „WordPress-Wartung"-
   Seite, und HTML- **und** JS-Antworten sind server-seitig um ein `<script>` ergänzt, das
   Mobilgeräte auf `urshort.com`/`ushort.company` (bekanntes Malware-Kurz-URL-Netz) umleitet.
   Unser `deploy`-Branch und die Action-Läufe sind **sauber** — es ist die Auslieferung durch den
   Server. Auch `displator.com` (503) und `grossenmarpe.de` (200) auf derselben IP sind befallen,
   also **server-/webspace-übergreifend**, kein Einzelfall. Befunde und Prüfgriffe:
   `docs/sicherheitsvorfall-server14.md`. **Erledigt:** Diagnose + Dokumentation (29.09.2026),
   Mechanismus aus der Plesk-Dateiliste belegt (fremde PHP-Backdoors in `/httpdocs`, u. a.
   `index.php` = die Wartungsseite; HTML/JS dateiseitig verändert). **Meldung an TLDHost ist raus**
   (29.09.2026, Text in der Doku) — **Offen:** TLDHost prüft und schaltet ab; danach Zugangsdaten
   erneuern. Der Umzug (Punkt 2) beseitigt den Pfad endgültig.

2. **Neuen Webhost für daniel-zaiser.de suchen** (notiert 28.09.2026): Plesk hat am 27. und
   28.09.2026 mehrfach stundenlang ausgefallen — das ist nicht tragbar. **Gemeint ist diese
   Seite (daniel-zaiser.de), nicht der Anime-Kalender** (Daniel, 28.09.2026). Ziel: Anbieter mit
   **99,9 % (besser 100 %) Uptime**, hoher Qualität, niedrigen Kosten, am besten kostenlos.
   Vor der Entscheidung prüfen: öffentliche Status-/Uptime-Historie statt Werbeversprechen,
   statisches Hosting reicht, Domäne und HTTPS inklusive, und wie der Umzug läuft — heute
   liefert **Plesk** die Seite aus, der GitHub-Action-Lauf baut nur und schiebt den Output auf
   den `deploy`-Branch, von dem Plesk ihn per Webhook holt.

   **Stand 29.09.2026 — Umzug läuft:** Cloudflare-Zone `daniel-zaiser.de` angelegt
   (Nameserver `alex.ns.cloudflare.com` / `alexandra.ns.cloudflare.com`), Mail-Einträge + SPF
   vollständig gesetzt, Pages-Projekt `daniel-zaiser-de` mit `_redirects` deployt und live
   geprüft (`daniel-zaiser-de.pages.dev`, sauber), Custom Domains `daniel-zaiser.de` + `www`
   angelegt, Action deployt ab jetzt zusätzlich nach Pages. **Offen: der Schnitt** — Nameserver
   im TLDHost-Kundenlogin umstellen (**Kundennummer** nötig, siehe Anleitung).

   **Überbrückung GitHub Pages (29.09.2026):** TLDHost gibt die Nameserver nicht selbst frei
   (Kundenbereich kann nur DNS-Einträge), der Support-Antrag läuft. Damit die verseuchte Plesk-
   Seite sofort verschwindet, ist zusätzlich **GitHub Pages** eingerichtet: `public/CNAME`
   (`daniel-zaiser.de`), `404.html`-Fallback (`tools/github-pages-fallback.cjs`), Pages-Quelle
   `deploy`-Branch. Es fehlt nur noch der A-Record-Tausch im TLDHost-DNS-Editor (Daniel) —
   danach liefert GitHub die Seite, bis Cloudflare übernimmt.

   **Messung 28.09.2026** (Primärquellen: die Statuspage-API der Anbieter,
   `…/api/v2/incidents.json`, Fenster 28.08.–28.09.2026; Limits aus der jeweiligen Doku):

   | Kandidat | ungeplante Störungen | davon schwer | Auslieferung der Seite betroffen? | Freie Stufe |
   |---|---|---|---|---|
   | **Cloudflare Pages** | 50 (11× „none", 39× „minor") | **keine** | nein — kein Eintrag zu Pages oder statischer Auslieferung; die Treffer liegen auf CASB, Replicate, Queues, Tunnel, 1.1.1.1 und einzelnen Regionen | statische Abrufe **unbegrenzt**, 500 Builds/Monat, 100 eigene Domains je Projekt |
   | **GitHub Pages** | 14 | **1 critical** (13.09.), 2 major | **ja** — der Vorfall vom 13.09. nennt ausdrücklich **Pages**, Actions und API | 100 GB/Monat (weich), 10 Builds/Stunde; laut Doku **nicht** als Host für eine geschäftliche Seite gedacht |
   | **Netlify** | 7 | **2 major** | **ja** — „Error accessing Netlify-hosted sites" am 21. und 24.09. | Free rechnet in Credits: 300/Monat, Bandbreite 20 Credits je GB (≈ 15 GB) |
   | **Vercel** | 10 | **3 major** (u. a. „Increased deployment failures", 01.09.) | ja, die Deployments | Hobby ist laut Doku für **„personal, non-commercial use"** — für eine Seite, die Leistungen anbietet, die falsche Stufe |

   **Empfehlung: Cloudflare Pages.** Keine schwere Störung im Fenster und keine, die die
   statische Auslieferung traf; statische Abrufe sind ausdrücklich unbegrenzt und ohne
   Kommerz-Vorbehalt. Der Anime-Kalender läuft bereits auf Cloudflare; ob die Zone
   `daniel-zaiser.de` dort schon liegt, klärt der Umzug — ein Vorteil, **kein** Argument aus
   dieser Seite heraus.

   **Was der Umzug konkret verlangt** (drei Punkte, davon einer heikel):

   1. **Auslieferung:** Die Seite liefert heute **Plesk** aus; der Action-Lauf baut nur
      (`yarn build`) und schiebt `./dist/portfolio/browser` auf den `deploy`-Branch, Plesk holt
      ihn per Webhook. Bei Cloudflare Pages tritt statt des Webhooks ein Schritt ans Ende des
      Workflows (`wrangler pages deploy ./dist/portfolio/browser`); der Build bleibt wie er ist.
   2. **SPA-Routing:** `provideRouter(routes)` heißt Pfad-Routing ohne `#`, und im Repo liegt
      **keine** `_redirects`/`.htaccess` — die Regel, die unbekannte Pfade auf `index.html` legt,
      steckt heute irgendwo in der Plesk-Konfiguration. Beim Wechsel gehört sie als
      `_redirects`-Datei (`/* /index.html 200`) ins Repo, sonst laufen Direktaufrufe von
      Unterseiten und jedes Aktualisieren auf eine 404.
   3. **DNS — der heikle Punkt:** Nameserver sind `ns1/ns2.tldns.net` (der jetzige Hoster), die
      Domain zeigt auf `84.19.26.101` (Plesk). Eine Apex-Domain lässt sich bei fremdem DNS nicht
      auf Cloudflare zeigen, es braucht also den **Zug der Nameserver zu Cloudflare**. Achtung:
      **über dieselbe Domain läuft Mail** (`MX 10 mail.daniel-zaiser.de`) — MX, SPF/DKIM/DMARC
      und Autodiscover müssen dort vollständig neu angelegt werden, sonst stirbt mit dem Umzug
      die Mailadresse.

   **Rangliste (28.09.2026, Quellen unten)** — für daniel-zaiser.de, wo **Website und Mail auf
   derselben IP** liegen (`84.19.26.101`: Apex, `www` und `mail.` zeigen alle dorthin; MX =
   `mail.daniel-zaiser.de`). Ein Wechsel, der nur die A/CNAME-Records für Apex und `www` ändert,
   **lässt die Mail in Ruhe** — das ist das wichtigste Kriterium.

   | # | Anbieter | Apex ohne Nameserver-Umzug | Störungen 28.08.–28.09. (gemessen) | Kosten | Nutzung | Aufwand |
   |---|---|---|---|---|---|---|
   | 1 | **Cloudflare Pages** | ✗ verlangt die Zone bei Cloudflare → Nameserver-Umzug | **keine ungeplante, keine zur Auslieferung** | 0 €, statische Abrufe unbegrenzt | jede | mittel: NS + Mail-Records neu anlegen |
   | 2 | **GitHub Pages** | ✅ A-Records `185.199.108–111.153` | 1 critical (13.09., **Pages**), 2 major | 0 € | Doku: **nicht** für geschäftliche Seiten gedacht | **minimal**: Einstellung + Records + `CNAME`-Datei im Build |
   | 3 | **Netlify** | ✅ A-Record `75.2.60.5` (Fallback der Doku) | 2 major — „Error accessing Netlify-hosted sites" | 0 € (300 Credits/Monat) | jede | klein |
   | 4 | **Vercel** | ✅ A-Record `76.76.21.21` | 3 major (u. a. Deployments) | Hobby nur **nicht kommerziell** | ✗ für eine Seite mit Leistungen | klein |
   | 5 | **Firebase Hosting** (Google) | ? nicht geprüft | Google-Statusseite | 0 € (Spark: 10 GB, 360 MB/Tag) | jede | mittel |

   **Empfehlung:** Platz 1, wenn ein einmaliger Nameserver-Umzug zu Cloudflare in Ordnung ist (dann
   müssen `mail`, MX und SPF/DKIM dort neu stehen — das ist der einzige heikle Schritt, danach hat
   die Seite die beste gemessene Verfügbarkeit und keine Nutzungsbeschränkung). Platz 2, wenn es
   **heute** aufhören soll, stundenlang auszufallen: Der `deploy`-Branch enthält die fertige Seite
   schon, es sind eine Einstellung, vier A-Records, ein `www`-CNAME und eine `CNAME`-Datei in
   `public/` (sonst löscht sie der `force_orphan`-Deploy). Für Platz 4 spricht nur der geringe
   Aufwand — die Hobby-Stufe ist für eine Seite mit Leistungen die falsche.

   **Was Platz 3 und 4 ausschließt:** Ihre Ausfälle treffen genau das, worum es geht — die
   Auslieferung der *gehosteten Seiten* (Netlify, zweimal) und die Deployments (Vercel, dreimal).

   **Noch ein Fund am Rande (korrigiert am 29.09.2026):** Ein SPF-Record **ist** vorhanden
   (`v=spf1 a mx ip4:… ~all`), meine erste TXT-Abfrage war unvollständig. **DMARC und DKIM fehlen**
   dagegen: kein `_dmarc`-TXT, kein `*._domainkey` unter den üblichen Namen. Das betrifft die
   Zustellbarkeit seiner Mails — unabhängig vom Webhost.

   **Der Sammelstand für den Umzug** steht in `docs/umzug-cloudflare-pages.md` (vollständige
   DNS-Aufnahme, Konto-Stand, was gebaut werden muss, Risiken und Rückweg). Die ausführliche
   Anleitung folgt auf Daniels Anweisung.

   Quellen: `cloudflarestatus.com`/`githubstatus.com`/`netlifystatus.com`/`vercel-status.com`
   (`/api/v2/incidents.json`), Cloudflare Pages „Custom domains", GitHub „Managing a custom domain",
   Netlify „Configure external DNS", Vercel „Add a domain" — alle am 28.09.2026 gelesen.

   **Offen:** Daniels Entscheidung; danach der Umzug selbst (zuerst DNS und Mail, dann
   Pages-Projekt, `_redirects`, Deploy-Schritt, Plesk abklemmen).

### 3 · Zu besprechen

— nichts offen.

### 4 · Warten auf dein Feedback

— nichts offen.

## Deploy

Push auf `main` → GitHub Action (`.github/workflows/deploy.yml`) baut mit
`yarn build` und schiebt den Output auf den `deploy`-Branch; von dort holt Plesk
per Webhook. **Kein manuelles Hochladen von Zips mehr** (seit 17.07.2026).

## Link-Vorschau (Open Graph)

Zwei Karten, weil die Seite zwei Publika hat: `public/images/og/daniel-zaiser.jpg`
(Portfolio) und `.../arcade.jpg` (die versteckte Arcade). Beide rendert
`node tools/og-cards.js` aus HTML/CSS — 1200×630, das Maß, das alle Netzwerke schneiden.

Die Tags stehen in `src/index.html` zwischen `<!-- social:start -->` und
`<!-- social:end -->`. **Warum ein Build-Schritt und keine Meta-Service-Zeile:**
Vorschau-Crawler führen kein JavaScript aus, und die App ist ein Client-SPA mit EINER
index.html — route-spezifische Tags müssen als echte Datei existieren. `yarn build`
ruft deshalb `tools/social-preview.js` auf, das `arcade/index.html` mit den
Arcade-Tags (plus `noindex`) daneben legt. Wer /arcade aufruft, bekommt diese Datei,
dieselbe App startet, nur die Vorschau-Tags unterscheiden sich.

**Nach dem nächsten Deploy prüfen:** ob Plesk `/arcade` wirklich auf
`arcade/index.html` auflöst und nicht die SPA-Fallback-Regel vorher greift — sonst
zeigen beide Links dieselbe Vorschau (Funktion der Seite bleibt in beiden Fällen gleich).

## Private-Repo-Stats

Die Live-Stats der Projektseite (anonyme GitHub-API) sehen private Repos nicht — deren
Karten zeigen den Snapshot aus `projects.ts`. `node tools/update-private-stats.js`
liest die echten Zahlen (Commits, Zeitraum) über das lokal angemeldete `gh` und
schreibt den Snapshot neu. Auf Zuruf laufen lassen oder wenn ohnehin am Portfolio
gearbeitet wird. Entscheidung 08.08.2026: `archmage-idle` bleibt privat; die Karte
verlinkt stattdessen den öffentlichen Build-Spiegel `archmage-idle-live`
(`publicRepo`-Feld in `projects.ts`).

## Vorschaubilder

`node tools/capture-previews.js [name…]` schreibt 800×420-webp nach
`public/images/previews/projects/`. Ziele ohne Argument = alle **öffentlichen**;
Einträge mit `local: true` (aktuell `archmage-idle`) brauchen einen laufenden
lokalen Dev-Server des jeweiligen Projekts und werden nur auf Zuruf aufgenommen —
sie richten sich per `prepare`-Snippet erst einen sehenswerten Spielstand ein.

## Archiv

1. **26.07.2026:** `archmage-idle` (v0.5.0) zu `src/app/data/projects.ts` hinzugefügt,
   Sprache im `LANGUAGES`-Snapshot ergänzt, Vorschaubild aufgenommen. Dafür kann
   `tools/capture-previews.js` jetzt `prepare`-Snippets ausführen und lokale Ziele
   überspringen.
2. **26.07.2026:** `archmage-idle` auch in die Arcade (empfohlen, Kategorie Idle) und die
   Hover-Vorschau von der Projekte-Seite auf die Arcade übertragen. Die Panel-Logik liegt
   dafuer jetzt gemeinsam in `src/app/core/hover-preview.ts`, die Optik global in
   `src/styles.scss` — vorher lag beides nur in der Projekte-Komponente.
3. **26.07.2026:** Link-Vorschau nach Vorbild des Westerwald-Repos: OG-/Twitter-Tags in
   `src/index.html`, zwei gerenderte Karten (`tools/og-cards.js`) und ein Build-Schritt,
   der /arcade eine eigene `index.html` mit eigener Vorschau gibt (`tools/social-preview.js`).
4. **08.08.2026:** Abnahme bestanden (Daniel): archmage-idle-Projektkarte, archmage-idle als
   Arcade-Empfehlung, Arcade-Hover-Vorschau.
5. **08.08.2026:** OG-Vorschau technisch verifiziert (Crawler-UA-Check): beide Routen liefern
   ihre eigene Karte, die /arcade-Fallback-Befürchtung war unbegründet (301 → /arcade/ →
   eigene index.html greift VOR FallbackResource). WhatsApp-Sichttest von Daniel
   bestanden (08.08.2026) — Link-Vorschau damit vollständig abgenommen.
6. **08.08.2026:** archmage-idle-Entscheidung umgesetzt — Repo bleibt privat, Karte verlinkt
   den Build-Spiegel (`publicRepo`-Feld), Snapshot-Zahlen kommen ab jetzt aus
   `tools/update-private-stats.js` (Lauf vom 08.08.: 118 → 167 Commits; nebenbei
   ng-abschlussprojekt-reisekarte-Snapshot korrigiert).
