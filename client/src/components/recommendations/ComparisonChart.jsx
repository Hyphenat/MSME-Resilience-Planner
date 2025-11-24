import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function ComparisonChart({ before, after }) {
  const data = [
    { name: 'Risk Score', before: before.riskScore, after: after.riskScore },
    { name: 'Total Cost', before: before.totalCost / 100, after: after.totalCost / 100 },
    { name: 'Avg Lead Time', before: before.avgLeadTime, after: after.avgLeadTime },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="before" fill="#ef4444" name="Before" />
        <Bar dataKey="after" fill="#22c55e" name="After" />
      </BarChart>
    </ResponsiveContainer>
  )
}