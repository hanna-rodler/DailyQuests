import kanbanStore from '@/stores/kanbanStore'

export function generateDateStringIdFromDate(date: Date): string {
  const isoStringDate = new Date(date.toISOString().split('T')[0])
  // timezone difference causes day change
  if (compareDateOnly(date, isoStringDate, 'isGreate')) {
    const tomorrow = new Date(date)
    tomorrow.setDate(date.getDate() + 1)
    date = tomorrow
  }
  return date.toISOString().split('T')[0]
}

export function compareDateOnly(date1: Date, date2: Date, type: string) {
  const getDatePart = (date: Date) => new Date(date.toDateString())

  const datePart1 = getDatePart(date1)
  const datePart2 = getDatePart(date2)

  if (type === 'isGreaterOrEqual') {
    return datePart1.getTime() >= datePart2.getTime()
  } else if (type === 'isSmaller') {
    return datePart1.getTime() < datePart2.getTime()
  } else {
    return datePart1.getTime() > datePart2.getTime()
  }
}

export function createCalendarForOneYear(): void {
  const today = new Date()
  const currentYear = today.getFullYear()
  const todaysMonth = today.getMonth()
  const nextYear = currentYear + 1
  const todayDate = today.getDate()
  const lastDayOfNextOneYear = new Date(nextYear, todaysMonth, todayDate) // this date + 1 year

  kanbanStore.handlePastColumnsAndTasks()

  // Loop through each month of the year

  for (let month = today.getMonth(); month < 12; month++) {
    const lastDay = new Date(currentYear, month + 1, 0)

    // Loop through each day of the month
    for (let i = month === todaysMonth ? todayDate : 0; i <= lastDay.getDate(); i++) {
      const date = new Date(currentYear, month, i)

      // Check if the date is within the range until January 30, 2025
      if (date <= lastDayOfNextOneYear) {
        kanbanStore.addColumn(date.toDateString(), generateDateStringIdFromDate(date))
      }
    }
  }
  for (let month = 0; month <= lastDayOfNextOneYear.getMonth(); month++) {
    const lastDay = new Date(nextYear, month, todayDate)

    // Loop through each day of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(nextYear, month, i)

      // Check if the date is within the range until January 30, 2025
      if (date <= lastDayOfNextOneYear) {
        kanbanStore.addColumn(date.toDateString(), generateDateStringIdFromDate(date))
      }
    }
  }

  localStorage.setItem('calendarCreated', new Date().toISOString().split('T')[0])
}

export function createDummyTasks() {
  const isDummyTasksLoaded: string | null = localStorage.getItem('dummyTasksLoaded')
  if (isDummyTasksLoaded === null || isDummyTasksLoaded === 'false') {
    kanbanStore.addColumn('Fri Feb 02 2024', '2024-02-11')
    kanbanStore.addTaskToColumn('2024-02-11', {
      name: 'pack',
      description: "don't forget tooth paste!",
      dueDate: '2024-02-11',
      doDate: '2024-02-11',
      status: 'Not started'
    })
    kanbanStore.addColumn('Sun Jan 28 2024', '2024-01-28')
    kanbanStore.addTaskToColumn('2024-01-31', {
      name: 'HUX Final Project',
      description: '',
      dueDate: '2024-01-31',
      doDate: '2024-01-28',
      status: 'Review'
    })
    kanbanStore.addColumn('Sun Feb 04 2024', '2024-02-04')
    kanbanStore.addTaskToColumn('2024-02-04', {
      name: 'HCI Pictorial',
      description: 'from Vienna airport ',
      dueDate: '2024-02-14',
      doDate: '2024-02-04',
      status: 'In Progress'
    })

    // Delay for 1 second before calling handlePastColumnsAndTasks
    // could be handled nicer with async await, etc. but this is only for the dummy data.
    setTimeout(() => {
      kanbanStore.handlePastColumnsAndTasks()
    }, 1000)
    localStorage.setItem('dummyTasksLoaded', 'true')
  }
}
