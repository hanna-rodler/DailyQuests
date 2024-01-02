import kanbanStore from '@/stores/kanbanStore'
import type { DateStringArray } from '@/types'
import { generateDateStringIdFromDate } from '@/utils/utils'

export function getCalendarForCurrentWeek(): DateStringArray {
  const today = new Date()
  const currentDay = today.getDay()
  const startDate = new Date(today)
  //   startDate.setDate(today.getDate() - currentDay) // Set to the first day of the week (Sunday)

  const currWeekDates: DateStringArray = []
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)
    currWeekDates.push(currentDate)
  }
  return currWeekDates
}

export function getCalendarForCurrentMonth(): void {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  console.log('Calendar for the current month:')
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const currentDate = new Date(year, month, i)
    console.log(currentDate.toDateString())
  }
}

export function createCalendarColumns() {
  const currWeekDates = getCalendarForCurrentWeek()
  kanbanStore.getAllPastColumns()

  for (const date of currWeekDates) {
    kanbanStore.addColumn(date.toDateString(), generateDateStringIdFromDate(date))
  }
}
