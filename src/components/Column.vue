<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ACTIONS, TYPES, type Column, type TRANSFER_DATA } from '@/types'
import Draggable from './common/KanbanDraggable.vue'
import DropZone from './common/KanbanDropZone.vue'
import { ref } from 'vue'
import TaskForm from './TaskForm.vue'
import Modal from './common/KanbanModal.vue'
import kanbanStore from '@/stores/kanbanStore'
import Task from './Task.vue'

const props = defineProps<{
  column: Column
}>()

const selectedColumn = ref<Column | null>(null)
let selectedColumnId = ref('')
const isTaskModalActive = ref(false)

function onDrop(transferData: TRANSFER_DATA) {
  if (transferData.type === TYPES.COLUMN && transferData.columnId) {
    kanbanStore.moveColumn(transferData.columnId, props.column.columnId)
  } else if (transferData.type === TYPES.TASK && transferData.taskId) {
    kanbanStore.moveTask(transferData.taskId, props.column.columnId!)
  }
}

// task handling
function addTask(columnId: Column['columnId']) {
  selectedColumnId.value = columnId
  toggleTaskModal()
}

function toggleTaskModal() {
  isTaskModalActive.value = !isTaskModalActive.value
}
</script>

<template>
  <DropZone @drop-data="onDrop">
    <Draggable
      :transfer-data="{
        columnId: column.columnId,
        type: TYPES.COLUMN
      }"
      class="p-2 w-64 bg-gray-100 shadow-lg shadow-slate-800 rounded"
    >
      <div class="flex justify-between items-center">
        <div class="flex gap-2 items-center">
          <span class="text-xl font-semibold overflow-x-auto w-40 py-1">
            {{ column.name }}
          </span>
        </div>
        <button class="text-2xl font-bold" @click="addTask(column.columnId)">➕</button>
      </div>
      <div class="flex flex-col gap-2 overflow-y-auto h-[35rem] p-2">
        <Task
          v-for="task of column.tasks"
          :column-id="column.columnId"
          :task="task"
          :key="task.taskId"
        />
      </div>
    </Draggable>
  </DropZone>

  <Modal
    :is-modal-active="isTaskModalActive"
    :heading="`${ACTIONS.ADD_TASK.split('_').join(' ')}`"
    @close-modal="toggleTaskModal()"
  >
    <TaskForm
      :column-id="selectedColumnId"
      :action="ACTIONS.ADD_TASK"
      @close-modal="toggleTaskModal()"
    />
  </Modal>
</template>
