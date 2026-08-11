'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DatiNav({ gruppi }) {
  const pathname = usePathname()

  const categoriaDiOggi = () =>
    gruppi.find((g) => g.indicatori.some((ind) => `/dati/${ind.code}` === pathname))?.slug || gruppi[0]?.slug

  const [categoriaSelezionata, setCategoriaSelezionata] = useState(categoriaDiOggi)

  // se si arriva da un link diretto a un indicatore di un'altra categoria,
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
          {gruppoAttivo.indicatori.map((ind) => {
            const href = `/dati/${ind.code}`
            const attivo = pathname === href
            return (
              <Link key={ind.code} href={href} className={`filtro-pill ${attivo ? 'active' : ''}`}>
                {ind.nome}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
