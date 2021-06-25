import {DateUtils} from './date.utils';
import {DatePeriod} from '../models/date-period';

const WEEKS_TO_DISPLAY = 6;
const DAYS_IN_WEEK = 7;

export class CalendarUtils {

  static getCalendarForMonth(year: number, month: number): Date[][] {
    const period: DatePeriod = this.getCalendarPeriodForMonth(year, month);
    let startDateOfWeek = period.from;
    const weeks = [];
    for (let i = 0; i < WEEKS_TO_DISPLAY; i++) {
      weeks.push([]);
      for (let j = 0; j < DAYS_IN_WEEK; j++) {
        weeks[i].push(DateUtils.addDay(startDateOfWeek, j));
      }
      startDateOfWeek = DateUtils.addDay(startDateOfWeek, DAYS_IN_WEEK);
    }
    return weeks;
  }

  static getCalendarPeriodForMonth(year: number, month: number): DatePeriod {
    const firstDateOfMonth = new Date(year, month - 1);
    const firstDateOfMonthDay = firstDateOfMonth.getDay();
    const firstDateOfMonthOffset = firstDateOfMonthDay === 0 ? 6 : firstDateOfMonthDay - 1;
    const startDate = DateUtils.subDays(firstDateOfMonth, firstDateOfMonthOffset);
    let lastDate = startDate;
    for (let i = 0; i < WEEKS_TO_DISPLAY; i++) {
      lastDate = DateUtils.addDay(lastDate, DAYS_IN_WEEK );
    }
    lastDate = (new Date(lastDate.setDate(lastDate.getDate() - 1)));
    // TODO find simple way how to set end of day
    lastDate.setHours(23, 59, 59, 999);
    return {from: startDate, to: lastDate};
  }
}
