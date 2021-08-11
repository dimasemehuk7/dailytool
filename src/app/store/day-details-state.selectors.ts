import {AppState} from '../models/app-state';
import {createSelector} from '@ngrx/store';

export namespace DayDetailsStateSelectors {
  export const dayDetails = (state: AppState) => state.dayDetails;
  export const tasks = createSelector(dayDetails, state => state.tasks);
}
