import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-screen-locker',
  templateUrl: 'screen-locker.component.html',
  styleUrls: ['screen-locker.component.scss']
})
export class ScreenLockerComponent implements OnInit {

  public visible: boolean;

  constructor() {}

  ngOnInit(): void {
    this.store.pipe(select(uiLockerSelectors.screenLockerVisible)).subscribe((visible: boolean) => {
      this.visible = visible;
    });
  }
}
