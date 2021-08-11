import {Component, OnInit} from '@angular/core';
import {Task} from '../../models/task';
import {NavigationService} from '../../services/navigation.service';
import {TaskService} from '../../services/task.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {TaskModalComponent} from '../../modals/task/task-modal.component';
import {TaskModalMode} from '../../models/task-modal-mode';
import {select, Store} from '@ngrx/store';
import {DayDetailsActions} from '../../store/day-details-state.actions';
import {DayDetailsStateSelectors} from '../../store/day-details-state.selectors';
import {catchError, exhaustMap, switchMap} from 'rxjs/operators';
import {ConfirmationModalComponent} from '../../modals/confirmation/confirmation-modal.component';

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
              private store: Store,
              private modalService: BsModalService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.date = new Date(this.navigationService.getUrlParam('date'));
    this.taskService.fetchAllTasksForDate$(this.date).subscribe();
    this.store.pipe(select(DayDetailsStateSelectors.tasks)).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  createTask(): void {
    const taskDate = this.navigationService.getUrlParam('date');
    const initialState = {title: 'Create task', mode: TaskModalMode.CREATE, taskDate};
    this.bsModalRef = this.modalService.show(TaskModalComponent, {initialState});
  }

  editTask(task: Task): void {
    const taskDate = this.navigationService.getUrlParam('date');
    const initialState = {title: 'Edit task', mode: TaskModalMode.EDIT, task, taskDate};
    this.bsModalRef = this.modalService.show(TaskModalComponent, {initialState});
  }

  deleteTask(task: Task): void {
    const initialState = {title: 'Task deleting', text: 'Delete task?'};
    this.bsModalRef = this.modalService.show(ConfirmationModalComponent, {initialState});
    this.bsModalRef.content.confirm$
      .pipe(switchMap(() => this.taskService.deleteTask$(task._id)))
      .subscribe();
  }
}
