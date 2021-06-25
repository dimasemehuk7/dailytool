import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {DateUtils} from '../../utils/date.utils';
import {TaskRestService} from '../../rest/task-rest.service';

@Component({
  templateUrl: 'task-modal.component.html',
  styleUrls: ['task-modal.component.scss']
})
export class TaskModalComponent implements AfterViewInit {

  @ViewChild('startTimePicker') startTimePickerControl: ElementRef;

  public title: string;
  public taskTitle: string;
  public taskStartTime: Date;
  public taskEndTime: Date;

  constructor(private modalService: BsModalService,
              private taskRestService: TaskRestService,
              private modalRef: BsModalRef) {
    this.title = 'Hello';
    this.taskStartTime = new Date();
    this.taskEndTime = new Date();
  }

  ngAfterViewInit(): void {
    console.log('ViewChild:', this.startTimePickerControl);
  }

  doHide(): void {
    this.modalService.hide();
  }

  createTask(): void {
    this.taskRestService.create$({
      title: this.taskTitle,
      timeStart: this.taskStartTime.toISOString(),
      timeEnd: this.taskEndTime.toISOString()
    }).subscribe();
  }
}
