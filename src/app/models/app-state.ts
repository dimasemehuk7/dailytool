import {DayDetailsState} from './day-details-state';
import {CalendarState} from './calendar-state';

export interface AppState {
  dayDetails: DayDetailsState;
  calendar: CalendarState;
}
