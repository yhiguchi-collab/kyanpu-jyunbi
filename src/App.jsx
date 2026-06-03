import { useState } from 'react'
import EntryForm from './components/EntryForm'
import SummaryView from './components/SummaryView'
import ShoppingList from './components/ShoppingList'
import { getEntries, saveEntry, deleteEntry } from './utils/storage'
import './App.css'

const TABS = [
  { id: 'entry', label: '入力' },
  { id: 'summary', label: '集計' },
  { id: 'shopping', label: '買い物リスト' },
]

export default function App() {
  const [tab, setTab] = useState('entry')
  const [entries, setEntries] = useState(() => getEntries())
  const [editingEntry, setEditingEntry] = useState(null)

  const handleSave = (entry) => {
    const wasEditing = !!editingEntry
    saveEntry(entry)
    setEntries(getEntries())
    setEditingEntry(null)
    if (wasEditing) setTab('summary')
  }

  const handleDelete = (name) => {
    if (!window.confirm(`「${name}」の回答を削除しますか？`)) return
    deleteEntry(name)
    setEntries(getEntries())
  }

  const handleEdit = (entry) => {
    setEditingEntry(entry)
    setTab('entry')
  }

  const handleCancelEdit = () => {
    setEditingEntry(null)
  }

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
