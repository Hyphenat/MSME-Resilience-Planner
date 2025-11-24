export const SCENARIO_TYPES = [
  { id: 'supplier_failure', name: 'Supplier Failure', icon: '🏭' },
  { id: 'pandemic', name: 'Pandemic', icon: '🦠' },
  { id: 'port_strike', name: 'Port Strike', icon: '🚢' },
  { id: 'natural_disaster', name: 'Natural Disaster', icon: '🌊' },
  { id: 'import_ban', name: 'Import Ban', icon: '🚫' },
  { id: 'custom', name: 'Custom Scenario', icon: '⚙️' },
]

export const RISK_LEVELS = {
  low: { color: 'green', label: 'Low Risk' },
  medium: { color: 'yellow', label: 'Medium Risk' },
  high: { color: 'orange', label: 'High Risk' },
  critical: { color: 'red', label: 'Critical Risk' },
}

export const CRITICALITY_OPTIONS = ['low', 'medium', 'high', 'critical']