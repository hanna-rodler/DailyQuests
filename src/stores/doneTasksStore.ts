import type { DoneTasks, Task } from '@/types'
import { useLocalStorage } from '@vueuse/core'
const KEY = 'DONE-TASKS-STORE'

export const DONE_STORE = useLocalStorage<DoneTasks[]>(KEY, [])

/**
 * Pushes a task to the DONE STORE if it doesn't exist there yet
 * @param task
 */
export function handleDoneTask(task: Task) {
  const taskExists = DONE_STORE.value.some((doneTask) => doneTask.taskId === task.taskId)

  if (!taskExists) {
    DONE_STORE.value.push({
      taskId: task.taskId,
      task: task
    })
  }
}

/**
 * Deletes a task.
 * @param taskId
 */
export function deleteTask(taskId: Task['taskId']) {
  const task = DONE_STORE.value.find((task) => task.taskId === taskId)

  if (!task) return

  DONE_STORE.value = DONE_STORE.value.filter((item) => item.task.taskId !== task.taskId)
}

/**
 * sorts tasks by due date or do date
 * @param type
 */
export function getSortedDoneTasks(type: 'dueDate' | 'doDate') {
  if (type === 'dueDate') {
    DONE_STORE.value.sort(
      (a, b) => new Date(a.task.dueDate).getTime() - new Date(b.task.dueDate).getTime()
    )
  } else if (type === 'doDate') {
    DONE_STORE.value.sort(
      (a, b) => new Date(a.task.doDate).getTime() - new Date(b.task.doDate).getTime()
    )
  }
}

/**
 * Updates the task in the store when the user edited it.
 * @param taskId
 * @param updatedTask
 */
export function updateTask(taskId: Task['taskId'], updatedTask: Task) {
  const task = DONE_STORE.value.find((task) => task.taskId === taskId)

  if (!task) return

  task.task = updatedTask
}

export default {
  DONE_STORE,
  handleDoneTask,
  deleteTask,
  updateTask
}
