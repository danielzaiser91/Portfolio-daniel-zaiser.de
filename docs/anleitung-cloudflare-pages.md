# Anleitung: daniel-zaiser.de auf Cloudflare Pages

**Ergebnis: vollzogen am 30.09.2026** — die Domain läuft über Cloudflare Pages (Zone aktiv,
Custom Domains aktiv, Zertifikat gültig), die verseuchte Plesk-Seite ist als Website abgelöst.
Was danach noch offen ist, steht in Schritt 7.

**Stand 29.09.2026, überarbeitet.** Zwei Annahmen des ersten Entwurfs waren falsch und sind hier
korrigiert:

1. **Der Registrar ist nicht INWX.** Geprüft über die INWX-API: Das Konto `dns-automation` verwaltet
   **nur** `anime-kalender.de` (`domain.list` → 1 Domain); `nameserver.info daniel-zaiser.de` →
   „Object does not exist". Die Nameserver `ns1/ns2.tldns.net` und die Zone liegen bei **TLDHost**,
   also läuft der Nameserver-Wechsel dort — nicht bei INWX.
2. **Der vorhandene Cloudflare-Token reicht nicht.** `anime-kalender-deploy` hat nur D1/Workers,
   kein Pages, kein Zone/DNS (getestet: `GET /pages/projects` → „Authentication error").

Und der Anlass ist jetzt dringlicher: `server14.tldhost.de` ist **kompromittiert** und liefert
Malware aus (`docs/sicherheitsvorfall-server14.md`). Der Umzug beseitigt genau diesen Pfad.

## Wer macht was

- **Du (Browser/Registrar):** Token anlegen, Nameserver beim Registrar umstellen.
- **Ich (per API/Repo):** Zone anlegen, DNS-Einträge, Pages-Projekt, Deploy, Prüfgriffe — sobald der
  Token die Rechte hat.

Der einzige heikle Moment ist der **Nameserver-Wechsel** (Schritt 4). Alles davor ist wirkungslos
für den Live-Betrieb und damit gefahrlos: Solange die Nameserver bei `tldns.net` stehen, liest
niemand die neue Cloudflare-Zone.

## Abgeschlossen (29./30.09.2026)

Schritte 0–3 sind durch, die Seite liegt fertig auf Cloudflare:

- **Token** `daniel-zaiser-de` mit Pages/Zone/DNS-Edit angelegt (Wert als GitHub-Secret
  `CLOUDFLARE_API_TOKEN` gesetzt, `CLOUDFLARE_ACCOUNT_ID` ebenso).
- **Zone** `daniel-zaiser.de` angelegt. Nameserver: **`alex.ns.cloudflare.com`** und
  **`alexandra.ns.cloudflare.com`**.
- **DNS** aus `tools/cloudflare-dns.mjs`: MX, SPF/TXT und die neun Mail-/Zugangsnamen (DNS only).
- **Pages-Projekt** `daniel-zaiser-de` mit `public/_redirects`, deployt; geprüft:
  `https://daniel-zaiser-de.pages.dev` (Start, `/projects`, `/arcade/` mit eigener Vorschau) —
  **sauber, keine Malware**. Custom Domains `daniel-zaiser.de` und `www.daniel-zaiser.de` sind
  angelegt, ihre CNAMEs stehen; sie werden gültig, sobald die Zone aktiv ist.
- **Action** (`.github/workflows/deploy.yml`) deployt ab jetzt zusätzlich nach Pages.
- **Überbrückung GitHub Pages (29.09.2026, inzwischen entfernt):** Damit die verseuchte Plesk-Seite
  sofort verschwand, zeigte die Domain vorübergehend auf GitHub Pages. Mit dem Nameserver-Wechsel
  (30.09.2026) wurde sie überflüssig und wieder abgebaut — Custom Domain im Repo gelöscht, Pages
  deaktiviert, `public/CNAME` und der `404.html`-Schritt entfernt, Workflow nur noch Cloudflare.
  **Grund für das Entfernen:** die für GitHub gebaute `404.html` verdrängte auf Cloudflare die
  `_redirects`-Regel (SPA-Fallback aus) — siehe `ai_agent_learnings.md`, Kategorie 24.

---

## Schritt 0 — Token mit den richtigen Rechten anlegen

https://dash.cloudflare.com/?to=/:account/api-tokens → **Create Token** → **Create Custom Token**:

| Name | Berechtigung |
|---|---|
| `daniel-zaiser-umzug` | **Account** · Cloudflare Pages · **Edit** |
| | **Zone** · Zone · **Edit** |
| | **Zone** · DNS · **Edit** |

Bei „Zone Resources" **All zones** wählen (die Zone existiert noch nicht, lässt sich also noch nicht
auswählen). Token-Wert kopieren und mir geben — oder, sauberer, als Umgebungsvariable setzen:

```powershell
$env:CLOUDFLARE_API_TOKEN = "<wert>"
node tools/cloudflare-dns.mjs          # nur Vorschau
```

Sobald der Token steht, übernehme ich die Schritte 1–3 und 5.

---

## Schritt 1 — Zone anlegen

Entweder du im Browser:

https://dash.cloudflare.com/?to=/:account/home → **Add a domain** → `daniel-zaiser.de` → Free-Plan
→ **Continue**.

Oder ich per API. Cloudflare zeigt danach **zwei Nameserver** (Form `xxx.ns.cloudflare.com`) —
**notieren, noch nichts umstellen.** Cloudflares automatische Übernahme der bestehenden Records ist
hier **unbrauchbar** (sie kennt die Zone nicht, weil sie bei `tldns.net` liegt) — die Einträge
kommen deshalb aus Schritt 2.

## Schritt 2 — DNS-Einträge anlegen (die Mail hängt daran)

Quelle: Aufnahme vom 29.09.2026 gegen `ns1.tldns.net` (`node tools/dns-aufnahme.cjs`). Die Einträge
legt `node tools/cloudflare-dns.mjs --apply` an; hier stehen sie zum Nachlesen.

| Name | Typ | Wert | Proxy |
|---|---|---|---|
| `@` | MX (Prio 10) | `mail.daniel-zaiser.de` | — |
| `@` | TXT | `v=spf1 a mx ip4:89.107.66.192/26 ip4:89.107.69.0/26 ip4:62.108.36.0/24 ip4:62.108.41.0/24 ip4:62.108.44.0/24 ip4:84.19.26.0/24 ip4:84.19.24.0/24 ~all` | — |
| `mail`, `smtp`, `imap`, `pop`, `pop3`, `webmail`, `autodiscover`, `autoconfig`, `ftp` | A | `84.19.26.101` | **DNS only (graue Wolke)** |

**Drei Dinge bewusst anders als „früher alles kopieren":**

- **`@` und `www` stehen hier nicht.** Sie bekommen nach dem Umzug eine **Custom Domain von Pages**
  (CNAME, von Cloudflare verwaltet) — sonst zeigte die Website weiter auf den kompromittierten
  Plesk-Server.
- **Der Wildcard `*.daniel-zaiser.de` wird nicht übernommen.** Heute deckt er alle Subdomains ab
  (jeder erfundene Name zeigt auf `84.19.26.101`). Nach dem Umzug sollen nur die wirklich
  gebrauchten Namen dorthin zeigen, nicht jeder beliebige.
- **Mail-Regeln nie „proxied".** Graue Wolke ist Pflicht, sonst bricht der Mailverkehr.

**Nicht vorhanden und deshalb nicht nötig:** AAAA, CAA, SRV, DMARC, DKIM. (DMARC/DKIM fehlen heute
ohnehin — eigenes Thema.)

## Schritt 3 — Pages-Projekt, `_redirects`, erster Deploy

1. `public/_redirects` liegt mit `/* /index.html 200` im Repo (angelegt) — der SPA-Fallback, den auf
   Plesk die `.htaccess` macht. Die `.htaccess` darf bleiben, Pages ignoriert sie.
2. Pages-Projekt anlegen (ich per API/`wrangler`, oder du im Browser:
   https://dash.cloudflare.com/?to=/:account/workers-and-pages → **Create** → **Pages**), Name
   z. B. `daniel-zaiser-de`.
3. Auslieferung: Am Ende von `.github/workflows/deploy.yml` kommt ein Schritt
   `npx wrangler pages deploy dist/portfolio/browser --project-name=daniel-zaiser-de` mit
   `CLOUDFLARE_API_TOKEN` und `CLOUDFLARE_ACCOUNT_ID=567f5e28368c5bbcfeffad3e674b02ab`. Ich baue
   das ein, sobald der Token freigeschaltet ist; der bisherige `deploy`-Branch-Push kann bis dahin
   stehen bleiben.
4. Deploy abwarten und die **Vorschau-Adresse** prüfen: `https://daniel-zaiser-de.pages.dev`
   (Startseite, HTTPS, ein tiefer Link wie `/projects`, `/arcade`).

## Schritt 4 — Der Schnitt: Nameserver umstellen (der heikle Schritt)

**Registrar/Zone: TLDHost** (Inklusivdomain, registriert seit 02.02.2021). Die Nameserver stehen bei
`tldns.net`. **Der TLDHost-Kundenbereich gibt die Delegation nicht frei** — geprüft am 29.09.2026:

- „Meine Domains" zeigt nur die Zeilen `daniel-zaiser.de`, DNS `[Konfiguration]`, Art
  *Inklusivdomain*. **Kein Nameserver-Feld.**
- „DNS Service" im Menü ist ein separates Produkt und für das Konto **nicht aktiviert** (leere
  Liste) — das ist die richtige Erklärung, keine Rechtefrage.
- Der `[Konfiguration]`-Knopf öffnet nur den Einträge-Editor (A/AAAA/CNAME/MX/SRV/TXT). Die
  `NS`-Zeilen darin sind Zoneneinträge, **nicht** die Delegation — sie zu ändern hat keine Wirkung.

**Also ein Support-Auftrag:** an `info@tldhost.de` (oder als Antwort auf die Vorfallsmail):

> Bitte stellen Sie die Nameserver von daniel-zaiser.de von ns1/ns2.tldns.net auf
> alex.ns.cloudflare.com und alexandra.ns.cloudflare.com um. Die neue Zone ist vorbereitet.

**Falls TLDHost keine externen Nameserver zulässt:** Plan B ist GitHub Pages über die A-Records im
Kundenbereich (kein Nameserver-Wechsel nötig) — genau die Überbrückung, die bereits läuft.

Danach bei Cloudflare unter **DNS** kontrollieren, dass die Einträge aus Schritt 2 noch stehen, und
in **Pages → Custom domains** `daniel-zaiser.de` und `www.daniel-zaiser.de` hinzufügen. Eine der
beiden als Hauptadresse festlegen (die andere leitet um).

**Dauer: Minuten** (SOA-TTL war 600 s), nicht Stunden.

## Schritt 5 — Wenn Cloudflare sitzt: was zu prüfen und zu tun ist

**A · Kontrolle, sofort nach dem Schnitt (5 Minuten)**

1. **Zone aktiv?** Cloudflare → Übersicht der Zone zeigt **Active**;
   `Resolve-DnsName daniel-zaiser.de -Type NS -Server 1.1.1.1` liefert `alex`/`alexandra`.
2. **Website:** Apex, `www`, ein tiefer Link und `/arcade/` (eigene Vorschau).
3. **Kein Malware-String** (der Anlass):
   `curl -sS https://daniel-zaiser.de/index.html | Select-String 'ushort|urshort|location.replace'`
4. **Zertifikat gültig** (kein `ERR_CERT_COMMON_NAME_INVALID`), `http` leitet auf `https`.
5. **Custom Domains in Pages** stehen auf **Active** (nicht „pending").
6. **Zone gegenprüfen:** die Records der Cloudflare-Zone mit der TLDHost-Zone vergleichen —
   besonders `send.send` (MX + SPF) und `resend._domainkey.send` (DKIM). Fehlt einer, bricht der
   Resend-Versand. Diese drei fehlten in der ersten Aufnahme, weil `tools/dns-aufnahme.cjs` nur
   eine feste Namensliste kennt — deshalb im Hoster-Editor **alles** anzeigen lassen.

**B · Mail — das Wichtigste**

1. Eine Mail **an** `daniel@daniel-zaiser.de` schicken und den Eingang abwarten.
2. Eine Mail **von** dort senden; im Kopf einer Testmail an ein Gmail-Konto steht `spf=pass`.
3. `Resolve-DnsName mail.daniel-zaiser.de -Server 1.1.1.1` → weiter `84.19.26.101`; MX ebenso.
4. Ein Testversand über die Resend-Sendedomain `send.daniel-zaiser.de` (falls genutzt).

Kommt eine Mailrichtung nicht an: sofort zurück (Schritt 6).

**C · Aufräumen (erst, wenn die Website nachweislich stabil läuft)**

- **GitHub-Pages-Überbrückung abschalten:** im Repo die Custom Domain entfernen
  (`gh api -X PUT repos/…/pages` mit `cname:null` oder in den Settings) — sonst hält GitHub die
  Domain weiter belegt und kann später „Domain already taken" melden. Danach liefert nur Cloudflare.
- **Plesk-Webhook / `deploy`-Branch** können weg, müssen aber nicht sofort.
- **Hoster:** die fremden PHP-Dateien im `httpdocs` durch den Hoster entfernen lassen (die Seite
  wird nicht mehr gebraucht, die **Mail** schon). **Plesk-/FTP-Passwörter erneuern.**
- Optional und unabhängig: **DMARC und DKIM** einrichten (fehlen heute).

**D · Bekannte Fußangeln**

- **Subdomains, die früher nur über `*` liefen, lösen jetzt nicht mehr auf** — das ist Absicht
  (kein erfundener Name zeigt mehr auf den alten Server). Vorher prüfen, ob etwas Gebrauchtes
  dabei war (Mail-Namen sind einzeln gesetzt).
- **Cache/TTL:** Alte A-Antworten können bis zu einer Stunde nachhängen.
- **Mail-Records nie proxied** (graue Wolke), sonst bricht der Mailverkehr.

## Schritt 6 — Rückweg

Die alte Zone bei `tldns.net` bleibt unangetastet. Nameserver beim Registrar zurück auf
`ns1.tldns.net` und `ns2.tldns.net` — nach wenigen Minuten ist alles wie vorher. **Nichts löschen**,
solange die Mail nicht nachweislich läuft.

## Schritt 7 — Danach / offene Reste

**Erledigt am 30.09.2026:** Zone aktiv, Custom Domains aktiv, Zertifikat gültig; Startseite, `www`,
tiefe Links (`/projects`, `/impressum`, `/for-recruiters`, unbekannte Pfade) und `/arcade/` liefern
200; kein Malware-String; Mail-DNS unverändert (`MX → mail.daniel-zaiser.de`,
`mail → 84.19.26.101`, Port 993 offen); Resend-Sende-Einträge (`send.send`,
`resend._domainkey.send`) vorhanden. GitHub-Überbrückung entfernt, Workflow nur noch Cloudflare.

**Noch offen:**

- **Hoster:** die fremden PHP-Dateien im `httpdocs` durch TLDHost entfernen lassen; danach
  **Plesk-/FTP-Passwörter erneuern**. Plesk bleibt nur für die Mail erreichbar.
- **Mail-Test (Daniel):** eine Mail hin, eine zurück, `spf=pass` im Kopf prüfen — das kann nur er.
- Optional: **DMARC und DKIM** einrichten (fehlen heute).
- Der `deploy`-Branch auf GitHub ist jetzt ungenutzt und kann gelöscht werden.
