import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-day-page-details',
  templateUrl: 'day-details-page.component.html',
  styleUrls: ['day-details-page.component.scss']
})
export class DayDetailsPageComponent implements OnInit {

  constructor(private store: Store) {}

  ngOnInit(): void {}
}

