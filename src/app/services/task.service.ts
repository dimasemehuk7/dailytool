import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Task} from '../models/task';
import {TaskRestService} from '../rest/task-rest.service';
import {CalendarUtils} from '../utils/calendar.utils';
import {DatePeriod} from '../models/date-period';
import {catchError, tap} from 'rxjs/operators';
import {NavigationService} from './navigation.service';
import {YearAndMonth} from '../models/year-and-month';
import {CreateTaskData} from '../models/create-task-data';
import {UpdateTaskData} from '../models/update-task-data';
import {DayDetailsActions} from '../store/day-details-state.actions';
import {Store} from '@ngrx/store';
import {CalendarActions} from '../store/calendar-state.actions';
import {ToastrService} from 'ngx-toastr';

@Injectable({providedIn: 'root'})
export class TaskService {

  constructor(private store: Store,
              private taskRestService: TaskRestService,
              private toastr: ToastrService,
              private navigationService: NavigationService) {
  }

  getMainTasks$(): Observable<Task[]> {
    const yearAndMonth: YearAndMonth = this.navigationService.getPeriodFromYearAndMonthParam();
    const period: DatePeriod = CalendarUtils.getCalendarPeriodForMonth(yearAndMonth.year, yearAndMonth.month);
    return this.taskRestService.getMain$(period).pipe(tap((mainTasks: Task[]) => {
      this.store.dispatch(CalendarActions.setMainTasks({mainTasks}));
    }));
  }

  fetchAllTasksForDate$(date: Date): Observable<Task[]> {
    date.setHours(0, 0, 0, 0);
    const period: DatePeriod = {from: date, to: date};
    return this.taskRestService.getAll$(period).pipe(tap((tasks: Task[]) => {
      this.store.dispatch(DayDetailsActions.setTasks({tasks}));
    }));
  }

  createTask$(taskData: CreateTaskData): Observable<Task> {
    return this.taskRestService.create$(taskData).pipe(tap((task: Task) => {
      this.store.dispatch(DayDetailsActions.addTask({task}));
      this.toastr.success('', 'Task created');
    }));
  }

  updateTask$(taskData: UpdateTaskData): Observable<Task> {
    return this.taskRestService.update$(taskData).pipe(tap((task: Task) => {
      this.store.dispatch(DayDetailsActions.updateTask({task}));
      this.toastr.success('', 'Task updated');
    }));
  }

  deleteTask$(taskId: string): Observable<any> {
    return this.taskRestService.delete$(taskId).pipe(tap(() => {
      this.toastr.success('', 'Task deleted');
      this.store.dispatch(DayDetailsActions.deleteTask({taskId}));
    }));
  }
}
