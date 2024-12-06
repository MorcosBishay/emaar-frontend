import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTask } from '../api'

export const useAddTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (task: { title: string; description?: string }) =>
      await addTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
