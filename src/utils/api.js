const GAS_URL = import.meta.env.VITE_GAS_URL

export const isConfigured = !!GAS_URL

export async function fetchEntries() {
  if (!GAS_URL) return []
  try {
    const res = await fetch(GAS_URL)
    return await res.json()
  } catch {
    return []
  }
}

export async function saveEntry(entry) {
  if (!GAS_URL) return
  const url = `${GAS_URL}?action=save&data=${encodeURIComponent(JSON.stringify(entry))}`
  await fetch(url)
}

export async function deleteEntry(name) {
  if (!GAS_URL) return
  const url = `${GAS_URL}?action=delete&name=${encodeURIComponent(name)}`
  await fetch(url)
}
