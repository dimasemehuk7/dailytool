import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CalendarPageComponent} from './components/calendar-page/calendar-page.component';
import {DayDetailsPageComponent} from './components/day-details-page/day-details-page.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {CalendarTaskComponent} from './components/calendar-task/calendar-task.component';
import {HeaderComponent} from './components/header/header.component';
import {DayDetailsComponent} from './components/day-details/day-details.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TaskModalComponent} from './modals/task/task-modal.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    ModalModule.forRoot()
  ],
  declarations: [
    AppComponent,
    CalendarPageComponent,
    DayDetailsPageComponent,
    CalendarTaskComponent,
    HeaderComponent,
    CalendarComponent,
    DayDetailsComponent,
    TaskModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
