import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ITask} from '../../models/task';
import {TaskStatus} from '../../models/task-status';

@Component({
  selector: 'app-day-details',
  templateUrl: 'day-details.component.html',
  styleUrls: ['day-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayDetailsComponent implements OnInit {

  public tasks: ITask[] = [
    {
      id: '1',
      title: 'dsad',
      date: new Date('04-04-2021'),
      main: true,
      timeStart: '08:30',
      timeEnd: '10:00',
      status: TaskStatus.COMPLETED
    },
    {
      id: '2',
      title: 'ddasd',
      date: new Date('04-04-2021'),
      main: false,
      timeStart: '11:00',
      timeEnd: '12:00',
      status: TaskStatus.COMPLETED
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}

