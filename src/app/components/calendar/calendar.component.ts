import {Component, OnInit} from '@angular/core';
import {ITask} from '../../models/task';
import {TaskService} from '../../services/task.service';
import {DateUtils} from '../../utils/date.utils';
import {CalendarUtils} from '../../utils/calendar.utils';

@Component({
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public loaded: boolean;
  public tasks: ITask[];
  public weeks: Date[][];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    const now = DateUtils.now();
    this.weeks = CalendarUtils.getCalendarForMonth(now.getFullYear(), now.getMonth());
    this.taskService.mainTasks$.subscribe((mainTasks: ITask[]) => {
      // TODO Add collection utils
      if (mainTasks) {
        this.loaded = true;
        this.tasks = mainTasks;
      }
    });
  }

  getTask(date: Date): ITask {
    return this.tasks.find(task => {
      return task.date.getFullYear() === date.getFullYear()
        && task.date.getMonth() === date.getMonth()
        && task.date.getDate() === date.getDate();
    });
    // return {
    //   id: '3',
    //   date: new Date('23-01-2021'),
    //   main: true,
    //   status: TaskStatus.COMPLETED,
    //   timeEnd: '10:00',
    //   timeStart: '07:00',
    //   title: 'ABCD'
    // };
  }
}
