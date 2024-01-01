import { z } from 'zod'

function compareDateOnly(date1: Date, date2: Date) {
  const getDatePart = (date: Date) => new Date(date.toDateString())

  const datePart1 = getDatePart(date1)
  const datePart2 = getDatePart(date2)

  return datePart1.getTime() >= datePart2.getTime()
}

export const taskFormSchema = z.object({
  name: z.string().min(1, 'Name is required').default(''),
  description: z.string().default(''),
  dueDate: z.string().refine(
    (val) => {
      const date = new Date(val)
      const today = new Date()
      return !isNaN(date.getTime()) && compareDateOnly(date, today)
    },
    { message: 'Date cannot be in the past' }
  ),
  doDate: z.string().refine(
    (val) => {
      const date = new Date(val)
      const today = new Date()
      return !isNaN(date.getTime()) && compareDateOnly(date, today)
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
