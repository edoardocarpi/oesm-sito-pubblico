import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Cookie Policy',
}

export default function CookiePolicyPage() {
  return (
    <>
      <Header />

      <section className="page-header">
        <div className="container container-stretta">
          <h1>Cookie Policy</h1>
        </div>
      </section>

      <article className="articolo-pagina">
        <div className="container container-stretta articolo-corpo">
          <p>Ultimo aggiornamento: agosto 2026.</p>

          <h2>Questo sito non usa cookie di profilazione</h2>
          <p>
            L'Osservatorio Economico di San Marino non installa cookie di tracciamento, non usa
            strumenti di analisi come Google Analytics, e non integra pixel o script di terze
            parti a scopo pubblicitario o di profilazione.
          </p>

          <h2>Cookie tecnici dell'infrastruttura</h2>
          <p>
            Il sito e' ospitato su Vercel. La piattaforma di hosting puo' impostare cookie
            strettamente tecnici necessari al funzionamento dell'infrastruttura (ad esempio per
            il bilanciamento del traffico), al di fuori del controllo diretto di questo sito. Non
            vengono utilizzati per identificare o profilare i visitatori.
          </p>

          <h2>Se in futuro qualcosa cambia</h2>
          <p>
            Se in futuro venissero aggiunti strumenti di analisi del traffico, questa pagina
            verra' aggiornata di conseguenza, con l'indicazione di eventuali strumenti per
            gestire il proprio consenso.
          </p>

          <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 40 }}>
            Per qualsiasi domanda su questa pagina, scrivi a info@oesm.net.
          </p>
        </div>
      </article>

      <Footer />
    </>
  )
}
