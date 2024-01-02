<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import TaskForm from './TaskForm.vue'
import Modal from './common/KanbanModal.vue'
import { ACTIONS } from '@/types'

const isTaskModalActive = ref(false)
</script>

<template>
  <div class="flex justify-between px-2 mb-3 text-white">
    <h1 class="font-bold text-3xl">💎 Daily Quests</h1>
    <button class="font-bold" @click="isTaskModalActive = !isTaskModalActive">Add Task</button>
  </div>
  <Modal
    :is-modal-active="isTaskModalActive"
    :heading="`${ACTIONS.ADD_COLUMN.split('_').join(' ')}`"
    @close-modal="isTaskModalActive = !isTaskModalActive"
  >
    <TaskForm :action="ACTIONS.ADD_TASK" @close-modal="isTaskModalActive = !isTaskModalActive" />
  </Modal>
</template>
