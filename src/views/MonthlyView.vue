<script setup lang="ts">
import Column from '@/components/Column.vue'

import { getCalendarForCurrentMonth } from '@/utils/CalendarDates'

import { STORE } from '@/stores/kanbanStore'

getCalendarForCurrentMonth()
</script>

<template>
  <div class="flex-1 flex gap-4 px-3 overflow-x-auto">
    <Column v-for="column of STORE" :key="column.columnId" :column="column" />
  </div>
</template>
