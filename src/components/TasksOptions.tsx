import type { Dispatch, FC, SetStateAction } from 'react'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from './ui/select'
import { ArrowDown, ArrowUp } from 'lucide-react'

export const TasksOptions: FC<{
  limit: number
  setLimit: Dispatch<SetStateAction<number>>
  completed: boolean | undefined
  setCompleted: Dispatch<SetStateAction<boolean | undefined>>
  sortBy: string
  setSortBy: Dispatch<SetStateAction<string>>
  sortOrder: 'asc' | 'desc'
  setSortOrder: Dispatch<SetStateAction<'asc' | 'desc'>>
}> = ({
  limit,
  setLimit,
  completed,
  setCompleted,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-y-3 justify-between">
      {/* Tasks per page */}
      <div className="flex flex-col gap-y-1">
        <p className="text-lg">Tasks / Page</p>
        <Select
          defaultValue={`${limit}`}
          onValueChange={(value) => setLimit(parseInt(value as string, 10))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={'5'}>5</SelectItem>
            <SelectItem value={'10'}>10</SelectItem>
            <SelectItem value={'20'}>20</SelectItem>
            <SelectItem value={'50'}>50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* filter by */}
      <div className="flex flex-col gap-y-1">
        <p className="text-lg">Filter by</p>
        <Select
          defaultValue={completed === undefined ? 'All' : `${completed}`}
          onValueChange={(value) =>
            setCompleted(value === 'All' ? undefined : value === 'true')
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="true">Completed</SelectItem>
            <SelectItem value="false">Not completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* sort by */}
      <div className="flex gap-x-5 items-end">
        <div className="flex flex-col gap-y-1">
          <p className="text-lg">Sort by</p>
          <Select
            defaultValue={sortBy}
            onValueChange={(value) => setSortBy(value as string)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created_at">Created at</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="description">Description</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {sortOrder === 'desc' ? (
          <div
            className="border border-gray-200 rounded-md w-fit p-1 cursor-pointer"
            onClick={() => setSortOrder('asc')}
          >
            <ArrowDown className="w-6 h-6 text-gray-400" />
          </div>
        ) : (
          <div
            className="border border-gray-200 rounded-md w-fit p-1 cursor-pointer"
            onClick={() => setSortOrder('desc')}
          >
            <ArrowUp className="w-6 h-6 text-gray-400" />
          </div>
        )}
      </div>
    </div>
  )
}
