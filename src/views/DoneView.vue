<script setup lang="ts">
import Task from '@/components/Task.vue'

import { DONE_STORE, getSortedDoneTasks } from '@/stores/doneTasksStore'

getSortedDoneTasks('doDate')
</script>

<template>
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
</template>
