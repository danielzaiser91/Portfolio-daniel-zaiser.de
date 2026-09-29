# Umzug von daniel-zaiser.de auf Cloudflare Pages — Sammelstand

**Angelegt am 28./29.09.2026 auf Daniels Wunsch** („cloudflare pages, sammle alle infos um mich
anleiten zu können, tatsächliche anleitung erst morgen, auf anweisung"). Hier steht **alles
Gemessene**, damit die Anleitung selbst kurz bleibt. Die Schritte sind bewusst nur skizziert.

## Warum überhaupt

Plesk (der jetzige Hoster) fiel am 27. und 28.09.2026 mehrfach stundenlang aus. **Am 29.09.2026
kam hinzu: `server14.tldhost.de` ist kompromittiert und liefert fremden Code aus** (gefälschte
Wartungsseite + Malware-Umleitung für Mobilgeräte; siehe `sicherheitsvorfall-server14.md`). Der
Umzug beseitigt genau diesen Auslieferungspfad. Im Messfenster
28.08.–28.09.2026 hatte **Cloudflare keine einzige ungeplante Störung** und keine, die die
statische Auslieferung traf; GitHub Pages hatte einen kritischen (13.09., Pages betroffen) und zwei
größere, Netlify zwei größere („hosted sites nicht erreichbar"), Vercel drei.

## Ausgangslage (gemessen 29.09.2026, zuständiger Server `ns1.tldns.net`)

**Alle Web- und Mailnamen zeigen auf dieselbe IP** — deshalb ist wichtig, was beim Umzug liegen
bleibt: Nur die Einträge für Apex und `www` ändern sich, **die Mail bleibt auf 84.19.26.101**.

| Name | Typ | Wert |
|---|---|---|
| `daniel-zaiser.de` | A | `84.19.26.101` (Plesk) |
| `daniel-zaiser.de` | MX (10) | `mail.daniel-zaiser.de` |
| `daniel-zaiser.de` | TXT (SPF) | `v=spf1 a mx ip4:89.107.66.192/26 ip4:89.107.69.0/26 ip4:62.108.36.0/24 ip4:62.108.41.0/24 ip4:62.108.44.0/24 ip4:84.19.26.0/24 ip4:84.19.24.0/24 ~all` |
| `daniel-zaiser.de` | NS | `ns1.tldns.net`, `ns2.tldns.net` (62.108.36.5, 62.108.41.6) |
| `www` | A | `84.19.26.101` |
| `mail`, `smtp`, `imap`, `pop`, `pop3`, `webmail`, `autodiscover`, `autoconfig`, `ftp` | A | je `84.19.26.101` |

**Nicht vorhanden:** AAAA, CAA, SRV-Einträge, **DMARC** (`_dmarc`) und **kein DKIM** (geprüft:
`default.`, `mail.`, `dkim.`, `selector1.`, `selector2.`, `google._domainkey`) — SPF ist da, DMARC
und DKIM nicht. Das ist ein Zustellbarkeits-Thema, unabhängig vom Umzug; ein Test an eine
Gmail-Adresse zeigt im Kopf `Authentication-Results`, was heute gilt (vorher/nachher vergleichen).

**SOA-TTL:** 600 s (10 Minuten) — DNS-Änderungen greifen also schnell.

**Registrar:** DENIC-RDAP gibt den Registrar aus Datenschutzgründen nicht heraus. In der
Portfolio-`.env` stehen `INWX_USER`/`INWX_PASS` — dort (oder beim Hoster) liegen die Nameserver
zur Umstellung. **Zu klären, bevor die Nameserver geändert werden.**

## Cloudflare-Konto (gemessen über die API, nur lesend)

- **Konto-Kennung:** `567f5e28368c5bbcfeffad3e674b02ab`
- **Zonen im Konto: 0** — `daniel-zaiser.de` ist noch **nicht** als Zone angelegt (auch
  `anime-kalender.de` nicht; der Kalender läuft auf GitHub Pages und `workers.dev`).
- **Pages-Projekte:** nicht abfragbar — der vorhandene Token `anime-kalender-deploy` hat **kein**
  `Cloudflare Pages`-Recht (HTTP 403). Das ist der einzige fehlende Token-Baustein; ergänzen lässt
  er sich per *Edit* am Token, **der Wert bleibt dabei gleich** (er liegt als GitHub-Secret
  `CLOUDFLARE_ANALYTICS_TOKEN` und in `ai helper files/my_secrets.md`).

## Was gebaut werden muss

1. **Zone anlegen** (Free-Plan) → Cloudflare gibt zwei Nameserver aus, die beim Registrar
   eingetragen werden.
2. **Records neu anlegen** — vollständig aus der Tabelle oben, insbesondere MX, SPF und die neun
   Mail-/Zugangsnamen **vor** dem Nameserver-Wechsel.
3. **Pages-Projekt** anlegen und die Seite hochladen. Zwei Wege:
   - **Direkt-Upload aus der vorhandenen Action** (empfohlen, weil Build und Prüfungen dort schon
     laufen): am Ende des Workflows `wrangler pages deploy dist/portfolio/browser --project-name=…`
     statt des `deploy`-Branch-Push. Braucht **Account → Cloudflare Pages → Edit** am Token und
     `CLOUDFLARE_ACCOUNT_ID`.
   - Git-Anbindung (Cloudflare baut selbst) — verlagert den Build, zwei Stellen mit Abhängigkeiten.
4. **SPA-Fallback:** Heute steht er in `public/.htaccess` (`FallbackResource /index.html`). Auf
   Cloudflare Pages gehört dafür eine **`_redirects`**-Datei nach `public/`:
   `/* /index.html 200` (die `.htaccess` wird dort ignoriert, sie kann bleiben).
5. **Nameserver beim Registrar umstellen** — der eigentliche Schnitt.

## Risiken und Rückweg

- **Der einzige kritische Schritt ist der Nameserver-Wechsel.** Vorher steht die vollständige
  Record-Liste bei Cloudflare; danach prüfen: Website (Apex, `www`, HTTPS, ein tiefer Link wie
  `/projects`), Mail (senden **und** empfangen, SPF-Kopf in einer Testmail).
- **Rückweg:** Die alte Zone beim Hoster bleibt unangetastet. Nameserver zurück auf
  `ns1.tldns.net`/`ns2.tldns.net` stellt den vorherigen Zustand her (dauert wegen TTL 600 s
  Minuten, nicht Stunden).
- **Plesk bleibt** für die Mail (und für `ftp`/`webmail`) erreichbar; es wird nur nicht mehr die
  Website ausliefern. Der `deploy`-Branch und der Webhook können später weg, müssen aber nicht
  sofort.

## Prüfungen nach dem Umzug

- `curl -I https://daniel-zaiser.de` und `.../projects` → 200 aus dem Cloudflare-Cache.
- `curl -I https://www.daniel-zaiser.de` → leitet auf die Wunschadresse um (eine der beiden als
  Hauptadresse festlegen).
- HTTPS-Zertifikat vorhanden (Cloudflare stellt es automatisch aus).
- Testmail an eine Gmail-Adresse: empfangen **und** gesendet; im Kopf `spf=pass` wie vorher.
- Ein Klick durch das Portfolio (Startseite, Projekte, Impressum, Datenschutz).

## Offen / zu entscheiden

- Registrar bestätigen (INWX-Zugang in der `.env`).
- Mail: erst einmal bei Plesk lassen (so ist der Umzug klein) oder später mitziehen?
- Hauptadresse: `daniel-zaiser.de` oder `www.daniel-zaiser.de`?
- Optional und unabhängig: DMARC und DKIM einrichten (heute fehlen beide).
