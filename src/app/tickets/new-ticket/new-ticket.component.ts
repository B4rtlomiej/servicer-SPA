import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Ticket } from 'src/app/_models/ticket';
import { TicketService } from 'src/app/_services/ticket.service';
import { ToastrService } from 'src/app/_services/toastr.service';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit {

  ticket: Ticket;
  public registerForm: FormGroup;

  constructor(private ticketService: TicketService, private toastr: ToastrService, private formBuilder: FormBuilder,
    public router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      type: ['Mechanical'],
      priority: ['Medium'],
      subject: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  createTicket() {
    if (this.registerForm.valid) {
      this.ticket = Object.assign({}, this.registerForm.value);
      this.ticket.origin = 'Agent';
      this.ticket.status = 'New';
      this.ticketService.createTicket(this.ticket).subscribe(() => {
        this.router.navigate(['/tickets']);
        this.toastr.success('Stworzono zgłoszenie.');
      }, error => {
        this.toastr.error(error);
      });
    }
  }

}
