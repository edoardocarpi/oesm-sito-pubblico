import Header from '../../components/Header'
import Footer from '../../components/Footer'
import DatiNav from '../../components/DatiNav'
import { supabase } from '../../lib/supabaseClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DatiLayout({ children }) {
  const [{ data: righe }, { data: categorie }] = await Promise.all([
    supabase
      .from('indicatori_dati')
      .select('category, indicator_code, indicator_it, value_display')
      .order('indicator_code', { ascending: true }),
    supabase.from('categorie').select('slug, etichetta').order('ordine', { ascending: true }),
  ])

  // un indicatore compare nel menu solo se ha almeno un valore reale;
  // altrimenti il link porterebbe a una pagina vuota
  const haDatiPerCodice = {}
  ;(righe || []).forEach((r) => {
    const haValore = r.value_display && r.value_display !== 'null'
    haDatiPerCodice[r.indicator_code] = haDatiPerCodice[r.indicator_code] || haValore
  })

  const indicatoriUnici = new Map()
  ;(righe || []).forEach((r) => {
    if (!indicatoriUnici.has(r.indicator_code) && haDatiPerCodice[r.indicator_code]) {
      indicatoriUnici.set(r.indicator_code, { code: r.indicator_code, nome: r.indicator_it, categoria: r.category })
    }
  })
  const listaIndicatori = Array.from(indicatoriUnici.values())

  const slugCategorieOrdinate = (categorie || []).map((c) => c.slug)
  const categorieExtra = [...new Set(listaIndicatori.map((i) => i.categoria))].filter(
    (slug) => !slugCategorieOrdinate.includes(slug)
  )

  const gruppi = [...slugCategorieOrdinate, ...categorieExtra]
    .map((slug) => ({
      slug,
      etichetta: categorie?.find((c) => c.slug === slug)?.etichetta || slug,
      indicatori: listaIndicatori.filter((i) => i.categoria === slug),
    }))
    .filter((g) => g.indicatori.length > 0)

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
