import {AppState} from '../models/app-state';
import {createSelector} from '@ngrx/store';

export namespace CalendarStateSelectors {
  export const calendar = (state: AppState) => state.calendar;
  export const mainTasks = createSelector(calendar, state => state.mainTasks);
}
