<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from 'vue'
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

const getStatusClass = computed(() => {
  switch (props.task.status) {
    case 'Not started':
      return 'bg-red-500'; // Replace with your desired color
    case 'In Progress':
      return 'bg-yellow-500'; // Replace with your desired color
    case 'Review':
      return 'bg-blue-500'; // Replace with your desired color
    case 'Done':
      return 'bg-green-500 funny-congratulation';
    default:
      return 'bg-gray-500'; // Default color
  }
})
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
        <div>
          <div :class="[getStatusClass, 'rounded-full text-white pl-3 py-0.5 mt-3 w-3/4']">
            {{ task.status }}
          </div>
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
<style scoped>
.bg-red-500 { background-color: red; }
.bg-yellow-500 { background-color: yellow; }
.bg-blue-500 { background-color: blue; }
.bg-green-500 { background-color: green; }
.bg-gray-500 { background-color: gray; }

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
}

.funny-congratulation {
  animation: bounce 1s ease infinite;
}
</style>
