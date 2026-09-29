/**
 * Legt die DNS-Einträge von daniel-zaiser.de in der Cloudflare-Zone an.
 *
 * Zweck: Beim Umzug auf Cloudflare Pages wird die Zone neu aufgebaut. Diese
 * Datei ist die nachlesbare, wiederholbare Quelle dafür — dieselbe Rolle, die
 * tools/inwx-dns.mjs im Anime-Kalender hat. Die Werte stammen aus der Aufnahme
 * vom 29.09.2026 gegen den zuständigen Server ns1.tldns.net (tools/dns-aufnahme.cjs).
 *
 * Bewusst NICHT enthalten: Apex und `www` — die gehören Cloudflare Pages
 * (Custom Domain, CNAME wird dort angelegt), nicht Plesk. Sonst zeigte die
 * Website nach dem Nameserver-Wechsel weiter auf den kompromittierten Server.
 * Ebenso bewusst NICHT der frühere Wildcard `*.daniel-zaiser.de`, damit kein
 * unbekannter Subdomain-Name weiter auf Plesk zeigt. Die Mail-Namen stehen
 * dafür einzeln.
 *
 * Aufruf (nur lesen, zeigt nur an):
 *   CLOUDFLARE_API_TOKEN=… node tools/cloudflare-dns.mjs
 * Aufruf (schreiben):
 *   CLOUDFLARE_API_TOKEN=… node tools/cloudflare-dns.mjs --apply
 *
 * Der Token braucht: Zone · Zone · Edit (für die Zone selbst) und
 * Zone · DNS · Edit (für die Einträge). Die Zonen-Kennung wird über den Namen
 * gesucht, nicht hart verdrahtet.
 */
const API = 'https://api.cloudflare.com/client/v4'
const ZONE = 'daniel-zaiser.de'
const APPLY = process.argv.includes('--apply')
const TOKEN = process.env.CLOUDFLARE_API_TOKEN

/**
 * `proxied: false` ist bei Mail-Pflicht: Ein proxied A-Record würde den
 * Mailserver hinter Cloudflare verstecken und Mail/Clients brechen. Deshalb
 * grundsätzlich „DNS only" (graue Wolke).
 */
const RECORDS = [
  { type: 'MX', name: '', content: 'mail.daniel-zaiser.de', priority: 10, ttl: 3600 },
  {
    type: 'TXT',
    name: '',
    content:
      'v=spf1 a mx ip4:89.107.66.192/26 ip4:89.107.69.0/26 ip4:62.108.36.0/24 ' +
      'ip4:62.108.41.0/24 ip4:62.108.44.0/24 ip4:84.19.26.0/24 ip4:84.19.24.0/24 ~all',
    ttl: 3600,
  },
  // Resend-Sendedomain `send.daniel-zaiser.de` (Versand über Amazon SES eu-west-1).
  // Ohne diese drei Einträge bricht der Mailversand nach dem Nameserver-Wechsel.
  { type: 'MX', name: 'send.send', content: 'feedback-smtp.eu-west-1.amazonses.com', priority: 10, ttl: 3600 },
  { type: 'TXT', name: 'send.send', content: 'v=spf1 include:amazonses.com ~all', ttl: 3600 },
  {
    type: 'TXT',
    name: 'resend._domainkey.send',
    content:
      'p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqAlEIbLF6qg1pebym6N/IUZiwUv85dEyNZuNv1CHY9D14/046snMU0pApVDxlWwHqFbIBc6nv3pwplE+YNvR0C1T0lqGFrcKLfQIpSBKudaEvpjBXq97kxRFoN3SeguzQECd1nOZLG+1bck0p3F7XVN7sgqHwg9ZJ2EylaXZh/QIDAQAB',
    ttl: 3600,
  },
  // Die Namen, die im Mail- und Zugangsbetrieb gebraucht werden. Heute deckt
  // sie der Wildcard ab; hier stehen sie einzeln, damit Plesk erreichbar bleibt,
  // ohne dass jeder erfundene Subdomain-Name dorthin zeigt.
  ...['mail', 'smtp', 'imap', 'pop', 'pop3', 'webmail', 'autodiscover', 'autoconfig', 'ftp'].map(
    (name) => ({ type: 'A', name, content: '84.19.26.101', proxied: false, ttl: 3600 }),
  ),
]

async function cf(path, init = {}) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  })
  const json = await res.json().catch(() => ({}))
  if (!json.success) {
    throw new Error(`${init.method ?? 'GET'} ${path}: ${res.status} ${JSON.stringify(json.errors)}`)
  }
  return json.result
}

async function main() {
  if (!TOKEN) {
    console.error('CLOUDFLARE_API_TOKEN fehlt.')
    process.exit(1)
  }

  const zonen = await cf(`/zones?name=${encodeURIComponent(ZONE)}`)
  const zone = zonen[0]
  if (!zone) {
    console.error(
      `Zone ${ZONE} liegt nicht im Konto. Erst anlegen (Schritt 1 der Anleitung) und erneut laufen lassen.`,
    )
    process.exit(1)
  }
  console.log(`Zone ${ZONE} (${zone.id}), Status: ${zone.status}`)

  const vorhanden = await cf(`/zones/${zone.id}/dns_records?per_page=100`)

  let created = 0
  let skipped = 0
  for (const r of RECORDS) {
    const name = r.name ? `${r.name}.${ZONE}` : ZONE
    const match = vorhanden.find(
      (e) => e.type === r.type && e.name === name && e.content === r.content,
    )
    if (match) {
      skipped++
      console.log(`  =  ${r.type.padEnd(5)} ${name}`)
      continue
    }
    if (!APPLY) {
      created++
      console.log(`  +  ${r.type.padEnd(5)} ${name} → ${r.content.slice(0, 50)}`)
      continue
    }
    await cf(`/zones/${zone.id}/dns_records`, {
      method: 'POST',
      body: JSON.stringify({
        type: r.type,
        name,
        content: r.content,
        ttl: r.ttl ?? 3600,
        ...(r.proxied !== undefined ? { proxied: r.proxied } : {}),
        ...(r.priority !== undefined ? { priority: r.priority } : {}),
      }),
    })
    created++
    console.log(`  +  ${r.type.padEnd(5)} ${name} angelegt`)
  }

  console.log(
    APPLY
      ? `\nFertig: ${created} angelegt, ${skipped} waren schon richtig.`
      : `\nVorschau: ${created} würden angelegt, ${skipped} sind schon richtig.\nZum Schreiben: --apply`,
  )
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
