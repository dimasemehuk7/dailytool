import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ITask} from '../../models/task';

@Component({
  selector: 'app-calendar-task',
  templateUrl: 'calendar-task.component.html',
  styleUrls: ['calendar-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTaskComponent implements OnInit {

  @Input() task: ITask;

  constructor() {
    console.log(this.task);
  }

  get dateNumber(): string {
    return `${this.task.date.getDate()}`.padStart(2, '0');
  }

  ngOnInit(): void {}
}
