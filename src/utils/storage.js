const ENTRIES_KEY = 'kyanpu-entries'
const CHECKED_KEY = 'kyanpu-checked'

export function getEntries() {
  try {
    return JSON.parse(localStorage.getItem(ENTRIES_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveEntry(entry) {
  const entries = getEntries()
  const idx = entries.findIndex(e => e.name === entry.name)
  if (idx >= 0) {
    entries[idx] = { ...entries[idx], ...entry }
  } else {
    entries.push({ ...entry, id: `${Date.now()}-${Math.random()}` })
  }
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries))
}

export function getCheckedItems() {
  try {
    return JSON.parse(localStorage.getItem(CHECKED_KEY) || '{}')
  } catch {
    return {}
  }
}

export function saveCheckedItems(items) {
  localStorage.setItem(CHECKED_KEY, JSON.stringify(items))
}

export function deleteEntry(name) {
  const entries = getEntries().filter(e => e.name !== name)
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries))
}
