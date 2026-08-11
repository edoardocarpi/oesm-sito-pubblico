// Trasforma il corpo HTML di un articolo in un breve estratto di solo testo,
// per le anteprime nelle card (Home, Notizie).
export function estrattoTesto(html, lunghezza = 130) {
  const testoPlain = (html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  if (testoPlain.length <= lunghezza) return testoPlain
  return testoPlain.slice(0, lunghezza).trim() + '…'
}
