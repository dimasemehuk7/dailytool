import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITask} from '../models/task';
import {UrlConstants} from '../constants/url.constants';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TaskRestService {

  constructor(private http: HttpClient) {}

  getAllMain$(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${UrlConstants.API}/tasks?main=true`).pipe(
      map((tasks: ITask[]) => tasks.map(t => {
        t.date = new Date(t.date);
        return t;
      }))
    );
  }
}
