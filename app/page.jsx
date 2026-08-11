import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Ticker from '../components/Ticker'
import { supabase } from '../lib/supabaseClient'
import { estrattoTesto } from '../lib/utils'

const INDICATORI_HOME = [
  { code: 'NY.GDP.MKTP.KD.ZG', label: 'Crescita PIL' },
  { code: 'FP.CPI.TOTL.ZG', label: 'Inflazione' },
  { code: 'SP.POP.TOTL', label: 'Popolazione' },
  { code: 'GC.XPN.TOTL.GD.ZS', label: 'Spesa pubblica' },
]

function formattaValoreHome(code, valoreDisplay) {
  const numero = parseFloat(valoreDisplay)
  if (Number.isNaN(numero)) return '—'
  if (code === 'SP.POP.TOTL') return new Intl.NumberFormat('it-IT').format(Math.round(numero))
  return `${numero.toFixed(1)}%`
}

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const { data: pagina } = await supabase.from('pagine').select('campi').eq('id', 'home').single()
  const campi = pagina?.campi || {}
  return {
    title: undefined,
    description: campi.sottotitolo || undefined,
  }
}

export default async function HomePage() {
  const [{ data: pagina }, { data: articoli }, { data: categorie }, { data: righeIndicatori }] = await Promise.all([
    supabase.from('pagine').select('campi').eq('id', 'home').single(),
    supabase
      .from('articoli')
      .select('*')
      .eq('stato', 'pubblicato')
      .order('data', { ascending: false })
      .limit(3),
    supabase.from('categorie').select('slug, etichetta'),
    supabase
      .from('indicatori_dati')
      .select('indicator_code, year, value_display')
      .in('indicator_code', INDICATORI_HOME.map((i) => i.code))
      .order('year', { ascending: false }),
  ])

  const campi = pagina?.campi || {}
  const etichettaCategoria = (slug) => categorie?.find((c) => c.slug === slug)?.etichetta || slug

  const ultimoValorePerCodice = {}
  ;(righeIndicatori || []).forEach((r) => {
    if (!ultimoValorePerCodice[r.indicator_code]) ultimoValorePerCodice[r.indicator_code] = r
  })

  return (
    <>
      <Header attivo="home" />

      <section className="hero sezione-schermo">
        <div className="container">
          <div className="hero-immagine">
            <img src="/oesm-san-marino.png" alt="Illustrazione di San Marino" />
          </div>

          <div className="hero-corpo">
            <div className="hero-titolo-col">
              <h1>{campi.titolo || 'Titolo da inserire nella sezione Pagine del CMS'}</h1>
            </div>
            <div className="hero-testo">
              {campi.sottotitolo && <p className="hero-sub">{campi.sottotitolo}</p>}
              {campi.intro && <p className="hero-sub">{campi.intro}</p>}
            </div>
          </div>

          <div className="hero-azione">
            <Link href="/dati" className="link-arrow">
              Vedi i dati &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="notizie sezione-schermo">
        <div className="container">
          <div className="notizie-head">
            <h2>Ultime notizie</h2>
            <Link href="/notizie" className="vedi-tutte">
              Vedi tutte le notizie
            </Link>
          </div>
          <div className="articoli-grid">
            {(articoli || []).length === 0 ? (
              <p style={{ color: 'var(--muted)' }}>Nessun articolo pubblicato ancora.</p>
            ) : (
              articoli.map((a) => (
                <Link key={a.id} className="articolo-card" href={`/notizie/${a.id}`}>
                  <div
                    className="articolo-thumb"
                    style={
                      a.copertina
                        ? { backgroundImage: `url(${a.copertina})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                        : undefined
                    }
                  >
                    {!a.copertina && 'Copertina articolo'}
                  </div>
                  <div className="articolo-meta">
                    {etichettaCategoria(a.categoria)} · {a.data}
                  </div>
                  <h3>{a.titolo}</h3>
                  <p>{estrattoTesto(a.corpo)}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <Ticker
        indicatori={INDICATORI_HOME.map((ind) => {
          const riga = ultimoValorePerCodice[ind.code]
          return { label: ind.label, valore: riga ? formattaValoreHome(ind.code, riga.value_display) : '—' }
        })}
      />

      <section className="about-teaser">
        <div className="container about-teaser">
          <p>{campi.teaser_about || 'Vuoi sapere di piu\' su chi siamo e come lavoriamo?'}</p>
          <Link href="/chi-siamo" className="link-arrow">
            Scopri di piu' su di noi &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
