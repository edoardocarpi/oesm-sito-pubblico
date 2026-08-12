import { redirect } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DatiIndexPage() {
  const [{ data: categorie }, { data: righe }, { data: temi }, { data: temiFonti }] = await Promise.all([
    supabase.from('categorie').select('slug').order('ordine', { ascending: true }),
    supabase.from('indicatori_dati').select('category, indicator_code, value_display'),
    supabase.from('temi').select('slug, categoria'),
    supabase.from('temi_fonti').select('indicator_code'),
  ])

  const ordineCategorie = (categorie || []).map((c) => c.slug)
  const codiciInTema = new Set((temiFonti || []).map((t) => t.indicator_code))

  const haDatiPerCodice = {}
  ;(righe || []).forEach((r) => {
    const haValore = r.value_display && r.value_display !== 'null'
    haDatiPerCodice[r.indicator_code] = haDatiPerCodice[r.indicator_code] || haValore
  })

  // un tema conta sempre come "con dati" (ha per definizione almeno una fonte
  // con qualcosa da mostrare); gli indicatori singoli solo se hanno un valore
  // reale e non fanno già parte di un tema
  const voci = [
    ...(temi || []).map((t) => ({ href: t.slug, categoria: t.categoria })),
    ...[...new Set((righe || []).map((r) => r.indicator_code))]
      .filter((code) => !codiciInTema.has(code) && haDatiPerCodice[code])
      .map((code) => ({
        href: code,
        categoria: righe.find((r) => r.indicator_code === code)?.category,
      })),
  ]

  voci.sort((a, b) => {
    const posA = ordineCategorie.indexOf(a.categoria)
    const posB = ordineCategorie.indexOf(b.categoria)
    if (posA !== posB) return (posA === -1 ? 999 : posA) - (posB === -1 ? 999 : posB)
    return a.href.localeCompare(b.href)
  })

  const scelto = voci[0]?.href

  if (scelto) {
    redirect(`/dati/${scelto}`)
  }

  return <p style={{ color: 'var(--muted)' }}>Nessun indicatore disponibile al momento.</p>
}
