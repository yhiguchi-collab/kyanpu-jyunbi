import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const PIE_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEAA7', '#C39BD3', '#85C1E9', '#F0B27A',
]

function aggregateCounts(entries, key) {
  const counts = {}
  entries.forEach(entry => {
    (entry[key] || []).forEach(item => {
      counts[item] = (counts[item] || 0) + 1
    })
  })
  return counts
}

function PieChart({ title, counts }) {
  const entries = Object.entries(counts)

  if (entries.length === 0) {
    return (
      <div className="chart-card">
        <h3>{title}</h3>
        <p className="no-data">まだデータがありません</p>
      </div>
    )
  }

  const total = entries.reduce((sum, [, v]) => sum + v, 0)

  const data = {
    labels: entries.map(([label]) => label),
    datasets: [{
      data: entries.map(([, v]) => v),
      backgroundColor: PIE_COLORS.slice(0, entries.length),
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
  const foodCounts = aggregateCounts(entries, 'foods')
  const drinkCounts = aggregateCounts(entries, 'drinks')

  return (
    <div className="summary">
      <div className="summary-header">
        <p>{entries.length} / 7名 回答済み</p>
      </div>

      <PieChart title="食べたいもの" counts={foodCounts} />
      <PieChart title="飲みたいもの" counts={drinkCounts} />

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
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{(e.foods || []).join('、')}</td>
                  <td>{(e.drinks || []).join('、')}</td>
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
