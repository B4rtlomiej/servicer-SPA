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

    if (ticketParams && ticketParams.IsViewMyTickets === 1) {
      params = params.append('userId', localStorage.getItem('token'));
    }

    if (ticketParams && ticketParams.status) {
      params = params.append('status', ticketParams.status);
    }

    if (ticketParams && ticketParams.priority) {
      params = params.append('priority', ticketParams.priority);
    }

    if (ticketParams && ticketParams.orderBy) {
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

  getTicket(id: number): Observable<Ticket> {
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

  pickUp(id: number) {
    return this.http.post(this.baseUrl + 'tickets/' + id + '/pickup', {
      token: localStorage.getItem('token')
    });
  }
  
  closeTicket(id: number) {
    return this.http.post(this.baseUrl + 'tickets/' + id + '/close', {
      token: localStorage.getItem('token')
    });
  }
}