import { type FC, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useAddTask } from '../hooks'

const TaskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  description: z.string().optional(),
})

type IFormInput = z.infer<typeof TaskSchema>

export const AddTaskModal: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { toast } = useToast()

  const { mutate: addTask, isPending } = useAddTask()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(TaskSchema),
  })

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    addTask(
      {
        title: data.title,
        description: data.description,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Task Added',
            description: 'Your task has been added successfully.',
            variant: 'default',
          })
          reset()
          setIsOpen(false)
        },
        onError: (error) => {
          toast({
            title: 'An error occurred',
            description: error.message,
            variant: 'destructive',
          })
        },
      },
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>
              Fill in the form below to add a new task to your list.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-left">
                Title*
              </Label>
              <Input
                id="title"
                className="col-span-3"
                required
                {...register('title')}
              />
              {errors.title && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-left">
                Description
              </Label>
              <Input
                id="description"
                className="col-span-3"
                {...register('description')}
              />
              {errors.description && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Adding Task...' : 'Add Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
