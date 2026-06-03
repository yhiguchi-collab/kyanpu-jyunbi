import { useState, useCallback } from 'react'
import EntryForm from './components/EntryForm'
import SummaryView from './components/SummaryView'
import ShoppingList from './components/ShoppingList'
import { getEntries, saveEntry } from './utils/storage'
import './App.css'

const TABS = [
  { id: 'entry', label: '入力' },
  { id: 'summary', label: '集計' },
  { id: 'shopping', label: '買い物リスト' },
]

export default function App() {
  const [tab, setTab] = useState('entry')
  const [entries, setEntries] = useState(() => getEntries())

  const handleSave = useCallback((entry) => {
    saveEntry(entry)
    setEntries(getEntries())
  }, [])

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
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="tab-content">
        {tab === 'entry' && <EntryForm onSave={handleSave} />}
        {tab === 'summary' && <SummaryView entries={entries} />}
        {tab === 'shopping' && <ShoppingList entries={entries} />}
      </main>
    </div>
  )
}
