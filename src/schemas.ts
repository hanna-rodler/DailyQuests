import { z } from 'zod'
import { compareDateOnly } from '@/utils/utils'

export const taskFormSchema = z.object({
  name: z.string().min(1, 'Name is required').default(''),
  description: z.string().default(''),
  dueDate: z.string().refine(
    (val) => {
      const date = new Date(val)
      const today = new Date()
      return !isNaN(date.getTime()) && compareDateOnly(date, today, 'isGreaterOrEqual')
    },
    { message: 'Date cannot be in the past' }
  ),
  doDate: z.string().refine(
    (val) => {
      const date = new Date(val)
      const today = new Date()
      return !isNaN(date.getTime()) && compareDateOnly(date, today, 'isGreaterOrEqual')
    },
    { message: 'Date cannot be in the past' }
  ),
  status: z.enum(['Not started', 'In Progress', 'Review', 'Done']).default('Not started')
})

export const taskSchema = taskFormSchema.merge(
  z.object({
    taskId: z.string()
  })
)

export const columnFormSchema = z.object({
  name: z.string().min(1, 'Name is required').default('')
})

export const columnSchema = columnFormSchema.merge(
  z.object({
    columnId: z.string(),
    tasks: z.array(taskSchema)
  })
)
