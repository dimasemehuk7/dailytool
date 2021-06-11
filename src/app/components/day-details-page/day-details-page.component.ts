import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-day-page-details',
  templateUrl: 'day-details-page.component.html',
  styleUrls: ['day-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayDetailsPageComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
}

