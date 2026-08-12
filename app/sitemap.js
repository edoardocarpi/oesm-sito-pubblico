import { supabase } from '../lib/supabaseClient'
import { SITE_URL } from '../lib/site'

// Senza questo, la sitemap verrebbe generata una sola volta al momento della
// build e non includerebbe mai i nuovi articoli o indicatori pubblicati dopo.
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function sitemap() {
  const [{ data: articoli }, { data: indicatori }, { data: temi }, { data: temiFonti }] = await Promise.all([
    supabase.from('articoli').select('id, data').eq('stato', 'pubblicato'),
    supabase.from('indicatori_dati').select('indicator_code'),
    supabase.from('temi').select('slug'),
    supabase.from('temi_fonti').select('indicator_code'),
  ])

  const paginesStatiche = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/dati`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/notizie`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/chi-siamo`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.1 },
    { url: `${SITE_URL}/cookie-policy`, changeFrequency: 'yearly', priority: 0.1 },
    { url: `${SITE_URL}/metodologia`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/note-legali`, changeFrequency: 'yearly', priority: 0.1 },
  ]

  const paginaArticoli = (articoli || []).map((a) => ({
    url: `${SITE_URL}/notizie/${a.id}`,
    lastModified: a.data ? new Date(a.data) : undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // gli indicator_code assorbiti in un tema non vanno in sitemap: la loro
  // pagina ora fa solo un redirect permanente, non è più la canonica
  const codiciInTema = new Set((temiFonti || []).map((t) => t.indicator_code))
  const codiciSingoliUnici = [...new Set((indicatori || []).map((i) => i.indicator_code))].filter(
    (code) => !codiciInTema.has(code)
  )
  const paginaIndicatoriSingoli = codiciSingoliUnici.map((code) => ({
    url: `${SITE_URL}/dati/${code}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  const paginaTemi = (temi || []).map((t) => ({
    url: `${SITE_URL}/dati/${t.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...paginesStatiche, ...paginaArticoli, ...paginaIndicatoriSingoli, ...paginaTemi]
}
