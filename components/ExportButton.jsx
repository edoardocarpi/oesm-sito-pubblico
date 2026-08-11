'use client'

export default function ExportButton({ nome, code, fonte, unita, valori }) {
  function esporta() {
    const intestazione = 'anno,valore,unita,fonte,indicatore\n'
    const righe = valori
      .map((v) => `${v.year},"${v.value_display}","${unita}","${fonte}","${nome}"`)
      .join('\n')
    const blob = new Blob([intestazione + righe], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${code}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button className="btn-esporta" onClick={esporta}>
      Esporta CSV
    </button>
  )
}
