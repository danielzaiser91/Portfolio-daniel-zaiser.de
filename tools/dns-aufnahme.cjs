/**
 * DNS-Aufnahme von daniel-zaiser.de — zuständiger Server, nicht der Resolver.
 * Das ist die Liste, die beim Umzug zu Cloudflare vollständig neu angelegt werden muss.
 */
const { execFileSync } = require('node:child_process')

const ZONE = 'daniel-zaiser.de'
const SERVER = 'ns1.tldns.net'

const namen = [
  ['@', 'A'], ['@', 'AAAA'], ['@', 'MX'], ['@', 'TXT'], ['@', 'NS'], ['@', 'CAA'],
  ['www', 'A'], ['www', 'AAAA'], ['www', 'CNAME'],
  ['mail', 'A'], ['mail', 'AAAA'],
  ['smtp', 'A'], ['imap', 'A'], ['pop', 'A'], ['pop3', 'A'], ['webmail', 'A'],
  ['autodiscover', 'A'], ['autodiscover', 'CNAME'], ['autoconfig', 'A'], ['ftp', 'A'],
  ['_dmarc', 'TXT'],
  ['default._domainkey', 'TXT'], ['mail._domainkey', 'TXT'], ['dkim._domainkey', 'TXT'],
  ['selector1._domainkey', 'TXT'], ['selector2._domainkey', 'TXT'], ['google._domainkey', 'TXT'],
  ['_autodiscover._tcp', 'SRV'], ['_imap._tcp', 'SRV'], ['_imaps._tcp', 'SRV'],
  ['_submission._tcp', 'SRV'], ['_pop3._tcp', 'SRV'], ['_pop3s._tcp', 'SRV'],
]

const skript = `
$ErrorActionPreference = 'SilentlyContinue'
foreach ($e in @(${namen.map(([n, t]) => `@('${n}','${t}')`).join(',')})) {
  $name = if ($e[0] -eq '@') { '${ZONE}' } else { $e[0] + '.' + '${ZONE}' }
  $r = Resolve-DnsName -Name $name -Type $e[1] -Server '${SERVER}' -DnsOnly -ErrorAction SilentlyContinue
  if ($r) {
    foreach ($z in $r) {
      $wert = @()
      foreach ($f in @('IPAddress','NameHost','NameExchange','Text','Value','NameTarget','Port','Priority','Weight')) {
        if ($z.$f) { $wert += "$f=$($z.$f)" }
      }
      if ($wert.Count) { Write-Output ("{0} {1} {2}" -f $name, $e[1], ($wert -join ' ')) }
    }
  }
}
`

const aus = execFileSync('powershell', ['-NoProfile', '-Command', skript], { encoding: 'utf8', timeout: 180000 })
console.log(aus.trim() || '(keine Antworten)')
