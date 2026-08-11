import Link from 'next/link'

const VOCI = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'dati', label: 'Dati', href: '/dati' },
  { id: 'notizie', label: 'Notizie', href: '/notizie' },
  { id: 'chi-siamo', label: 'Chi siamo', href: '/chi-siamo' },
]

export default function Header({ attivo }) {
  return (
    <header>
      <div className="container header-row">
        <Link href="/" className="logo-wrap">
          <img src="/oesm-logo-blue.png" alt="" className="logo-icona" />
          <span className="logo">
            Osservatorio Economico
            <br />
            di San Marino
          </span>
        </Link>
        <nav>
          {VOCI.map((v) => (
            <Link key={v.id} href={v.href} className={attivo === v.id ? 'active' : ''}>
              {v.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
