import {createAction, props} from '@ngrx/store';
import {Task} from '../models/task';

export namespace CalendarActions {
  export const setMainTasks = createAction('[Calendar] set main tasks', props<{ mainTasks: Task[] }>());
}
