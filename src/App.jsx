import { useState, useEffect, useCallback } from 'react'
import EntryForm from './components/EntryForm'
import SummaryView from './components/SummaryView'
import ShoppingList from './components/ShoppingList'
import { fetchEntries, saveEntry, isConfigured } from './utils/api'
import './App.css'

const TABS = [
  { id: 'entry', label: '入力' },
  { id: 'summary', label: '集計' },
  { id: 'shopping', label: '買い物リスト' },
]

export default function App() {
  const [tab, setTab] = useState('entry')
  const [entries, setEntries] = useState([])

  const refresh = useCallback(() => {
    fetchEntries().then(data => {
      if (Array.isArray(data)) setEntries(data)
    })
  }, [])

  useEffect(() => {
    if (!isConfigured) return
    refresh()
    const id = setInterval(refresh, 10000)
    return () => clearInterval(id)
  }, [refresh])

  const handleSave = async (entry) => {
    await saveEntry(entry)
    // GAS の処理完了を待ってから再取得
    setTimeout(refresh, 2000)
  }

  if (!isConfigured) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>キャンプ準備</h1>
          <p>2026年6月6日 7名</p>
        </header>
        <div className="setup-msg">
          <p className="setup-title">GAS の設定が必要です</p>
          <p>CLAUDE.md の「GAS セットアップ」手順を確認してください。</p>
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
