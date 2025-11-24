import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { materialService } from '../services/materialServices'
import toast from 'react-hot-toast'

export function useMaterials() {
  const queryClient = useQueryClient()

  const { data: materials = [], isLoading, error } = useQuery({
    queryKey: ['materials'],
    queryFn: async () => {
      try {
        const res = await materialService.getAll()
        return res.data
      } catch (err) {
        console.error('Failed to fetch materials:', err)
        return []
      }
    },
    enabled: false,
    retry: false
  })

  const createMutation = useMutation({
    mutationFn: materialService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['materials'])
      toast.success('Material created')
    },
    onError: () => toast.error('Failed to create material')
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => materialService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['materials'])
      toast.success('Material updated')
    },
    onError: () => toast.error('Failed to update material')
  })

  const deleteMutation = useMutation({
    mutationFn: materialService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['materials'])
      toast.success('Material deleted')
    },
    onError: () => toast.error('Failed to delete material')
  })

  return {
    materials,
    isLoading,
    error,
    createMaterial: createMutation.mutate,
    updateMaterial: updateMutation.mutate,
    deleteMaterial: deleteMutation.mutate
  }
}
