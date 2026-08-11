# Osservatorio Economico San Marino. Sito pubblico

Sito Next.js che legge in sola lettura dallo stesso Supabase usato dal CMS.

## Installazione

```
npm install
cp .env.example .env.local
```
Incolla in `.env.local` gli stessi valori Supabase del CMS.

```
npm run dev
```
Si apre su `http://localhost:3000`.

## Immagini

Le immagini statiche (logo, illustrazioni) vivono in `public/`. Quelle degli
articoli (copertine, immagini nel corpo) vengono invece da Supabase Storage,
caricate dal CMS.

## Cache e aggiornamenti dal CMS

Tutte le pagine hanno `export const dynamic = 'force-dynamic'`: Next.js
rilegge sempre Supabase, non tiene mai in cache l'HTML generato. Le
modifiche fatte dal CMS compaiono online alla visita successiva.

Se qualcosa non si aggiorna nonostante questo, il sospetto numero uno e' la
cache di build di Next.js:
```
rm -rf .next
npm run dev
```

## Deploy

Push su GitHub, importa il repository su Vercel, imposta le stesse
variabili d'ambiente nel progetto Vercel (incluso `NEXT_PUBLIC_SITE_URL`
con l'indirizzo vero una volta noto).
