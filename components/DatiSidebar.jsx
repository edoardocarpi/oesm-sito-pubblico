'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DatiSidebar({ gruppi }) {
  const pathname = usePathname()

  const categoriaAttivaIniziale = gruppi.find((g) =>
    g.indicatori.some((ind) => `/dati/${ind.code}` === pathname)
  )?.slug

  const [apertaSlug, setApertaSlug] = useState(categoriaAttivaIniziale || gruppi[0]?.slug)

  // se si naviga tra indicatori di categorie diverse, tiene aperta quella giusta
  useEffect(() => {
    const categoriaCorrente = gruppi.find((g) =>
      g.indicatori.some((ind) => `/dati/${ind.code}` === pathname)
    )?.slug
    if (categoriaCorrente) setApertaSlug(categoriaCorrente)
  }, [pathname, gruppi])

  return (
    <nav className="dati-sidebar">
      {gruppi.map((g) => {
        const aperta = apertaSlug === g.slug
        return (
          <div key={g.slug} className="dati-sidebar-gruppo">
            <button
              className={`dati-sidebar-categoria-btn ${aperta ? 'aperta' : ''}`}
              onClick={() => setApertaSlug(aperta ? null : g.slug)}
            >
              <span>{g.etichetta}</span>
              <span className="dati-sidebar-freccia">{aperta ? '−' : '+'}</span>
            </button>
            {aperta && (
              <div className="dati-sidebar-elenco">
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
            )}
          </div>
        )
      })}
    </nav>
  )
}
