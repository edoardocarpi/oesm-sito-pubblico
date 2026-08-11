'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function formattaNumero(valore) {
  const assoluto = Math.abs(valore)
  if (assoluto >= 1e9) return `${(valore / 1e9).toFixed(1)} Mld`
  if (assoluto >= 1e6) return `${(valore / 1e6).toFixed(1)} M`
  if (assoluto >= 1e3) return `${(valore / 1e3).toFixed(0)} k`
  return new Intl.NumberFormat('it-IT', { maximumFractionDigits: 1 }).format(valore)
}

export default function IndicatorChart({ dati, unita }) {
  if (!dati || dati.length === 0) {
    return <p style={{ color: 'var(--muted)' }}>Nessun dato numerico disponibile per il grafico.</p>
  }

  // mostra al massimo circa 8 etichette sull'asse X, indipendentemente
  // da quanti anni ci sono, per non affollare il grafico
  const intervalloAnni = Math.max(0, Math.ceil(dati.length / 8) - 1)

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={dati} margin={{ top: 10, right: 28, left: 0, bottom: 0 }}>
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
          width={64}
          tickFormatter={formattaNumero}
        />
        <Tooltip
          contentStyle={{ border: '1px solid #dddddd', borderRadius: 4, fontSize: 13, fontFamily: 'Arial, Helvetica, sans-serif', padding: '8px 12px' }}
          labelStyle={{ color: '#111111', fontWeight: 'bold', marginBottom: 2 }}
          labelFormatter={(anno) => `Anno ${anno}`}
          formatter={(valore) => [`${formattaNumero(valore)} ${unita || ''}`.trim(), '']}
          separator=""
        />
        <Line
          type="monotone"
          dataKey="valore"
          stroke="#1F51FF"
          strokeWidth={1.5}
          dot={false}
          activeDot={{ r: 5, fill: '#1F51FF', stroke: '#1F51FF' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
