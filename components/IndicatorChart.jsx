'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function IndicatorChart({ dati, unita }) {
  if (!dati || dati.length === 0) {
    return <p style={{ color: 'var(--muted)' }}>Nessun dato numerico disponibile per il grafico.</p>
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={dati} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <XAxis dataKey="anno" tick={{ fontSize: 12, fill: '#666666' }} axisLine={{ stroke: '#dddddd' }} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#666666' }} axisLine={false} tickLine={false} width={54} />
        <Tooltip
          contentStyle={{ border: '1px solid #dddddd', borderRadius: 4, fontSize: 13, fontFamily: 'Arial, Helvetica, sans-serif', padding: '8px 12px' }}
          labelStyle={{ color: '#111111', fontWeight: 'bold', marginBottom: 2 }}
          labelFormatter={(anno) => `Anno ${anno}`}
          formatter={(valore) => [`${valore} ${unita || ''}`.trim(), '']}
          separator=""
        />
        <Line
          type="monotone"
          dataKey="valore"
          stroke="#111111"
          strokeWidth={1.5}
          dot={false}
          activeDot={{ r: 5, fill: '#1F51FF', stroke: '#1F51FF' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
