import {Component, OnInit} from '@angular/core';
import {Task} from '../../models/task';
import {TaskService} from '../../services/task.service';
import {CalendarUtils} from '../../utils/calendar.utils';
import {YearAndMonth} from '../../models/year-and-month';
import {NavigationService} from '../../services/navigation.service';
import {select, Store} from '@ngrx/store';
import {CalendarActions} from '../../store/calendar-state.actions';
import {CalendarStateSelectors} from '../../store/calendar-state.selectors';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public loaded: boolean;
  public mainTasks: Task[];
  public weeks: Date[][];

  constructor(private taskService: TaskService,
              private navigationService: NavigationService,
              private store: Store) {
  }

  ngOnInit(): void {
    const yearAndMonth: YearAndMonth = this.navigationService.getPeriodFromYearAndMonthParam();
    this.weeks = CalendarUtils.getCalendarForMonth(yearAndMonth.year, yearAndMonth.month);
    this.taskService.getMainTasks$().subscribe();
    this.store.pipe(select(CalendarStateSelectors.mainTasks)).subscribe((mainTasks: Task[]) => {
      this.loaded = true;
      this.mainTasks = mainTasks;
    });
  }

  getTaskByDate(date: Date): Task {
    return this.mainTasks.find(task => {
      const timeStart = new Date(task.timeStart);
      return timeStart.getFullYear() === date.getFullYear()
        && timeStart.getMonth() === date.getMonth()
        && timeStart.getDate() === date.getDate();
    });
  }

  onTaskClick(day): void {
    this.navigationService.goToDayDetails(day.toISOString().split('T')[0]);
  }
}
