import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from '../_services/toastr.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReportsService } from '../_services/reports.service';

@Injectable()
export class ReportsResolver implements Resolve<any[]> {

    constructor(private reportsService: ReportsService, private router: Router, private toastr: ToastrService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
        return this.reportsService.getReports().pipe(
            catchError(error => {
                this.toastr.error(error);
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}