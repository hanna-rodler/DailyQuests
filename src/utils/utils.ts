import kanbanStore from '@/stores/kanbanStore'

export function generateDateStringIdFromDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function compareDateOnly(date1: Date, date2: Date, isGreaterOrEqual: boolean) {
  const getDatePart = (date: Date) => new Date(date.toDateString())

  const datePart1 = getDatePart(date1)
  const datePart2 = getDatePart(date2)

  if (isGreaterOrEqual) {
    return datePart1.getTime() >= datePart2.getTime()
  } else {
    return datePart1.getTime() < datePart2.getTime()
  }
}
