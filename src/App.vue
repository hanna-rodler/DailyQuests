<script setup lang="ts">
import Navbar from './components/Navbar.vue'

import { onMounted } from 'vue'
import { fetchPublicHolidays } from './stores/kanbanStore'
import { createCalendarForOneYear, createDummyTasks } from '@/utils/utils'

onMounted(() => {
  let calendarCreated: string | null = localStorage.getItem('calendarCreated')
  let today = new Date().toISOString().split('T')[0]

  if (calendarCreated !== today) {
    createCalendarForOneYear()
  }

  const currentYear = new Date().getFullYear()
  fetchPublicHolidays('US', currentYear) // Replace 'US' with the desired country code
  const isDummyTasksLoaded: string | null = localStorage.getItem('dummyTasksLoaded')
  if (isDummyTasksLoaded === null || isDummyTasksLoaded === 'false') {
    createDummyTasks()
  }
})

// Example usage:
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  @apply select-none h-screen bg-gray-500;
}

@media (max-width: 768px) {
  .mobile-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mobile-nav-link {
    padding: 10px;
    margin: 5px 0;
    display: block;
    text-align: center;
  }
}
</style>
