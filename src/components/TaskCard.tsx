import { useRef, useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { useDeleteTask, useUpdateTask } from '@/hooks'
import { useToast } from '@/hooks/use-toast'
import { TrashIcon } from 'lucide-react'
import { Loader } from './Loader'
import { cn } from '@/lib/utils'

interface TaskCardProps {
  id: string
  title: string
  description: string
  createdAt: Date
  completed: boolean
}

export const TaskCard = ({
  id,
  title,
  description,
  createdAt,
  completed,
}: TaskCardProps) => {
  const { toast } = useToast()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false)
  const [isTitleEditing, setIsTitleEditing] = useState(false)

  const { mutate: updateTask } = useUpdateTask()

  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask()

  const [isCompleted, setIsCompleted] = useState(completed)

  const handleToggle = () => {
    const newCompletedState = !isCompleted
    const oldCompletedState = isCompleted
    setIsCompleted(newCompletedState)
    updateTask(
      {
        id,
        task: {
          completed: newCompletedState,
        },
      },
      {
        onSuccess: () => {
          toast({
            title: newCompletedState
              ? 'Task completed'
              : 'Task marked incomplete',
          })
        },
        onError: () => {
          toast({
            title: 'An error occurred',
            description: 'Please try again later',
            variant: 'destructive',
          })
          setIsCompleted(oldCompletedState)
        },
      },
    )
  }

  return (
    <Card
      className={cn('w-full relative flex flex-col justify-between h-full', {
        'h-[178px]': !isDescriptionEditing && !isTitleEditing,
      })}
    >
      <CardHeader className="pr-12">
        <CardTitle
          ref={titleRef}
          contentEditable
          suppressContentEditableWarning
          onFocus={() => {
            setIsTitleEditing(true)
          }}
          onBlur={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsTitleEditing(false)
            const newTitle = e.currentTarget.textContent
            if (newTitle === title) return
            if (newTitle?.trim() === '') {
              titleRef.current!.textContent = title
              toast({ title: 'Title cannot be empty', variant: 'destructive' })
              return
            }
            if (newTitle) {
              updateTask(
                {
                  id,
                  task: {
                    title: newTitle,
                  },
                },
                {
                  onSuccess: () => {
                    toast({
                      title: 'Title updated successfully',
                    })
                  },
                  onError: () => {
                    toast({
                      title: 'An error occurred',
                      description: 'Please try again later',
                      variant: 'destructive',
                    })
                    if (titleRef.current) titleRef.current.textContent = title
                  },
                },
              )
            }
          }}
          className={cn('focus:outline-none', {
            'bg-gray-100 p-2 rounded-lg': isTitleEditing,
            truncate: !isTitleEditing,
          })}
        >
          {title}
        </CardTitle>
      </CardHeader>
      <div className="absolute top-3 right-3">
        {isDeleting ? (
          <Loader size={20} color="#ef4444" ringColor="#f87171" />
        ) : (
          <TrashIcon
            className="text-red-500 cursor-pointer"
            onClick={() =>
              deleteTask(id, {
                onSuccess: () => {
                  toast({
                    title: 'Task deleted successfully',
                  })
                },
                onError: () => {
                  toast({
                    title: 'An error occurred',
                    description: 'Please try again later',
                    variant: 'destructive',
                  })
                },
              })
            }
          />
        )}
      </div>

      <CardContent>
        <p
          ref={descriptionRef}
          contentEditable
          suppressContentEditableWarning
          onFocus={() => {
            setIsDescriptionEditing(true)
            if (descriptionRef?.current?.textContent === 'No description')
              descriptionRef.current.textContent = ''
          }}
          onBlur={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsDescriptionEditing(false)
            const newDescription = e.currentTarget.textContent

            if (descriptionRef.current?.textContent === '' && !description)
              descriptionRef.current.textContent = 'No description'
            else if (descriptionRef?.current?.textContent === '' && description)
              descriptionRef.current.textContent = description

            if (newDescription === description) return

            if (newDescription) {
              updateTask(
                {
                  id,
                  task: {
                    description: newDescription,
                  },
                },
                {
                  onSuccess: () => {
                    toast({
                      title: 'Description updated successfully',
                    })
                  },
                  onError: () => {
                    toast({
                      title: 'An error occurred',
                      description: 'Please try again later',
                      variant: 'destructive',
                    })
                    if (descriptionRef.current)
                      descriptionRef.current.textContent = description
                  },
                },
              )
            }
          }}
          className={cn(
            'text-sm text-gray-600 break-words focus:outline-none',
            {
              'bg-gray-100 p-5 rounded-lg': isDescriptionEditing,
              truncate: !isDescriptionEditing,
            },
          )}
        >
          {description || 'No description'}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Created at: {createdAt.toLocaleString()}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm">
          {isCompleted ? 'Completed' : 'Incomplete'}
        </span>
        <Switch checked={isCompleted} onCheckedChange={handleToggle} />
      </CardFooter>
    </Card>
  )
}
