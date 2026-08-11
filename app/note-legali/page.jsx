import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Nota legale',
}

export default function NoteLegaliPage() {
  return (
    <>
      <Header />

      <section className="page-header">
        <div className="container container-stretta">
          <h1>Nota legale</h1>
        </div>
      </section>

      <article className="articolo-pagina">
        <div className="container container-stretta articolo-corpo">
          <h2>Gestione del sito</h2>
          <p>
            L'Osservatorio Economico di San Marino (OESM) e' gestito da [Nome dell'organizzazione
            o persona responsabile], [Sede/Indirizzo, se disponibile]. Per contatti:{' '}
            info@oesm.net.
          </p>

          <h2>Natura dei contenuti</h2>
          <p>
            I dati, i grafici e gli articoli pubblicati su questo sito hanno finalita'
            informativa e non costituiscono consulenza economica, finanziaria o di investimento.
          </p>

          <h2>Proprieta' intellettuale</h2>
          <p>
            I testi e le analisi originali pubblicati su questo sito sono di proprieta'
            dell'Osservatorio. I dati economici sottostanti provengono dalle fonti indicate in
            ciascuna scheda e restano soggetti ai termini d'uso stabiliti dalle fonti stesse. In
            caso di riutilizzo dei dati, si richiede la citazione della fonte originale indicata
            e, quando possibile, un riferimento a questo sito.
          </p>

          <h2>Limitazione di responsabilita'</h2>
          <p>
            Pur impegnandoci a mantenere i dati accurati e aggiornati, l'Osservatorio non
            garantisce l'assenza di errori o omissioni e non e' responsabile per eventuali danni
            derivanti dall'uso delle informazioni pubblicate su questo sito.
          </p>

          <h2>Legge applicabile</h2>
          <p>Salvo diversa indicazione, questo sito e i suoi contenuti sono soggetti alla legge della Repubblica di San Marino.</p>

          <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 40 }}>
            Questo testo e' un modello di base e non sostituisce una consulenza legale. Si
            raccomanda una verifica da parte di un professionista prima della pubblicazione
            definitiva.
          </p>
        </div>
      </article>

      <Footer />
    </>
  )
}
