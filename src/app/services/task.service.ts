import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Task} from '../models/task';
import {TaskRestService} from '../rest/task-rest.service';
import {CalendarUtils} from '../utils/calendar.utils';
import {DatePeriod} from '../models/date-period';
import {tap} from 'rxjs/operators';
import {NavigationService} from './navigation.service';
import {YearAndMonth} from '../models/year-and-month';

@Injectable({providedIn: 'root'})
export class TaskService {

  private mainTasksSubject$: BehaviorSubject<Task[]>;
  private tasksSubject$: BehaviorSubject<Task[]>;
  public mainTasks$: Observable<Task[]>;
  public tasks$: Observable<Task[]>;

  constructor(private taskRestService: TaskRestService,
              private navigationService: NavigationService) {
    this.mainTasksSubject$ = new BehaviorSubject<Task[]>([]);
    this.tasksSubject$ = new BehaviorSubject<Task[]>([]);
    this.mainTasks$ = this.mainTasksSubject$.asObservable();
    this.tasks$ = this.tasksSubject$.asObservable();
  }

  getMain$(): Observable<Task[]> {
    const yearAndMonth: YearAndMonth = this.navigationService.getPeriodFromYearAndMonthParam();
    const period: DatePeriod = CalendarUtils.getCalendarPeriodForMonth(yearAndMonth.year, yearAndMonth.month);
    return this.taskRestService.getMain$(period).pipe(tap((mainTasks: Task[]) => {
      this.mainTasksSubject$.next(mainTasks);
    }));
  }

  getAllTasksForDate$(date: Date): Observable<Task[]> {
    const period: DatePeriod = {from: date, to: date};
    return this.taskRestService.getAll$(period).pipe(tap((tasks: Task[]) => {
      this.tasksSubject$.next(tasks);
    }));
  }
}
