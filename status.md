# Status — Portfolio (daniel-zaiser.de)

Laufender Arbeitsstand dieses Repos. Angelegt am 26.07.2026.

## Task Queue

**Regeln:** Jeder neue Wunsch landet SOFORT beim Nennen hier, Erledigtes wandert
SOFORT ins Archiv. Sortierung: 1 · In Arbeit → 2 · Queue → 3 · Zu besprechen →
4 · Warten auf dein Feedback.

### 1 · In Arbeit

— nichts offen.

### 2 · Queue

— leer.

### 3 · Zu besprechen

| Thema |
|-------|
| `archmage-idle` ist als **privates** Quell-Repo eingetragen (`repoPrivate: true`) — die Live-Stats von GitHub greifen dafür nicht, die Karte zeigt den Snapshot aus `projects.ts`. Falls die Zahlen mitwachsen sollen, müsste das Repo öffentlich werden. |

### 4 · Warten auf dein Feedback

| Task | Stand |
|------|-------|
| **Link-Vorschau (Open Graph), zwei Varianten** — normale Karte für daniel-zaiser.de, eigene für /arcade. Vorbild: `arturs webseite` (Westerwald-Pianoservice). Beim Teilen in WhatsApp/Discord/Slack einmal gegenchecken | live nach dem Push |
| **archmage-idle in der Arcade** — als empfohlenes Spiel ganz oben, Kategorie Idle | live nach dem Push |
| **Hover-Vorschau in der Arcade** — gleiches schwebendes Panel wie auf der Projekte-Seite; die Screenshots kommen aus `images/previews/projects/`, Archiv-Einträge fallen auf ihr Kapsel-Bild zurück, Einträge ganz ohne Bild zeigen kein leeres Panel | live nach dem Push |
| **archmage-idle in die Projekte aufgenommen** — Kategorie „Fun", Highlight, Live-Demo auf den öffentlichen Build-Spiegel, privates Quell-Repo mit Schloss-Badge, Vorschaubild aus einem weit gespielten Stand | live nach dem Push |

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
