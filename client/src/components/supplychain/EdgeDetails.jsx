export default function EdgeDetails({ edge, onClose }) {
  if (!edge) return null

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Connection Details</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>
      </div>
      <div className="space-y-2 text-sm">
        <p><span className="text-gray-500">From:</span> {edge.source}</p>
        <p><span className="text-gray-500">To:</span> {edge.target}</p>
        {edge.weight && (
          <p><span className="text-gray-500">Lead Time:</span> {edge.weight} days</p>
        )}
      </div>
    </div>
  )
}