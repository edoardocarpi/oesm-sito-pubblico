import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'

export default async function Footer() {
  const [{ data: categorie }, { data: pagina }] = await Promise.all([
    supabase.from('categorie').select('slug, etichetta').order('ordine', { ascending: true }),
    supabase.from('pagine').select('campi').eq('id', 'chi-siamo').single(),
  ])

  const contatti = pagina?.campi?.contatti || ''
  const righeContatti = contatti.split('\n').map((r) => r.trim()).filter(Boolean)

  return (
    <footer>
      <div className="container">
        <div className="footer-row">
          <div className="footer-col">
            <div className="footer-col-title">Osservatorio</div>
            <Link href="/">Home</Link>
            <Link href="/dati">Dati</Link>
            <Link href="/notizie">Notizie</Link>
            <Link href="/chi-siamo">Chi siamo</Link>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Dati per categoria</div>
            {(categorie || []).map((c) => (
              <Link key={c.slug} href="/dati">
                {c.etichetta}
              </Link>
            ))}
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Contatti</div>
            {righeContatti.length > 0 ? (
              righeContatti.map((riga, i) => <div key={i}>{riga}</div>)
            ) : (
              <div>Contatti da inserire nel CMS</div>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-brand">
            <img src="/oesm-logo-blue.png" alt="" className="logo-icona" />
            <span>&copy; {new Date().getFullYear()} Osservatorio Economico di San Marino</span>
          </div>
          <div>Dati aggiornati mensilmente</div>
        </div>
      </div>
    </footer>
  )
}
