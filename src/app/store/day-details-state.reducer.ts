import {createReducer, on} from '@ngrx/store';
import {DayDetailsActions} from './day-details-state.actions';
import {DayDetailsState} from '../models/day-details-state';

export const initialState: DayDetailsState = {
  tasks: []
};

const _reducer = createReducer(
  initialState,
  on(DayDetailsActions.setTasks, (state, {tasks}) => ({...state, tasks})),
  on(DayDetailsActions.addTask, (state, {task}) => {
    return {...state, tasks: [...state.tasks, task]};
  }),
  on(DayDetailsActions.updateTask, (state, {task}) => {
    const tasks = state.tasks.map(t => t._id === task._id ? task : t);
    return {...state, tasks};
  }),
  on(DayDetailsActions.deleteTask, (state, {taskId}) => {
    const tasks = state.tasks.filter(t => t._id !== taskId);
    return {...state, tasks};
  })
);

export function dayDetailsReducer(state: DayDetailsState, action): DayDetailsState {
  return _reducer(state, action);
}
