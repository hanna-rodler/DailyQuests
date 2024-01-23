<script setup lang="ts">
import { ref } from 'vue';
import TaskForm from './TaskForm.vue';
import Modal from './common/KanbanModal.vue';
import { ACTIONS } from '@/types';
import { useRoute } from 'vue-router';

const isTaskModalActive = ref(false);
const route = useRoute();

// Determine the view based on the route
let viewRoute = route.path || '/weekly';
if (viewRoute === '/') {
  viewRoute = '/weekly';
}

console.log(route);
console.log(viewRoute);
</script>

<template>
  <div class="navbar-container">
    <h1 class="font-bold text-3xl">💎 Daily Quests</h1>
    <!-- Navigation Links -->
    <nav class="nav-links">
      <router-link :class="{ active: viewRoute === '/weekly' }" to="/">Weekly</router-link>
      |
      <router-link :class="{ active: viewRoute === '/monthly' }" to="/monthly">Monthly</router-link>
      |
      <router-link :class="{ active: viewRoute === '/done' }" to="/done">Done Tasks</router-link>
    </nav>
    <button class="font-bold add-task-button" @click="isTaskModalActive = !isTaskModalActive">Add Task</button>
  </div>
  <Modal
    :is-modal-active="isTaskModalActive"
    :heading="`${ACTIONS.ADD_COLUMN.split('_').join(' ')}`"
    @close-modal="isTaskModalActive = !isTaskModalActive"
  >
    <TaskForm :action="ACTIONS.ADD_TASK" @close-modal="isTaskModalActive = !isTaskModalActive" />
  </Modal>
</template>

<style scoped>

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: white;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links router-link {
  text-decoration: none;
  color: white;
}

.nav-links router-link.active {
  text-decoration: underline;
}

.add-task-button {
  padding: 0.5rem 1rem;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
}

/* Mobile-specific styles */
@media (max-width: 768px) {
  .navbar-container {
    flex-wrap: wrap;
    justify-content: space-between; /* Align elements to the edges */
  }

  .nav-links {
    width: 100%; /* Full width for the navigation links */
    justify-content: space-evenly; /* Evenly space the links across the navbar */
    margin-top: 1rem; /* Margin for spacing between title and links */
  }

  .nav-links router-link {
    display: inline; /* Inline display for links */
  }

  .add-task-button {
    width: 100%; /* Full width for the button */
    margin-top: 1rem; /* Space above the button */
  }
}
</style>
