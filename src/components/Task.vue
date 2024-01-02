<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import {
  TYPES,
  type Column,
  type Task,
  ACTIONS,
  type TRANSFER_DATA,
  type DateFormatOptions
} from '@/types'
import Modal from './common/KanbanModal.vue'
import TaskForm from './TaskForm.vue'
import { ref } from 'vue'
import kanbanStore from '@/stores/kanbanStore'
import DropZone from './common/KanbanDropZone.vue'
import Draggable from './common/KanbanDraggable.vue'

const props = defineProps<{
  task: Task
  columnId: Column['columnId']
}>()

const isTaskModalActive = ref(false)
const isDeleteTaskModalActive = ref(false)

function toggleTaskModal() {
  isTaskModalActive.value = !isTaskModalActive.value
}

function toggleDeleteTaskModal() {
  isDeleteTaskModalActive.value = !isDeleteTaskModalActive.value
}

function deleteTask() {
  kanbanStore.deleteTask(props.columnId, props.task.taskId)
  toggleDeleteTaskModal()
}

function onTaskDrop(transferData: TRANSFER_DATA) {
  if (transferData.type === TYPES.TASK && transferData.taskId) {
    kanbanStore.moveTask(transferData.taskId, props.columnId!, props.task.taskId)
  }
}

function formatDate(dateString: string) {
  const options: DateFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }
  const date = new Date(dateString)
  return date.toLocaleDateString(undefined, options).replace(/\//g, '.')
}

function isDueTodayOrTomorrow(dateString: string) {
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  const dueDate = new Date(dateString)

  return (
    dueDate.toDateString() === today.toDateString() ||
    dueDate.toDateString() === tomorrow.toDateString()
  )
}

function isPastDate(dateString: string) {
  const today = new Date()
  const dueDate = new Date(dateString)

  return dueDate < today
}
</script>

<template>
  <DropZone @drop-data="onTaskDrop">
    <Draggable
      class="cursor-pointer shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded p-2"
      :transfer-data="{
        taskId: task.taskId,
        type: TYPES.TASK
      }"
    >
      <div>
        <div class="flex gap-2">
          <span class="font-bold"> {{ task.name }}</span>
          <div class="flex gap-1">
            <button class="text-sm font-bold" @click="toggleTaskModal()">&#9998;</button>
            <button class="text-sm font-bold" @click="toggleDeleteTaskModal()">&#88;</button>
          </div>
        </div>
        <div></div>
      </div>
      <p class="w-full mt-1 text-sm text-gray-400">{{ task.description }}</p>
      <div>
        <!--TODO: would be nice if the differnt task stati would have different background colors -->
        <div class="rounded-full bg-teal-700 text-white pl-3 py-0.5 mt-3 w-3/4">
          {{ task.status }}
        </div>
      </div>
      <div class="mt-2" :class="{ 'text-red-500': isPastDate(task.dueDate) }">
        {{ formatDate(task.dueDate) }} <span v-if="isDueTodayOrTomorrow(task.dueDate)">⏰</span
        ><span v-if="isPastDate(task.dueDate)">🔥</span>
      </div>
    </Draggable>
  </DropZone>

  <Modal
    :is-modal-active="isTaskModalActive"
    :heading="`${ACTIONS.UPDATE_TASK.split('_').join(' ')}`"
    @close-modal="toggleTaskModal()"
  >
    <TaskForm
      :column-id="columnId"
      :task="task"
      :action="ACTIONS.UPDATE_TASK"
      @close-modal="toggleTaskModal()"
    />
  </Modal>

  <Modal
    :is-modal-active="isDeleteTaskModalActive"
    :heading="`${ACTIONS.DELETE_TASK.split('_').join(' ')}`"
    @close-modal="toggleDeleteTaskModal"
  >
    <div class="p-2">
      <span>Are you sure you want to delete {{ task && task.name }}?</span>
      <div class="flex justify-around pt-3">
        <button @click="toggleDeleteTaskModal()">No</button>
        <button @click="deleteTask">Yes</button>
      </div>
    </div>
  </Modal>
</template>
