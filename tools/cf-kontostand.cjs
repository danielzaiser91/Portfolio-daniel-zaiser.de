/**
 * Liest den Cloudflare-Kontostand **nur lesend** aus (der Token wird nie ausgegeben):
 *   - welche Pages-Projekte es gibt (und ob der Token dafür Rechte hat)
 *   - welche Zonen (Domains) im Konto liegen — ist daniel-zaiser.de schon dabei?
 *
 * Dazu der Registrar der Domain über RDAP (öffentlich) — dort werden die Nameserver umgestellt.
 */
const fs = require('node:fs')

const KONTO = '567f5e28368c5bbcfeffad3e674b02ab'
const token = [...new Set(
  fs.readFileSync('C:/code/ai/ai helper files/my_secrets.md', 'utf8')
    .slice(fs.readFileSync('C:/code/ai/ai helper files/my_secrets.md', 'utf8').indexOf('## Newsletter anime-kalender-de'))
    .match(/[A-Za-z0-9_-]{40,}/g) ?? [],
)].find((t) => t.startsWith('cf'))

const hole = async (pfad) => {
  const r = await fetch(`https://api.cloudflare.com/client/v4${pfad}`, { headers: { Authorization: `Bearer ${token}` } })
  return { status: r.status, body: await r.json().catch(() => ({})) }
}

const main = async () => {
  const projekte = await hole(`/accounts/${KONTO}/pages/projects`)
  if (projekte.status !== 200) {
    console.log(`Pages-Projekte: HTTP ${projekte.status} — ${JSON.stringify(projekte.body.errors ?? projekte.body).slice(0, 160)}`)
    console.log('  → Fehlt dem Token die Berechtigung „Account · Cloudflare Pages · Read/Edit"?')
  } else {
    const liste = projekte.body.result ?? []
    console.log(`Pages-Projekte: ${liste.length}${liste.length ? ' → ' + liste.map((p) => `${p.name} (${p.subdomain})`).join(', ') : ' (keines — es wird ein neues angelegt)'}`)
  }

  const zonen = await hole('/zones?per_page=50')
  if (zonen.status !== 200) {
    console.log(`Zonen: HTTP ${zonen.status} — ${JSON.stringify(zonen.body.errors ?? zonen.body).slice(0, 160)}`)
  } else {
    const liste = zonen.body.result ?? []
    console.log(`Zonen im Konto: ${liste.length}`)
    for (const z of liste) console.log(`   ${z.name} — Status ${z.status}, Nameserver: ${(z.name_servers ?? []).join(', ')}`)
    const dabei = liste.some((z) => z.name === 'daniel-zaiser.de')
    console.log(`  daniel-zaiser.de liegt dort: ${dabei ? 'ja' : 'nein (Zone muss angelegt werden)'}`)
  }

  const rdap = await fetch('https://rdap.denic.de/domain/daniel-zaiser.de').then((r) => r.json()).catch(() => null)
  const registrar = rdap?.entities?.find((e) => (e.roles ?? []).includes('registrar'))
  console.log('\nRegistrar laut DENIC-RDAP:')
  if (!registrar) console.log('   (nicht ermittelbar)')
  else {
    for (const v of registrar.vcardArray?.[1] ?? []) {
      if (['fn', 'org', 'email', 'tel'].includes(v[0])) console.log(`   ${v[0]}: ${Array.isArray(v[3]) ? v[3].join(' ') : v[3]}`)
    }
    console.log(`   handle: ${registrar.handle}`)
  }
  console.log('   Status der Domain:', (rdap?.status ?? []).join(', ') || '(unbekannt)')
}

main()
