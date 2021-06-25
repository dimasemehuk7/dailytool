import {Component, OnInit} from '@angular/core';
import {Task} from '../../models/task';
import {TaskService} from '../../services/task.service';
import {CalendarUtils} from '../../utils/calendar.utils';
import {YearAndMonth} from '../../models/year-and-month';
import {NavigationService} from '../../services/navigation.service';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public loaded: boolean;
  public tasks: Task[];
  public weeks: Date[][];

  constructor(private taskService: TaskService,
              private navigationService: NavigationService) {
  }

  ngOnInit(): void {
    const yearAndMonth: YearAndMonth = this.navigationService.getPeriodFromYearAndMonthParam();
    this.weeks = CalendarUtils.getCalendarForMonth(yearAndMonth.year, yearAndMonth.month);
    this.taskService.mainTasks$.subscribe((mainTasks: Task[]) => {
      if (mainTasks) {
        this.loaded = true;
        this.tasks = mainTasks;
      }
    });
    this.taskService.getMain$().subscribe();
  }

  getTaskByDate(date: Date): Task {
    return this.tasks.find(task => {
      const timeStart = new Date(task.timeStart);
      return timeStart.getFullYear() === date.getFullYear()
        && timeStart.getMonth() === date.getMonth()
        && timeStart.getDate() === date.getDate();
    });
  }
}
