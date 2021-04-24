import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {DayDetailsComponent} from './components/day-details/day-details.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {CalendarTaskComponent} from './components/calendar-task/calendar-task.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    CalendarComponent,
    DayDetailsComponent,
    CalendarTaskComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
