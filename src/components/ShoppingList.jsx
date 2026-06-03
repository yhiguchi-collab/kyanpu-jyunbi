import { useState } from 'react'
import { getCheckedItems, saveCheckedItems } from '../utils/storage'

function ItemSection({ title, items, checked, onToggle }) {
  return (
    <div className="shopping-section">
      <h3>{title}</h3>
      {items.length === 0 ? (
        <p className="no-data">まだデータがありません</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item} className={checked[item] ? 'done' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={!!checked[item]}
                  onChange={() => onToggle(item)}
                />
                {item}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function ShoppingList({ entries }) {
  const [checked, setChecked] = useState(() => getCheckedItems())

  const allFoods = [...new Set(entries.flatMap(e => e.foods || []))]
  const allDrinks = [...new Set(entries.flatMap(e => e.drinks || []))]

  const toggle = (item) => {
    const next = { ...checked, [item]: !checked[item] }
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
