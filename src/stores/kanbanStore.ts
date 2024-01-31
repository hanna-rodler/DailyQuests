import { reactive } from 'vue'
import axios from 'axios'
import type { Column, Holiday, Task } from '@/types'
import { generateDateStringIdFromDate, compareDateOnly } from '@/utils/utils'
import { useLocalStorage } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'
const KEY = 'KANBAN-STORE'

// Extending the existing state to include public holidays
const state = reactive({
  // ... existing state properties
  publicHolidays: []
})

// Function to fetch public holidays
async function fetchPublicHolidays(countryCode: string, year: number) {
  try {
    const response = await axios.get(
      `https://date.nager.at/Api/v2/PublicHolidays/${year}/${countryCode}`
    )
    state.publicHolidays = response.data.map((holiday: Holiday) => ({
      date: holiday.date,
      localName: holiday.localName
    }))
  } catch (error) {
    console.error('Error fetching public holidays:', error)
    // Handle errors appropriately
  }
}

export const STORE = useLocalStorage<Column[]>(KEY, [])

/**
 * Moves columns to the today date column when their doDate is in the past.
 */
export function handlePastColumnsAndTasks() {
  for (const column of STORE.value) {
    if (compareDateOnly(new Date(column.columnId), new Date(), 'isSmaller')) {
      for (const columnTask of column.tasks) {
        const currentDayColumnId = generateDateStringIdFromDate(new Date())

        moveTask(columnTask.taskId, currentDayColumnId)
      }
      deleteColumn(column.columnId)
    }
  }
}

/**
 * Adds a column to the kanban board
 * @param name name of column
 * @param columnDateId
 */
export function addColumn(name: Column['name'], columnDateId: string) {
  // Check if columnId already exists
  const columnExists = STORE.value.some((column) => column.columnId === columnDateId)

  if (!columnExists) {
    STORE.value.push({
      columnId: columnDateId,
      name,
      tasks: []
    })
  }
}

export function deleteColumn(columnId: Column['columnId']) {
  STORE.value = STORE.value.filter((column) => column.columnId !== columnId)
}

/**
 * Adds a task to the column
 * @param columnId
 * @param payload
 */
export function addTaskToColumn(
  columnId: Column['columnId'],
  payload: Pick<Task, 'name' | 'description' | 'dueDate' | 'doDate' | 'status'>
) {
  // add task to correct column even if user clicks on "+" of a different column
  const doDateStringId = generateDateStringIdFromDate(new Date(payload.doDate))
  if (columnId !== doDateStringId) {
    columnId = doDateStringId
  }

  const column = STORE.value.find((column) => column.columnId === columnId)

  if (!column) return

  column.tasks.push({
    taskId: uuidv4(),
    name: payload.name,
    description: payload.description,
    dueDate: payload.dueDate,
    doDate: payload.doDate,
    status: payload.status
  })
}

/**
 * Updates the task when the user edited it.
 * @param columnId
 * @param task
 */
export function updateTask(columnId: Column['columnId'], task: Task) {
  const column = STORE.value.find((column) => column.columnId === columnId)

  if (!column) return

  column.tasks = column.tasks.map((oldTask) => {
    if (oldTask.taskId === task.taskId) {
      return {
        ...oldTask,
        ...task
      }
    }

    return oldTask
  })
}

export function deleteTask(columnId: Column['columnId'], taskId: Task['taskId']) {
  const column = STORE.value.find((column) => column.columnId === columnId)

  if (!column) return

  column.tasks = column.tasks.filter((task) => task.taskId !== taskId)
}

/**
 * Moves task from one column to the other upon user dragging
 * @param taskId
 * @param targetColumnId
 * @param targetTaskId
 */
export function moveTask(
  taskId: Task['taskId'],
  targetColumnId: Column['columnId'],
  targetTaskId?: Task['taskId']
) {
  let currentTask!: Task
  let currentTaskIndex!: number

  // possible further improvement: warn user if task is being moved to a doDate after the dueDate.

  const column = STORE.value.find((column) =>
    column.tasks.find((task, index) => {
      if (task.taskId === taskId) {
        currentTask = task
        currentTaskIndex = index
        currentTask.doDate = targetColumnId
        updateTask(targetColumnId, currentTask)
        return true
      }
    })
  )

  if (!column) return

  column.tasks.splice(currentTaskIndex, 1)

  const targetColumn = STORE.value.find((column) => column.columnId === targetColumnId)

  if (targetTaskId) {
    const targetTaskIndex = targetColumn?.tasks.findIndex((task) => {
      task.taskId === targetTaskId
    })

    targetColumn?.tasks.splice(targetTaskIndex!, 0, currentTask)
  } else {
    targetColumn?.tasks.push(currentTask)
  }
}

export default {
  STORE,
  addColumn,
  handlePastColumnsAndTasks,
  deleteColumn,
  addTaskToColumn,
  updateTask,
  deleteTask,
  moveTask
}
export { state, fetchPublicHolidays }
