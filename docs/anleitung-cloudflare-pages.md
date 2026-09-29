# Anleitung: daniel-zaiser.de auf Cloudflare Pages

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

## Bereits erledigt (29.09.2026)

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

**Es fehlt nur der Schnitt in Schritt 4.**

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

**Registrar/Zone: TLDHost.** Die Nameserver stehen bei `tldns.net`. Umstellen:

1. **TLDHost-Kundenlogin** (nicht Plesk): https://www.tldhost.de → oben rechts **Kundenlogin** →
   **Meine Domains** → `daniel-zaiser.de` → Nameserver. Dafür wird die **Kundennummer** gebraucht
   (nicht `web2832`; das ist nur der Plesk-Login).
2. Dort die zwei Cloudflare-Namen eintragen — **`alex.ns.cloudflare.com`** und
   **`alexandra.ns.cloudflare.com`** — und die alten (`ns1/ns2.tldns.net`) ersetzen.
3. Falls der Eintrag dort nicht möglich ist: Den Registrar über die DENIC-Webwhois bestätigen
   (https://www.denic.de/services/whois-service/) — er steht dort im Feld *Registrar* — und dort
   ändern. Der TLDHost-Support kann das ebenfalls einleiten.

Danach bei Cloudflare unter **DNS** kontrollieren, dass die Einträge aus Schritt 2 noch stehen, und
in **Pages → Custom domains** `daniel-zaiser.de` und `www.daniel-zaiser.de` hinzufügen. Eine der
beiden als Hauptadresse festlegen (die andere leitet um).

**Dauer: Minuten** (SOA-TTL war 600 s), nicht Stunden.

## Schritt 5 — Prüfen

Website:

```powershell
curl.exe -sSI https://daniel-zaiser.de/          # 200, Server: cloudflare
curl.exe -sSI https://daniel-zaiser.de/projects   # 200 (SPA-Fallback greift)
curl.exe -sSI https://www.daniel-zaiser.de/       # 200 oder Weiterleitung auf die Hauptadresse
```

**Kein Malware-Test vergessen** (der Anlass des Umzugs):

```powershell
curl.exe -sS https://daniel-zaiser.de/index.html | Select-String 'ushort|urshort|location.replace'
```

Mail — das Wichtigste:

1. Eine Mail **an** `daniel@daniel-zaiser.de` schicken und den Eingang abwarten.
2. Eine Mail **von** dort senden; im Kopf einer Testmail an ein Gmail-Konto steht `spf=pass`.
3. `nslookup mail.daniel-zaiser.de 1.1.1.1` → muss weiter `84.19.26.101` liefern.

Faustregel: Kommt eine der beiden Mailrichtungen nicht an, sofort zurück (Schritt 6).

## Schritt 6 — Rückweg

Die alte Zone bei `tldns.net` bleibt unangetastet. Nameserver beim Registrar zurück auf
`ns1.tldns.net` und `ns2.tldns.net` — nach wenigen Minuten ist alles wie vorher. **Nichts löschen**,
solange die Mail nicht nachweislich läuft.

## Schritt 7 — Danach

- Plesk liefert die Website nicht mehr aus; **für die Mail bleibt es erreichbar** (`mail.`, `smtp.`,
  `webmail.` … zeigen weiter dorthin).
- Der `deploy`-Branch und der Plesk-Webhook können später weg.
- **Aus Sicherheitsgründen:** Plesk-/FTP-Zugangsdaten erneuern, auch wenn die Website weg ist — die
  Mail liegt weiter auf dem kompromittierten Server.
- Optional und unabhängig: DMARC und DKIM einrichten (fehlen heute).
