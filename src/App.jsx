import { useState, useEffect } from 'react'
import EntryForm from './components/EntryForm'
import SummaryView from './components/SummaryView'
import ShoppingList from './components/ShoppingList'
import { subscribeEntries, saveEntry, isConfigured } from './utils/db'
import './App.css'

const TABS = [
  { id: 'entry', label: '入力' },
  { id: 'summary', label: '集計' },
  { id: 'shopping', label: '買い物リスト' },
]

export default function App() {
  const [tab, setTab] = useState('entry')
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const unsubscribe = subscribeEntries(setEntries)
    return () => unsubscribe()
  }, [])

  const handleSave = async (entry) => {
    await saveEntry(entry)
  }

  if (!isConfigured) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>キャンプ準備</h1>
          <p>2026年6月6日 7名</p>
        </header>
        <div className="setup-msg">
          <p className="setup-title">Firebase の設定が必要です</p>
          <p>CLAUDE.md の「Firebase セットアップ」手順を確認してください。</p>
        </div>
      </div>
    )
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
