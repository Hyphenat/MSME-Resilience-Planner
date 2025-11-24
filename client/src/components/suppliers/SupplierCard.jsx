export default function SupplierCard({ supplier, onClick }) {
  return (
    <div onClick={() => onClick?.(supplier)}
      className="bg-white p-4 rounded-lg border hover:shadow-md transition cursor-pointer">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{supplier.name}</h3>
          <p className="text-sm text-gray-500">{supplier.location?.city}, {supplier.location?.country}</p>
        </div>
        {supplier.isCritical && (
          <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded">Critical</span>
        )}
      </div>
      <div className="mt-3 flex gap-4 text-sm">
        <span>Lead: {supplier.leadTimeDays}d</span>
        <span>Cost: ${supplier.costPerUnit}</span>
      </div>
    </div>
  )
}