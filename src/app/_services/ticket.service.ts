import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../_models/ticket';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTickets(page?, itemsPerPage?, ticketParams?): Observable<PaginatedResult<Ticket[]>> {
    const paginatedResult: PaginatedResult<Ticket[]> = new PaginatedResult<Ticket[]>();
    
    let params = new HttpParams();

    if(page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (ticketParams != null && ticketParams.status !=null && ticketParams.status !==undefined) {
      params = params.append('status', ticketParams.status);
    }
    if (ticketParams != null && ticketParams.priority !=null && ticketParams.priority !==undefined) {
      params = params.append('priority', ticketParams.priority);
    }
    if (ticketParams != null && ticketParams.orderBy !=null && ticketParams.orderBy !==undefined) {
      params = params.append('orderBy', ticketParams.orderBy);
    }
    return this.http.get<Ticket[]>(this.baseUrl + 'tickets', {observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if(response.headers.get('Pagination')!=null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
        }
        return paginatedResult;
      })
    );
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
