import { supabase } from '../../../lib/supabaseClient'
import { SITE_URL, SITE_NAME } from '../../../lib/site'
import { estrattoTesto } from '../../../lib/utils'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function escapeXml(testo) {
  return (testo || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function GET() {
  const { data: articoli } = await supabase
    .from('articoli')
    .select('*')
    .eq('stato', 'pubblicato')
    .order('data', { ascending: false })
    .limit(30)

  const voci = (articoli || [])
    .map((a) => {
      const link = `${SITE_URL}/notizie/${a.id}`
      const dataPubblicazione = new Date(a.data).toUTCString()
      return `
    <item>
      <title>${escapeXml(a.titolo)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${dataPubblicazione}</pubDate>
      <description>${escapeXml(estrattoTesto(a.corpo, 300))}</description>
    </item>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_NAME} — Notizie</title>
    <link>${SITE_URL}/notizie</link>
    <description>Comunicati e analisi sull'economia di San Marino.</description>
    <language>it</language>${voci}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
