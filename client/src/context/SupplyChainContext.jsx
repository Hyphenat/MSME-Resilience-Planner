import { createContext, useContext, useState, useEffect } from 'react'
import { localStorageService } from '../utils/localStorage'

const SupplyChainContext = createContext()

export function SupplyChainProvider({ children }) {
  const [suppliers, setSuppliers] = useState([])
  const [materials, setMaterials] = useState([])
  const [customers, setCustomers] = useState([])
  const [riskScore, setRiskScore] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load from local storage on mount
    const savedSuppliers = localStorageService.getSuppliers()
    const savedMaterials = localStorageService.getMaterials()
    setSuppliers(savedSuppliers)
    setMaterials(savedMaterials)
  }, [])

  const refreshSuppliers = () => {
    const data = localStorageService.getSuppliers()
    setSuppliers(data)
  }

  const refreshMaterials = () => {
    const data = localStorageService.getMaterials()
    setMaterials(data)
  }

  const refreshData = () => {
    refreshSuppliers()
    refreshMaterials()
  }

  return (
    <SupplyChainContext.Provider value={{
      suppliers, setSuppliers, materials, setMaterials,
      customers, setCustomers, riskScore, setRiskScore,
      loading, refreshData, refreshSuppliers, refreshMaterials
    }}>
      {children}
    </SupplyChainContext.Provider>
  )
}

export const useSupplyChain = () => useContext(SupplyChainContext)
