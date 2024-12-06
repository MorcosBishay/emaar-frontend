import { useQuery } from '@tanstack/react-query'
import { fetchTasks } from '../api'
import type { TasksResponse } from '../api/task.services'

export const getTasks = async ({
  page = 1,
  limit = 10,
  sortBy = 'createdAt',
  sortOrder = 'desc',
  completed,
}: {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  completed?: boolean
}): Promise<TasksResponse> => {
  try {
    const response = await fetchTasks({
      page,
      limit,
      sortBy,
      sortOrder,
      completed,
    })
    return response
  } catch {
    return { tasks: [], currentPage: 0, totalPages: 0, totalTasks: 0 }
  }
}

export const useTasks = ({
  page = 1,
  limit = 10,
  sortBy = 'createdAt',
  sortOrder = 'desc',
  completed,
}: {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  completed?: boolean
}) =>
  useQuery({
    queryKey: ['tasks', { page, limit, sortBy, sortOrder, completed }],
    queryFn: async () =>
      await getTasks({ page, limit, sortBy, sortOrder, completed }),
  })
