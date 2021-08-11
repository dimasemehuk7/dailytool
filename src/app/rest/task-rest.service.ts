import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Task} from '../models/task';
import {DatePeriod} from '../models/date-period';
import {UrlConstants} from '../constants/url.constants';
import {DateUtils} from '../utils/date.utils';
import {CreateTaskData} from '../models/create-task-data';
import {UpdateTaskData} from '../models/update-task-data';

@Injectable({providedIn: 'root'})
export class TaskRestService {

  constructor(private http: HttpClient) {}

  getMain$(period: DatePeriod): Observable<Task[]> {
    const params = new HttpParams()
      .set('from', DateUtils.format(period.from))
      .set('to', DateUtils.format(period.to))
      .set('main', 'true');
    return this.http.get<Task[]>(`${UrlConstants.API}/tasks`, {params});
  }

  getAll$(period: DatePeriod): Observable<Task[]> {
    const params = new HttpParams()
      .set('from', DateUtils.format(period.from))
      .set('to', DateUtils.format(period.to));
    return this.http.get<Task[]>(`${UrlConstants.API}/tasks`, {params});
  }

  create$(taskData: CreateTaskData): Observable<Task> {
    console.log(taskData);
    return this.http.post<Task>(`${UrlConstants.API}/tasks`, taskData);
  }

  update$(taskData: UpdateTaskData): Observable<Task> {
    return this.http.put<Task>(`${UrlConstants.API}/tasks/${taskData.id}`, taskData);
  }

  delete$(id: string): Observable<unknown> {
    return this.http.delete<Task>(`${UrlConstants.API}/tasks/${id}`);
  }
}
