import api from './api.services'

type Task = {
  completed: boolean
  created_at: string
  description: string
  title: string
  _id: string
}
export type TasksResponse = {
  tasks: Task[]
  currentPage: number
  totalPages: number
  totalTasks: number
}

export const fetchTasks = async ({
  page,
  limit,
  sortBy,
  sortOrder,
  completed,
}: {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder: 'asc' | 'desc'
  completed?: boolean
}): Promise<TasksResponse> =>
  api().get('/tasks', { params: { page, limit, sortBy, sortOrder, completed } })

export const addTask = async (data: { title: string; description?: string }) =>
  api().post('/tasks', data)

export const updateTask = async (
  id: string,
  data: {
    title?: string
    description?: string
    completed?: boolean
  },
) => api().put(`/tasks/${id}`, data)

export const deleteTask = async (id: string) => api().delete(`/tasks/${id}`)
