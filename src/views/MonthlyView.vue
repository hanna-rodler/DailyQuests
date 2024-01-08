<script setup lang="ts">
import Column from '@/components/Column.vue'

import { STORE } from '@/stores/kanbanStore'

import { createCalendarColumns } from '@/utils/CalendarDates'

createCalendarColumns()
</script>

<template>
  <h2>Monthly View</h2>
  <div class="flex-1 flex gap-4 px-3 overflow-x-auto">
    <Column v-for="column of STORE" :key="column.columnId" :column="column" />
  </div>
</template>
