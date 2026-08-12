'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// gruppi: [{ slug, etichetta, voci: [{ href, nome }] }]
// una "voce" è indifferentemente un tema multi-fonte o un indicatore singolo:
// dal punto di vista della navigazione sono la stessa cosa, un concetto con
// una pagina propria.
export default function DatiNav({ gruppi }) {
  const pathname = usePathname()

  const categoriaDiOggi = () =>
    gruppi.find((g) => g.voci.some((v) => v.href === pathname))?.slug || gruppi[0]?.slug

  const [categoriaSelezionata, setCategoriaSelezionata] = useState(categoriaDiOggi)

  // se si arriva da un link diretto a una voce di un'altra categoria,
  // la pillola di categoria giusta si seleziona da sola
  useEffect(() => {
    const corrente = categoriaDiOggi()
    if (corrente) setCategoriaSelezionata(corrente)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const gruppoAttivo = gruppi.find((g) => g.slug === categoriaSelezionata)

  return (
    <div className="dati-nav">
      <div className="filtri">
        {gruppi.map((g) => (
          <button
            key={g.slug}
            className={`filtro-pill ${categoriaSelezionata === g.slug ? 'active' : ''}`}
            onClick={() => setCategoriaSelezionata(g.slug)}
          >
            {g.etichetta}
          </button>
        ))}
      </div>

      {gruppoAttivo && (
        <div className="filtri dati-nav-indicatori">
          {gruppoAttivo.voci.map((v) => {
            const attivo = pathname === v.href
            return (
              <Link key={v.href} href={v.href} className={`filtro-pill ${attivo ? 'active' : ''}`}>
                {v.nome}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
