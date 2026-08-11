import { notFound } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'
import IndicatorChart from '../../../components/IndicatorChart'
import ExportButton from '../../../components/ExportButton'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { data: righe } = await supabase
    .from('indicatori_dati')
    .select('indicator_it, source, unit_display')
    .eq('indicator_code', params.slug)
    .limit(1)

  const meta = righe?.[0]
  if (!meta) return { title: 'Indicatore non trovato' }

  return {
    title: meta.indicator_it,
    description: `Serie storica di ${meta.indicator_it}, fonte ${meta.source}, unita' di misura ${meta.unit_display}.`,
  }
}

export default async function IndicatorePage({ params }) {
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

  const nota = meta.conversion_note && meta.conversion_note !== 'null' ? meta.conversion_note : null

  return (
    <>
      <div className="indicatore-titolo">
        <div>
          <div className="eyebrow">{meta.category}</div>
          <h1>{meta.indicator_it}</h1>
        </div>
        <ExportButton
          nome={meta.indicator_it}
          code={meta.indicator_code}
          fonte={meta.source}
          unita={meta.unit_display}
          valori={righe}
        />
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
                    <td>
                      {r.value_display} {r.unit_display}
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
          <div className="info-riga">
            <span className="info-label">Nota</span>
            <span>{nota}</span>
          </div>
        )}
      </div>
    </>
  )
}
