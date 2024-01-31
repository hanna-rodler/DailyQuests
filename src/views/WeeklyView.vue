<script lang="ts">
import Column from '@/components/Column.vue'
import { STORE } from '@/stores/kanbanStore'

export default {
  components: {
    Column
  },
  data() {
    return {
      nextWeekDate: getDateInOneWeek() // Replace with your actual nextWeekDate
    }
  },
  computed: {
    filteredColumns() {
      return STORE.value.filter((column) => this.compareDates(column.name, this.nextWeekDate))
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

function getDateInOneWeek(): string {
  // Get the current date
  let currentDate = new Date()

  // Calculate the date one week from now
  let oneWeekLater = new Date(currentDate)
  oneWeekLater.setDate(currentDate.getDate() + 7)

  // Format the result (optional, based on your needs)
  let formattedOneWeekLater = oneWeekLater.toISOString().split('T')[0]

  return formattedOneWeekLater
}
</script>

<template>
  <div class="flex-1 flex gap-4 px-3 overflow-x-auto">
    <Column v-for="column in filteredColumns" :key="column.columnId" :column="column" />
  </div>
</template>
