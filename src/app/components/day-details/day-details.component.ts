import {Component, OnInit} from '@angular/core';
import {ITask} from '../../models/task';
import {NavigationService} from '../../services/navigation.service';
import {TaskService} from '../../services/task.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {TaskModalComponent} from '../../modals/task/task-modal.component';

@Component({
  selector: 'app-day-details',
  templateUrl: 'day-details.component.html',
  styleUrls: ['day-details.component.scss'],
})
export class DayDetailsComponent implements OnInit {

  private bsModalRef: BsModalRef;
  public tasks: ITask[];
  public date: string;

  constructor(private navigationService: NavigationService,
              private modalService: BsModalService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    const dateUrlParam = this.navigationService.getUrlParam('date');
    console.log('dateUrlParam', dateUrlParam);
    this.taskService.tasks$.subscribe((tasks: ITask[]) => {
      this.tasks = tasks;
    });

    const date = new Date(dateUrlParam);
    date.setHours(0, 0, 0, 0);
    this.taskService.getForDate$(new Date(dateUrlParam)).subscribe();
    this.date = dateUrlParam.split('-')[0] + '-' + dateUrlParam.split('-')[1];
  }

  generateString(date: string): string {
    return date.split('T')[1].split('.')[0];
  }

  createTask(): void {
    const initialState = {title: 'Modal with component'};
    this.bsModalRef = this.modalService.show(TaskModalComponent, {initialState});
  }
}

