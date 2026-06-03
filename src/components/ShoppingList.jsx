import { useState } from 'react'
import { getCheckedItems, saveCheckedItems } from '../utils/storage'
import { CATEGORY_COLORS } from '../utils/categories'

const itemName = (item) => typeof item === 'object' ? item.name : item
const itemCategory = (item) => typeof item === 'object' ? item.category : null

function ItemSection({ title, items, checked, onToggle }) {
  return (
    <div className="shopping-section">
      <h3>{title}</h3>
      {items.length === 0 ? (
        <p className="no-data">まだデータがありません</p>
      ) : (
        <ul>
          {items.map((item, i) => {
            const name = itemName(item)
            const color = CATEGORY_COLORS[itemCategory(item)] ?? '#aaa'
            return (
              <li key={i} className={checked[name] ? 'done' : ''}>
                <label>
                  <input
                    type="checkbox"
                    checked={!!checked[name]}
                    onChange={() => onToggle(name)}
                  />
                  <span className="tag-dot" style={{ background: color }} />
                  {name}
                </label>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default function ShoppingList({ entries }) {
  const [checked, setChecked] = useState(() => getCheckedItems())

  // 同名アイテムは重複除去
  const seen = new Set()
  const allFoods = entries.flatMap(e => e.foods || []).filter(item => {
    const name = itemName(item)
    if (seen.has(name)) return false
    seen.add(name)
    return true
  })
  const seen2 = new Set()
  const allDrinks = entries.flatMap(e => e.drinks || []).filter(item => {
    const name = itemName(item)
    if (seen2.has(name)) return false
    seen2.add(name)
    return true
  })

  const toggle = (name) => {
    const next = { ...checked, [name]: !checked[name] }
    setChecked(next)
    saveCheckedItems(next)
  }

  return (
    <div className="shopping-list">
      <ItemSection title="食べ物" items={allFoods} checked={checked} onToggle={toggle} />
      <ItemSection title="飲み物" items={allDrinks} checked={checked} onToggle={toggle} />
    </div>
  )
}
