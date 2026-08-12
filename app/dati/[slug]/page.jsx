import { notFound, permanentRedirect } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'
import IndicatorChart from '../../../components/IndicatorChart'
import TemaViewer from '../../../components/TemaViewer'
import ExportButton from '../../../components/ExportButton'
import { formattaValore, notaVaMostrata } from '../../../lib/utils'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const COLORI = ['#1F51FF', '#FF6B35']

async function trovaTema(slug) {
  const { data: tema } = await supabase.from('temi').select('slug, titolo, categoria').eq('slug', slug).maybeSingle()
  if (!tema) return null

  const { data: fontiRel } = await supabase
    .from('temi_fonti')
    .select('indicator_code, ordine')
    .eq('tema_slug', slug)
    .order('ordine', { ascending: true })

  if (!fontiRel || fontiRel.length === 0) return null

  const codici = fontiRel.map((f) => f.indicator_code)
  const { data: righe } = await supabase
    .from('indicatori_dati')
    .select('indicator_code, indicator_it, source, unit_display, year, value_display')
    .in('indicator_code', codici)
    .order('year', { ascending: true })

  return { tema, codici, righe: righe || [] }
}

// se qualcuno arriva con il vecchio indicator_code di un indicatore che ora
// fa parte di un tema (link salvato, condiviso, indicizzato da Google prima
// di questo cambiamento), lo mandiamo con un redirect permanente (308) alla
// pagina del tema — non un 404, non un doppione silenzioso
async function trovaTemaDiIndicatore(indicatorCode) {
  const { data } = await supabase
    .from('temi_fonti')
    .select('tema_slug')
    .eq('indicator_code', indicatorCode)
    .maybeSingle()
  return data?.tema_slug || null
}

export async function generateMetadata({ params }) {
  const risultatoTema = await trovaTema(params.slug)
  if (risultatoTema) {
    return {
      title: risultatoTema.tema.titolo,
      description: `${risultatoTema.tema.titolo} di San Marino: serie storica confrontata tra le fonti ufficiali disponibili.`,
    }
  }

  const { data: righe } = await supabase
    .from('indicatori_dati')
    .select('indicator_it, source, unit_display')
    .eq('indicator_code', params.slug)
    .limit(1)

  const meta = righe?.[0]
  if (!meta) return { title: 'Indicatore non trovato' }

  return {
    title: meta.indicator_it,
    description: `${meta.indicator_it} di San Marino: serie storica, fonte ${meta.source}, unità di misura ${meta.unit_display}.`,
  }
}

export default async function DatiPage({ params }) {
  // 1) è un tema (più fonti ufficiali per lo stesso concetto)?
  const risultatoTema = await trovaTema(params.slug)
  if (risultatoTema) {
    const { tema, codici, righe } = risultatoTema
    if (righe.length === 0) notFound()

    const fonti = codici.map((code, i) => {
      const prima = righe.find((r) => r.indicator_code === code)
      return {
        code,
        label: prima?.source || code,
        unita: prima?.unit_display || '',
        colore: COLORI[i % COLORI.length],
      }
    })

    const perAnno = {}
    righe.forEach((r) => {
      const valore = parseFloat(r.value_display)
      if (Number.isNaN(valore)) return
      perAnno[r.year] = perAnno[r.year] || { anno: r.year }
      perAnno[r.year][r.indicator_code] = valore
    })
    const serie = Object.values(perAnno).sort((a, b) => a.anno - b.anno)

    return (
      <>
        <div className="indicatore-titolo">
          <h1>{tema.titolo}</h1>
        </div>
        <TemaViewer titolo={tema.titolo} fonti={fonti} serie={serie} />
      </>
    )
  }

  // 2) è un indicator_code diretto che ora fa parte di un tema? redirect permanente
  const temaSlug = await trovaTemaDiIndicatore(params.slug)
  if (temaSlug) {
    permanentRedirect(`/dati/${temaSlug}`)
  }

  // 3) pagina singola classica (indicatore a fonte unica) — comportamento invariato
  const { data: righe } = await supabase
    .from('indicatori_dati')
    .select('*')
    .eq('indicator_code', params.slug)
    .order('year', { ascending: true })

  if (!righe || righe.length === 0) {
    notFound()
  }

  const meta = righe[0]
  const righeConDati = righe.filter((r) => r.value_display && r.value_display !== 'null')
  const serie = righe
    .map((r) => ({ anno: r.year, valore: parseFloat(r.value_display) }))
    .filter((r) => !Number.isNaN(r.valore))

  const notaGrezza = meta.conversion_note && meta.conversion_note !== 'null' ? meta.conversion_note : null
  const nota = notaVaMostrata(notaGrezza) ? notaGrezza : null

  return (
    <>
      <div className="indicatore-titolo">
        <h1>{meta.indicator_it}</h1>
      </div>

      <div className="indicatore-grafico">
        <IndicatorChart dati={serie} unita={meta.unit_display} />
      </div>

      <div className="indicatore-serie">
        {righeConDati.length === 0 ? (
          <p style={{ color: 'var(--muted)' }}>Dati non ancora disponibili per questo indicatore.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Anno</th>
                <th>Valore</th>
              </tr>
            </thead>
            <tbody>
              {righeConDati
                .slice()
                .reverse()
                .map((r) => (
                  <tr key={r.year}>
                    <td>{r.year}</td>
                    <td className="valore-numerico">
                      {formattaValore(r.value_display)} {r.unit_display}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="indicatore-info">
        <div className="info-riga">
          <span className="info-label">Fonte</span>
          <span>{meta.source}</span>
        </div>
        <div className="info-riga">
          <span className="info-label">Unita' di misura</span>
          <span>{meta.unit_display}</span>
        </div>
        {nota && (
          <div className="info-riga info-riga-nota">
            <span className="info-label">Nota</span>
            <span>{nota}</span>
          </div>
        )}
        <div className="info-riga info-riga-azione">
          <ExportButton
            nome={meta.indicator_it}
            code={meta.indicator_code}
            fonte={meta.source}
            unita={meta.unit_display}
            valori={righe}
          />
        </div>
      </div>
    </>
  )
}
