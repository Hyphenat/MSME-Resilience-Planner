import { XMarkIcon } from '@heroicons/react/24/outline'

export default function AlertBanner({ type = 'info', message, onClose }) {
  const colors = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    error: 'bg-red-50 text-red-800 border-red-200',
  }

  return (
    <div className={`p-4 rounded-lg border ${colors[type]} flex items-center justify-between`}>
      <p>{message}</p>
      {onClose && (
        <button onClick={onClose} className="p-1 hover:bg-white/50 rounded">
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}