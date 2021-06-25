import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, Params, Router, RouterStateSnapshot} from '@angular/router';
import {DatePeriod} from '../models/date-period';
import {CalendarUtils} from '../utils/calendar.utils';
import {YearAndMonth} from '../models/year-and-month';

@Injectable({providedIn: 'root'})
export class NavigationService {

  private params: Params;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const routerState: RouterStateSnapshot = this.router.routerState.snapshot;
        let state: ActivatedRouteSnapshot = routerState.root;
        while (state.firstChild) {
          state = state.firstChild;
        }
        this.params = state.params;
      }
    });
  }

  getUrlParam(paramKey: string): string {
    return this.params[paramKey];
  }

  goToDayDetails(isoDate): void {
    this.router.navigate(['day-details', isoDate]);
  }

  getPeriodFromYearAndMonthParam(): YearAndMonth {
    const yearAndMonth = this.getUrlParam('year-and-month');
    return {
      year: Number(yearAndMonth.split('-')[0]),
      month: Number(yearAndMonth.split('-')[1])
    };
  }
}
