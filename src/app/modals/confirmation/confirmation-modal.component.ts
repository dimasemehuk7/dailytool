import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';

@Component({
  templateUrl: 'confirmation-modal.component.html',
  styleUrls: ['confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  public title: string;
  public text: string;
  public confirm$: Subject<any>;
  public cancel$: Subject<any>;

  constructor(private modalRef: BsModalRef,
              private modalService: BsModalService) {
    this.confirm$ = new Subject();
    this.cancel$ = new Subject();
  }

  ngOnInit(): void {}

  closeModal(): void {
    this.modalService.hide();
  }

  cancel(): void {
    this.cancel$.next();
    this.cancel$.complete();
    this.modalService.hide();
  }

  confirm(): void {
    this.confirm$.next();
    this.confirm$.complete();
    this.modalService.hide();
  }
}
