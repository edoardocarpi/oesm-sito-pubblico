'use client'

import { useState } from 'react'
import Link from 'next/link'

const VOCI = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'dati', label: 'Dati', href: '/dati' },
  { id: 'notizie', label: 'Notizie', href: '/notizie' },
  { id: 'chi-siamo', label: 'Chi siamo', href: '/chi-siamo' },
]

export default function Header({ attivo }) {
  const [menuAperto, setMenuAperto] = useState(false)

  return (
    <header>
      <div className="container header-row">
        <Link href="/" className="logo-wrap">
          <img src="/oesm-logo-blue.png" alt="" className="logo-icona" />
          <span className="logo">Osservatorio Economico di San Marino</span>
        </Link>

        <nav className="nav-desktop">
          {VOCI.map((v) => (
            <Link key={v.id} href={v.href} className={attivo === v.id ? 'active' : ''}>
              {v.label}
            </Link>
          ))}
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setMenuAperto((aperto) => !aperto)}
          aria-label={menuAperto ? 'Chiudi il menu' : 'Apri il menu'}
          aria-expanded={menuAperto}
        >
          {menuAperto ? '✕' : '☰'}
        </button>
      </div>

      <div className="header-linea"></div>

      {menuAperto && (
        <nav className="nav-mobile">
          {VOCI.map((v) => (
            <Link
              key={v.id}
              href={v.href}
              className={attivo === v.id ? 'active' : ''}
              onClick={() => setMenuAperto(false)}
            >
              {v.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
