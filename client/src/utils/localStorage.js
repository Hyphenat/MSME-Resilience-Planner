// Local storage fallback for demo without backend authentication
const STORAGE_KEYS = {
  SUPPLIERS: 'msme_suppliers',
  MATERIALS: 'msme_materials'
}

export const localStorageService = {
  // Suppliers
  getSuppliers: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SUPPLIERS)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error reading suppliers from localStorage:', error)
      return []
    }
  },
  
  saveSuppliers: (suppliers) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SUPPLIERS, JSON.stringify(suppliers))
    } catch (error) {
      console.error('Error saving suppliers to localStorage:', error)
      throw error
    }
  },
  
  addSupplier: (supplier) => {
    try {
      const suppliers = localStorageService.getSuppliers()
      const newSupplier = { ...supplier, _id: Date.now().toString() }
      suppliers.push(newSupplier)
      localStorageService.saveSuppliers(suppliers)
      return newSupplier
    } catch (error) {
      console.error('Error adding supplier:', error)
      throw error
    }
  },
  
  updateSupplier: (id, data) => {
    const suppliers = localStorageService.getSuppliers()
    const index = suppliers.findIndex(s => s._id === id)
    if (index !== -1) {
      suppliers[index] = { ...suppliers[index], ...data }
      localStorageService.saveSuppliers(suppliers)
      return suppliers[index]
    }
    return null
  },
  
  deleteSupplier: (id) => {
    const suppliers = localStorageService.getSuppliers()
    const filtered = suppliers.filter(s => s._id !== id)
    localStorageService.saveSuppliers(filtered)
  },

  // Materials
  getMaterials: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MATERIALS)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error reading materials from localStorage:', error)
      return []
    }
  },
  
  saveMaterials: (materials) => {
    try {
      localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(materials))
    } catch (error) {
      console.error('Error saving materials to localStorage:', error)
      throw error
    }
  },
  
  addMaterial: (material) => {
    try {
      const materials = localStorageService.getMaterials()
      const newMaterial = { ...material, _id: Date.now().toString() }
      materials.push(newMaterial)
      localStorageService.saveMaterials(materials)
      return newMaterial
    } catch (error) {
      console.error('Error adding material:', error)
      throw error
    }
  },
  
  updateMaterial: (id, data) => {
    const materials = localStorageService.getMaterials()
    const index = materials.findIndex(m => m._id === id)
    if (index !== -1) {
      materials[index] = { ...materials[index], ...data }
      localStorageService.saveMaterials(materials)
      return materials[index]
    }
    return null
  },
  
  deleteMaterial: (id) => {
    const materials = localStorageService.getMaterials()
    const filtered = materials.filter(m => m._id !== id)
    localStorageService.saveMaterials(filtered)
  }
}
