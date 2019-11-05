import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../_models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.baseUrl + 'tickets');
  }

  getTicket(id): Observable<Ticket> {
    return this.http.get<Ticket>(this.baseUrl + 'tickets/' + id);
  }

  createTicket(ticket: Ticket) {
    return this.http.post(this.baseUrl + 'tickets', ticket);
  }

  updateTicket(ticket: Ticket) {
    return this.http.put(this.baseUrl + 'tickets/' + ticket.id, ticket);
  }

  deleteTicket(id: number) {
    return this.http.delete(this.baseUrl + 'tickets/' + id);
  }
}
