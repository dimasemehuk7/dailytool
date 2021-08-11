import {createReducer, on} from '@ngrx/store';
import {CalendarState} from '../models/calendar-state';
import {CalendarActions} from './calendar-state.actions';

export const initialState: CalendarState = {
  mainTasks: []
};

const _reducer = createReducer(
  initialState,
  on(CalendarActions.setMainTasks, (state, {mainTasks}) => ({...state, mainTasks}))
);

export function calendarReducer(state: CalendarState, action): CalendarState {
  return _reducer(state, action);
}
