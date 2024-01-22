import kanbanStore from '@/stores/kanbanStore'
import type { DateStringArray } from '@/types'
import { generateDateStringIdFromDate } from '@/utils/utils'

export function getCalendarForCurrentWeek(): DateStringArray {
  const today = new Date()
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
  const todayDate = today.getDate()
  const lastDay = new Date(year, month + 1, 0)

  kanbanStore.handlePastColumnsAndTasks()

  // loop through today + however many days this month has.
  // so for Jan 22: loop till Feb 22.
  for (let i = todayDate; i <= todayDate + lastDay.getDate(); i++) {
    const date = new Date(year, month, i)
    kanbanStore.addColumn(date.toDateString(), generateDateStringIdFromDate(date))
  }
}

export function createCalendarColumns() {
  const currWeekDates = getCalendarForCurrentWeek()
  kanbanStore.handlePastColumnsAndTasks()

  for (const date of currWeekDates) {
    kanbanStore.addColumn(date.toDateString(), generateDateStringIdFromDate(date))
  }
}
