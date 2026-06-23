import { createClient } from '@supabase/supabase-js'

// Rellena estos valores con los de tu proyecto Supabase
// Los encuentras en: Settings → API → Project URL / anon key
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://tu-proyecto.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'tu-anon-key'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
