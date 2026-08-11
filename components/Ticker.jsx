export default function Ticker({ indicatori }) {
  // il contenuto è duplicato due volte per ottenere un loop continuo senza scatti
  const contenuto = (
    <>
      {indicatori.map((ind, i) => (
        <span className="ticker-item" key={i}>
          <span className="ticker-label">{ind.label}</span>
          <span className="ticker-value">{ind.valore}</span>
        </span>
      ))}
    </>
  )

  return (
    <div className="ticker-dati">
      <div className="ticker-track">
        {contenuto}
        {contenuto}
      </div>
    </div>
  )
}
