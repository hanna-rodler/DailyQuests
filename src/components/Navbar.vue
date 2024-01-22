<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import TaskForm from './TaskForm.vue'
import Modal from './common/KanbanModal.vue'
import { ACTIONS } from '@/types'
import { useRoute } from 'vue-router'

const isTaskModalActive = ref(false)
const route = useRoute()
// Determine the view based on the route
let viewRoute = route.path || '/weekly'
if (viewRoute === '/') {
  viewRoute = '/weekly'
}

console.log(route)
console.log(viewRoute)
</script>

<template>
  <div class="flex justify-between px-2 text-white mt-4 mb-8">
    <h1 class="font-bold text-3xl">💎 Daily Quests</h1>
    <!-- Navigation Links -->
    <nav class="mt-2 font-bold">
      <router-link :class="{ underline: viewRoute === '/weekly' || viewRoute === '/weekly' }" to="/"
        >Weekly</router-link
      >
      |
      <router-link :class="{ underline: viewRoute === '/monthly' }" to="/monthly"
        >Monthly</router-link
      >
      |
      <router-link :class="{ underline: viewRoute === '/done' }" to="/done">Done Tasks</router-link>
    </nav>
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
