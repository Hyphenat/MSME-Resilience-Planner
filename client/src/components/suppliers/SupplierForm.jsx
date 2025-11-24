import { useState } from 'react'
import { supplierService } from '../../services/supplierService'
import toast from 'react-hot-toast'

export default function SupplierForm({ supplier, onSuccess }) {
  const [form, setForm] = useState({
    name: supplier?.name || '',
    city: supplier?.location?.city || '',
    state: supplier?.location?.state || '',
    country: supplier?.location?.country || '',
    leadTimeDays: supplier?.leadTimeDays || 7,
    costPerUnit: supplier?.costPerUnit || '',
    financialStability: supplier?.riskFactors?.financialStability || 5,
    deliveryReliability: supplier?.riskFactors?.deliveryReliability || 5,
    qualityScore: supplier?.riskFactors?.qualityScore || 5,
    geographicRisk: supplier?.riskFactors?.geographicRisk || 5,
    isCritical: supplier?.isCritical || false,
    email: supplier?.contactInfo?.email || '',
    phone: supplier?.contactInfo?.phone || '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const data = {
      name: form.name,
      location: { city: form.city, state: form.state, country: form.country },
      leadTimeDays: Number(form.leadTimeDays),
      costPerUnit: Number(form.costPerUnit),
      riskFactors: {
        financialStability: Number(form.financialStability),
        deliveryReliability: Number(form.deliveryReliability),
        qualityScore: Number(form.qualityScore),
        geographicRisk: Number(form.geographicRisk),
      },
      isCritical: form.isCritical,
      contactInfo: { email: form.email, phone: form.phone },
    }

    try {
      if (supplier?._id) {
        await supplierService.update(supplier._id, data)
        toast.success('Supplier updated')
      } else {
        await supplierService.create(data)
        toast.success('Supplier added')
      }
      onSuccess()
    } catch (err) {
      toast.error('Failed to save supplier')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Supplier Name *</label>
        <input name="name" value={form.name} onChange={handleChange} required
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input name="city" value={form.city} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <input name="state" value={form.state} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <input name="country" value={form.country} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Lead Time (days)</label>
          <input type="number" name="leadTimeDays" value={form.leadTimeDays} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cost Per Unit ($)</label>
          <input type="number" name="costPerUnit" value={form.costPerUnit} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg" />
        </div>
      </div>

      <div className="border-t pt-4">
        <p className="text-sm font-medium mb-3">Risk Factors (1-10)</p>
        <div className="grid grid-cols-2 gap-3">
          {['financialStability', 'deliveryReliability', 'qualityScore', 'geographicRisk'].map(field => (
            <div key={field}>
              <label className="block text-xs text-gray-500 mb-1 capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input type="range" name={field} min="1" max="10" value={form[field]} onChange={handleChange}
                className="w-full" />
              <span className="text-xs">{form[field]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" name="isCritical" checked={form.isCritical} onChange={handleChange}
          className="w-4 h-4 text-red-600 rounded" />
        <label className="text-sm">Mark as Critical Supplier</label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg" />
        </div>
      </div>

      <button type="submit" disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
        {loading ? 'Saving...' : (supplier ? 'Update Supplier' : 'Add Supplier')}
      </button>
    </form>
  )
}