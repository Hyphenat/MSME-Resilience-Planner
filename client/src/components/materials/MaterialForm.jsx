import { useState } from 'react'
import { useMaterials } from '../../hooks/useMaterials'
import toast from 'react-hot-toast'

export default function MaterialForm({ material, onSuccess }) {
  const [form, setForm] = useState({
    name: material?.name || '',
    category: material?.category || 'raw_material',
    quantity: material?.specifications?.quantity || '',
    unit: material?.specifications?.unit || '',
    qualityStandard: material?.specifications?.quality_standard || '',
    leadTimeDays: material?.specifications?.lead_time_days || 0,
    unitCost: material?.pricing?.unit_cost || '',
    currency: material?.pricing?.currency || 'INR',
    minimumOrderQuantity: material?.pricing?.minimum_order_quantity || 0,
    status: material?.status || 'active',
  })
  const [loading, setLoading] = useState(false)
  const { createMaterial, updateMaterial } = useMaterials()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      name: form.name,
      category: form.category,
      specifications: {
        quantity: Number(form.quantity),
        unit: form.unit,
        quality_standard: form.qualityStandard,
        lead_time_days: Number(form.leadTimeDays),
      },
      pricing: {
        unit_cost: Number(form.unitCost),
        currency: form.currency,
        minimum_order_quantity: Number(form.minimumOrderQuantity),
      },
      status: form.status,
    }

    try {
      if (material?._id) {
        await updateMaterial({ id: material._id, data })
        toast.success('Material updated')
      } else {
        await createMaterial(data)
        toast.success('Material added')
      }
      onSuccess()
    } catch (err) {
      toast.error('Failed to save material')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name *</label>
        <input name="name" value={form.name} onChange={handleChange} required
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category *</label>
        <select name="category" value={form.category} onChange={handleChange} required
          className="w-full px-3 py-2 border rounded-lg">
          <option value="raw_material">Raw Material</option>
          <option value="component">Component</option>
          <option value="packaging">Packaging</option>
          <option value="consumable">Consumable</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <input type="number" name="quantity" value={form.quantity} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Unit</label>
          <input name="unit" value={form.unit} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Quality Standard</label>
          <input name="qualityStandard" value={form.qualityStandard} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Lead Time (days)</label>
          <input type="number" name="leadTimeDays" value={form.leadTimeDays} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Unit Cost</label>
          <input type="number" name="unitCost" value={form.unitCost} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Currency</label>
          <input name="currency" value={form.currency} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Minimum Order Quantity</label>
          <input type="number" name="minimumOrderQuantity" value={form.minimumOrderQuantity} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select name="status" value={form.status} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg">
            <option value="active">Active</option>
            <option value="discontinued">Discontinued</option>
            <option value="under_review">Under Review</option>
          </select>
        </div>
      </div>

      <button type="submit" disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
        {loading ? 'Saving...' : (material ? 'Update Material' : 'Add Material')}
      </button>
    </form>
  )
}
