import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { supabase } from '../../lib/supabaseClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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

      <section className="page-header chi-siamo-hero sezione-schermo">
        <div className="container">
          <div className="chi-siamo-immagine">
            <img src="/oesm-sanmarino.png" alt="Mappa di San Marino" />
          </div>

          <div className="chi-siamo-griglia">
            <div className="chi-siamo-cella" style={{ gridColumn: 1, gridRow: 1 }}>
              <h1>{campi.titolo || 'Titolo da inserire nella sezione Pagine del CMS'}</h1>
            </div>
            <div className="chi-siamo-cella" style={{ gridColumn: 2, gridRow: 2 }}>
              <p>{paragrafi[0] || 'Testo da inserire nel campo Missione, sezione Pagine del CMS.'}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="chi-siamo-sezione-due">
            <div className="chi-siamo-palazzo">
              <img src="/oesm-palazzo.png" alt="Il Palazzo Pubblico di San Marino" />
            </div>
            <div className="chi-siamo-testo-resto">
              {paragrafi.slice(1).map((p, i) => (
                <p key={i}>{p}</p>
              ))}

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
          </div>

          <div className="chi-siamo-fondatore">
            <img src="/edoardo-carpi.jpg" alt="Edoardo Carpi" className="fondatore-foto" />
            <div>
              <div className="fondatore-nome">Edoardo Carpi — Fondatore</div>
              <p className="fondatore-bio">
                Consulente in ambito Tax &amp; Corporate, con esperienza in Audit e Compliance, ha
                fondato OESM per aiutare economisti, giornalisti e politici a reperire in modo
                veloce ed affidabile i dati economici su San Marino. È laureato con lode in
                Economia e Management all'Università di Parma, e sta conseguendo la Laurea
                Magistrale in Economia all'Università Cattolica del Sacro Cuore.
              </p>
              <a
                href="https://it.linkedin.com/in/edoardocarpi"
                target="_blank"
                rel="noreferrer"
                className="link-arrow"
              >
                LinkedIn &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
