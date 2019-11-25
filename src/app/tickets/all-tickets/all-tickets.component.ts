import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/_models/ticket';
import { TicketService } from 'src/app/_services/ticket.service';
import { ToastrService } from 'src/app/_services/toastr.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.css']
})
export class AllTicketsComponent implements OnInit {
  tickets: Ticket[];
  pagination: Pagination;
  ticketParams: any = {};

  priorities = [
    { value: '0', display: 'Niski' },
    { value: '1', display: 'Średni' },
    { value: '2', display: 'Wysoki' }
  ];

  statuses = [
    { value: '0', display: 'Nowe' },
    { value: '1', display: 'W trakcie' },
    { value: '2', display: 'Zrobione' },
    { value: '3', display: 'Zamknięte' }
  ];
 
  constructor(private route: ActivatedRoute, private router: Router, private ticketService: TicketService, private toastr: ToastrService,
     private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.tickets = data.tickets.result;
      this.pagination = data.tickets.pagination;
    });
    this.ticketParams.status = 0;
    this.ticketParams.priority = 0;
    this.ticketParams.orderBy = 'lastOpen';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadTicket();
  }

  resetFilters() {
    this.ticketParams.status = 0;
    this.ticketParams.priority = 0;
    this.ticketParams.orderBy = 'lastOpen';
    this.loadTicket();
  }

  loadTicket() {
    this.ticketService
    .getTickets(this.pagination.currentPage, this.pagination.itemsPerPage, this.ticketParams)
    .subscribe(
      (res: PaginatedResult<Ticket[]>) => {
      this.tickets = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.toastr.error(error);
    });
  }

  public deleteTicket(ticket: Ticket) {
    this.ticketService.deleteTicket(ticket.id).subscribe(() => {
      const index = this.tickets.indexOf(ticket);
      this.tickets.splice(index, 1);
      this.toastr.success('Usunięto zgłoszenie.');
    }, error => {
      this.toastr.error(error);
    });
  }

  pickUp(id: number) {
    this.spinner.show();
    this.ticketService.pickUp(id).subscribe(
      () => {
        this.spinner.hide();
        this.toastr.success('Podjęto zgłoszenie.');
        this.loadTicket();
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error);
      }
    );
  }
}