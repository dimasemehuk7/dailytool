import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CalendarComponent} from './components/calendar/calendar.component';
import {DayDetailsComponent} from './components/day-details/day-details.component';

const routes: Routes = [
  {path: 'calendar', component: CalendarComponent}, // CalendarPageComponent
  {path: 'day-details', component: DayDetailsComponent}, // DayDetailsPageComponent
  {path: '**', redirectTo: '/calendar', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
