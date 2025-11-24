import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">
            Supply Chain Resilience Dashboard
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <BellIcon className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <UserCircleIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  )
}
