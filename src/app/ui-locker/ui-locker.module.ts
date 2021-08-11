import {NgModule} from '@angular/core';
import {ScreenLockerComponent} from './components/screen-locker/screen-locker.component';
import {StoreModule} from '@ngrx/store';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('uiLocker', uiLockerReducer)
  ],
  exports: [ScreenLockerComponent],
  declarations: [ScreenLockerComponent]
})
export class UiLockerModule {}
