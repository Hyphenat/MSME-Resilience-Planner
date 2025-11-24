export default function SimulationControls({ onReset, onSave, canSave }) {
  return (
    <div className="flex gap-3">
      <button onClick={onReset}
        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
        Reset
      </button>
      <button onClick={onSave} disabled={!canSave}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">
        Save Scenario
      </button>
    </div>
  )
}