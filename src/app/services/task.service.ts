import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ITask} from '../models/task';
import {TaskRestService} from '../rest/task-rest.service';

@Injectable({providedIn: 'root'})
export class TaskService {

  private mainTasksSubject$: BehaviorSubject<ITask[]>;
  public mainTasks$: Observable<ITask[]>;

  constructor(private taskRestService: TaskRestService) {
    this.mainTasksSubject$ = new BehaviorSubject<ITask[]>(null);
    this.mainTasks$ = this.mainTasksSubject$.asObservable();
    this.taskRestService.getAllMain$().subscribe((tasks: ITask[]) => {
      this.mainTasksSubject$.next(tasks);
    });
  }
}

