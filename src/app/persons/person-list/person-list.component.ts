import { Component, OnInit } from '@angular/core';
import { Person } from '../../_models/person';
import { ActivatedRoute } from '@angular/router';
import { AdminModeService } from 'src/app/_services/admin-mode.service';
import { PersonService } from 'src/app/_services/person.service';
import { ToastrService } from 'src/app/_services/toastr.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { TicketService } from 'src/app/_services/ticket.service';
import { Ticket } from 'src/app/_models/ticket';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  persons: Person[];

  personParams: any = {};
  pagination: Pagination;

  tickets: Ticket[];
  ticketParams: any = {};

  columnList = [
    { value: 'firstName', display: 'Imieniu' },
    { value: 'lastName', display: 'Nazwisku' },
    { value: 'email', display: 'Email' },
  ];

  directionSortingList = [
    { value: 'ascending', display: 'Rosnąco' },
    { value: 'descending', display: 'Malejąco' },
  ];

  constructor(private router: ActivatedRoute, private personService: PersonService, private ticketService: TicketService, 
    private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.router.data.subscribe(data => {
      this.persons = data.persons.result;
      this.pagination = data.persons.pagination;
      this.spinner.hide();
    });
    this.personParams.column = 'lastName',
    this.personParams.sorting = 'ascending';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadPersons();
  }

  resetFilters() {
    this.personParams.column = 'lastName',
    this.personParams.sorting = 'ascending';
    this.loadPersons();
  }

  loadPersons() {
    this.personService
      .getPersons(this.pagination.currentPage, this.pagination.itemsPerPage, this.personParams)
      .subscribe(
        (res: PaginatedResult<Person[]>) => {
          this.persons = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.toastr.error(error);
        }
      );
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
    this.ticketService.getCustomerTickets(this.pagination.currentPage, this.pagination.itemsPerPage, this.ticketParams)
    .subscribe(
      (res: PaginatedResult<Ticket[]>) => {
      this.tickets = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.toastr.error(error);
    });
  }
}