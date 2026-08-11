import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Metodologia',
  description: "Come vengono raccolti, verificati e pubblicati i dati dell'Osservatorio Economico di San Marino.",
}

export default function MetodologiaPage() {
  return (
    <>
      <Header />

      <section className="page-header">
        <div className="container container-stretta">
          <h1>Metodologia</h1>
        </div>
      </section>

      <article className="articolo-pagina">
        <div className="container container-stretta articolo-corpo">
          <h2>Fonti dei dati</h2>
          <p>
            Ogni indicatore pubblicato riporta la propria fonte originale (ad esempio World Bank
            o Statistica.sm) nella scheda dedicata, sotto il grafico. Non produciamo dati
            economici propri: raccogliamo, verifichiamo e riorganizziamo dati gia' pubblicati da
            enti statistici e istituzioni riconosciute.
          </p>

          <h2>Aggiornamento</h2>
          <p>
            I dati vengono controllati e aggiornati con cadenza mensile. La data dell'ultimo
            aggiornamento e' sempre visibile in homepage.
          </p>

          <h2>Trattamento e conversioni</h2>
          <p>
            Quando un valore richiede una conversione (ad esempio tra valute o unita' di misura),
            questo viene segnalato nella nota dell'indicatore, quando disponibile. In assenza di
            una nota specifica, il valore e' riportato cosi' come pubblicato dalla fonte
            originale.
          </p>

          <h2>Limiti dei dati</h2>
          <p>
            Le fonti originarie possono rivedere le proprie serie storiche nel tempo (revisioni
            statistiche successive alla prima pubblicazione): e' possibile che un valore cambi
            leggermente rispetto a una versione precedente dello stesso dato. Per usi ufficiali o
            decisioni rilevanti, raccomandiamo di verificare sempre il dato direttamente presso la
            fonte originale.
          </p>

          <h2>Nessuna garanzia di accuratezza assoluta</h2>
          <p>
            I dati sono pubblicati "cosi' come sono", con l'obiettivo di renderli piu' facili da
            trovare e confrontare. L'Osservatorio non fornisce garanzie di completa accuratezza e
            non si assume responsabilita' per decisioni prese sulla base di questi dati.
          </p>

          <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 40 }}>
            Domande sulla metodologia o su un dato specifico? Scrivi a info@oesm.net.
          </p>
        </div>
      </article>

      <Footer />
    </>
  )
}
