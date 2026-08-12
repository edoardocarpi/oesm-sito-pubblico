'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// gruppi: [{ slug, etichetta, voci: [{ href, nome }] }]
//
// Comportamento: di default (e ad ogni cambio pagina) la barra mostra solo
// la categoria e l'indicatore correnti, in stile breadcrumb compatto —
// non tutte le opzioni sempre a vista. Cliccando la pillola compatta di un
// livello, quel livello si espande mostrando tutte le opzioni disponibili
// (per scegliere qualcos'altro); scegliendone una, il livello si richiude
// di nuovo alla vista compatta.
export default function DatiNav({ gruppi }) {
  const pathname = usePathname()

  const categoriaDiOggi = () =>
    gruppi.find((g) => g.voci.some((v) => v.href === pathname))?.slug || gruppi[0]?.slug

  const [categoriaSelezionata, setCategoriaSelezionata] = useState(categoriaDiOggi)
  const [categorieEspanse, setCategorieEspanse] = useState(false)
  const [vociEspanse, setVociEspanse] = useState(false)

  // ad ogni nuova pagina si riparte dalla vista compatta: categoria e
  // indicatore correnti in evidenza, il resto nascosto finché non lo si chiede
  useEffect(() => {
    const corrente = categoriaDiOggi()
    if (corrente) setCategoriaSelezionata(corrente)
    setCategorieEspanse(false)
    setVociEspanse(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const gruppoAttivo = gruppi.find((g) => g.slug === categoriaSelezionata)

  function selezionaCategoria(slug) {
    setCategoriaSelezionata(slug)
    setCategorieEspanse(false)
    // se questa categoria non è quella della pagina che si sta guardando,
    // non c'è ancora un indicatore "scelto" al suo interno — apriamo subito
    // l'elenco per farlo scegliere, invece di indovinarne uno a caso
    const haVoceAttivaQui = gruppi.find((g) => g.slug === slug)?.voci.some((v) => v.href === pathname)
    setVociEspanse(!haVoceAttivaQui)
  }

  const voceAttiva = gruppoAttivo?.voci.find((v) => v.href === pathname) || gruppoAttivo?.voci[0]

  return (
    <div className="dati-nav">
      <div className="filtri">
        {categorieEspanse
          ? gruppi.map((g) => (
              <button
                key={g.slug}
                className={`filtro-pill ${categoriaSelezionata === g.slug ? 'active' : ''}`}
                onClick={() => selezionaCategoria(g.slug)}
              >
                {g.etichetta}
              </button>
            ))
          : gruppoAttivo && (
              <button className="filtro-pill active" onClick={() => setCategorieEspanse(true)}>
                {gruppoAttivo.etichetta}
              </button>
            )}
      </div>

      {gruppoAttivo && (
        <div className="filtri dati-nav-indicatori">
          {vociEspanse
            ? gruppoAttivo.voci.map((v) => {
                const attivo = pathname === v.href
                return (
                  <Link
                    key={v.href}
                    href={v.href}
                    className={`filtro-pill filtro-pill-indicatore ${attivo ? 'active' : ''}`}
                  >
                    {v.nome}
                  </Link>
                )
              })
            : voceAttiva && (
                <button
                  className="filtro-pill filtro-pill-indicatore active"
                  onClick={() => setVociEspanse(true)}
                >
                  {voceAttiva.nome}
                </button>
              )}
        </div>
      )}
    </div>
  )
}
