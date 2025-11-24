import { useState } from 'react'
import { supplierService } from '../../services/supplierService'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export default function SupplierTable({ suppliers, onEdit, onRefresh }) {
  const [deleting, setDeleting] = useState(null)

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this supplier?')) return
    setDeleting(id)
    try {
      await supplierService.delete(id)
      toast.success('Supplier deleted')
      onRefresh()
    } catch (err) {
      toast.error('Failed to delete')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead Time</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost/Unit</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {suppliers.length === 0 ? (
            <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">No suppliers found</td></tr>
          ) : (
            suppliers.map((s) => (
              <tr key={s._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium">{s.name}</p>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {s.location?.city}, {s.location?.country}
                </td>
                <td className="px-4 py-3 text-sm">{s.leadTimeDays} days</td>
                <td className="px-4 py-3 text-sm">${s.costPerUnit || '-'}</td>
                <td className="px-4 py-3">
                  {s.isCritical ? (
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded">Critical</span>
                  ) : (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded">Normal</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(s)} className="p-1 hover:bg-gray-100 rounded">
                      <PencilIcon className="w-4 h-4 text-blue-600" />
                    </button>
                    <button onClick={() => handleDelete(s._id)} disabled={deleting === s._id}
                      className="p-1 hover:bg-gray-100 rounded">
                      <TrashIcon className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
