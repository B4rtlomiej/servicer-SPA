import { Component, OnInit, TemplateRef } from '@angular/core';
import { Ticket } from 'src/app/_models/ticket';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'src/app/_services/toastr.service';
import { TicketService } from 'src/app/_services/ticket.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  public ticket: Ticket;
  public editForm: FormGroup;
  public isViewMode = true;
  modalRef: BsModalRef;

  constructor(private ticketService: TicketService, private router: Router, private formBuilder: FormBuilder, 
    private toastr: ToastrService, private route: ActivatedRoute, private spinner: NgxSpinnerService, 
    private modalService: BsModalService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.ticket = data.ticket;
    });
    this.createEditForm();
  }

  createEditForm() {
    this.editForm = this.formBuilder.group({
      subject: [{ value: this.ticket.subject, disabled: true }, [Validators.required, Validators.maxLength(50)]],
      status: [{ value: this.ticket.status, disabled: true }],
      priority: [{ value: this.ticket.priority, disabled: true }],
      type: [{ value: this.ticket.type, disabled: true }],
      description: [{ value: this.ticket.description, disabled: true }, [Validators.required, Validators.minLength(20)]]
    });
  }

  editTicket() {
    this.isViewMode = false;
    this.editForm.get('subject').enable();
    this.editForm.get('status').enable();
    this.editForm.get('priority').enable();
    this.editForm.get('type').enable();
    this.editForm.get('description').enable();
  }

  cancel() {
    this.isViewMode = true;
    this.editForm.get('subject').disable();
    this.editForm.get('status').disable();
    this.editForm.get('priority').disable();
    this.editForm.get('type').disable();
    this.editForm.get('description').disable();
    this.ngOnInit();
  }

  update() {
    this.ticket.subject = this.editForm.get('subject').value;
    this.ticket.status = this.editForm.get('status').value;
    this.ticket.priority = this.editForm.get('priority').value;
    this.ticket.type = this.editForm.get('type').value;
    this.ticket.description = this.editForm.get('description').value;

    this.ticketService.updateTicket(this.ticket).subscribe(() => {
      this.cancel();
      this.toastr.success('Zapisano zmiany.');
    }, error => {
      this.toastr.error(error);
    });
  }

  closeTicket(id: number) {
    this.spinner.show();
    this.ticketService.closeTicket(id).subscribe(() => {
      this.modalRef.hide();
      this.spinner.hide();
      this.toastr.success('Zamknięto zgłoszenie.');
    }, error => {
      this.spinner.hide();
      this.modalRef.hide();
      this.toastr.error(error);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
 
  decline(): void {
    this.modalRef.hide();
  }
}