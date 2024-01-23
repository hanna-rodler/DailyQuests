<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import { STORE } from './stores/kanbanStore'

import { onMounted } from 'vue'
import { fetchPublicHolidays } from './stores/kanbanStore'

onMounted(() => {
  const currentYear = new Date().getFullYear()
  fetchPublicHolidays('US', currentYear) // Replace 'US' with the desired country code
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
