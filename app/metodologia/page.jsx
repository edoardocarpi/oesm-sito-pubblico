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
            I dati pubblicati arrivano da due fonti internazionali ufficiali, aggiornate
            automaticamente: il World Bank e il Fondo Monetario Internazionale. Non produciamo
            dati economici propri: raccogliamo, verifichiamo e riorganizziamo dati già
            pubblicati da questi enti. Ogni scheda indicatore riporta la fonte esatta di quel
            dato, sotto il grafico.
          </p>
          <p>
            Le pubblicazioni ufficiali di San Marino (Ufficio Statistica, Banca Centrale) sono
            solo documenti PDF, non un formato leggibile automaticamente: le monitoriamo, ma
            oggi non fanno ancora parte della raccolta automatica dei dati.
          </p>

          <h2>Quando un indicatore ha più fonti</h2>
          <p>
            Per alcuni dati, come la crescita del PIL o l'inflazione, sia il World Bank sia il
            Fondo Monetario Internazionale pubblicano una propria serie. In questi casi
            mostriamo entrambe, selezionabili nel grafico e nella tabella, perché possono
            differire leggermente e preferiamo lasciarti vedere entrambe piuttosto che
            sceglierne una per te.
          </p>

          <h2>Conversione in euro</h2>
          <p>
            Quando una fonte pubblica già un dato in euro, lo usiamo così com'è. Quando lo
            pubblica solo in dollari, lo convertiamo con il tasso di cambio medio annuo della
            Banca Centrale Europea. Questo è possibile solo per gli anni già conclusi dal 1999
            in poi: per gli anni futuri, o precedenti al 1999, non pubblichiamo un valore in
            euro, perché non esiste un tasso di cambio reale da usare.
          </p>
          <p>
            I valori espressi in parità di potere d'acquisto non vengono convertiti: non sono
            legati a un tasso di cambio.
          </p>

          <h2>Proiezioni</h2>
          <p>
            Il Fondo Monetario Internazionale pubblica anche proiezioni per gli anni futuri.
            Mostriamo queste proiezioni solo per l'anno corrente e il successivo: più avanti
            nel tempo, per un'economia piccola come San Marino, i numeri tendono a ripetersi
            anno dopo anno e non aggiungono informazione utile. Quando un valore è una
            proiezione e non un dato consuntivo, la pagina lo segnala nella nota sotto la
            tabella.
          </p>

          <h2>Aggiornamento dei dati</h2>
          <p>
            Un valore viene aggiornato solo quando cambia davvero rispetto a quello già
            pubblicato. La data di ultimo aggiornamento riflette quindi l'ultima volta che la
            fonte ha pubblicato qualcosa di nuovo, non la frequenza con cui controlliamo i
            dati.
          </p>

          <h2>Revisioni</h2>
          <p>
            Le fonti possono rivedere i propri dati storici nel tempo. Se un valore che avevi
            consultato in passato oggi risulta leggermente diverso, è quasi sempre per questo
            motivo. Per usi ufficiali o decisioni importanti, verifica sempre il dato
            direttamente presso la fonte originale.
          </p>

          <h2>Codice sorgente</h2>
          <p>
            Il codice che raccoglie e verifica questi dati è pubblico, su{' '}
            <a href="https://github.com/edoardocarpi/oesm-pipeline" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>.
          </p>

          <h2>Come citare questi dati</h2>
          <p>
            Se riprendi un dato pubblicato qui, cita sia l'Osservatorio sia la fonte originale
            indicata nella scheda dell'indicatore. Ad esempio:
          </p>
          <p style={{ fontStyle: 'italic', color: 'var(--muted)' }}>
            Osservatorio Economico di San Marino, dati World Bank / Fondo Monetario
            Internazionale, consultato il [data], oesm.net
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
