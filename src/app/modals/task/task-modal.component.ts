import {Component} from '@angular/core';

@Component({
  templateUrl: 'task-modal.component.html',
  styleUrls: ['task-modal.component.scss']
})
export class TaskModalComponent {

  public title: string;

  constructor() {
    this.title = 'Hello';
  }
}
