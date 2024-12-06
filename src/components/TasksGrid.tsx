import { type FC, useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { getTasks, useTasks } from '@/hooks'
import { Button } from '@/components/ui/button'
import { Loader } from './Loader'
import { TaskCard } from './TaskCard'
import { TasksOptions } from './TasksOptions'

const ITEMS_PER_PAGE = 10

export const TasksGrid: FC = () => {
  const queryClient = useQueryClient()

  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(ITEMS_PER_PAGE)
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [completed, setCompleted] = useState<boolean | undefined>(undefined)

  const { data, isLoading } = useTasks({
    page: currentPage,
    limit,
    sortBy,
    sortOrder,
    completed,
  })

  useEffect(() => {
    const fetchNextPage = async () => {
      if (data?.totalPages && currentPage < data.totalPages) {
        await queryClient.prefetchQuery({
          queryKey: [
            'tasks',
            {
              page: currentPage + 1,
              limit: ITEMS_PER_PAGE,
              sortBy,
              sortOrder,
            },
          ],
          queryFn: async () =>
            await getTasks({
              page: currentPage + 1,
              limit: ITEMS_PER_PAGE,
              sortBy,
              sortOrder,
            }),
        })
      }
    }

    fetchNextPage()
  }, [currentPage, data?.totalPages])

  useEffect(() => {
    setCurrentPage(1)
  }, [limit, sortBy, sortOrder, completed])

  if (!data && !isLoading) {
    return <div className="w-dvh h-dvh flex justify-center items-center"></div>
  }

  return (
    <div className="container mx-auto px-4 py-8 h-full">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader size={150} color="#10b981" ringColor="#34d399" />
        </div>
      ) : data?.tasks.length === 0 && completed !== true ? (
        <div className="w-full h-full flex justify-center items-center">
          You don't have any tasks yet. Add a new task to get started.
        </div>
      ) : (
        <div className="flex flex-col gap-y-5">
          <TasksOptions
            limit={limit}
            sortBy={sortBy}
            sortOrder={sortOrder}
            completed={completed}
            setLimit={setLimit}
            setSortBy={setSortBy}
            setSortOrder={setSortOrder}
            setCompleted={setCompleted}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[90%] overflow-auto no-scrollbar">
            {data?.tasks?.map((task) => (
              <TaskCard
                key={`task-${task._id}`}
                id={task._id}
                {...task}
                createdAt={new Date(task.created_at)}
              />
            ))}
          </div>
        </div>
      )}
      {data && data.tasks && data.tasks.length > 0 && (
        <div className="mt-8 flex flex-col md:flex-row justify-center gap-2 pb-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="py-2 px-4 bg-gray-100 rounded text-center">
            Page {currentPage} of {data?.totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, data?.totalPages ?? 1),
              )
            }
            disabled={currentPage === data?.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
