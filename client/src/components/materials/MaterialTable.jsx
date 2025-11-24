import { useState } from 'react'
import { useSupplyChain } from '../../context/SupplyChainContext'
import { localStorageService } from '../../utils/localStorage'
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export default function MaterialTable() {
  const { materials, suppliers, refreshMaterials } = useSupplyChain()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMaterial, setEditingMaterial] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    supplier: '',
    currentStock: '',
    reorderLevel: '',
    unitCost: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {
        name: formData.name,
        category: formData.category,
        supplier: formData.supplier,
        currentStock: parseInt(formData.currentStock) || 0,
        reorderLevel: parseInt(formData.reorderLevel) || 0,
        unitCost: parseFloat(formData.unitCost) || 0
      }

      if (editingMaterial) {
        localStorageService.updateMaterial(editingMaterial._id, data)
        toast.success('Material updated successfully')
      } else {
        localStorageService.addMaterial(data)
        toast.success('Material added successfully')
      }
      
      refreshMaterials()
      setIsModalOpen(false)
      resetForm()
    } catch (error) {
      console.error('Error saving material:', error)
      toast.error('Failed to save material: ' + error.message)
    }
  }

  const handleEdit = (material) => {
    setEditingMaterial(material)
    setFormData({
      name: material.name,
      category: material.category,
      supplier: material.supplier?._id || material.supplier || '',
      currentStock: material.currentStock || '',
      reorderLevel: material.reorderLevel || '',
      unitCost: material.unitCost || ''
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      try {
        localStorageService.deleteMaterial(id)
        refreshMaterials()
        toast.success('Material deleted successfully')
      } catch (error) {
        toast.error('Failed to delete material')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      supplier: '',
      currentStock: '',
      reorderLevel: '',
      unitCost: ''
    })
    setEditingMaterial(null)
  }

  const getSupplierName = (supplierId) => {
    const supplier = suppliers.find(s => s._id === supplierId)
    return supplier?.name || 'Unknown'
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Material Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Material
        </button>
      </div>

      {materials.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 mb-4">No materials added yet</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-green-600 hover:underline"
          >
            Add your first material
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reorder Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {materials.map((material) => (
                <tr key={material._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{material.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{material.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {typeof material.supplier === 'object' ? material.supplier?.name : getSupplierName(material.supplier)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={material.currentStock <= material.reorderLevel ? 'text-red-600 font-semibold' : ''}>
                      {material.currentStock || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{material.reorderLevel || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${material.unitCost || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(material)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(material._id)}
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
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingMaterial ? 'Edit Material' : 'Add New Material'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Material Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    placeholder="e.g., Raw Material, Component, Packaging"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Supplier</label>
                  <select
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select Supplier</option>
                    {suppliers.map((supplier) => (
                      <option key={supplier._id} value={supplier._id}>
                        {supplier.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Current Stock</label>
                    <input
                      type="number"
                      value={formData.currentStock}
                      onChange={(e) => setFormData({ ...formData, currentStock: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Reorder Level</label>
                    <input
                      type="number"
                      value={formData.reorderLevel}
                      onChange={(e) => setFormData({ ...formData, reorderLevel: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Unit Cost ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.unitCost}
                    onChange={(e) => setFormData({ ...formData, unitCost: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
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
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {editingMaterial ? 'Update' : 'Add'} Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
