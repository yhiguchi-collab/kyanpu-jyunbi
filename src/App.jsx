import { useState, useEffect, useCallback } from 'react'
import EntryForm from './components/EntryForm'
import SummaryView from './components/SummaryView'
import ShoppingList from './components/ShoppingList'
import { isConfigured, fetchEntries, saveEntry as saveToGAS, deleteEntry as deleteFromGAS } from './utils/api'
import { getEntries, saveEntry as saveToLocal, deleteEntry as deleteFromLocal } from './utils/storage'
import './App.css'

const TABS = [
  { id: 'entry', label: '入力' },
  { id: 'summary', label: '集計' },
  { id: 'shopping', label: '買い物リスト' },
]

export default function App() {
  const [tab, setTab] = useState('entry')
  const [entries, setEntries] = useState(() => isConfigured ? [] : getEntries())
  const [editingEntry, setEditingEntry] = useState(null)

  const refresh = useCallback(() => {
    if (isConfigured) {
      fetchEntries().then(data => { if (Array.isArray(data)) setEntries(data) })
    } else {
      setEntries(getEntries())
    }
  }, [])

  useEffect(() => {
    if (!isConfigured) return
    refresh()
    const id = setInterval(refresh, 10000)
    return () => clearInterval(id)
  }, [refresh])

  const handleSave = async (entry) => {
    const wasEditing = !!editingEntry
    if (isConfigured) {
      await saveToGAS(entry)
      setTimeout(refresh, 1500)
    } else {
      saveToLocal(entry)
      setEntries(getEntries())
    }
    setEditingEntry(null)
    if (wasEditing) setTab('summary')
  }

  const handleDelete = async (name) => {
    if (!window.confirm(`「${name}」の回答を削除しますか？`)) return
    if (isConfigured) {
      await deleteFromGAS(name)
      setTimeout(refresh, 1500)
    } else {
      deleteFromLocal(name)
      setEntries(getEntries())
    }
  }

  const handleEdit = (entry) => {
    setEditingEntry(entry)
    setTab('entry')
  }

  const handleCancelEdit = () => setEditingEntry(null)

  const handleTabChange = (id) => {
    setTab(id)
    if (id !== 'entry') setEditingEntry(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>キャンプ準備</h1>
        <p>2026年6月6日 7名</p>
      </header>

      <nav className="tab-nav">
        {TABS.map(t => (
          <button
            key={t.id}
            className={tab === t.id ? 'active' : ''}
            onClick={() => handleTabChange(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="tab-content">
        {tab === 'entry' && (
          <EntryForm
            key={editingEntry?.name ?? 'new'}
            onSave={handleSave}
            initialEntry={editingEntry}
            onCancel={editingEntry ? handleCancelEdit : null}
          />
        )}
        {tab === 'summary' && (
          <SummaryView
            entries={entries}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
        {tab === 'shopping' && <ShoppingList entries={entries} />}
      </main>
    </div>
  )
}
