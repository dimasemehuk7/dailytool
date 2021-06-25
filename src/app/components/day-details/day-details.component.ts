import {Component, OnInit} from '@angular/core';
import {Task} from '../../models/task';
import {NavigationService} from '../../services/navigation.service';
import {TaskService} from '../../services/task.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {TaskModalComponent} from '../../modals/task/task-modal.component';

@Component({
  selector: 'app-day-details',
  templateUrl: 'day-details.component.html',
  styleUrls: ['day-details.component.scss']
})
export class DayDetailsComponent implements OnInit {

  private bsModalRef: BsModalRef;
  public tasks: Task[];
  public date: Date;

  constructor(private navigationService: NavigationService,
              private modalService: BsModalService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.date = new Date(this.navigationService.getUrlParam('date'));
    this.date.setHours(0, 0, 0, 0);
    this.taskService.tasks$.subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
    this.taskService.getAllTasksForDate$(this.date).subscribe();
  }

  createTask(): void {
    const initialState = {title: 'Modal with component'};
    this.bsModalRef = this.modalService.show(TaskModalComponent, {initialState});
  }
}

