import { notFound } from 'next/navigation'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { supabase } from '../../../lib/supabaseClient'
import { estrattoTesto } from '../../../lib/utils'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }) {
  const { data: articolo } = await supabase
    .from('articoli')
    .select('*')
    .eq('id', params.id)
    .eq('stato', 'pubblicato')
    .single()

  if (!articolo) return { title: 'Articolo non trovato' }

  const descrizione = estrattoTesto(articolo.corpo, 160)

  return {
    title: articolo.titolo,
    description: descrizione,
    openGraph: {
      title: articolo.titolo,
      description: descrizione,
      type: 'article',
      publishedTime: articolo.data,
      images: articolo.copertina ? [{ url: articolo.copertina }] : undefined,
    },
  }
}

export default async function ArticoloPage({ params }) {
  const [{ data: articolo }, { data: categorie }] = await Promise.all([
    supabase.from('articoli').select('*').eq('id', params.id).eq('stato', 'pubblicato').single(),
    supabase.from('categorie').select('slug, etichetta'),
  ])

  if (!articolo) {
    notFound()
  }

  const etichettaCategoria = categorie?.find((c) => c.slug === articolo.categoria)?.etichetta || articolo.categoria
  const allegati = articolo.allegati || []

  const datiStrutturati = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: articolo.titolo,
    datePublished: articolo.data,
    image: articolo.copertina ? [articolo.copertina] : undefined,
    articleSection: etichettaCategoria,
    publisher: {
      '@type': 'Organization',
      name: 'Osservatorio Economico di San Marino',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datiStrutturati) }}
      />
      <Header attivo="notizie" />

      <article className="articolo-pagina">
        <div className="container container-stretta">
          <a href="/notizie" className="vedi-tutte" style={{ display: 'inline-block', marginBottom: 32 }}>
            ← Tutte le notizie
          </a>

          <div className="articolo-header">
            <div className="eyebrow">
              {etichettaCategoria} · {articolo.data}
            </div>
            <h1>{articolo.titolo}</h1>
          </div>

          {articolo.copertina && (
            <div className="articolo-copertina">
              <img src={articolo.copertina} alt="" />
            </div>
          )}

          <div className="articolo-corpo" dangerouslySetInnerHTML={{ __html: articolo.corpo || '' }} />

          {allegati.length > 0 && (
            <div className="articolo-allegati">
              <div className="allegati-titolo">Allegati</div>
              <ul>
                {allegati.map((a, i) => (
                  <li key={i}>
                    <a href={a.url} target="_blank" rel="noreferrer">
                      {a.nome}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </>
  )
}
