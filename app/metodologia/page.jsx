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
            I dati pubblicati provengono da due fonti internazionali ufficiali, aggiornate in
            modo automatico tramite le rispettive API pubbliche: il World Bank (World
            Development Indicators) e il Fondo Monetario Internazionale (World Economic
            Outlook). Non produciamo dati economici propri: raccogliamo, verifichiamo e
            riorganizziamo dati gia' pubblicati da questi enti.
          </p>
          <p>
            Le pubblicazioni ufficiali dell'Ufficio Informatica, Tecnologia, Dati e Statistica
            di San Marino (statistica.sm) e della Banca Centrale della Repubblica di San Marino
            vengono monitorate quando escono nuovi bollettini, ma al momento non sono integrate
            in modo automatico nella banca dati: pubblicano solo documenti PDF, non un formato
            interrogabile. Ogni scheda indicatore riporta comunque sempre la fonte esatta di
            quel dato specifico, sotto il grafico.
          </p>

          <h2>Quando un indicatore ha più fonti</h2>
          <p>
            Per alcuni concetti (ad esempio la crescita del PIL o l'inflazione) sia il World
            Bank sia il Fondo Monetario Internazionale pubblicano una propria serie storica. In
            questi casi la pagina mostra entrambe le fonti, selezionabili singolarmente o
            insieme nel grafico e nella tabella. Le due serie possono differire leggermente per
            via di metodologie di calcolo, tempistiche di revisione o fonti primarie diverse:
            mostrarle affiancate, invece di sceglierne una sola, è una scelta di trasparenza
            deliberata.
          </p>

          <h2>Conversione in euro</h2>
          <p>
            Quando esiste una serie già pubblicata dalla fonte in euro (la valuta nazionale di
            San Marino), la utilizziamo direttamente, senza alcuna conversione. Quando la fonte
            pubblica un valore solo in dollari statunitensi, lo convertiamo in euro con il tasso
            di cambio di riferimento medio annuo della Banca Centrale Europea, relativo
            all'anno del dato stesso.
          </p>
          <p>
            Questa conversione è disponibile solo per gli anni dal 1999 (introduzione
            dell'euro) fino all'ultimo anno solare concluso: per gli anni precedenti o per le
            proiezioni future non pubblichiamo un valore in euro, invece di calcolarne uno su
            un tasso di cambio ipotetico. I valori espressi in parità di potere d'acquisto
            (PPP) non vengono convertiti con un tasso di cambio: è un concetto economico
            diverso, non una valuta.
          </p>

          <h2>Dati stimati e proiezioni</h2>
          <p>
            Il Fondo Monetario Internazionale pubblica, insieme ai dati consuntivi, proiezioni
            per gli anni futuri. Pubblichiamo queste proiezioni solo fino a un anno oltre quello
            corrente: oltre quella soglia, per un'economia di piccole dimensioni come San
            Marino, le proiezioni tendono a ripetere lo stesso valore su più anni per assenza di
            un modello previsionale dedicato, e rischiano di dare un'impressione di precisione
            che i dati non hanno davvero. Quando un valore pubblicato è una proiezione e non un
            dato consuntivo, la scheda dell'indicatore lo segnala esplicitamente nella nota
            sotto la tabella.
          </p>

          <h2>Aggiornamento dei dati</h2>
          <p>
            Un valore viene riscritto solo quando cambia davvero rispetto a quello già
            pubblicato, non ad ogni verifica automatica. La data di ultimo aggiornamento
            riflette quindi l'ultima volta in cui la fonte originale ha pubblicato un dato
            nuovo o rivisto, non la frequenza con cui controlliamo le fonti.
          </p>

          <h2>Limiti dei dati</h2>
          <p>
            Le fonti originarie possono rivedere le proprie serie storiche nel tempo
            (revisioni statistiche successive alla prima pubblicazione): è possibile che un
            valore cambi leggermente rispetto a una versione precedente dello stesso dato. Per
            usi ufficiali o decisioni rilevanti, raccomandiamo di verificare sempre il dato
            direttamente presso la fonte originale.
          </p>

          <h2>Codice sorgente</h2>
          <p>
            Il codice che estrae, verifica e normalizza i dati pubblicati su questo sito è
            pubblico. Chiunque può controllare esattamente come nasce ogni numero sul{' '}
            <a href="https://github.com/edoardocarpi/oesm-pipeline" target="_blank" rel="noopener noreferrer">
              repository della pipeline su GitHub
            </a>.
          </p>

          <h2>Come citare questi dati</h2>
          <p>
            Se riprendi un dato pubblicato su questo sito in un articolo, una ricerca o
            un'analisi, ti chiediamo di citare sia l'Osservatorio sia la fonte originale del
            dato, indicata nella scheda dell'indicatore. Un formato di citazione suggerito:
          </p>
          <p style={{ fontStyle: 'italic', color: 'var(--muted)' }}>
            Osservatorio Economico di San Marino, dati [World Bank / Fondo Monetario
            Internazionale], consultato il [data], https://www.oesm.net/dati/[codice pagina]
          </p>
          <p>
            Per citazioni accademiche o giornalistiche che richiedono maggiore dettaglio
            metodologico (criterio di conversione, distinzione tra dato consuntivo e
            proiezione), questa stessa pagina può essere citata insieme al dato specifico.
          </p>

          <h2>Nessuna garanzia di accuratezza assoluta</h2>
          <p>
            I dati sono pubblicati "così come sono", con l'obiettivo di renderli più facili da
            trovare e confrontare. L'Osservatorio non fornisce garanzie di completa accuratezza
            e non si assume responsabilità per decisioni prese sulla base di questi dati.
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
