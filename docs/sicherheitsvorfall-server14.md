# Sicherheitsvorfall: `server14.tldhost.de` liefert fremden Code aus

**Gemessen am 29.09.2026, ca. 19:02–19:05 UTC** (Primärquellen: direkte HTTP-Abrufe der
Live-Domain, DNS-Abfragen, GitHub-API). Anlass: „prüf warum daniel-zaiser.de nicht korrekt
funktioniert".

## Befund in einem Satz

Nicht unser Code ist kaputt — die Live-Seite wird von einem **kompromittierten Webserver**
ausgeliefert: Apache bei `server14.tldhost.de` hängt jeder HTML- und JavaScript-Antwort ein
fremdes `<script>` an, das Mobilgeräte auf eine Malware-Kurz-URL umleitet, und beantwortet
die Startseite zusätzlich mit einer gefälschten „WordPress-Wartung"-Seite (HTTP 503).

## Was ausgeliefert wird

| Abruf | Antwort | Inhalt |
|---|---|---|
| `https://daniel-zaiser.de/` | **503** | Gefälschte Seite „WordPress — Briefly unavailable for scheduled maintenance" plus `<script>…location.replace("https://ushort.company/cOAhivAwq0r4")` |
| `https://www.daniel-zaiser.de/` | **503** | identisch |
| `https://daniel-zaiser.de/index.html` | 200 | unsere echte Seite, **aber** oben ein injiziertes `<script>…location.replace("https://urshort.com/qmSjWVKwI0r7")` |
| `…/main-V36NUDVE.js` | 200 | Inhalt beginnt mit demselben Injekt-Skript (andere URL: `ushort.company/cOAhivAwq0r4`) |
| `…/chunk-335HBDYV.js` | 200 | ebenfalls injiziert |
| `…/styles-BASHOT7K.css`, `…/favicon.ico`, Bilder | 200 | **sauber** (Injektion trifft HTML + JS) |
| `…/arcade`, `/robots.txt`, `/sitemap.xml` | 503 | Wartungsseite |

Die Umleitung läuft nur auf Geräten mit grobem Zeiger / Mobile-User-Agent — Desktop-Besucher
sehen die (verseuchte) Seite. Die Ziele `ushort.company` und `urshort.com` sind bekannte
Malware-Kurz-URL-Netze (u. a. `ushort.observer`, `u-short.net`) hinter DDoS-Guard.

## Gegenprobe: es ist nicht unser Build

- `deploy`-Branch (aus dem Plesk zieht) enthält **sauberes** `index.html`; die
  GitHub-Action-Läufe sind alle grün (letzter: 29.09.2026, 06:01 UTC).
- Live-`/index.html` ist ~240 Zeichen länger als die Datei im Branch — exakt das Injekt-Skript.
- Kein Treffer für `ushort`/`urshort`/„maintenance" irgendwo im Repo.

## Umfang: mehrere Konten auf demselben Server betroffen

Gegenprobe über die mit `84.19.26.101` (`server14.tldhost.de`, PTR) assoziierten Domains:

| Domain | Startseite | Injektion |
|---|---|---|
| `daniel-zaiser.de` | 503 (gefälschte Wartung) | **ja** |
| `displator.com` | 503 (gefälschte Wartung) | **ja** |
| `grossenmarpe.de` | 200 | **ja** (`urshort.com/KxjqICdrh0r6`) |
| `bugspriet-blog.de`, `dominikpoppe.de`, `ericludwig.de`, `care-partner.de`, `holzbau-schmidtke.de` | 200 | nein (Stand der Messung) |
| `dominikleehr.de` (403), `aktieneinkommen.de` (401) | gesperrt | n. a. |

Damit ist es **kein** Einzelfall in unserem Webspace, sondern ein **server- bzw.
webspace-übergreifendes Problem** beim Hoster. `tldhost.de` selbst antwortet normal; die
Störung ist auf `server14`/den betroffenen Konten.

## Folgen, die Daniel betreffen

- **Rechtlich/reputativ:** Seit dem Befall werden Besucher — auf Mobilgeräten — an Malware
  umgeleitet. Das kann Besuchern schaden und auf die Domain zurückfallen. Eine kurzfristige
  Abschaltung ist einer weiteren Auslieferung vorzuziehen.
- **Kein Passwort-/Upload-Problem am Code:** Bauen und Deployen funktionieren; es ist die
  Auslieferung durch den Server.

## Sofortmaßnahmen (Empfehlung)

1. **Hoster informieren** (TLDHost) und den Vorfall als **Server-Kompromittierung** melden,
   mit den Abrufen oben — nicht als „meine Seite ist kaputt". Ein sauberer Server ist erst
   wieder vertrauenswürdig, wenn der Hoster ihn geprüft hat.
2. **Zugangsdaten erneuern**, die über den Server laufen: Plesk, FTP/SFTP, ggf. SSH; danach
   Registrars-/INWX-Zugang prüfen.
3. **Auslieferung dem Server entziehen** — der Umzug auf Cloudflare Pages (siehe
   `umzug-cloudflare-pages.md`) beseitigt genau diesen Pfad: Die Dateien kommen dann aus dem
   Cloudflare-Netz, nicht mehr von `server14`. Die Mail kann vorerst auf Plesk bleiben.
4. Bis dahin: Live-Seite abklemmen (Hoster bitten oder Webspace/Website deaktivieren), damit
   keine weiteren Besucher umgeleitet werden.

## Wiederholung / Prüfgriff

    curl -sS https://daniel-zaiser.de/index.html | Select-String ushort,urshort,location.replace
    curl -sSI https://daniel-zaiser.de/            # erwartet 200, nicht 503
    curl -sS https://daniel-zaiser.de/main-<hash>.js | Select-Object -First 1

Sauber ist es erst, wenn weder `/` eine Wartungsseite noch eine HTML/JS-Antwort das
`location.replace`-Skript enthält.
