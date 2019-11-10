import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/_models/ticket';
import { TicketService } from 'src/app/_services/ticket.service';
import { ToastrService } from 'src/app/_services/toastr.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

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
    { value: '0', display: 'Low' },
    { value: '1', display: 'Medium' },
    { value: '2', display: 'High' }
  ];

  statuses = [
    { value: '0', display: 'New' },
    { value: '1', display: 'WorkedOn' },
    { value: '2', display: 'Comleted' }
  ];
 
  constructor(private route: ActivatedRoute, private router: Router, private ticketService: TicketService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.tickets = data.tickets.result;
      this.pagination = data.tickets.pagination;
    });
    this.ticketParams.status = 0;
    this.ticketParams.priority = 0;
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadTicket();
  }
  resetFilters() {
    this.ticketParams.status = 0;
    this.ticketParams.priority=0;
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
}
