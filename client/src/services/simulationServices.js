import api from './api'

export const simulationService = {
  runDisruption: (data) => api.post('/simulation/disrupt', data),
  getScenarios: () => api.get('/simulation/scenarios'),
  saveScenario: (data) => api.post('/simulation/scenarios', data),
  getRecommendations: (data) => api.post('/simulation/recommendations', data),
  compareStrategies: (data) => api.post('/simulation/compare', data),
}