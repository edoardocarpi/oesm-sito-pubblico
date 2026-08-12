import Header from '../../components/Header'
import Footer from '../../components/Footer'
import DatiNav from '../../components/DatiNav'
import { supabase } from '../../lib/supabaseClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DatiLayout({ children }) {
  const [{ data: righe }, { data: categorie }, { data: temi }, { data: temiFonti }] = await Promise.all([
    supabase
      .from('indicatori_dati')
      .select('category, indicator_code, indicator_it, value_display')
      .order('indicator_code', { ascending: true }),
    supabase.from('categorie').select('slug, etichetta').order('ordine', { ascending: true }),
    supabase.from('temi').select('slug, titolo, categoria'),
    supabase.from('temi_fonti').select('tema_slug, indicator_code'),
  ])

  // gli indicator_code che fanno parte di un tema non vanno elencati anche
  // come voce singola — altrimenti lo stesso concetto comparirebbe due volte
  const codiciInTema = new Set((temiFonti || []).map((t) => t.indicator_code))

  const haDatiPerCodice = {}
  ;(righe || []).forEach((r) => {
    const haValore = r.value_display && r.value_display !== 'null'
    haDatiPerCodice[r.indicator_code] = haDatiPerCodice[r.indicator_code] || haValore
  })

  const indicatoriSingoliUnici = new Map()
  ;(righe || []).forEach((r) => {
    if (codiciInTema.has(r.indicator_code)) return
    if (!indicatoriSingoliUnici.has(r.indicator_code) && haDatiPerCodice[r.indicator_code]) {
      indicatoriSingoliUnici.set(r.indicator_code, {
        href: `/dati/${r.indicator_code}`,
        nome: r.indicator_it,
        categoria: r.category,
      })
    }
  })

  const vociTemi = (temi || []).map((t) => ({
    href: `/dati/${t.slug}`,
    nome: t.titolo,
    categoria: t.categoria,
  }))

  const tutteLeVoci = [...vociTemi, ...Array.from(indicatoriSingoliUnici.values())]

  const slugCategorieOrdinate = (categorie || []).map((c) => c.slug)
  const categorieExtra = [...new Set(tutteLeVoci.map((v) => v.categoria))].filter(
    (slug) => !slugCategorieOrdinate.includes(slug)
  )

  const gruppi = [...slugCategorieOrdinate, ...categorieExtra]
    .map((slug) => ({
      slug,
      etichetta: categorie?.find((c) => c.slug === slug)?.etichetta || slug,
      voci: tutteLeVoci.filter((v) => v.categoria === slug).sort((a, b) => a.nome.localeCompare(b.nome)),
    }))
    .filter((g) => g.voci.length > 0)

  return (
    <>
      <Header attivo="dati" />

      <section className="dati-intestazione">
        <div className="container">
          <div className="eyebrow">Dati</div>
        </div>
      </section>

      <section>
        <div className="container">
          <DatiNav gruppi={gruppi} />
          <div className="dati-contenuto">{children}</div>
        </div>
      </section>

      <Footer />
    </>
  )
}
