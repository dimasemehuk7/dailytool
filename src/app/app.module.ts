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
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TaskModalComponent} from './modals/task/task-modal.component';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {dayDetailsReducer} from './store/day-details-state.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {ActionReducerMap} from '@ngrx/store/src/models';
import {AppState} from './models/app-state';
import {calendarReducer} from './store/calendar-state.reducer';
import {ToastrModule} from 'ngx-toastr';
import {ConfirmationModalComponent} from './modals/confirmation/confirmation-modal.component';
import {UiLockerModule} from './ui-locker/ui-locker.module';

const reducers: ActionReducerMap<AppState> = {
  dayDetails: dayDetailsReducer,
  calendar: calendarReducer
};

@NgModule({
  imports: [
    UiLockerModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  declarations: [
    AppComponent,
    CalendarPageComponent,
    ConfirmationModalComponent,
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
