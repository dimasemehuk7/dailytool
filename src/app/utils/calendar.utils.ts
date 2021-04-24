import {DateUtils} from './date.utils';

const WEEKS_TO_DISPLAY = 6;
const DAYS_IN_WEEK = 7;

export class CalendarUtils {

  static getCalendarForMonth(year: number, month: number): Date[][] {
    const firstDateOfMonth = new Date(year, month);
    const firstDateOfMonthDay = firstDateOfMonth.getDay();
    const firstDateOfMonthOffset = firstDateOfMonthDay === 0 ? 6 : firstDateOfMonthDay - 1;
    const startDate = DateUtils.subDays(firstDateOfMonth, firstDateOfMonthOffset);
    const weeks = [];
    let startDateOfWeek = startDate;
    for (let i = 0; i < WEEKS_TO_DISPLAY; i++) {
      weeks.push([]);
      for (let j = 0; j < DAYS_IN_WEEK; j++) {
        weeks[i].push(DateUtils.addDay(startDateOfWeek, j));
      }
      startDateOfWeek = DateUtils.addDay(startDateOfWeek, DAYS_IN_WEEK);
    }
    return weeks;
  }
}
