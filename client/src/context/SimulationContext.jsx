import { createContext, useContext, useState } from 'react'

const SimulationContext = createContext()

export function SimulationProvider({ children }) {
  const [currentSimulation, setCurrentSimulation] = useState(null)
  const [simulationResults, setSimulationResults] = useState(null)
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [affectedSuppliers, setAffectedSuppliers] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [isRunning, setIsRunning] = useState(false)

  const resetSimulation = () => {
    setCurrentSimulation(null)
    setSimulationResults(null)
    setSelectedScenario(null)
    setAffectedSuppliers([])
    setRecommendations([])
    setIsRunning(false)
  }

  return (
    <SimulationContext.Provider value={{
      currentSimulation,
      setCurrentSimulation,
      simulationResults,
      setSimulationResults,
      selectedScenario,
      setSelectedScenario,
      affectedSuppliers,
      setAffectedSuppliers,
      recommendations,
      setRecommendations,
      isRunning,
      setIsRunning,
      resetSimulation
    }}>
      {children}
    </SimulationContext.Provider>
  )
}

export const useSimulationContext = () => useContext(SimulationContext)
