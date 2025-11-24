import api from './api'

export const reportService = {
  getAll: () => api.get('/reports'),
  create: (data) => api.post('/reports', data),
  getById: (id) => api.get(`/reports/${id}`),
}

// ============================================
// client/src/hooks/useSuppliers.js
// ============================================
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supplierService } from '../services/supplierService'
import toast from 'react-hot-toast'

export function useSuppliers() {
  const queryClient = useQueryClient()

  const { data: suppliers = [], isLoading, error } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      const res = await supplierService.getAll()
      return res.data
    }
  })

  const createMutation = useMutation({
    mutationFn: supplierService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers'])
      toast.success('Supplier created')
    },
    onError: () => toast.error('Failed to create supplier')
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => supplierService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers'])
      toast.success('Supplier updated')
    },
    onError: () => toast.error('Failed to update supplier')
  })

  const deleteMutation = useMutation({
    mutationFn: supplierService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers'])
      toast.success('Supplier deleted')
    },
    onError: () => toast.error('Failed to delete supplier')
  })

  return {
    suppliers,
    isLoading,
    error,
    createSupplier: createMutation.mutate,
    updateSupplier: updateMutation.mutate,
    deleteSupplier: deleteMutation.mutate
  }
}
