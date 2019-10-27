import { Injectable } from '@angular/core';
import { Ticket } from '../_models/ticket';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { TicketService } from '../_services/ticket.service';
import { ToastrService } from '../_services/toastr.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TicketDetailResolver implements Resolve<Ticket> {
    constructor(private ticketService: TicketService, private router: Router, private toastr: ToastrService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Ticket> {
        return this.ticketService.getTicket(route.params.id).pipe(
            catchError(error => {
                this.toastr.error(error);
                this.router.navigate(['/tickets']);
                return of(null);
            })
        );
    }
}
