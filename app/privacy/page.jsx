import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Privacy Policy',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <section className="page-header">
        <div className="container container-stretta">
          <h1>Privacy Policy</h1>
        </div>
      </section>

      <article className="articolo-pagina">
        <div className="container container-stretta articolo-corpo">
          <p>
            Ultimo aggiornamento: agosto 2026.
          </p>

          <h2>Titolare del trattamento</h2>
          <p>
            Edoardo Carpi, Strada Garibaldi 2/G, Parma, Italia. Contatto: info@oesm.net.
          </p>

          <h2>Dati raccolti</h2>
          <p>
            Questo sito non richiede la creazione di un account, non propone moduli di iscrizione
            a newsletter e non raccoglie dati personali forniti volontariamente dall'utente. I
            dati economici pubblicati sono dati pubblici e aggregati, non riferibili a persone
            fisiche.
          </p>
          <p>
            Come qualsiasi sito web, l'infrastruttura di hosting (Vercel) raccoglie
            automaticamente alcuni dati tecnici di navigazione — ad esempio indirizzo IP, tipo di
            browser, pagine visitate — necessari al funzionamento del servizio e alla sicurezza.
            Questi dati sono gestiti direttamente dal fornitore di hosting secondo la propria
            informativa.
          </p>

          <h2>Finalita' del trattamento</h2>
          <p>
            I dati tecnici raccolti automaticamente vengono utilizzati esclusivamente per
            garantire il corretto funzionamento e la sicurezza del sito, non per finalita' di
            profilazione o marketing.
          </p>

          <h2>Normativa applicabile</h2>
          <p>
            Il trattamento avviene nel rispetto del Regolamento (UE) 2016/679 (GDPR) e del Codice
            in materia di protezione dei dati personali (D.Lgs. 196/2003, come modificato dal
            D.Lgs. 101/2018).
          </p>

          <h2>Diritti dell'interessato</h2>
          <p>
            Per qualsiasi richiesta relativa ai propri dati personali, e' possibile scrivere a{' '}
            info@oesm.net.
          </p>
        </div>
      </article>

      <Footer />
    </>
  )
}
