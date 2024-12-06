import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTask } from '../api'

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      task,
    }: {
      id: string
      task: { title?: string; description?: string; completed?: boolean }
    }) => await updateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
