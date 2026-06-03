import { useState } from 'react'

export default function EntryForm({ onSave, initialEntry = null, onCancel = null }) {
  const [name, setName] = useState(initialEntry?.name ?? '')
  const [foodInput, setFoodInput] = useState('')
  const [foods, setFoods] = useState(initialEntry?.foods ?? [])
  const [drinkInput, setDrinkInput] = useState('')
  const [drinks, setDrinks] = useState(initialEntry?.drinks ?? [])
  const [submitted, setSubmitted] = useState(false)

  const isEditing = !!initialEntry

  const addItem = (input, list, setList, setInput) => {
    const val = input.trim()
    if (val && !list.includes(val)) {
      setList([...list, val])
      setInput('')
    }
  }

  const removeItem = (list, setList, item) => {
    setList(list.filter(i => i !== item))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    const finalFoods = foodInput.trim() && !foods.includes(foodInput.trim())
      ? [...foods, foodInput.trim()]
      : foods
    const finalDrinks = drinkInput.trim() && !drinks.includes(drinkInput.trim())
      ? [...drinks, drinkInput.trim()]
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
      {isEditing && (
        <p className="edit-label">回答を修正中：{name}</p>
      )}

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
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addItem(foodInput, foods, setFoods, setFoodInput)
              }
            }}
            placeholder="例: 焼き肉、とうもろこし"
          />
          <button
            type="button"
            className="btn-add"
            onClick={() => addItem(foodInput, foods, setFoods, setFoodInput)}
          >
            追加
          </button>
        </div>
        <ul className="tag-list">
          {foods.map(f => (
            <li key={f} className="tag-item">
              {f}
              <button type="button" onClick={() => removeItem(foods, setFoods, f)}>×</button>
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
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addItem(drinkInput, drinks, setDrinks, setDrinkInput)
              }
            }}
            placeholder="例: ビール、コーラ"
          />
          <button
            type="button"
            className="btn-add"
            onClick={() => addItem(drinkInput, drinks, setDrinks, setDrinkInput)}
          >
            追加
          </button>
        </div>
        <ul className="tag-list">
          {drinks.map(d => (
            <li key={d} className="tag-item">
              {d}
              <button type="button" onClick={() => removeItem(drinks, setDrinks, d)}>×</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="form-actions">
        {onCancel && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            キャンセル
          </button>
        )}
        <button type="submit" className="btn-submit">
          {isEditing ? '修正を保存' : '回答を送信'}
        </button>
      </div>
    </form>
  )
}
