export default function AlternativesList({ alternatives, onSelect }) {
  if (!alternatives || alternatives.length === 0) {
    return <p className="text-gray-500">No alternatives found</p>
  }

  return (
    <div className="space-y-3">
      {alternatives.map((alt, index) => (
        <div
          key={alt.supplierId}
          onClick={() => onSelect?.(alt)}
          className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer flex items-center gap-4"
        >
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            {index + 1}
          </div>
          <div className="flex-1">
            <p className="font-medium">{alt.name}</p>
            <p className="text-sm text-gray-500">
              Risk: {alt.riskScore} • Lead: {alt.leadTimeDays}d • ${alt.costPerUnit}/unit
            </p>
          </div>
          <div className="text-lg font-bold text-green-600">
            {(alt.score * 100).toFixed(0)}%
          </div>
        </div>
      ))}
    </div>
  )
}