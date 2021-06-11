import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITask} from '../models/task';
import {DatePeriod} from '../models/date-period';
import {UrlConstants} from '../constants/url.constants';

@Injectable({providedIn: 'root'})
export class TaskRestService {

  constructor(private http: HttpClient) {}

  getMain$(period: DatePeriod): Observable<ITask[]> {
    const params = new HttpParams()
      .set('from', period.from.toISOString().slice(0, 10))
      .set('to', period.to.toISOString().slice(0, 10))
      .set('main', 'true');
    return this.http.get<ITask[]>(`${UrlConstants.API}/tasks`, {params});
  }

  getAll$(period: DatePeriod): Observable<ITask[]> {
    const params = new HttpParams()
      .set('from', period.from.toISOString().slice(0, 10))
      .set('to', period.to.toISOString().slice(0, 10));
    return this.http.get<ITask[]>(`${UrlConstants.API}/tasks`, {params})
  }
}
