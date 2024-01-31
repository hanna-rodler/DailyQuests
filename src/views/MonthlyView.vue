<script lang="ts">
import Column from '@/components/Column.vue'

import { STORE } from '@/stores/kanbanStore'

export default {
  components: {
    Column
  },
  data() {
    return {
      nextMonthDate: getDateInOneMonth() // Replace with your actual nextMonthDate
    }
  },
  computed: {
    filteredColumns() {
      return STORE.value.filter((column) => this.compareDates(column.name, this.nextMonthDate))
    }
  },
  methods: {
    compareDates(date1: string, date2: string) {
      // Convert dates to Date objects
      const date1Obj = new Date(date1)
      const date2Obj = new Date(date2)

      // Compare timestamps
      return date1Obj.getTime() < date2Obj.getTime()
    }
  }
}

function getDateInOneMonth(): string {
  // Get the current date
  let currentDate = new Date()

  // Calculate the date one month from now
  let oneMonthLater = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate()
  )
  return oneMonthLater.toISOString().split('T')[0]
}
</script>

<template>
  <div class="flex-1 flex gap-4 px-3 overflow-x-auto">
    <Column v-for="column in filteredColumns" :key="column.columnId" :column="column" />
  </div>
</template>
