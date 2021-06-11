import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CalendarPageComponent} from './components/calendar-page/calendar-page.component';
import {DayDetailsPageComponent} from './components/day-details-page/day-details-page.component';

const routes: Routes = [
  {path: 'calendar/:year-and-month', component: CalendarPageComponent},
  {path: 'day-details/:date', component: DayDetailsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
