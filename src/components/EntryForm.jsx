import { useState } from 'react'
import { CATEGORY_COLORS, classifyFood, classifyDrink } from '../utils/categories'

export default function EntryForm({ onSave, initialEntry = null, onCancel = null }) {
  const toName = item => typeof item === 'object' ? item.name : item

  const [name, setName] = useState(initialEntry?.name ?? '')
  const [foodInput, setFoodInput] = useState('')
  const [foods, setFoods] = useState((initialEntry?.foods ?? []).map(toName))
  const [drinkInput, setDrinkInput] = useState('')
  const [drinks, setDrinks] = useState((initialEntry?.drinks ?? []).map(toName))
  const [submitted, setSubmitted] = useState(false)

  const isEditing = !!initialEntry

  const splitInput = (val) =>
    val.split(/[,、\s]+/).map(s => s.trim()).filter(Boolean)

  const addFood = () => {
    const items = splitInput(foodInput)
    if (items.length === 0) return
    setFoods([...foods, ...items.filter(s => !foods.includes(s))])
    setFoodInput('')
  }

  const addDrink = () => {
    const items = splitInput(drinkInput)
    if (items.length === 0) return
    setDrinks([...drinks, ...items.filter(s => !drinks.includes(s))])
    setDrinkInput('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    const pendingFoods = splitInput(foodInput).filter(s => !foods.includes(s))
    const finalFoods = [...foods, ...pendingFoods]
    const pendingDrinks = splitInput(drinkInput).filter(s => !drinks.includes(s))
    const finalDrinks = [...drinks, ...pendingDrinks]
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
        <div className="input-add-row">
          <input
            type="text"
            value={foodInput}
            onChange={e => setFoodInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFood() } }}
            placeholder="例: 焼き肉、とうもろこし、エビ"
          />
          <button type="button" className="btn-add" onClick={addFood}>追加</button>
        </div>
        <ul className="tag-list">
          {foods.map((f, i) => (
            <li key={i} className="tag-item">
              <span className="tag-dot" style={{ background: CATEGORY_COLORS[classifyFood(f)] }} />
              {f}
              <button type="button" onClick={() => setFoods(foods.filter((_, j) => j !== i))}>×</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="form-field">
        <label>飲みたいもの</label>
        <div className="input-add-row">
          <input
            type="text"
            value={drinkInput}
            onChange={e => setDrinkInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addDrink() } }}
            placeholder="例: ビール、コーラ、お茶"
          />
          <button type="button" className="btn-add" onClick={addDrink}>追加</button>
        </div>
        <ul className="tag-list">
          {drinks.map((d, i) => (
            <li key={i} className="tag-item">
              <span className="tag-dot" style={{ background: CATEGORY_COLORS[classifyDrink(d)] }} />
              {d}
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
