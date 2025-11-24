import { useRef, useState } from 'react'
import Papa from 'papaparse'
import { supplierService } from '../../services/supplierService'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export default function CSVUploader({ onUpload }) {
  const fileRef = useRef()
  const [loading, setLoading] = useState(false)

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setLoading(true)
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const suppliers = results.data.map(row => ({
            name: row.name || row.Name,
            location: {
              city: row.city || row.City,
              state: row.state || row.State,
              country: row.country || row.Country,
            },
            leadTimeDays: Number(row.leadTimeDays || row.lead_time || 7),
            costPerUnit: Number(row.costPerUnit || row.cost || 0),
            isCritical: row.isCritical === 'true' || row.critical === 'true',
          }))
          
          await supplierService.uploadCSV(suppliers)
          toast.success(`Uploaded ${suppliers.length} suppliers`)
          onUpload()
        } catch (err) {
          toast.error('Failed to upload CSV')
        } finally {
          setLoading(false)
          fileRef.current.value = ''
        }
      },
      error: () => {
        toast.error('Failed to parse CSV')
        setLoading(false)
      }
    })
  }

  return (
    <div>
      <input type="file" ref={fileRef} accept=".csv" onChange={handleFile} className="hidden" />
      <button onClick={() => fileRef.current.click()} disabled={loading}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
        <ArrowUpTrayIcon className="w-5 h-5" />
        {loading ? 'Uploading...' : 'Upload CSV'}
      </button>
    </div>
  )
}