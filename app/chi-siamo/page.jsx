import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { supabase } from '../../lib/supabaseClient'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const { data: pagina } = await supabase.from('pagine').select('campi').eq('id', 'chi-siamo').single()
  const campi = pagina?.campi || {}
  const primoParagrafo = (campi.missione || '').split(/\n\s*\n/)[0]
  return {
    title: 'Chi siamo',
    description: primoParagrafo || undefined,
  }
}

export default async function ChiSiamoPage() {
  const { data: pagina } = await supabase.from('pagine').select('campi').eq('id', 'chi-siamo').single()
  const campi = pagina?.campi || {}

  const paragrafi = (campi.missione || '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  const righeContatti = (campi.contatti || '')
    .split('\n')
    .map((r) => r.trim())
    .filter(Boolean)

  return (
    <>
      <Header attivo="chi-siamo" />

      <section className="page-header">
        <div className="container">
          <div className="chi-siamo-immagine">
            <img src="/oesm-sanmarino.png" alt="Mappa di San Marino" />
          </div>
          <h1>{campi.titolo || 'Titolo da inserire nella sezione Pagine del CMS'}</h1>

          <div className="chi-siamo-corpo">
            <div className="chi-siamo-testo">
              {paragrafi.length > 0 ? (
                paragrafi.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <p>Testo da inserire nel campo Missione, sezione Pagine del CMS.</p>
              )}
            </div>
            <div className="chi-siamo-palazzo">
              <img src="/oesm-palazzo.png" alt="Il Palazzo Pubblico di San Marino" />
            </div>
          </div>
        </div>
      </section>

      <section className="contatti">
        <div className="container">
          <div className="footer-col-title">Contatti</div>
          {righeContatti.length > 0 ? (
            righeContatti.map((riga, i) => (
              <div key={i} className="contatti-riga">
                {riga}
              </div>
            ))
          ) : (
            <div className="contatti-riga">Contatti da inserire nella sezione Pagine del CMS.</div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
