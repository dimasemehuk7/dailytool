import {TaskStatus} from './task-status';

export interface Task {
  _id?: string;
  title: string;
  main: boolean;
  timeStart: string;
  timeEnd: string;
  status: TaskStatus;
}
