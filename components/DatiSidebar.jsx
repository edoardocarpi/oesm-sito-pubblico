'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DatiSidebar({ gruppi }) {
  const pathname = usePathname()

  return (
    <nav className="dati-sidebar">
      {gruppi.map((g) => (
        <div key={g.slug} className="dati-sidebar-gruppo">
          <div className="dati-sidebar-categoria">{g.etichetta}</div>
          {g.indicatori.map((ind) => {
            const href = `/dati/${ind.code}`
            const attivo = pathname === href
            return (
              <Link key={ind.code} href={href} className={`dati-sidebar-link ${attivo ? 'active' : ''}`}>
                {ind.nome}
              </Link>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
