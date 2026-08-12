// Trasforma il corpo HTML di un articolo in un breve estratto di solo testo,
// per le anteprime nelle card (Home, Notizie).
export function estrattoTesto(html, lunghezza = 130) {
  const testoPlain = (html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  if (testoPlain.length <= lunghezza) return testoPlain
  return testoPlain.slice(0, lunghezza).trim() + '…'
}

// Arrotonda e formatta un valore numerico grezzo del dataset (spesso con
// molti decimali) in qualcosa di leggibile, con separatore delle migliaia.
// Per valori grandi (es. PIL in EUR, popolazione) i centesimi non hanno
// senso (mostrare "1.990.978.241,64 EUR" è falsa precisione) — sotto la
// soglia dei mille invece i decimali contano davvero (percentuali, tassi).
export function formattaValore(valoreGrezzo) {
  const numero = parseFloat(valoreGrezzo)
  if (Number.isNaN(numero)) return valoreGrezzo
  const cifreDecimali = Math.abs(numero) >= 1000 ? 0 : 2
  return new Intl.NumberFormat('it-IT', { maximumFractionDigits: cifreDecimali }).format(numero)
}

// Alcune note nel dataset sono in realta' codici tecnici lasciati
// dall'elaborazione dati (es. "no_conversion_needed"), non testo pensato
// per il pubblico. Le riconosciamo perche' non hanno spazi e sono in
// snake_case, e le nascondiamo invece di mostrarle cosi' come sono.
export function notaVaMostrata(nota) {
  if (!nota) return false
  return !/^[a-z0-9_]+$/.test(nota)
}
