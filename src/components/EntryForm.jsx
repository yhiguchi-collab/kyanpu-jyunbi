import { useState } from 'react'
import { FOOD_CATEGORIES, DRINK_CATEGORIES, CATEGORY_COLORS } from '../utils/categories'

function CategoryButtons({ categories, selected, onSelect }) {
  return (
    <div className="category-buttons">
      {categories.map(cat => (
        <button
          key={cat}
          type="button"
          className={`btn-category ${selected === cat ? 'selected' : ''}`}
          style={selected === cat ? {
            borderColor: CATEGORY_COLORS[cat],
            background: CATEGORY_COLORS[cat] + '22',
            color: CATEGORY_COLORS[cat],
          } : {}}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

export default function EntryForm({ onSave, initialEntry = null, onCancel = null }) {
  const [name, setName] = useState(initialEntry?.name ?? '')
  const [foodInput, setFoodInput] = useState('')
  const [foodCategory, setFoodCategory] = useState(FOOD_CATEGORIES[0])
  const [foods, setFoods] = useState(initialEntry?.foods ?? [])
  const [drinkInput, setDrinkInput] = useState('')
  const [drinkCategory, setDrinkCategory] = useState(DRINK_CATEGORIES[0])
  const [drinks, setDrinks] = useState(initialEntry?.drinks ?? [])
  const [submitted, setSubmitted] = useState(false)

  const isEditing = !!initialEntry

  const addFood = () => {
    const val = foodInput.trim()
    if (!val) return
    if (!foods.find(f => f.name === val && f.category === foodCategory)) {
      setFoods([...foods, { name: val, category: foodCategory }])
      setFoodInput('')
    }
  }

  const addDrink = () => {
    const val = drinkInput.trim()
    if (!val) return
    if (!drinks.find(d => d.name === val && d.category === drinkCategory)) {
      setDrinks([...drinks, { name: val, category: drinkCategory }])
      setDrinkInput('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    const finalFoods = foodInput.trim()
      ? [...foods, { name: foodInput.trim(), category: foodCategory }]
      : foods
    const finalDrinks = drinkInput.trim()
      ? [...drinks, { name: drinkInput.trim(), category: drinkCategory }]
      : drinks
    onSave({ name: name.trim(), foods: finalFoods, drinks: finalDrinks })
    if (!isEditing) setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    setName('')
    setFoods([])
    setDrinks([])
    setFoodInput('')
    setDrinkInput('')
  }

  if (submitted) {
    return (
      <div className="submitted-msg">
        <p>{name} さんの回答を保存しました。</p>
        <button className="btn-secondary" onClick={handleReset}>
          別の人が入力する
        </button>
      </div>
    )
  }

  return (
    <form className="entry-form" onSubmit={handleSubmit}>
      {isEditing && <p className="edit-label">回答を修正中：{name}</p>}

      <div className="form-field">
        <label htmlFor="name">お名前</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={e => !isEditing && setName(e.target.value)}
          placeholder="名前を入力してください"
          required
          readOnly={isEditing}
          className={isEditing ? 'input-readonly' : ''}
        />
      </div>

      <div className="form-field">
        <label>食べたいもの</label>
        <CategoryButtons
          categories={FOOD_CATEGORIES}
          selected={foodCategory}
          onSelect={setFoodCategory}
        />
        <div className="input-add-row">
          <input
            type="text"
            value={foodInput}
            onChange={e => setFoodInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFood() } }}
            placeholder="例: 焼き肉、とうもろこし"
          />
          <button type="button" className="btn-add" onClick={addFood}>追加</button>
        </div>
        <ul className="tag-list">
          {foods.map((f, i) => (
            <li key={i} className="tag-item">
              <span className="tag-dot" style={{ background: CATEGORY_COLORS[f.category] ?? '#ccc' }} />
              {f.name}
              <button type="button" onClick={() => setFoods(foods.filter((_, j) => j !== i))}>×</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="form-field">
        <label>飲みたいもの</label>
        <CategoryButtons
          categories={DRINK_CATEGORIES}
          selected={drinkCategory}
          onSelect={setDrinkCategory}
        />
        <div className="input-add-row">
          <input
            type="text"
            value={drinkInput}
            onChange={e => setDrinkInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addDrink() } }}
            placeholder="例: ビール、コーラ"
          />
          <button type="button" className="btn-add" onClick={addDrink}>追加</button>
        </div>
        <ul className="tag-list">
          {drinks.map((d, i) => (
            <li key={i} className="tag-item">
              <span className="tag-dot" style={{ background: CATEGORY_COLORS[d.category] ?? '#ccc' }} />
              {d.name}
              <button type="button" onClick={() => setDrinks(drinks.filter((_, j) => j !== i))}>×</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="form-actions">
        {onCancel && (
          <button type="button" className="btn-cancel" onClick={onCancel}>キャンセル</button>
        )}
        <button type="submit" className="btn-submit">
          {isEditing ? '修正を保存' : '回答を送信'}
        </button>
      </div>
    </form>
  )
}
