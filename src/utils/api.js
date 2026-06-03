import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isConfigured = !!(supabaseUrl && supabaseKey)

let supabase = null
if (isConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey)
  } catch (e) {
    console.error('Supabase 初期化エラー:', e)
  }
}

export async function fetchEntries() {
  if (!supabase) return []
  try {
    const { data, error } = await supabase.from('entries').select('*').order('id')
    if (error) { console.error(error); return [] }
    return data || []
  } catch (e) {
    console.error(e)
    return []
  }
}

export async function saveEntry(entry) {
  if (!supabase) return
  try {
    const { error } = await supabase
      .from('entries')
      .upsert({ name: entry.name, foods: entry.foods, drinks: entry.drinks }, { onConflict: 'name' })
    if (error) console.error(error)
  } catch (e) {
    console.error(e)
  }
}

export async function deleteEntry(name) {
  if (!supabase) return
  try {
    const { error } = await supabase.from('entries').delete().eq('name', name)
    if (error) console.error(error)
  } catch (e) {
    console.error(e)
  }
}
