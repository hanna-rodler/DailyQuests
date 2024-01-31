<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, type ComputedRef } from 'vue'
import { ACTIONS, TYPES, type Column, type TRANSFER_DATA, type Holiday } from '@/types'
import Draggable from './common/KanbanDraggable.vue'
import DropZone from './common/KanbanDropZone.vue'
import TaskForm from './TaskForm.vue'
import Modal from './common/KanbanModal.vue'
import Task from './Task.vue'
import kanbanStore, { state } from '@/stores/kanbanStore'

// Props definition
const props = defineProps<{ column: Column }>()

// Local state
const selectedColumnId = ref('')
const isTaskModalActive = ref(false)

// Computed property for public holidays
const publicHolidays: ComputedRef<Holiday[]> = computed(() => {
  const columnDate = props.column.columnId // Assuming columnId represents the date
  return state.publicHolidays.filter((holiday: Holiday) => holiday.date === columnDate)
})

// Event handlers
function onDrop(transferData: TRANSFER_DATA) {
  if (transferData.type === TYPES.TASK && transferData.taskId) {
    kanbanStore.moveTask(transferData.taskId, props.column.columnId)
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
      :transfer-data="{ columnId: column.columnId, type: TYPES.COLUMN }"
      class="column-wrapper"
    >
      <div class="column-header">
        <span class="column-title">{{ column.name }}</span>
        <button class="add-task-button text-sm" @click="addTask(column.columnId)">➕</button>
      </div>
      <div class="holiday-container" v-if="publicHolidays">
        <div v-for="holiday in publicHolidays" :key="holiday.date" class="holiday-info">
          {{ holiday.localName }}
        </div>
      </div>
      <div class="tasks-container">
        <Task
          v-for="task in column.tasks"
          :column-id="column.columnId"
          :task="task"
          :key="task.taskId"
          :is-done-task="false"
        />
      </div>
    </Draggable>
  </DropZone>

  <Modal
    :is-modal-active="isTaskModalActive"
    :heading="`${ACTIONS.ADD_TASK.split('_').join(' ')}`"
    @close-modal="toggleTaskModal"
  >
    <TaskForm
      :column-id="selectedColumnId"
      :action="ACTIONS.ADD_TASK"
      @close-modal="toggleTaskModal"
    />
  </Modal>
</template>

<style scoped>
.column-wrapper {
  width: 16rem;
  background-color: #f0f0f0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.column-header {
  padding: 1rem 1.2rem 0 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.column-title {
  font-size: 1.2rem;
  font-weight: bold;
  overflow-x: auto;
}

.holiday-container {
  margin-top: 10px;
}

.holiday-info {
  font-size: 0.9rem;
  color: #666;
}

.tasks-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  max-height: 35rem;
  padding: 1.2rem;
}

.add-task-button {
  font-size: 1.5rem;
  font-weight: bold;
}

.column-wrapper {
  width: 16rem;
  background-color: #f0f0f0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

@media (max-width: 768px) {
  .column-wrapper {
    width: auto; /* Adjust width for mobile devices */
    margin: 0 10px; /* Add margin to avoid touching the screen edges */
  }

  .column-header {
    padding: 0.5rem; /* Reduce padding for mobile devices */
  }

  .tasks-container {
    max-height: calc(100vh - 120px); /* Adjust height for mobile devices */
  }
}

.column-wrapper {
  width: 16rem;
  background-color: #f0f0f0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.column-header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e0e0e0; /* Slightly different background for the header */
}

.column-title {
  font-size: 1.2rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* Show ellipsis (...) when text overflows */
  max-width: 100%; /* Ensure it doesn't exceed its container */
}

.holiday-container {
  margin-top: 10px;
  padding: 0.5rem;
}

.holiday-info {
  font-size: 0.9rem;
  color: #666;
}

.tasks-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
}

.add-task-button {
  font-size: 1.5rem;
  font-weight: bold;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

/* Mobile-specific styles */
@media (max-width: 768px) {
  .column-wrapper {
    width: auto; /* Full width on mobile */
    margin: 0.5rem; /* Smaller margin */
  }

  .column-header {
    padding: 0.5rem; /* Smaller padding */
  }

  .tasks-container {
    padding: 0.5rem; /* Smaller padding */
  }

  .add-task-button {
    font-size: 1.2rem; /* Smaller font size for the button */
  }
}
</style>
