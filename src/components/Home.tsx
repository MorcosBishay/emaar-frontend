import type { FC } from 'react'
import { TasksGrid } from './TasksGrid'
import { AddTaskModal } from './AddTaskModal'

export const Home: FC = () => {
  return (
    <div
      className="p-7 flex flex-col items-center justify-center h-dvh overflow-auto"
      style={{
        background: 'linear-gradient(45deg, #f3ec78, #af4261)',
      }}
    >
      <div className="self-end">
        <AddTaskModal />
      </div>
      <TasksGrid />
    </div>
  )
}
