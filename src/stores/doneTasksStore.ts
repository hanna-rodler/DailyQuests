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

export default {
  DONE_STORE,
  handleDoneTask
}
