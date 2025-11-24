export default function StrategyCard({ strategy, isRecommended, onApply }) {
  return (
    <div className={`p-4 rounded-lg border-2 ${isRecommended ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
      {isRecommended && (
        <span className="inline-block px-2 py-1 text-xs bg-green-500 text-white rounded mb-2">
          Recommended
        </span>
      )}
      <h4 className="font-medium">{strategy.name}</h4>
      <div className="mt-2 space-y-1 text-sm text-gray-600">
        <p>Risk Reduction: {strategy.riskReduction}%</p>
        <p>Cost Change: {strategy.costChange > 0 ? '+' : ''}{strategy.costChange}%</p>
        <p>Lead Time: {strategy.leadTimeChange > 0 ? '+' : ''}{strategy.leadTimeChange} days</p>
      </div>
      {onApply && (
        <button onClick={() => onApply(strategy)}
          className="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          Apply Strategy
        </button>
      )}
    </div>
  )
}