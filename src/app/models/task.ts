import {TaskStatus} from './task-status';

export interface ITask {
  id?: string;
  title: string;
  main: boolean;
  timeStart: string;
  timeEnd: string;
  status: TaskStatus;
}
