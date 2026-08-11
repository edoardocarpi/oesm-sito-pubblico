import { supabase } from '../lib/supabaseClient'
import { SITE_URL } from '../lib/site'

// Senza questo, la sitemap verrebbe generata una sola volta al momento della
// build e non includerebbe mai i nuovi articoli o indicatori pubblicati dopo.
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function sitemap() {
  const [{ data: articoli }, { data: indicatori }] = await Promise.all([
    supabase.from('articoli').select('id, data').eq('stato', 'pubblicato'),
    supabase.from('indicatori_dati').select('indicator_code'),
  ])

  const paginesStatiche = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/dati`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/notizie`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/chi-siamo`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const paginaArticoli = (articoli || []).map((a) => ({
    url: `${SITE_URL}/notizie/${a.id}`,
    lastModified: a.data ? new Date(a.data) : undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const codiciUnici = [...new Set((indicatori || []).map((i) => i.indicator_code))]
  const paginaIndicatori = codiciUnici.map((code) => ({
    url: `${SITE_URL}/dati/${code}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...paginesStatiche, ...paginaArticoli, ...paginaIndicatori]
}
