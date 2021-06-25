import {TaskStatus} from './task-status';

export interface Task {
  id?: string;
  title: string;
  main: boolean;
  timeStart: string;
  timeEnd: string;
  status: TaskStatus;
}
