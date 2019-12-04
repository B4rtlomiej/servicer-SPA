import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/_models/person';
import { ToastrService } from 'src/app/_services/toastr.service';
import { PersonService } from 'src/app/_services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ticket } from 'src/app/_models/ticket';
import { NgxSpinnerService } from 'ngx-spinner';
import { TicketService } from 'src/app/_services/ticket.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { Note } from 'src/app/_models/note';
import { NoteService } from 'src/app/_services/note.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})

export class PersonDetailComponent implements OnInit {
  public person: Person;
  public editForm: FormGroup;
  public isViewMode = true;

  personParams: any = {};
  pagination: Pagination;
  
  tickets: Ticket[];
  ticketParams: any = {};

  isShow: boolean;

  public addCustomerNoteRowMode = false;
  newNote: string;
  note: Note;
  
  constructor(private personService: PersonService, private router: Router, private formBuilder: FormBuilder,
    private toastr: ToastrService, private route: ActivatedRoute, private ticketService: TicketService, 
    private noteService: NoteService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.isShow = false;
      this.person = data.person;
      this.customerTickets(this.person.id);
    });
    this.createEditForm();
  }

  loadPerson() {
    this.personService.getPerson(this.person.id).subscribe((response) => {
      this.person = response;
      this.createEditForm();
    }, error => {
      this.toastr.error(error);
    });
  }

  createEditForm() {
    this.editForm = this.formBuilder.group({
      firstName: [{ value: this.person.firstName, disabled: true }, [Validators.required, Validators.maxLength(50)]],
      lastName: [{ value: this.person.lastName, disabled: true }],
      email: [{ value: this.person.email, disabled: true }],
      phone: [{ value: this.person.phone, disabled: true }],
    });
  }

  editPerson() {
    this.isViewMode = false;
    this.editForm.get('firstName').enable();
    this.editForm.get('lastName').enable();
    this.editForm.get('email').enable();
    this.editForm.get('phone').enable();
  }

  cancel() {
    this.isViewMode = true;
    this.editForm.get('firstName').disable();
    this.editForm.get('lastName').disable();
    this.editForm.get('email').disable();
    this.editForm.get('phone').disable();
    this.ngOnInit();
  }

  update() {
    this.person.firstName = this.editForm.get('firstName').value;
    this.person.lastName = this.editForm.get('lastName').value;
    this.person.email = this.editForm.get('email').value;
    this.person.phone = this.editForm.get('phone').value;

    this.personService.updatePerson(this.person).subscribe(() => {
      this.cancel();
      this.toastr.success('Zapisano zmiany.');
    }, error => {
      this.toastr.error(error);
    });
  }

  customerTickets(id: number) {
    this.spinner.show();
    this.ticketService.customerTickets(id).subscribe(
      () => {
        this.loadCustomerTickets(id);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }
  
  loadCustomerTickets(id: number) {
    this.ticketParams.personId = id;
    this.ticketService.getCustomerTickets(1, 100, this.ticketParams)
    .subscribe(
      (res: PaginatedResult<Ticket[]>) => {
      this.tickets = res.result;
      this.isShow = res.result.length !== 0;
      this.pagination = res.pagination;
    }, error => {
      this.toastr.error(error);
    });
  }

  
  addNoteRow(mode: string) {
    this.cancelNote();
    if (mode === 'customer') {
      this.addCustomerNoteRowMode = true;
    }
  }

  cancelNote() {
    this.addCustomerNoteRowMode = false;
    this.newNote = null;
  }

  addNote(mode: string) {
    this.note = {
      text: this.newNote
    };
    this.cancelNote();
   if (mode === 'customer') {
      this.note.customerId = this.person.customerId;
    }
    this.noteService.createNote(this.note).subscribe(() => {
        this.toastr.success('Stworzono notatkę.');
      }, error => {
        this.toastr.error(error);
    });
  }

  deleteNote(noteId: number) {
    this.spinner.show();
    this.noteService.deleteNote(noteId).subscribe(() => {
      this.loadPerson();
      this.spinner.hide();
      this.toastr.success('Usunięto notatkę.');
    }, error => {
      this.spinner.hide();
      this.toastr.error(error);
    });
  }

}
