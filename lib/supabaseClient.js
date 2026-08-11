import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    'Variabili Supabase mancanti. Copia .env.example in .env.local e inserisci i tuoi valori.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)
