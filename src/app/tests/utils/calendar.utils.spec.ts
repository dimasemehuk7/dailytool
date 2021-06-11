import {CalendarUtils} from '../../utils/calendar.utils';
import {DatePeriod} from '../../models/date-period';

describe('CalendarUtils', () => {

  it('should calculate period by year and month', () => {

    const testCases = [
      {year: 2021, month: 1, expectedFrom: new Date('2020-12-27T22:00:00.000Z'), expectedTo: new Date('2021-02-07T21:59:59.999Z')},
      {year: 2021, month: 5, expectedFrom: new Date('2021-04-25T21:00:00.000Z'), expectedTo: new Date('2021-06-06T20:59:59.999Z')},
    ];

    testCases.forEach(testCase => {
      const period: DatePeriod = CalendarUtils.getCalendarPeriodForMonth(testCase.year, testCase.month);
      expect(period).toEqual({
        from: testCase.expectedFrom,
        to: testCase.expectedTo
      });
    });
  });
});
