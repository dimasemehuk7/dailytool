import {createAction, props} from '@ngrx/store';
import {Task} from '../models/task';

export namespace DayDetailsActions {
  export const setTasks = createAction('[DayDetails] set tasks', props<{ tasks: Task[] }>());
  export const addTask = createAction('[DayDetails] add task', props<{ task: Task }>());
  export const deleteTask = createAction('[DayDetails] delete task', props<{ taskId: string }>());
  export const updateTask = createAction('[DayDetails] update task', props<{ task: Task }>());
}

