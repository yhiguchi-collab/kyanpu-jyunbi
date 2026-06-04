import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { CATEGORY_COLORS, classifyFood, classifyDrink } from '../utils/categories'

ChartJS.register(ArcElement, Tooltip, Legend)

const toName = item => typeof item === 'object' ? item.name : item

function aggregateByCategory(entries, key) {
  const classifyFn = key === 'foods' ? classifyFood : classifyDrink
  const result = {}
  entries.forEach(entry => {
    (entry[key] || []).forEach(rawItem => {
      const name = toName(rawItem)
      const category = classifyFn(name)
      if (!result[category]) result[category] = { count: 0, items: {} }
      result[category].count++
      result[category].items[name] = (result[category].items[name] || 0) + 1
    })
  })
  return result
}

function PieChart({ title, categoryData }) {
  const categories = Object.keys(categoryData)

  if (categories.length === 0) {
    return (
      <div className="chart-card">
        <h3>{title}</h3>
        <p className="no-data">まだデータがありません</p>
      </div>
    )
  }

  const total = categories.reduce((sum, cat) => sum + categoryData[cat].count, 0)

  const data = {
    labels: categories,
    datasets: [{
      data: categories.map(cat => categoryData[cat].count),
      backgroundColor: categories.map(cat => CATEGORY_COLORS[cat] ?? '#CCCCCC'),
      borderWidth: 2,
      borderColor: '#fff',
    }],
  }

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          generateLabels: (chart) => {
            const dataset = chart.data.datasets[0]
            return chart.data.labels.map((label, i) => ({
              text: `${label}  ${Math.round(dataset.data[i] / total * 100)}%`,
              fillStyle: dataset.backgroundColor[i],
              strokeStyle: dataset.backgroundColor[i],
              lineWidth: 0,
              hidden: false,
              index: i,
            }))
          },
          padding: 14,
          font: { size: 13 },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const pct = Math.round(ctx.raw / total * 100)
            return ` ${ctx.label}：${ctx.raw}人 (${pct}%)`
          },
          afterLabel: (ctx) => {
            const items = categoryData[ctx.label]?.items ?? {}
            return Object.entries(items).map(([name, count]) => `  ・${name} ×${count}`)
          },
        },
      },
    },
  }

  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <div className="chart-wrapper">
        <Pie data={data} options={options} />
      </div>
    </div>
  )
}

export default function SummaryView({ entries, onDelete, onEdit }) {
  const foodData = aggregateByCategory(entries, 'foods')
  const drinkData = aggregateByCategory(entries, 'drinks')

  return (
    <div className="summary">
      <div className="summary-header">
        <p>{entries.length} / 7名 回答済み</p>
      </div>

      <PieChart title="食べたいもの" categoryData={foodData} />
      <PieChart title="飲みたいもの" categoryData={drinkData} />

      {entries.length > 0 && (
        <div className="entries-table">
          <h3>回答一覧</h3>
          <table>
            <thead>
              <tr>
                <th>名前</th>
                <th>食べたいもの</th>
                <th>飲みたいもの</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {entries.map(e => (
                <tr key={e.id ?? e.name}>
                  <td>{e.name}</td>
                  <td>{(e.foods || []).map(toName).join('、')}</td>
                  <td>{(e.drinks || []).map(toName).join('、')}</td>
                  <td className="action-cell">
                    <button className="btn-edit" onClick={() => onEdit(e)}>編集</button>
                    <button className="btn-delete" onClick={() => onDelete(e.name)}>削除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
