import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Task} from '../../models/task';
import {NavigationService} from '../../services/navigation.service';

@Component({
  selector: 'app-calendar-task',
  templateUrl: 'calendar-task.component.html',
  styleUrls: ['calendar-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTaskComponent {

  constructor(private navigationService: NavigationService) {}

  @Input() task: Task;

  get dateNumber(): string {
    const startTimestamp = new Date(this.task.timeStart);
    return `${startTimestamp.getDate()}`.padStart(2, '0');
  }

  onCalenderTaskClick(): void {
    const isoDate = this.task.timeStart;
    console.log(isoDate);
    this.navigationService.goToDayDetails(isoDate.split('T')[0]);
  }
}
