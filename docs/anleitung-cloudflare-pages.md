# Anleitung: daniel-zaiser.de auf Cloudflare Pages

**Stand 29.09.2026.** Die Zahlen und Adressen stammen aus `docs/umzug-cloudflare-pages.md` (Messung
vom 28./29.09.). Ausführen musst du die Schritte selbst — ich kann sie begleiten, aber nicht für dich
klicken. **Ein Schritt ist heikel: der Nameserver-Wechsel.** Alles davor ist vorbereitend und
gefahrlos; danach wird geprüft.

## Vorher: ein Recht am Token

Der vorhandene Token `anime-kalender-deploy` (in `ai helper files/my_secrets.md`) braucht
**Account · Cloudflare Pages · Edit**:

https://dash.cloudflare.com/?to=/:account/api-tokens → beim Token **…** → **Edit** → „Add more" →
`Account` · `Cloudflare Pages` · `Edit` → **Continue to summary** → **Save**.

Der Token-**Wert bleibt gleich**; nur *Roll* erzeugt einen neuen.

## 1 · Zone anlegen (gefahrlos)

https://dash.cloudflare.com/?to=/:account/home → **Add a domain** → `daniel-zaiser.de` → Free-Plan →
**Continue**.

Cloudflare zeigt danach **zwei Nameserver** (etwas wie `xxx.ns.cloudflare.com`) — **notieren**.
**Noch nichts umstellen.**

Cloudflare liest die bestehenden Records oft selbst ein — **nachsehen**, ob alle da sind (Tabelle in
Schritt 2), und fehlende von Hand anlegen.

## 2 · Records vollständig anlegen (gefahrlos)

Die Werte stammen aus der Aufnahme vom 29.09.2026 (`ns1.tldns.net`). **Die Mail braucht alle
Zeilen** — fehlt eine, kommt nach dem Wechsel keine Post mehr an.

| Name | Typ | Wert | Zweck |
|---|---|---|---|
| `daniel-zaiser.de` | A | `84.19.26.101` | heute die Website — **später** auf Pages umstellen (Schritt 4) |
| `www` | A | `84.19.26.101` | dasselbe für `www` |
| `mail` | A | `84.19.26.101` | Mailserver (bleibt bei Plesk) |
| `smtp`,`imap`,`pop`,`pop3`,`webmail`,`autodiscover`,`autoconfig`,`ftp` | A | je `84.19.26.101` | Zugangs- und Einrichtungsnamen |
| `daniel-zaiser.de` | MX (Priorität 10) | `mail.daniel-zaiser.de` | Posteingang |
| `daniel-zaiser.de` | TXT | `v=spf1 a mx ip4:89.107.66.192/26 ip4:89.107.69.0/26 ip4:62.108.36.0/24 ip4:62.108.41.0/24 ip4:62.108.44.0/24 ip4:84.19.26.0/24 ip4:84.19.24.0/24 ~all` | Absenderfreigabe |

**Nicht vorhanden und deshalb nicht nötig:** AAAA, CAA, SRV, DMARC, DKIM. (DMARC/DKIM fehlen heute
ohnehin — ein eigenes Thema, unabhängig vom Umzug.)

## 3 · Pages-Projekt und Auslieferung (gefahrlos)

1. https://dash.cloudflare.com/?to=/:account/workers-and-pages → **Create** → **Pages** →
   **Upload assets** → Projektname z. B. `daniel-zaiser-de`.
2. `_redirects` ins Repo: In `C:\code\ai\my website\public\` eine Datei **`_redirects`** mit einer
   Zeile anlegen — `/* /index.html 200`. Sie ersetzt den SPA-Fallback, der heute in
   `public/.htaccess` steht (die `.htaccess` kann bleiben, Cloudflare liest sie nicht).
3. In `.github/workflows/deploy.yml` den letzten Schritt ersetzen: statt des Branch-Pushs
   (`peaceiris/actions-gh-pages`) ein Upload aus derselben Action —
   `npx wrangler pages deploy dist/portfolio/browser --project-name=daniel-zaiser-de`
   mit `CLOUDFLARE_API_TOKEN` und `CLOUDFLARE_ACCOUNT_ID=567f5e28368c5bbcfeffad3e674b02ab`
   als Umgebung. Den Branch-Push kann man vorerst stehen lassen (doppelt schadet nicht).
4. Erstes Deploy abwarten und die Vorschau-Adresse prüfen
   (`https://daniel-zaiser-de.pages.dev`) — **Website, HTTPS, ein tiefer Link wie `/projects`**.

## 4 · Der Schnitt: Nameserver umstellen (der heikle Schritt)

Beim Registrar (vermutlich **INWX** — die Zugangsdaten stehen in `.env`) die Nameserver von
`ns1.tldns.net`/`ns2.tldns.net` auf die **zwei Cloudflare-Namen** aus Schritt 1 ändern.

Danach:
- Cloudflare → **DNS** → die Records aus Schritt 2 kontrollieren.
- Für die Website: `daniel-zaiser.de` und `www` in **Pages → Custom domains** hinzufügen; Cloudflare
  legt die passenden CNAME-Einträge selbst an (die A-Records auf `84.19.26.101` dabei **löschen**).
- Eine Hauptadresse wählen (`daniel-zaiser.de` **oder** `www`) — die andere leitet um.

**Umstellung dauert Minuten** (SOA-TTL war 600 s), nicht Stunden.

## 5 · Prüfen

```
curl -I https://daniel-zaiser.de/          # 200, Server: cloudflare
curl -I https://daniel-zaiser.de/projects  # 200 (SPA-Fallback greift)
curl -I https://www.daniel-zaiser.de/      # 200 oder Weiterleitung auf die Hauptadresse
```

Und **die Mail** (das Wichtigste):
1. Eine Mail an `daniel@daniel-zaiser.de` schicken und abwarten, ob sie ankommt.
2. Eine Mail von dort senden — im Kopf einer Testmail an ein Gmail-Konto steht `spf=pass`.

Faustregel: Kommt **eine** dieser beiden Richtungen nicht an, sofort zurück (Schritt 6).

## 6 · Rückweg

Die alte Zone bei `tldns.net` bleibt unangetastet. Nameserver beim Registrar zurück auf
`ns1.tldns.net` und `ns2.tldns.net` — nach wenigen Minuten ist alles wie vorher. **Nichts löschen**,
solange die Mail nicht nachweislich läuft.

## 7 · Danach

- Plesk liefert die Website nicht mehr aus; **für die Mail bleibt es** erreichbar (`webmail.`,
  `mail.`, `smtp.` … zeigen weiter dorthin).
- Der `deploy`-Branch und der Plesk-Webhook können später weg.
- Optional: DMARC und DKIM einrichten (heute fehlen beide) — dann gehört beides in dieselbe
  Cloudflare-Zone.
