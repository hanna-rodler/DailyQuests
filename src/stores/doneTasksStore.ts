import type { DoneTasks, Task } from '@/types'
import { useLocalStorage } from '@vueuse/core'
const KEY = 'DONE-TASKS-STORE'

export const DONE_STORE = useLocalStorage<DoneTasks[]>(KEY, [])

export function handleDoneTask(task: Task) {
  const taskExists = DONE_STORE.value.some((doneTask) => doneTask.taskId === task.taskId)

  if (!taskExists) {
    DONE_STORE.value.push({
      taskId: task.taskId,
      task: task
    })
  }
}

export function deleteTask(taskId: Task['taskId']) {
  const task = DONE_STORE.value.find((task) => task.taskId === taskId)
  console.log(task)

  if (!task) return

  DONE_STORE.value = DONE_STORE.value.filter((item) => item.task.taskId !== task.taskId)
}

export function getSortedDoneTasks(type: string) {
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

export function updateTask(taskId: Task['taskId'], updatedTask: Task) {
  const task = DONE_STORE.value.find((task) => task.taskId === taskId)

  if (!task) return

  task.task = updatedTask
  console.log(task.task, 'updated')
}

export default {
  DONE_STORE,
  handleDoneTask,
  deleteTask,
  updateTask
}
