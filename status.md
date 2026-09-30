# Status — Portfolio (daniel-zaiser.de)

Laufender Arbeitsstand dieses Repos. Angelegt am 26.07.2026.

## Task Queue

**Regeln:** Jeder neue Wunsch landet SOFORT beim Nennen hier, Erledigtes wandert
SOFORT ins Archiv. Sortierung: 1 · In Arbeit → 2 · Queue → 3 · Zu besprechen →
4 · Warten auf dein Feedback.

### 1 · In Arbeit

— nichts offen.

### 2 · Queue

1. **Sicherheitsvorfall `server14.tldhost.de`** (gefunden 29.09.2026): Der Server war
   kompromittiert und lieferte über `daniel-zaiser.de` Malware aus — eine gefälschte
   „WordPress-Wartung"-Seite (HTTP 503) und in HTML/JS eingeschleuste Skripte, die Mobilgeräte
   auf `urshort.com`/`ushort.company` umleiteten. Ursache aus der Plesk-Dateiliste belegt:
   fremde PHP-Backdoors in `/httpdocs` (u. a. `index.php` = die Wartungsseite). Auch
   `displator.com` und `grossenmarpe.de` auf derselben IP waren befallen.
   Befunde und Prüfgriffe: `docs/sicherheitsvorfall-server14.md`.
   **Erledigt:** Diagnose + Dokumentation (29.09.2026), Meldung an TLDHost (29.09.2026),
   **Website abgelöst** — seit 30.09.2026 liefert Cloudflare die Seite, nicht mehr Plesk.
   **Offen:** TLDHost bearbeitet `server14` laut eigener Aussage **diese Woche** (Sicherheits-
   lücken, alle Kunden einzeln) und soll dabei die fremden PHP-Dateien im `httpdocs` entfernen
   sowie die zwei fremden Postfächer (`info-hetj@`, `info-lqfp@`) prüfen/entfernen. **Kein
   WordPress** in diesem Account (statische Seite) — der Hinweis steht in der Mail.

2. **Komplett weg von TLDHost: Mail umziehen + Domain zu INWX transferieren** (Daniel,
   30.09.2026: „mail umziehen, kein tldhost mehr"). Ziel: Domain behalten, Mail bei einem
   sicheren/günstigen Anbieter.
   **Erledigt:** Newsletter geprüft — der Anime-Kalender nutzt `daniel-zaiser.de` **nicht**;
   Anbieter-Wahl **Purelymail** (10 $/Jahr, API); per API eingerichtet (30.09.2026):
   Domain `daniel-zaiser.de` angelegt (SPF/DKIM/DMARC/MX alle „pass"), Postfach
   `daniel-zaiser@daniel-zaiser.de`, die 7 Aliase als Routing-Regeln; DNS in Cloudflare gesetzt
   und **MX auf `mailserver.purelymail.com` (Prio 50) umgestellt**. Ende-zu-Ende getestet:
   Versand 250, Empfang über Alias `info@` mit `Delivered-To: daniel-zaiser@…`.
   **Offen:** Domain-Transfer zu INWX (**Auth-Code**) und danach TLDHost kündigen.
   Alte Mails sind migriert (18 Nachrichten), altes Postfach-Passwort dazu neu gesetzt.
   Fahrplan: `docs/mail-und-domain-umzug.md`.

### 3 · Zu besprechen

— nichts offen.

### 4 · Warten auf dein Feedback

— nichts offen.

## Deploy

Push auf `main` → GitHub Action (`.github/workflows/deploy.yml`) baut mit `yarn build` und
deployt mit `wrangler pages deploy` nach **Cloudflare Pages** (Projekt `daniel-zaiser-de`,
`CLOUDFLARE_API_TOKEN`/`CLOUDFLARE_ACCOUNT_ID` als Repo-Secrets). Der frühere Plesk-Weg
(Push auf den `deploy`-Branch, Plesk holt per Webhook) ist am 30.09.2026 entfallen; der
`deploy`-Branch ist ungenutzt und kann gelöscht werden.

## Hosting (daniel-zaiser.de)

- **Auslieferung:** Cloudflare Pages, Custom Domains `daniel-zaiser.de` + `www` (beide aktiv).
  SPA-Fallback über `public/_redirects` (`/* /index.html 200`).
- **DNS:** Zone bei Cloudflare, Nameserver `alex.ns.cloudflare.com` / `alexandra.ns.cloudflare.com`.
  Mail-Einträge (MX, SPF, `mail`/`smtp`/`imap`/`pop`/`pop3`/`webmail`/`autodiscover`/`autoconfig`/`ftp`,
  alle **DNS only**) und die Resend-Sende-Einträge (`send.send`, `resend._domainkey.send`) liegen dort.
  `node tools/cloudflare-dns.mjs --apply` legt sie idempotent an.
- **Mail bleibt bei Plesk:** `mail.daniel-zaiser.de → 84.19.26.101`.
- Anleitung/Chronik: `docs/anleitung-cloudflare-pages.md`. Umzugs-Sammelstand: `docs/umzug-cloudflare-pages.md`.
- **Wichtig:** Kein `404.html` in den Build legen — es verdrängt auf Cloudflare Pages die
  `_redirects`-Regel und schaltet den SPA-Fallback ab (real passiert am 30.09.2026).

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

Auf Cloudflare Pages geprüft (30.09.2026): `/arcade/` liefert `arcade/index.html` mit eigener
Vorschau VOR dem SPA-Fallback — die frühere Plesk-Befürchtung ist damit auch hier erledigt.

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
7. **30.09.2026:** **Umzug von daniel-zaiser.de auf Cloudflare Pages abgeschlossen.** Grund
   war der Ausfall und dann die Kompromittierung von `server14.tldhost.de` (siehe Queue).
   Zone + DNS (Mail, SPF, Resend) vorbereitet, Pages-Projekt `daniel-zaiser-de` mit
   `_redirects`, Action auf `wrangler pages deploy` umgestellt. TLDHost stellte die
   Nameserver nicht selbst frei (Kundenbereich kann nur DNS-Einträge) — ein
   **Support-Auftrag** war nötig. Zur Überbrückung lief die Seite dazwischen kurz über
   GitHub Pages (inkl. Zertifikats-Geburtshilfe durch erneutes Setzen der Custom Domain);
   mit dem Nameserver-Wechsel am 30.09. wurde sie wieder abgebaut. Details:
   `docs/anleitung-cloudflare-pages.md`.
