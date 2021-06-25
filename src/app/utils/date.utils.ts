import {startOfMonth as _startOfMonth, subDays as _subDays, addDays as _addDay, isEqual as _isEqual} from 'date-fns';
import {DateFormat} from '../models/date-format';
import _format from 'date-fns/format';

export class DateUtils {

  static now(): Date {
    return new Date();
  }

  static startOfMonth(date: Date): Date {
    return _startOfMonth(date);
  }

  static subDays(date: Date, amount: number): Date {
    return _subDays(date, amount);
  }

  static addDay(date: Date, amount: number): Date {
    return _addDay(date, amount);
  }

  static isEqual(firstDate: Date, secondDate: Date): boolean {
    return _isEqual(firstDate, secondDate);
  }

  static format(date: Date, format: DateFormat = DateFormat.ISO_DATE): string {
    if (date) {
      return _format(date, format);
    }
    return null;
  }
}
