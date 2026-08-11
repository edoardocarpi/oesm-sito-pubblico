import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { supabase } from '../../lib/supabaseClient'
import { estrattoTesto } from '../../lib/utils'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const PER_PAGINA = 6

export async function generateMetadata({ searchParams }) {
  const categoriaAttiva = searchParams?.categoria || ''
  if (!categoriaAttiva) {
    return { title: 'Notizie', description: "Comunicati e analisi sull'economia di San Marino." }
  }
  const { data: categoria } = await supabase.from('categorie').select('etichetta').eq('slug', categoriaAttiva).single()
  const etichetta = categoria?.etichetta || categoriaAttiva
  return {
    title: `Notizie · ${etichetta}`,
    description: `Notizie ed analisi sull'economia di San Marino nella categoria ${etichetta}.`,
  }
}

export default async function NotiziePage({ searchParams }) {
  const categoriaAttiva = searchParams?.categoria || ''
  const pagina = parseInt(searchParams?.pagina || '1', 10) || 1

  const { data: categorie, error: erroreCategorie } = await supabase
    .from('categorie')
    .select('slug, etichetta')
    .order('ordine', { ascending: true })

  const { data: categorieUsate } = await supabase.from('articoli').select('categoria').eq('stato', 'pubblicato')
  const slugConArticoli = new Set((categorieUsate || []).map((r) => r.categoria))
  const categorieVisibili = (categorie || []).filter((c) => slugConArticoli.has(c.slug))

  let query = supabase
    .from('articoli')
    .select('*', { count: 'exact' })
    .eq('stato', 'pubblicato')
    .order('data', { ascending: false })
    .range((pagina - 1) * PER_PAGINA, pagina * PER_PAGINA - 1)

  if (categoriaAttiva) query = query.eq('categoria', categoriaAttiva)

  const { data: articoli, count, error: erroreArticoli } = await query

  if (erroreCategorie) console.error('[Notizie] Errore Supabase (categorie):', erroreCategorie.message)
  if (erroreArticoli) console.error('[Notizie] Errore Supabase (articoli):', erroreArticoli.message)

  const etichettaCategoria = (slug) => categorie?.find((c) => c.slug === slug)?.etichetta || slug
  const cePaginaSuccessiva = (count || 0) > pagina * PER_PAGINA
  const queryStringSuccessiva = `?${categoriaAttiva ? `categoria=${categoriaAttiva}&` : ''}pagina=${pagina + 1}`

  return (
    <>
      <Header attivo="notizie" />

      <section className="page-header">
        <div className="container">
          <h1>Notizie e analisi economiche</h1>
          <p>Comunicati e analisi generati a partire dai dati pubblicati nell'Archivio.</p>
        </div>
      </section>

      <section className="elenco-articoli">
        <div className="container">
          <div className="filtri">
            <a href="/notizie" className={`filtro-pill ${!categoriaAttiva ? 'active' : ''}`}>
              Tutte
            </a>
            {categorieVisibili.map((c) => (
              <a
                key={c.slug}
                href={`/notizie?categoria=${c.slug}`}
                className={`filtro-pill ${categoriaAttiva === c.slug ? 'active' : ''}`}
              >
                {c.etichetta}
              </a>
            ))}
          </div>

          <div className="articoli-grid">
            {(articoli || []).length === 0 ? (
              <p style={{ color: 'var(--muted)' }}>Nessun articolo in questa categoria.</p>
            ) : (
              articoli.map((a) => (
                <a key={a.id} className="articolo-card" href={`/notizie/${a.id}`}>
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
                </a>
              ))
            )}
          </div>
        </div>

        {cePaginaSuccessiva && (
          <div className="carica-altre">
            <a href={queryStringSuccessiva} className="btn-outline">
              Carica altre notizie
            </a>
          </div>
        )}
      </section>

      <Footer />
    </>
  )
}
