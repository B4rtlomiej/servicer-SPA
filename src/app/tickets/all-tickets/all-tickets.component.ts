import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/_models/ticket';
import { TicketService } from 'src/app/_services/ticket.service';
import { ToastrService } from 'src/app/_services/toastr.service';

@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.css']
})
export class AllTicketsComponent implements OnInit {
  tickets: Ticket[];

  constructor(private route: ActivatedRoute, private router: Router, private ticketService: TicketService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.tickets = data.tickets;
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
