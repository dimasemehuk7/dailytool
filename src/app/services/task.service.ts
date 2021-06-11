import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ITask} from '../models/task';
import {TaskRestService} from '../rest/task-rest.service';
import {CalendarUtils} from '../utils/calendar.utils';
import {DatePeriod} from '../models/date-period';
import {tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from './navigation.service';
import {log} from 'util';

@Injectable({providedIn: 'root'})
export class TaskService {

  private mainTasksSubject$: BehaviorSubject<ITask[]>;
  private tasksSubject$: BehaviorSubject<ITask[]>;
  public mainTasks$: Observable<ITask[]>;
  public tasks$: Observable<ITask[]>;

  constructor(private taskRestService: TaskRestService,
              private navigationService: NavigationService) {
    this.mainTasksSubject$ = new BehaviorSubject<ITask[]>(null);
    this.tasksSubject$ = new BehaviorSubject<ITask[]>(null);
    this.mainTasks$ = this.mainTasksSubject$.asObservable();
    this.tasks$ = this.mainTasksSubject$.asObservable();
  }

  getMain$(): Observable<ITask[]> {
    const yearAndMonth =  this.navigationService.getUrlParam('year-and-month');
    const year = Number(yearAndMonth.split('-')[0]);
    const month = Number(yearAndMonth.split('-')[1]);
    const period: DatePeriod = CalendarUtils.getCalendarPeriodForMonth(year, month - 1);
    return this.taskRestService.getMain$(period).pipe(tap((mainTasks: ITask[]) => {
        this.mainTasksSubject$.next(mainTasks);
    }));
  }

  getForDate$(date: Date): Observable<ITask[]> {
    const period: DatePeriod = {from: date, to: date};
    return this.taskRestService.getAll$(period).pipe(tap((tasks: ITask[]) => {
      this.tasksSubject$.next(tasks);
    }));
  }
}
