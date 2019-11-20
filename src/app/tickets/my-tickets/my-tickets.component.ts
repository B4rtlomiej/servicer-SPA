import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/_models/ticket';
import { TicketService } from 'src/app/_services/ticket.service';
import { ToastrService } from 'src/app/_services/toastr.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit {
  mytickets: Ticket[];
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
    { value: '2', display: 'Completed' }
  ];

  myticketsview = [
    { value: '0', display: 'False' },
    { value: '1', display: 'True' },
  ];
 
  constructor(private route: ActivatedRoute, private router: Router, private ticketService: TicketService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.mytickets = data.mytickets.result;
      this.pagination = data.mytickets.pagination;
    });
    this.ticketParams.status = 1;
    this.ticketParams.priority = 0;
    this.ticketParams.orderBy = 'lastOpen';
    this.ticketParams.isviewmytickets = 1;
    this.loadTicket();
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadTicket();
  }
  resetFilters() {
    this.ticketParams.status = 1;
    this.ticketParams.priority = 0;
    this.ticketParams.orderBy = 'lastOpen';
    this.ticketParams.isviewmytickets = 1;
    this.loadTicket();
  }
  loadTicket() {
    this.ticketService
    .getTickets(this.pagination.currentPage, this.pagination.itemsPerPage, this.ticketParams)
    .subscribe(
      (res: PaginatedResult<Ticket[]>) => {
      this.mytickets = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.toastr.error(error);
    });
  }
  public deleteTicket(ticket: Ticket) {
    this.ticketService.deleteTicket(ticket.id).subscribe(() => {
      const index = this.mytickets.indexOf(ticket);
      this.mytickets.splice(index, 1);
      this.toastr.success('Usunięto zgłoszenie.');
    }, error => {
      this.toastr.error(error);
    });
  }
}
