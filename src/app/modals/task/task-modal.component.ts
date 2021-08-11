import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {TaskRestService} from '../../rest/task-rest.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from '../../models/task';
import {DateUtils} from '../../utils/date.utils';
import {TaskModalMode} from '../../models/task-modal-mode';
import {TaskService} from '../../services/task.service';

@Component({
  templateUrl: 'task-modal.component.html',
  styleUrls: ['task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {

  public title: string;
  public mode: string;
  public taskForm: FormGroup;
  public task: Task;
  public taskDate: string;

  constructor(private modalRef: BsModalRef,
              private modalService: BsModalService,
              private taskRestService: TaskRestService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    if (this.mode === TaskModalMode.CREATE) {
      this.taskForm = this.createForm(null, this.getStartDate(), this.getEndDate());
    }
    if (this.mode === TaskModalMode.EDIT) {
      this.taskForm = this.createForm(this.task.title, this.task.timeStart, this.task.timeEnd);
    }
  }

  closeModal(): void {
    this.modalService.hide();
  }

  save(): void {
    if (this.taskForm.valid) {
      if (this.mode === TaskModalMode.CREATE) {
        this.create();
      }
      if (this.mode === TaskModalMode.EDIT) {
        this.update();
      }
    }
  }

  create(): void {
    this.taskService.createTask$({
      title: this.taskForm.value.title,
      timeStart: this.taskForm.value.timeStart,
      timeEnd: this.taskForm.value.timeEnd
    }).subscribe((task: Task) => {
      this.closeModal();
    });
  }

  update(): void {
    this.taskService.updateTask$({
      title: this.taskForm.value.title,
      timeStart: this.taskForm.value.timeStart,
      timeEnd: this.taskForm.value.timeEnd,
      id: this.task._id
    }).subscribe((task: Task) => {
      this.closeModal();
    });
  }

  createForm(title, dateStart, dateEnd): FormGroup {
    return new FormGroup({
      title: new FormControl(title, [Validators.required]),
      timeStart: new FormControl(dateStart, [Validators.required]),
      timeEnd: new FormControl(dateEnd, [Validators.required])
    });
  }

  private getStartDate(): Date {
    console.log(this.taskDate);
    const dateStart = new Date(this.taskDate);
    dateStart.setHours(DateUtils.getCurrentHours(), DateUtils.getCurrentMinutes());
    console.log(dateStart);
    return dateStart;
  }

  private getEndDate(): Date {
    console.log(this.taskDate);
    const dateStart = new Date(this.taskDate);
    dateStart.setHours(DateUtils.getCurrentHours() + 1, DateUtils.getCurrentMinutes());
    console.log(dateStart);
    return dateStart;
  }
}
