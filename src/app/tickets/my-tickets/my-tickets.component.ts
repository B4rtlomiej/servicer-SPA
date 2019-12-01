import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/_models/ticket';
import { TicketService } from 'src/app/_services/ticket.service';
import { ToastrService } from 'src/app/_services/toastr.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit {
  mytickets: Ticket[];
  pagination: Pagination;
  ticketParams: any = {};
  userId: number;
  isAdmin = false;

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

  myticketsview = [
    { value: '0', display: 'False' },
    { value: '1', display: 'True' },
  ];
 
  constructor(private route: ActivatedRoute, private router: Router, private ticketService: TicketService,
    private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.mytickets = data.mytickets.result;
      this.pagination = data.mytickets.pagination;
    });
    this.ticketParams.status = 1;
    this.ticketParams.priority = 0;
    this.ticketParams.orderBy = 'lastOpen';
    this.ticketParams.IsViewMyTickets = 1;
    this.isAdmin = this.authService.isAdmin();
    this.userId = this.authService.getUserId();
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
    this.ticketParams.IsViewMyTickets = 1;
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