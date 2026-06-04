import { useState } from 'react'
import { getCheckedItems, saveCheckedItems } from '../utils/storage'
import { CATEGORY_COLORS, classifyFood, classifyDrink } from '../utils/categories'

const toName = item => typeof item === 'object' ? item.name : item

function ItemSection({ title, items, classifyFn, checked, onToggle }) {
  return (
    <div className="shopping-section">
      <h3>{title}</h3>
      {items.length === 0 ? (
        <p className="no-data">まだデータがありません</p>
      ) : (
        <ul>
          {items.map((name, i) => (
            <li key={i} className={checked[name] ? 'done' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={!!checked[name]}
                  onChange={() => onToggle(name)}
                />
                <span className="tag-dot" style={{ background: CATEGORY_COLORS[classifyFn(name)] ?? '#aaa' }} />
                {name}
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

  const seen1 = new Set()
  const allFoods = entries.flatMap(e => (e.foods || []).map(toName)).filter(n => {
    if (seen1.has(n)) return false
    seen1.add(n); return true
  })

  const seen2 = new Set()
  const allDrinks = entries.flatMap(e => (e.drinks || []).map(toName)).filter(n => {
    if (seen2.has(n)) return false
    seen2.add(n); return true
  })

  const toggle = (name) => {
    const next = { ...checked, [name]: !checked[name] }
    setChecked(next)
    saveCheckedItems(next)
  }

  return (
    <div className="shopping-list">
      <ItemSection title="食べ物" items={allFoods} classifyFn={classifyFood} checked={checked} onToggle={toggle} />
      <ItemSection title="飲み物" items={allDrinks} classifyFn={classifyDrink} checked={checked} onToggle={toggle} />
    </div>
  )
}
