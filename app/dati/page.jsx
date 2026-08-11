import { redirect } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'

export const dynamic = 'force-dynamic'

export default async function DatiIndexPage() {
  const [{ data: categorie }, { data: righe }] = await Promise.all([
    supabase.from('categorie').select('slug').order('ordine', { ascending: true }),
    supabase.from('indicatori_dati').select('category, indicator_code, value_display'),
  ])

  const ordineCategorie = (categorie || []).map((c) => c.slug)

  const haDatiPerCodice = {}
  ;(righe || []).forEach((r) => {
    const haValore = r.value_display && r.value_display !== 'null'
    haDatiPerCodice[r.indicator_code] = haDatiPerCodice[r.indicator_code] || haValore
  })

  const codiciOrdinati = [...(righe || [])]
    .sort((a, b) => {
      const posA = ordineCategorie.indexOf(a.category)
      const posB = ordineCategorie.indexOf(b.category)
      if (posA !== posB) return (posA === -1 ? 999 : posA) - (posB === -1 ? 999 : posB)
      return a.indicator_code.localeCompare(b.indicator_code)
    })
    .map((r) => r.indicator_code)
  const codiciUnici = [...new Set(codiciOrdinati)]

  const primoConDati = codiciUnici.find((code) => haDatiPerCodice[code])
  const scelto = primoConDati || codiciUnici[0]

  if (scelto) {
    redirect(`/dati/${scelto}`)
  }

  return <p style={{ color: 'var(--muted)' }}>Nessun indicatore disponibile al momento.</p>
}
