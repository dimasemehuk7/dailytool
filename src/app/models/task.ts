import {TaskStatus} from './task-status';

export interface ITask {
  id?: string;
  title: string;
  date: Date;
  main: boolean;
  timeStart: string;
  timeEnd: string;
  status: TaskStatus;
}
