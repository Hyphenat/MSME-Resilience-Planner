import { useState, useEffect } from 'react'
import { useSupplyChain } from '../context/SupplyChainContext'
import { localStorageService } from '../utils/localStorage'
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export default function Suppliers() {
  const { suppliers, refreshSuppliers } = useSupplyChain()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSupplier, setEditingSupplier] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    materials: '',
    costPerUnit: '',
    leadTimeDays: '',
    isCritical: false,
    riskFactors: {
      financialStability: 5,
      deliveryReliability: 5,
      qualityScore: 5,
      geographicRisk: 5
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const materialsArray = formData.materials 
        ? formData.materials.split(',').map(m => m.trim()).filter(m => m.length > 0)
        : []

      const data = {
        name: formData.name,
        location: formData.location,
        materials: materialsArray,
        costPerUnit: parseFloat(formData.costPerUnit) || 0,
        leadTimeDays: parseInt(formData.leadTimeDays) || 0,
        isCritical: formData.isCritical,
        riskFactors: formData.riskFactors
      }

      if (editingSupplier) {
        localStorageService.updateSupplier(editingSupplier._id, data)
        toast.success('Supplier updated successfully')
      } else {
        localStorageService.addSupplier(data)
        toast.success('Supplier added successfully')
      }
      
      refreshSuppliers()
      setIsModalOpen(false)
      resetForm()
    } catch (error) {
      console.error('Error saving supplier:', error)
      toast.error('Failed to save supplier: ' + error.message)
    }
  }

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier)
    setFormData({
      name: supplier.name,
      location: supplier.location,
      materials: supplier.materials?.join(', ') || '',
      costPerUnit: supplier.costPerUnit || '',
      leadTimeDays: supplier.leadTimeDays || '',
      isCritical: supplier.isCritical || false,
      riskFactors: supplier.riskFactors || {
        financialStability: 5,
        deliveryReliability: 5,
        qualityScore: 5,
        geographicRisk: 5
      }
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        localStorageService.deleteSupplier(id)
        refreshSuppliers()
        toast.success('Supplier deleted successfully')
      } catch (error) {
        toast.error('Failed to delete supplier')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      materials: '',
      costPerUnit: '',
      leadTimeDays: '',
      isCritical: false,
      riskFactors: {
        financialStability: 5,
        deliveryReliability: 5,
        qualityScore: 5,
        geographicRisk: 5
      }
    })
    setEditingSupplier(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Supplier Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Supplier
        </button>
      </div>

      {suppliers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 mb-4">No suppliers added yet</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-600 hover:underline"
          >
            Add your first supplier
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Materials</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost/Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Critical</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {suppliers.map((supplier) => (
                <tr key={supplier._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{supplier.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{supplier.location}</td>
                  <td className="px-6 py-4">{supplier.materials?.join(', ') || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${supplier.costPerUnit || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{supplier.leadTimeDays || 0} days</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {supplier.isCritical ? (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">Critical</span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">Normal</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(supplier)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(supplier._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Supplier Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Materials (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.materials}
                    onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Steel, Plastic, Electronics"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cost Per Unit ($)</label>
                  <input
                    type="number"
                    value={formData.costPerUnit}
                    onChange={(e) => setFormData({ ...formData, costPerUnit: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Lead Time (days)</label>
                  <input
                    type="number"
                    value={formData.leadTimeDays}
                    onChange={(e) => setFormData({ ...formData, leadTimeDays: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isCritical}
                      onChange={(e) => setFormData({ ...formData, isCritical: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium">Critical Supplier</span>
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-3">Risk Factors (0-10)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Financial Stability</label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={formData.riskFactors.financialStability}
                      onChange={(e) => setFormData({
                        ...formData,
                        riskFactors: { ...formData.riskFactors, financialStability: parseInt(e.target.value) }
                      })}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-600">{formData.riskFactors.financialStability}</span>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Delivery Reliability</label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={formData.riskFactors.deliveryReliability}
                      onChange={(e) => setFormData({
                        ...formData,
                        riskFactors: { ...formData.riskFactors, deliveryReliability: parseInt(e.target.value) }
                      })}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-600">{formData.riskFactors.deliveryReliability}</span>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Quality Score</label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={formData.riskFactors.qualityScore}
                      onChange={(e) => setFormData({
                        ...formData,
                        riskFactors: { ...formData.riskFactors, qualityScore: parseInt(e.target.value) }
                      })}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-600">{formData.riskFactors.qualityScore}</span>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Geographic Risk</label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={formData.riskFactors.geographicRisk}
                      onChange={(e) => setFormData({
                        ...formData,
                        riskFactors: { ...formData.riskFactors, geographicRisk: parseInt(e.target.value) }
                      })}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-600">{formData.riskFactors.geographicRisk}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    resetForm()
                  }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingSupplier ? 'Update' : 'Add'} Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
