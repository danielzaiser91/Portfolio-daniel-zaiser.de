# Mail- und Domain-Umzug: weg von TLDHost

**Angelegt 30.09.2026.** Ziel: `daniel-zaiser.de` behalten, aber **kein TLDHost mehr** — Mail zu
einem anderen Anbieter, Domain zu einem anderen Registrar. Auslöser war die Kompromittierung von
`server14.tldhost.de` (`docs/sicherheitsvorfall-server14.md`).

## Die eiserne Reihenfolge

**Erst Domain sichern und Mail umziehen, dann kündigen.** `daniel-zaiser.de` ist eine
**Inklusivdomain** am Webspace-Paket: Wird das Paket gekündigt, bevor die Domain transferiert ist,
läuft die Registrierung mit dem Paket aus, die Domain geht in die Löschfrist und kann danach frei
werden. Die Kündigung steht deshalb in der TLDHost-Mail ausdrücklich **hinten**.

## Ausgangslage (gemessen)

- **Postfach:** `daniel-zaiser@daniel-zaiser.de` (Beschreibung „meine Email für alles"),
  **7 Aliase**: `business@`, `info@`, `kontakt@`, `danielzaiser@`, `danielzaiser91@`,
  `danielzeiser@`, `daniel-zeiser@`. Belegung winzig (**243 KB**).
- **Weitere Postfächer:** `info-hetj@daniel-zaiser.de`, `info-lqfp@daniel-zaiser.de` — **nicht von
  Daniel angelegt**, in der TLDHost-Mail zur Prüfung/Löschung gemeldet (möglicher Spam-Versand).
- **DNS (Cloudflare, aktiv):** `MX 10 mail.daniel-zaiser.de`, A `mail.… → 84.19.26.101`, SPF-TXT;
  zusätzlich die Resend-Sendedomain `send.daniel-zaiser.de` (MX/SPF/DKIM) — **hostunabhängig**.
- **Website:** läuft über Cloudflare Pages (fertig, nicht Teil dieses Umzugs).

## Anbieterwahl (recherchiert 30.09.2026)

| Anbieter | Kosten | Eigene Domain | Anmerkung |
|---|---|---|---|
| **Migadu** (CH) | **19 $/Jahr** (Micro) | ✅ | unbegrenzt Adressen/Aliase, IMAP/SMTP/Webmail, 5 GB; passt zu den 7 Aliassen |
| **mailbox.org** (DE) | 36 €/Jahr (Standard) | ✅ | Server in DE, 20 GB, 50 Aliase, Migrationsservice; *Light (12 €) kann keine eigene Domain* |
| **Zoho Mail** | 0 € (Free) | ✅ | **kein IMAP/POP** in der kostenlosen Stufe |

**Empfehlung: Migadu Micro.** Domain-Registrar: **INWX** (dort liegt schon `anime-kalender.de`).

## Weitere Anbieter mit API (geprüft 30.09.2026)

Migadu hat die API erst ab **Mini** (90 $/Jahr) — deshalb hier die Alternativen, die **günstig sind
und trotzdem eine API** haben:

| Anbieter | Preis/Jahr | Eigene Domain | IMAP | API | Anmerkung |
|---|---|---|---|---|---|
| **Purelymail** | **10 $** | ✅ unbegrenzt | ✅ | ✅ (v0, **nicht offiziell dokumentiert**, funktioniert — Clients/MCP-Server existieren) | klein, ein Betreiber; API-Feldnamen teils inkonsistent → jeden Schritt nachprüfen |
| **Zoho Mail Lite** | ~12 $ (1 Nutzer) | ✅ | ✅ | ✅ (Mail-Admin-API, **OAuth**, dokumentiert) | großer Anbieter; OAuth-Einrichtung aufwendiger, Free-Stufe hat **kein IMAP** |
| **Migadu Mini** | 90 $ | ✅ | ✅ | ✅ (dokumentiert, Basic-Auth) | am einfachsten zu automatisieren, aber ~9× teurer als Purelymail |
| MXroute | 59 $ | ✅ | ✅ | ~ (DirectAdmin, kein sauberes Provisioning) | unbegrenzt Mailboxen/Domains |
| mailbox.org | 36 € | ✅ | ✅ | ❌ | kein Provisioning-API |

**Fazit:** Für „günstig **und** mit API" ist **Purelymail (10 $/Jahr)** der klare Sieger. Will man
die sauberste, dokumentierte Automatisierung, ist **Migadu Mini** die Wahl — kostet aber 90 $/Jahr.
Zoho Lite ist der Mittelweg (dokumentierte API, großer Anbieter, OAuth-Aufwand).

## Übernahme per API (geprüft 30.09.2026)

Beide Dienste lassen sich automatisieren — **Migadu** vollständig:

- **Migadu:** REST-API unter `https://api.migadu.com/v1/`, HTTP-Basic (Konto-Adresse + **API-Key**
  aus *My Account → API Keys*). Abgedeckt: `domains` (anlegen, Records abrufen, `activate`,
  `diagnostics`), `mailboxes` (anlegen/ändern), `aliases`, `identities`, `forwardings`, `rewrites`.
  Damit lege ich Domain, Postfach und die 7 Aliase an und hole die nötigen DNS-Werte.
- **INWX:** DomRobot-API (JSON-RPC, `https://api.domrobot.com/jsonrpc/`) mit **Domain-Transfer**
  inkl. Auth-Code. Der vorhandene Unterbenutzer `dns-automation` hat Domain-/DNS-Rechte; für den
  Transfer ggf. einen Unterbenutzer mit Transfer-Recht nötig.

**Was nur Daniel machen kann:** Migadu-Konto anlegen und bezahlen (Stripe/PayPal), den **API-Key**
erzeugen, den **Auth-Code** von TLDHost weitergeben, das **Postfach-Passwort** des alten
TLDHost-Postfachs für die IMAP-Migration bereitstellen (liegt nicht in den Secrets), und kündigen
(Vertragsinhaber).

**Was ich dann übernehme:** Migadu-Domain + Postfach + Aliase anlegen, DNS-Records holen, in
Cloudflare MX/SPF/DKIM/DMARC setzen und auf Migadu umstellen, alte Mails per IMAP migrieren,
Domain nach DNS-Verifikation aktivieren, Transfer zu INWX auslösen, alles nachprüfen.

## Ablauf

1. **Postfach beim neuen Anbieter anlegen** — `daniel-zaiser@daniel-zaiser.de` plus die 7 Aliase
   (bei Migadu unbegrenzt, sonst als Aliase/Catch-all).
2. **Alte Mails herüberziehen** (IMAP-Migration). Bei 243 KB ein Minutenjob; mailbox.org bietet
   dafür einen Migrationsservice. TLDHost-Mail dafür **noch aktiv** lassen.
3. **MX umstellen** in der Cloudflare-Zone: MX auf den neuen Anbieter, dessen SPF/DKIM ergänzen.
   Alten SPF-Eintrag (`v=spf1 a mx ip4:… ~all`) durch den neuen ersetzen, nicht danebenlegen
   (zwei SPF-Sätze = keiner wirkt). **DMARC** gleich mitnehmen (fehlt bisher).
4. **Ein paar Wochen parallel** laufen lassen: TLDHost-Postfach weiter erreichbar, dann prüfen,
   ob noch Mail dorthin kommt (Log/Impressum/Kontakte, die die alte Adresse nutzen).
5. **Domain-Transfer zu INWX:** Auth-Code (EPP) von TLDHost, Transfer-Lock aufheben, Transfer bei
   INWX starten. Nameserver bleiben **Cloudflare** (`alex`/`alexandra.ns.cloudflare.com`) — am
   DNS ändert sich nichts.
6. **Erst nach abgeschlossenem Transfer kündigen** — Webspace-/Hosting-Paket.

## Stand 30.09.2026 — Purelymail ist eingerichtet und live

Anbieter **Purelymail** (10 $/Jahr, API). Über die API (`POST https://purelymail.com/api/v0/…`,
Header **`Purelymail-Api-Token`**) angelegt und geprüft:

| Schritt | Ergebnis |
|---|---|
| Domain `daniel-zaiser.de` | angelegt; `passesMx/Spf/Dkim/Dmarc` **alle true** |
| DNS in Cloudflare | SPF ersetzt (`v=spf1 include:_spf.purelymail.com ~all`), Ownership-TXT, 3 DKIM-CNAMEs (`purelymail1–3._domainkey` → `keyN.dkimroot.purelymail.com`, DNS only), `_dmarc` → `dmarcroot.purelymail.com` |
| **MX** | **`mailserver.purelymail.com`, Prio 50** (ersetzt `mail.daniel-zaiser.de`) |
| Postfach | `daniel-zaiser@daniel-zaiser.de` (Passwort im Chat an Daniel; er sollte es ändern) |
| Aliase | `business`, `info`, `kontakt`, `danielzaiser`, `danielzaiser91`, `danielzeiser`, `daniel-zeiser` → Postfach (Routing-Regeln) |
| Sendetest | SMTP **250**; Mail kam im Postfach an, `Delivered-To: daniel-zaiser@…` bei `To: info@…` |
| Symbolische Subadressierung | **aus** — sonst wäre `daniel-zaiser` als Subadresse von `daniel` gewertet worden |

**Client-Zugang:** IMAP `imap.purelymail.com:993` (SSL), SMTP `smtp.purelymail.com:465` (SSL).

**Noch offen:** Domain-Transfer (Auth-Code) und Kündigung.

## Weiterleitung nach Gmail (30.09.2026, erledigt)

Daniel liest die Adresse **nirgendwo** — gewünscht ist, dass **alles** an `daniel-zaiser.de` an
`danielzaiser91@googlemail.com` weitergeht (mit sichtbarem ursprünglichem Absender und der
`daniel-zaiser.de`-Empfängeradresse im Kopf).

Purelymail-Routing (Catch-all greift für JEDE Adresse, auch für einen vorhandenen Benutzer; das
Postfach bleibt leer):

| Adresse | Ziel |
|---|---|
| Catch-all `*@daniel-zaiser.de` | `danielzaiser91@googlemail.com` |
| zusätzlich exakt: `daniel-zaiser`, `info`, `kontakt`, `business`, `danielzaiser`, `danielzaiser91`, `danielzeiser`, `daniel-zeiser` | dito |

**Wichtig für den API-Weg:** Ein Catch-all entsteht nur mit
`{matchUser:"*", prefix:true, catchall:true}` — mit `matchUser:""` oder `prefix:false` meldet die
API Erfolg, fängt aber nichts (`User isn't located here`). Exakte Regeln (`catchall:false`) wirken
sofort. Geprüft, indem eine Probemail **ohne** Kopie und **ohne** Bounce im Postfach blieb.

**Ergebnis:** Postfach enthält nur noch den Altbestand (17+1). Newsletter-Antworten gehen über
`Reply-To: info@daniel-zaiser.de` und landen so ebenfalls in Gmail.

## Mail-Migration (30.09.2026, erledigt)

Das alte Postfach-Passwort war nicht bekannt — Plesk zeigt es nicht an, nur setzen. Über das
Plesk-Formular (`/smb/email-address/edit/id/1/domainId/4`) neu gesetzt: **`Umzug-TLD-2026!x`**
(damit brechen alte Mail-Client-Zugänge zur TLDHost-Adresse — gewollt, die läuft aus).

Alle Ordner per IMAP kopiert (`imaplib`, Skript lag nur temporär): **INBOX 17, Sent 1**;
`INBOX.Spam/Trash/Drafts` waren leer. Auf Purelymail liegt damit der komplette Altbestand;
am alten Server wurde **nichts gelöscht** (dient als Rückfall, bis gekündigt wird).

## Was parallel schon läuft

- Die TLDHost-Mail (30.09.2026) bittet um Auth-Code + Transfer-Lock-Freigabe, Abschaltung des
  Webspaces, Löschung der Backdoors und der fremden Postfächer — und die Kündigung erst nach
  abgeschlossenem Transfer.
- TLDHost bearbeitet `server14` laut eigener Aussage **diese Woche**.

## Prüfgriffe

```powershell
Resolve-DnsName daniel-zaiser.de -Type MX -Server 1.1.1.1     # neuer Anbieter nach der Umstellung
Resolve-DnsName daniel-zaiser.de -Type TXT -Server 1.1.1.1    # genau EIN v=spf1 …; DMARC vorhanden
Resolve-DnsName mail.daniel-zaiser.de -Type A -Server 1.1.1.1 # bis zum Umzug: 84.19.26.101
```
