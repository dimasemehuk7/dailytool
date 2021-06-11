import {Component, OnInit} from '@angular/core';
import {ITask} from '../../models/task';
import {TaskService} from '../../services/task.service';
import {DateUtils} from '../../utils/date.utils';
import {CalendarUtils} from '../../utils/calendar.utils';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public loaded: boolean;
  public tasks: ITask[];
  public weeks: Date[][];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void{
    const now = DateUtils.now();
    this.weeks = CalendarUtils.getCalendarForMonth(now.getFullYear(), now.getMonth());
    console.log('weeks', this.weeks);

    this.taskService.mainTasks$.subscribe((mainTasks: ITask[]) => {
      if (mainTasks) {
        this.loaded = true;
        this.tasks = mainTasks;
      }
    });
    this.taskService.getMain$().subscribe();
  }

  getTaskByDate(date: Date): ITask {
    return this.tasks.find(task => {
      const timeStart = new Date(task.timeStart);
      return timeStart.getFullYear() === date.getFullYear()
        && timeStart.getMonth() === date.getMonth() - 1
        && timeStart.getDate() === date.getDate();
    });
  }
}
