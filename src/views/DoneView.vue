<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Task from '@/components/Task.vue'

import { DONE_STORE, getSortedDoneTasks } from '@/stores/doneTasksStore'

import { createCalendarColumns } from '@/utils/CalendarDates'

getSortedDoneTasks('doDate')

createCalendarColumns()
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <Navbar />
    <div class="flex justify-center">
      <div class="max-w-7xl">
        <div
          class="mx-3 grid gap-4 grid-cols-1 sm:grid-cols-2 min-[700px]:grid-cols-3 lg:grid-cols-4"
        >
          <Task
            v-for="task of DONE_STORE"
            :key="task.taskId"
            :task="task.task"
            :column-id="`${task.task.doDate}`"
            :is-done-task="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>
