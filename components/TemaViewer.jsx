'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formattaValore } from '../lib/utils'

function formattaNumero(valore) {
  const assoluto = Math.abs(valore)
  if (assoluto >= 1e9) return `${(valore / 1e9).toFixed(1)} Mld`
  if (assoluto >= 1e6) return `${(valore / 1e6).toFixed(1)} M`
  if (assoluto >= 1e3) return `${(valore / 1e3).toFixed(0)} k`
  return new Intl.NumberFormat('it-IT', { maximumFractionDigits: 1 }).format(valore)
}

// fonti: [{ code, label, unita, colore }] — una per fonte disponibile per il tema
// serie: [{ anno, [code]: valore, ... }] — pivot già fatto dalla pagina server
export default function TemaViewer({ titolo, fonti, serie }) {
  const [attivi, setAttivi] = useState(fonti.map((f) => f.code))

  function toggleFonte(code) {
    setAttivi((prev) => {
      if (prev.includes(code)) {
        if (prev.length === 1) return prev // sempre almeno una fonte visibile
        return prev.filter((c) => c !== code)
      }
      return [...prev, code]
    })
  }

  const fontiAttive = fonti.filter((f) => attivi.includes(f.code))
  const unitaComune = fontiAttive[0]?.unita || ''
  const intervalloAnni = Math.max(0, Math.ceil(serie.length / 8) - 1)

  const anniConDati = serie
    .filter((riga) => fontiAttive.some((f) => riga[f.code] !== undefined))
    .map((riga) => riga.anno)
    .sort((a, b) => b - a)

  function esportaCSV() {
    const intestazione = ['anno', ...fontiAttive.map((f) => f.label)].join(',') + '\n'
    const corpo = anniConDati
      .map((anno) => {
        const riga = serie.find((r) => r.anno === anno)
        const valori = fontiAttive.map((f) => (riga?.[f.code] !== undefined ? riga[f.code] : ''))
        return [anno, ...valori].join(',')
      })
      .join('\n')
    const blob = new Blob([intestazione + corpo], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${titolo.toLowerCase().replace(/\s+/g, '-')}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      {fonti.length > 1 && (
        <div className="filtri" style={{ marginBottom: 16 }}>
          {fonti.map((f) => {
            const attivo = attivi.includes(f.code)
            return (
              <button
                key={f.code}
                className={`filtro-pill ${attivo ? 'active' : ''}`}
                style={attivo ? { backgroundColor: f.colore, borderColor: f.colore, color: '#fff' } : undefined}
                onClick={() => toggleFonte(f.code)}
              >
                {f.label}
              </button>
            )
          })}
        </div>
      )}

      <div className="indicatore-grafico">
        {serie.length === 0 ? (
          <p style={{ color: 'var(--muted)' }}>Nessun dato numerico disponibile per il grafico.</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={serie} margin={{ top: 10, right: 28, left: 0, bottom: 0 }}>
              <XAxis
                dataKey="anno"
                tick={{ fontSize: 12, fill: '#666666' }}
                axisLine={{ stroke: '#dddddd' }}
                tickLine={false}
                interval={intervalloAnni}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#666666' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={formattaNumero}
              />
              <Tooltip
                contentStyle={{
                  border: '1px solid #dddddd',
                  borderRadius: 4,
                  fontSize: 13,
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  padding: '8px 12px',
                }}
                labelFormatter={(anno) => `Anno ${anno}`}
                formatter={(valore, nome) => [`${formattaNumero(valore)} ${unitaComune}`.trim(), nome]}
              />
              {fontiAttive.length > 1 && <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />}
              {fontiAttive.map((f) => (
                <Line
                  key={f.code}
                  type="monotone"
                  dataKey={f.code}
                  name={f.label}
                  stroke={f.colore}
                  strokeWidth={1.5}
                  dot={false}
                  connectNulls
                  activeDot={{ r: 5, fill: f.colore, stroke: f.colore }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="indicatore-serie">
        {anniConDati.length === 0 ? (
          <p style={{ color: 'var(--muted)' }}>Dati non ancora disponibili.</p>
        ) : (
          <table style={{ maxWidth: Math.min(900, 240 + fontiAttive.length * 260) }}>
            <thead>
              <tr>
                <th>Anno</th>
                {fontiAttive.map((f) => (
                  <th key={f.code} className="valore-numerico">
                    {f.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {anniConDati.map((anno) => {
                const riga = serie.find((r) => r.anno === anno)
                return (
                  <tr key={anno}>
                    <td>{anno}</td>
                    {fontiAttive.map((f) => (
                      <td key={f.code} className="valore-numerico">
                        {riga?.[f.code] !== undefined ? `${formattaValore(riga[f.code])} ${f.unita}` : '—'}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="indicatore-info">
        {fontiAttive.map((f) => (
          <div key={f.code}>
            <div className="info-riga">
              <span className="info-label">Fonte</span>
              <span>{f.label}</span>
            </div>
            <div className="info-riga">
              <span className="info-label">Unita' di misura</span>
              <span>{f.unita}</span>
            </div>
          </div>
        ))}
        <div className="info-riga info-riga-azione">
          <button className="btn-esporta" onClick={esportaCSV}>
            Esporta CSV
          </button>
        </div>
      </div>
    </>
  )
}
