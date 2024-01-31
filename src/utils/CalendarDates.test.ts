
import {
  getCalendarForCurrentWeek,
  getCalendarForCurrentMonth,
  createCalendarColumns,
} from '../utils/CalendarDates'; 
import kanbanStore from '../stores/kanbanStore'; 

jest.mock('../stores/kanbanStore', () => ({
  handlePastColumnsAndTasks: jest.fn(),
  addColumn: jest.fn(),
}));

describe('Calendar functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getCalendarForCurrentWeek should return an array with 7 dates', () => {
    const weekDates = getCalendarForCurrentWeek();
    expect(weekDates).toHaveLength(7);
  });

  test('getCalendarForCurrentMonth should return an array with the correct number of dates based on the current month', () => {
    const monthDates = getCalendarForCurrentMonth();
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    expect(monthDates).toHaveLength(daysInMonth);
  });

  test('createCalendarColumns should add the correct number of columns for the week and month', () => {
    createCalendarColumns();
    const totalColumns = 7 + getCalendarForCurrentMonth().length;

    expect(kanbanStore.handlePastColumnsAndTasks).toBeCalledTimes(1);
    expect(kanbanStore.addColumn).toBeCalledTimes(totalColumns);
  });
});
